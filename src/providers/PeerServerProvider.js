// PeerServerProvider：只有一个网页实例会创建 peer 服务器，其他网页实都会以 peer 客户端的形式连进来（包括自己）
import Peer from "peerjs";
import { peerConfig, peerServerID, SERVER_DATA_TYPE } from 'commons/constants';
import { createContext, useContext, useEffect, useState, useRef } from "react";


const serverContext = createContext(null);


export default function PeerServerProvider({ children }) {
    const [isInit, setInit] = useState(false);
    //用reference防止状态更新刷新其他关联组件，因为关联组件比较接近react树的根部
	const serverRef = useRef({ peer:null, connections: {}, users:{} }); 

    //=============== 初始化节点服务器 =========================
    useEffect(() => {
        createServerPeer(serverRef);
    }, []);
	 

    //============== 创建 peer server =======================
    const createServerPeer = (serverRef)=> {
        if(serverRef.current.peer) return; //防止多次执行

        console.log('Trying to create a peer server ...');

        const peer = new Peer(peerServerID, peerConfig); //创建 peer 服务器，可能创建不成功
        serverRef.current.peer = peer;
        
        peer.on("open", (id) => {
            //peer server 创建成功
            console.log('A Peer Server is created on this instance!'); 
            setInit(true); 
        });
        
        peer.on("connection", (connection) => {
            //新的用户连进来，初始化连接和调整用户列表等
            console.log("Incoming connection id: ", connection.peer);
            setupConnection(connection);
        });
    
        peer.on('error', (error)=> {
            //创建不成功，已有一个peer server在别的实例上运行
            if(error.type === "unavailable-id") {
                serverRef.current.peer = null;
                peer.destroy();
                setInit(true);
            }
        });

        window.addEventListener("beforeunload", (event) => {
            peer.destroy();
        });
    }

    //============== 建立新的连接 =======================
    const setupConnection = (curConnection)=> {
        const connections = serverRef.current.connections;
        const users = serverRef.current.users;
        const curId = curConnection.peer;
        
        curConnection.on("data", (data) => {
            // 新用户连进来是添加到列表并广播新的列表
            if(data.type === SERVER_DATA_TYPE.NEW_USER && data.user) {
                connections[curId] = curConnection;
                users[curId] = data.user;
                broadcast(SERVER_DATA_TYPE.USERS_SNAPSHOT, users);
            }
        });

        // 此用户断连后将其从列表上移除，并广播新列表
        curConnection.on('close', ()=> {
            delete connections[curId];
            delete users[curId];
            broadcast(SERVER_DATA_TYPE.USERS_SNAPSHOT, users);
        });
    }

    // =============== 广播信息给所以连接的peer ===================
    const broadcast = (type, data)=> {
        const connections = serverRef.current.connections;
        for(const id in connections) {
            connections[id].send({ type, data });
        }
    }

    //============== Provider ===================
    const contextValue = { isInit };
    return (
        <serverContext.Provider value={contextValue}>
            {children}
        </serverContext.Provider>
    )
} 


// ====== 自定义context hook =============
/**
 * @description PeerServerProvider 的子组件可以使用 usePeerServer() 获得PeerServer的创建状态
 * @return {{ isInit:boolean }}
 */
export function usePeerServer() {
    return useContext(serverContext);
}