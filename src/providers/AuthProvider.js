//AuthProvider 用于允许登入者拥有访问服务器的权限，使用一个特定账号登录，并非社交用户。
//社交用户请看ChatUserProvider
import { createContext, useContext, useEffect, useState } from "react";
import { AES } from "crypto-js";
import { dbAuth } from "../commons/FBase";
const { encrypt:ec, decrypt:dc} = AES;

//========= models ================
function reCreateUser(user) {
    const { id } = user;
    const enc = (msg)=> ec(msg, id);
    const dec = (msg)=> dc(msg, id);
    return { enc, dec };
}

// ====== 自定义用户验证 context 对象 =============
const authContext = createContext(null);

// ====== 自定义context container =============
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isInit, setInit] = useState(false); //可以知道是否正在自动登录

    useEffect(()=>{
        // 手动登入登出成功后，或启动时自动登录成功后，都会进来一次
        dbAuth.onAuthStateChanged((user)=>{
            if(user) {
                setUser(reCreateUser(user));
            } else {
                setUser(null);
            }
            setInit(true); //若上次登出了，下次启动时onAuthStateChanged立刻出发，并且user为null
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
            const error = new Error();
            console.warn(error.stack);
        }
        return Promise.resolve(false); //提示登入失败，登录界面可以知道密码对不对
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