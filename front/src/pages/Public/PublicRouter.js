import React from 'react';
import { Routes, Route } from "react-router-dom";

/*
import Home from "./Home"
import Service from "./Service"
import Contact from "./Contact"*/

import { PublicLayout, Home, Service, QUESTION } from "../Public"

import Error from '../../_utils/Error';

const PublicRouter = () => {
    return (
        <Routes>
            <Route element={ <PublicLayout/> }> 
                <Route index element= { <Home/> }/>
                <Route path='home' element= { <Home/> }/>
                <Route path='service' element= { <Service/> }/>
                <Route path='question' element= { <QUESTION/> }/>

                <Route path='*' element= { <Error/> }/> 
            </Route>
        </Routes>
    );
};

export default PublicRouter;