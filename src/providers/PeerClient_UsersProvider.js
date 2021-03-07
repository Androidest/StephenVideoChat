// PeerClientProvider 为社交用户，本app使用者，一个浏览器一个。
import { peerClientID } from "commons/constants";
import { createContext, useContext, useEffect, useState } from "react";
import { usePeerClient } from "./PeerClientProvider";

// ====== 自定义社交用户的 context 对象 =============
const usersContext = createContext(null);


//存储其他已连接的用户的相关数据
export default function PeerClient_UsersProvider({ children }) {
    const peerClient = usePeerClient();
    const [list, setList] = useState([]);

    useEffect(()=>{
        peerClient.setOnUsersSnapshot(setupList);
    },[]);
    
    const setupList = (users)=> {
        delete users[peerClientID];

        const userList = [];
        for(const id in users) {
            const user = users[id];
            user.id = id;
            userList.push(user);
        }
        setList(userList);
    }

    const contextValue = { list };
    return (
        <usersContext.Provider value={contextValue}> 
            {children}
        </usersContext.Provider>
    )
} 

/**
 * @description PeerClientProvider 的子组件可以使用 useClientUsers() 获得其他社交用户的hook
 * @return {{ list:object }}
 */
export function useClientUsers() {
    return useContext(usersContext);
}