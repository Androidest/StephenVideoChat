// PeerClientProvider 为社交用户，本app使用者，一个浏览器一个。
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "providers/AuthProvider";
import PeerClient_MeProvider, { useMe } from "providers/PeerClient_MeProvider";
import PeerClient_UsersProvider from "providers/PeerClient_UsersProvider";
import Peer from "peerjs";
import { peerClientID, peerConfig, peerServerID, SERVER_DATA_TYPE } from "commons/constants";


const initContext = createContext(null);


//=============== Peer Client 初始化 ======================
function InitProvider({ children }) {
    const auth = useAuth();
    const me = useMe();
    const [isInit, setInit] = useState(false);
    const [isConnectedToServer, setConnectedToServer] = useState(false);
    const clientRef = useRef({ peer:null, serverConnection:null, onUsersSnapshot:()=>{}, onPeerError:null });

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

        const peer = new Peer(peerClientID, peerConfig); //创建 peer 客户端
        clientRef.current.peer = peer;

        peer.on('open', (id)=> {
            if (peer.id === null) {
                peer.id = peerClientID;
            }
            setInit(true);
        });

        //断开时重连signaling server
        peer.on('disconnected', ()=> {
            peer.id = peerClientID;
            peer._lastServerId = peerClientID;
            peer.reconnect();
        });

        peer.on('error', (error)=> {
            // 建立 connection 那边将传过来 onPeerError 的回调函数
            clientRef.current.onPeerError && clientRef.current.onPeerError(error);
            console.log(error);
        });

        //关闭浏览器页面时销毁peer，释放signaling server资源
        window.addEventListener("beforeunload", (event) => {
            peer.destroy();
            // ev.returnValue = 'Are you sure you want to close?';
        });
    }

    //============== 连接服务器 =======================
    const connectToServer = async ()=> {
        return new Promise((resolve, reject)=>{

            if(clientRef.current.serverConnection) {
                setConnectedToServer(true);
                resolve(null);
            }

            const serverConnection = clientRef.current.peer.connect(peerServerID);

            //当成功连上peer server 时
            serverConnection.on('open', ()=> {
                console.log("Connected to peer server");
                clientRef.current.serverConnection = serverConnection;
                
                //向peer server 发送当前用户的信息，好让它广播给其他用户
                serverConnection.send({ 
                    type: SERVER_DATA_TYPE.NEW_USER, 
                    user: me.info 
                });

                setConnectedToServer(true); //用于通知其他组件已经连接成功，这些组件没有直接调用connectToServer
                resolve(null); //用于立刻通知调用connectToServer的地方，peer已经成功连上peer server
            });
            
            //只接收peer服务器发来的用户列表，所有在线的用户
            serverConnection.on('data', ({type, data})=> {
                if(type === SERVER_DATA_TYPE.USERS_SNAPSHOT && data) {
                    clientRef.current.onUsersSnapshot(data); //调用回调函数，通知外部更新用户列表
                }
            });

            serverConnection.on('close', ()=> {
                console.log('We lost the peer server!');
                window.location.reload();
            });

            serverConnection.on('error', (error)=> {
                reject('Connection error');
            });

            //连不上 peer server 时，错误会出现在 peer上而不是在 connection 上，
            // 把reject的处理通过 clientRef.current.onPeerError 传递给 peer  
            clientRef.current.onPeerError = (error)=>{
                if(error.type === "peer-unavailable") {
                    reject('Could not connect to the peer server!');
                }
                reject(error);
            };
            
        });
    };

    // ================ 设置回调函数 ===================
    const setOnUsersSnapshot = (callback)=> {
        // 当有新的用户连接进来时，通过回调函数通知其他外部组件更新状态
        // view 那边的组件可以通过这个回调，更新组件那边的 state
        // 若把用户列表设在这个 provider 的state上，每次列表更新都会导致其他 state 关联的组件也会被强制刷新
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