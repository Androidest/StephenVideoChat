// Google Firebase 初始化和模块导出
// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";
// import "firebase/analytics";

// {
//     const firebaseConfig = {
//         apiKey: "AIzaSyByUAid1ySJpc7RGmLGdtsuceuFLJcr32A",
//         authDomain: "react-tensor-app.firebaseapp.com",
//         projectId: "react-tensor-app",
//         storageBucket: "react-tensor-app.appspot.com",
//         messagingSenderId: "710084648290",
//         appId: "1:710084648290:web:f9b770ead99b5f0c8aa03b",
//         measurementId: "G-L446FGJC6L"
//     };
    
//     // Initialize Firebase
//     firebase.initializeApp(firebaseConfig);
//     firebase.analytics();
// }

// export const db = firebase;
// export const dbAuth = Firenfirebase.auth();
// export const dbStore = firebase.firestore();


//========= 模拟的离线 Firebase （用于Demo，在国内无梯子的情况下，无法使用Firebase）=================
class FakeFireBase {
    constructor() {
        this.localDataKey = 'LastLoginState';
        this.user = null;
        this.onAuthStateChangeCallback = null;
        this.expireTime = 30*60*1000; //从最近一次登录开始，30分钟内保持自动登录状态，登出后清除状态
    }

    //================== 用localStorage 记录最近一次登录状态，用于模拟自动登录 ==================
    setUser(user) {
        this.user = user;
        if(user) {
            const date = new Date();
            user.time = date.getTime();
            window.localStorage.setItem(this.localDataKey, JSON.stringify(user));
        }
        else {
            window.localStorage.removeItem(this.localDataKey);
        }
        this.onAuthStateChangeCallback && this.onAuthStateChangeCallback(user);
    }

    //================== 模拟 firebase.auth().onAuthStateChanged() ，监听登录状态 ==================
    onAuthStateChanged(callback) {
        this.onAuthStateChangeCallback = callback;
        const item = window.localStorage.getItem(this.localDataKey);  //local storage 存储序列化形式的对象 (json string)
        if(item) {
            const user = JSON.parse(item);
            const date = new Date();
            if(date.getTime() - user.time < this.expireTime) {
                this.setUser(user);
                return;
            }
        }
        this.setUser(null);
    }

    //================= 模拟 firebase.auth().signInWithEmailAndPassword() 的手动登录 ================
    async signInWithEmailAndPassword(email, password) {
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                if(email === 'stephen@invited.com' && password === 'niubideren666' ) {  
                    this.setUser({ id: 'Stephen-FakeServer-user-id' });
                    resolve(this.user);
                }
                else {
                    reject(null);
                }
            }, 3000); //模拟验证时间
        });
    }
    
    //================= 模拟 firebase.auth().signOut() 的手动登出 ================
    async signOut() {
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                this.setUser(null);
                resolve(true);
            }, 500); //模拟登出时间
        });
    }
}

export const dbAuth = new FakeFireBase();
