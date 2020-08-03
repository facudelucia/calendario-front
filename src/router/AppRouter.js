import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import LoginScreen from '../components/auth/LoginScreen';
import CalendarScreen from '../components/calendar/CalendarScreen';
import { useDispatch, useSelector } from 'react-redux';
import { startChecking } from '../actions/auth';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

const AppRouter = () => {
    const dispatch = useDispatch();

    const {checking, uid} = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(startChecking())
    }, [dispatch])

    if(checking){
        return(<h5>Wait...</h5>)
    }

    return ( 
        <Router>
            <div>
                <Switch>
                    <PrivateRoute exact path="/" isAuth={!!uid} component={CalendarScreen}/>
                    <PublicRoute exact path="/login" isAuth={!!uid} component={LoginScreen}/>
                    <Redirect to="/"/>
                </Switch>
            </div>
            
        </Router>
     );
}
 
export default AppRouter;