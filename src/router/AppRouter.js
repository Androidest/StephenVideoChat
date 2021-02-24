import { useAuth } from "modules/Auth";
import { BrowserRouter, Redirect, Route, Switch, useLocation } from "react-router-dom";
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
                    <Switch>
                        <Route exact path={HOME}> <Home/> </Route>
                        <Route exact path={GROUPCHAT}> <GroupChat/> </Route>
                        <Route exact path={PROFILE}> <Profile/>  </Route>
                        <DefaultRoute redirectPath={HOME}/>
                    </Switch>
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