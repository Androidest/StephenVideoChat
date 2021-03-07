// PeerClientProvider 为社交用户，本app使用者，一个浏览器一个。
import Peer from "peerjs";
import { peerServerID, SERVER_DATA_TYPE } from 'commons/constants';
import { createContext, useContext, useEffect, useState, useRef } from "react";


const serverContext = createContext(null);


export default function PeerServerProvider({ children }) {
    const [isInit, setInit] = useState(false);
	const serverRef = useRef({ peer:null, connections: {}, users:{} });

    //=============== 初始化节点服务器 =========================
    useEffect(() => {
        createServerPeer(serverRef);
    }, []);
	 

    //============== 创建 peer server =======================
    const createServerPeer = (serverRef)=> {
        if(serverRef.current.peer) return;

        console.log('Trying to create a peer server ...')
        const peer = new Peer(peerServerID);
        serverRef.current.peer = peer;

        peer.on("open", (id) => {
            console.log('A Peer Server is created on this instance!');
            setInit(true);
        });
        
        peer.on("connection", (connection) => {
            console.log("Incoming connection id: ", connection.peer);
            setupConnection(connection);
        });
    
        peer.on('error', (error)=> {
            if(error.type === "unavailable-id") {
                serverRef.current.peer = null;
                setInit(true);
            }
        });
    }

    //============== 建立新的连接 =======================
    const setupConnection = (curConnection)=> {
        const connections = serverRef.current.connections;
        const users = serverRef.current.users;
        const curId = curConnection.peer;
        
        curConnection.on("data", (data) => {
            if(data.type === SERVER_DATA_TYPE.NEW_USER && data.user) {
                connections[curId] = curConnection;
                users[curId] = data.user;
                for(const id in connections) {
                    connections[id].send({ 
                        type: SERVER_DATA_TYPE.USERS_SNAPSHOT,
                        users
                    });
                }
            }
        });
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