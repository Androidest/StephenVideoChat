// PeerClientProvider 为社交用户，本app使用者，一个浏览器一个。
import { createContext, useContext, useEffect, useState } from "react";

// ====== 自定义社交用户的 context 对象 =============
const themContext = createContext(null);


//存储其他已连接的用户的相关数据
export default function PeerClient_ThemProvider({ children }) {
    const [them, setThem] = useState([]);
    const themValue = { them };

    return (
        <themContext.Provider value={themValue}> 
            {children}
        </themContext.Provider>
    )
} 

/**
 * @description PeerClientProvider 的子组件可以使用 useThem() 获得其他社交用户的hook
 * @return {{ them:object }}
 */
export function useThem() {
    return useContext(themContext);
}