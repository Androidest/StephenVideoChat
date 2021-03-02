import { useAuth } from "providers/AuthProvider";
import { useChatUser } from "providers/ChatUserProvider";
import { Css } from "commons/SharedStyle";
import { HashRouter, Link, Redirect, Route, Switch, useLocation } from "react-router-dom";
import styled from "styled-components";
import GroupChat from "./GroupChat";
import Home from "./Home";
import Login from "./Login";
import Profile from "./Profile";
import LoadingAnim from "views/LoadingAnim";


//================ 常量，其他文件也可以访问 =========================
export const LOGIN = '/login';
export const HOME = '/';
export const GROUPCHAT = '/groupchat';
export const PROFILE = '/profile';


//================ 在 Switch 里的默认路由路径，放在Switch里最后，当路径不存在时转到这里 =========================
function DefaultRoute({ redirectPath }) {
    const location = useLocation(); //重定向之前记住来时的路径 location.state.from
    //当 Switch 找不到前面的路径，任意路径 "*" 将导到这里再重定向
    return (
        <Route path='*' >
            <Redirect to={{ pathname: redirectPath, state: { from: location } }} />
        </Route>
    );
}


//================ default App Route =========================
export default function AppRouter() {
    const auth = useAuth();
    const cUser = useChatUser();

    return (
        <>
        {auth.isInit ? ( //判断是否在自动登录
            <HashRouter>
                { (auth.user && cUser.isReady) ? (  //Login 的两个界面都通过后切换成此处的路由
                    <>
                    <Navigation>
                        <NavButton to={HOME}>Home</NavButton>
                        <NavButton to={GROUPCHAT}>Group Chat</NavButton>
                        <NavButton to={PROFILE}>Profile</NavButton>
                        <button onClick={()=>auth.logout()}>sign out</button>
                    </Navigation>
                    
                    <Switch>
                        <Route exact path={HOME}> <Home/> </Route>
                        <Route exact path={GROUPCHAT}> <GroupChat/> </Route>
                        <Route exact path={PROFILE}> <Profile/>  </Route>
                        <DefaultRoute redirectPath={HOME}/>
                    </Switch>
                    </>
                ) : (
                    <Switch>
                        <Route exact path={LOGIN}> <Login/> </Route>
                        <DefaultRoute redirectPath={LOGIN}/>
                    </Switch>
                )}
            </HashRouter>
        ) : (
            <BigLodingAnim/>
        )}
        </>
    );
}


//======================= style ==========================
const BigLodingAnim = styled(LoadingAnim) `
    width: 30ch;
`

const NavButton = styled(Link) `
    width: 170px;
    height: 50px;
    color: white;
    text-decoration: none;
    background-color: #8080c0;
    border-radius: 25px;
    ${Css.flex_row.horz.center}
    ${Css.flex_row.vert.center}
`;

const Navigation = styled.div `
    width: 100%;
    height: 50px;
    background-color: #91dbff;
    ${Css.flex_row.horz.in_out_space}
    ${Css.flex_row.vert.center}
`;