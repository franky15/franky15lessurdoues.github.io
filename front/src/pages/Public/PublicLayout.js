import React from 'react';

import { Outlet } from 'react-router-dom';
 import Header from '../../components/publicPart/HeaderPublic';
import Footer from '../../components/publicPart/Footer';

const PublicLayout = () => {
    return (
        <div className='Layout'>
            <Header/>
            <Outlet/> {/* car composant parent permet de lire la route parente PublicLayout du route */}
            <Footer/>
        </div>
    );
};

export default PublicLayout;