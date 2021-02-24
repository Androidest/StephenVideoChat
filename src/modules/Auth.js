import { createContext, useContext, useState } from "react";
const { dbAuth } = require("./Database");

// ====== 自定义用户验证 context 对象 =============
const authContext = createContext(null);

// ====== 自定义context container =============
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isInit, setInit] = useState(false); //可以知道是否正在自动登录

    useState(()=>{
        // 手动登入登出成功后，或启动时自动登录成功后，都会进来一次
        dbAuth.onAuthStateChanged((user)=>{
            if(user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setInit(true);
        })
    },[])

    //==== 手动登录 ====
    const login = async (email, password)=>{
        try{
            // 由于使用 dbAuth.onAuthStateChanged 统一手动登录和自动登录，在此不需要获得user
            // const {user} = await dbAuth.signInWithEmailAndPassword(email, password);
            await dbAuth.signInWithEmailAndPassword(email, password);
            return Promise.resolve(true);  //提示登入成功，登录界面可以知道什么时候redirect
        }
        catch(e){
            return Promise.resolve(false); //提示登入失败，登录界面可以知道密码对不对
        }
    }

    //==== 手动登出 ====
    const logout = async ()=>{
        try{
            await dbAuth.signOut();
            return Promise.resolve(true);
        }
        catch(e){
            return Promise.resolve(false);
        }
    }

    const contextValue = {isInit, user, login, logout};

    // ====== 自定义context container =============
    return (
        <authContext.Provider value={contextValue}> 
            {children}
        </authContext.Provider>
    )
} 

// ====== 自定义context hook =============
/**
 * @description AuthProvider 的子组件可以使用 useAuth() 获得用户验证相关hook
 * @return {{isInit:boolean, user:object, login:Function, logout:Function}}
 */
export function useAuth() {
    return useContext(authContext);
}