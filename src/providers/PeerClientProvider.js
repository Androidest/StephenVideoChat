// PeerClientProvider 为社交用户，本app使用者，一个浏览器一个。
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "providers/AuthProvider";
import PeerClient_MeProvider, { useMe } from "providers/PeerClient_MeProvider";
import PeerClient_UsersProvider from "providers/PeerClient_UsersProvider";
import Peer from "peerjs";
import { peerClientID, peerServerID, SERVER_DATA_TYPE } from "commons/constants";


const initContext = createContext(null);


//=============== Peer Client 初始化 ======================
function InitProvider({ children }) {
    const auth = useAuth();
    const me = useMe();
    const [isInit, setInit] = useState(false);
    const [isConnectedToServer, setConnectedToServer] = useState(false);
    const clientRef = useRef({ peer:null, serverConnection:null, onUsersSnapshot:()=>{} });

    //================= 初始化 ===========================
    useEffect(()=> {
        if(auth.user == null) {
            setConnectedToServer(false); //使登出后重新登录时，可以进入设置角色的开始界面（LoginPanel2）
        }
        createClientPeer();
        
    }, [auth.user]); //登出时会触发


    ///============== 创建 peer client =======================
    const createClientPeer = ()=> {
        if(clientRef.current.peer) return; //防止因auth的更新而被多次初始化，不能用isInit判断

        const peer = new Peer(peerClientID);
        clientRef.current.peer = peer;

        peer.on('open', (id)=> {
            if (peer.id === null) {
                peer.id = peerClientID;
            }
            setInit(true);
        });

        peer.on('error', (err)=> {
            console.log(err);
        });

        // window.addEventListener("beforeunload", (ev) => {  
        //     ev.returnValue = 'Are you sure you want to close?';
        //     return;
        // });
    }

    //============== 连接服务器 =======================
    const connectToServer = ()=> {
        if(clientRef.current.serverConnection) {
            setConnectedToServer(true);
            return;
        }

        const serverConnection = clientRef.current.peer.connect(peerServerID);

        serverConnection.on('open', ()=> {
            console.log("Connected to peer server");
            clientRef.current.serverConnection = serverConnection;
            setConnectedToServer(true);

            serverConnection.send({ 
                type: SERVER_DATA_TYPE.NEW_USER, 
                user: me.info 
            });
        });
        
        serverConnection.on('data', (data)=> {
            if(data.type === SERVER_DATA_TYPE.USERS_SNAPSHOT && data.users) {
                clientRef.current.onUsersSnapshot(data.users);
            }
        });
    };

    const setOnUsersSnapshot = (callback)=> {
        clientRef.current.onUsersSnapshot = callback;
    }
    
    //============== Provider ===================
    const chatUserValue = { isInit, isConnectedToServer, connectToServer, setOnUsersSnapshot };
    return (
        <initContext.Provider value={chatUserValue}>
            {children}
        </initContext.Provider>
    )
} 



//主provider逻辑模块， 在此将PeerClientProvider分割成三个小模块
//是为了防止在一个 state 更新时，即使组件没有使用这个state 
//而使用其他同 Provider 的 state 也会被连带重渲染
export default function PeerClientProvider({ children }) {
    return (
        <PeerClient_MeProvider>  
            <InitProvider> 
                <PeerClient_UsersProvider>
                    {children}
                </PeerClient_UsersProvider>
            </InitProvider>
        </PeerClient_MeProvider>
    )
} 


// ====== 自定义context hook =============
/**
 * @description PeerClientProvider 的子组件可以使用 usePeerClient() 获得PeerClientProvider的状态
 * @return {{ isInit:boolean, isConnectedToServer:boolean, connectToServer:Function, setOnUsersSnapshot:Function }}
 */
export function usePeerClient() {
    return useContext(initContext);
}