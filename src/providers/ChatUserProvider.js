// ChatUserProvider 为社交用户，本app使用者，一个浏览器一个。
import { useLocalStorage } from "commons/LocalStorage";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { v4 } from 'uuid';
import { DEFAULT_PHOTO } from 'commons/constants';


// ================== models ===================
const isClearHistory = false;
const initMe = {
    uuid: v4(), //随机ID
    name: "MyName",
    photoUrl: DEFAULT_PHOTO 
};

// ====== 自定义社交用户的 context 对象 =============
const chatUserContext = createContext(null);

// ====== 自定义context container =============
export function ChatUserProvider({ children }) {
    const { user } = useAuth();
    const [isReady, setReady] = useState(false);
    const [me, setMe] = useLocalStorage('me', initMe, isClearHistory); 
    const [them, setThem] = useState([]);

    useEffect(()=>{
        
    },[user])

    const contextValue = { isReady, setReady, me, setMe, them };

    // ====== 自定义context container =============
    return (
        <chatUserContext.Provider value={contextValue}> 
            {children}
        </chatUserContext.Provider>
    )
} 

// ====== 自定义context hook =============
/**
 * @description ChatUserProvider 的子组件可以使用 useChatUser() 获得社交用户的hook
 * @return {{ isReady:boolean, setReady:Function, me:object, setMe:function, them:object }}
 */
export function useChatUser() {
    return useContext(chatUserContext);
}