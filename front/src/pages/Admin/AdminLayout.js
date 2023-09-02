import React from 'react';
import { Outlet } from 'react-router-dom';




import HeaderAdmin from '../../components/adminPart/HeaderAdmin';
import Footer from '../../components/publicPart/Footer';




//import HeaderAdmin from '@/components/adminPart/HeaderAdmin';
//import Footer from '@/components/publicPart/Footer'; 
 

const AdminLayout = () => {
    return (
        <div className='AdminLayout'>
            
            <HeaderAdmin/>
            <Outlet/>
            <Footer/>

        </div>
    );
};

export default AdminLayout;

/*
@craco/craco
@craco/craco@7.1.0
@craco/craco@alpha
"starto": "craco start",
"start": "react-scripts start",
 */
