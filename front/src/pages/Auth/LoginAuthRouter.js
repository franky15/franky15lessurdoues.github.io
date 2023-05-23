import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';

import LoginAuthLayout from './LoginAuthLayout';

import Error from '../../_utils/Error';

const LoginAuthRouter = () => {
    return (
        <Routes>

            <Route element= { <LoginAuthLayout/> }>
                <Route index element= { <Login/> }/>
                <Route path='login' element= { <Login/> }/>
                <Route path='*' element= { <Error/> }/>
            </Route>
            
        </Routes>
    );
};

export default LoginAuthRouter;