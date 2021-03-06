import { useAuth } from "providers/AuthProvider";
import { usePeerClient } from "providers/PeerClientProvider";
import { Css } from "commons/SharedStyle";
import { HashRouter, Link, Redirect, Route, Switch, useLocation } from "react-router-dom";
import styled from "styled-components";
import GroupChat from "./GroupChat";
import Home from "./Home";
import Login from "./Login";
import Profile from "./Profile";
import LoadingAnim from "views/LoadingAnim";
import { memo } from "react";


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

// 分出LoginRouter组件并变成memo，是为了防止 useAuth().user 状态改变时，重渲染整个Login界面(包括LoginSpace)
const LoginRouter = memo(()=> {
    return (
        <Switch>
            <Route exact path={LOGIN}> <Login/> </Route>
            <DefaultRoute redirectPath={LOGIN}/>
        </Switch>
    )
})

function MainRouter() {
    const auth = useAuth();
    return (
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
    );
}

//================ App Route =========================
export default function AppRouter() {
    const auth = useAuth();
    const cUser = usePeerClient();

    return (
        <>{
            //判断是否在自动登录
            auth.isInit ? ( 
                //因为后端部署在github page，无法控制路由路径，于是用HashRouter加‘#’区分前后端路由
                <HashRouter>{ 
                    (auth.user && cUser.isReady) ? (  
                        //Login 的两个界面都通过后, 切换成MainRouter
                        <MainRouter/>
                    ) : (
                        <LoginRouter/>
                    )
                }</HashRouter>
            ) : (
                <BigLodingAnim/>
            )
        }</>
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