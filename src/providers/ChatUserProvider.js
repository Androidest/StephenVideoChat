// ChatUserProvider 为社交用户，本app使用者，一个浏览器一个。
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "providers/AuthProvider";
import ChatUser_MeProvider from "providers/ChatUser_MeProvider";
import ChatUser_ThemProvider from "providers/ChatUser_ThemProvider";
import { isTesting } from "commons/constants";


// ====== 自定义社交用户的 context 对象 =============
const initContext = createContext(null);


//用户按Start后 isReady=true
function InitProvider({ children }) {
    const auth = useAuth();
    const [isReady, setReady] = useState(false);
    
    useEffect(()=>{
        if(isTesting){
            setReady(true);
            return;
        }

        if(auth.user == null) {
            setReady(false); //使登出后重新登录时，可以进入设置角色的开始界面（LoginPanel2）
        }
    }, [auth.user]); //登出时会触发

    const chatUserValue = { isReady, setReady };

    return (
        <initContext.Provider value={chatUserValue}>
            {children}
        </initContext.Provider>
    )
} 

//主provider逻辑模块， 在此将ChatUserProvider分割成三个小模块
//是为了防止在一个 state 更新时，即使组件没有使用这个state 
//而使用其他同 Provider 的 state 也会被连带重渲染
export default function ChatUserProvider({ children }) {
    return (
        <InitProvider> 
            <ChatUser_MeProvider> 
                <ChatUser_ThemProvider> 
                    {children}
                </ChatUser_ThemProvider>
            </ChatUser_MeProvider>
        </InitProvider>
    )
} 

// ====== 自定义context hook =============
/**
 * @description ChatUserProvider 的子组件可以使用 useChatUser() 获得ChatUserProvider的状态
 * @return {{ isReady:boolean, setReady:Function }}
 */
export function useChatUser() {
    return useContext(initContext);
}