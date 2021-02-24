import { useAuth } from "modules/Auth";
import { Css } from "modules/SharedStyle";
import { useEffect } from "react";
import { BrowserRouter, Link, Redirect, Route, Switch, useLocation } from "react-router-dom";
import styled from "styled-components";
import { GROUPCHAT, HOME, LOGIN, PROFILE } from "./Constant";
import GroupChat from "./GroupChat";
import Home from "./Home";
import Login from "./Login";
import Profile from "./Profile";


function DefaultRoute({ redirectPath }) {
    const location = useLocation();
    return (
        <Route path='*' >
            <Redirect to={{ pathname: redirectPath, state: { from: location } }} />
        </Route>
    );
}

export default function AppRouter() {
    const auth = useAuth();

    return (
        <>
        {auth.isInit ? (
            <BrowserRouter>
                { auth.user ? (
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
            </BrowserRouter>
        ) : (
            <span>'initializing'</span>
        )}
        </>
    );
}


//======================= style ==========================
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