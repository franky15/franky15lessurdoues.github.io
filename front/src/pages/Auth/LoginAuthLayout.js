import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/publicPart/HeaderPublic';
import Footer from '../../components/publicPart/Footer';

const LoginAuthLayout = () => {
    return (
        <div className='LoginLayout'>
            <Header/>
            <Outlet/> {/* permet de lire les routes enfants qui sont dans LoginAuthRouter*/}
            <Footer/>
        </div>
    );
};

export default LoginAuthLayout;