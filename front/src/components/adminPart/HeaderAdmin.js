import React from 'react';
import { Link } from "react-router-dom"
//import { useNavigate } from 'react-router-dom';
import { accountServices } from '../../_services/Account.services';

const HeaderAdmin = () => {

    //let navigate = useNavigate();

    const logout = () => {
        accountServices.logout()
        //navigate("/admin")
    }

    return (
        <div className='headerAdmin'>
            
            
            <div className='menuContainer1'>
                <p className='menuContainer1__acceuil'><Link to="/home" className='linkAcceuilAdmin'>CARRERA</Link></p>
                <div className='optionContainer1'>
                    <p className='optionContainer1__ajouteleve'><Link to="/eleve" className='linkAcceuilAdmin'>Ajout élève</Link></p>
                    <div className='optionContainer1__bar'></div>
                    <p className='optionContainer1__aide'><Link to="/aide" className='linkAcceuilAdmin'>Aide</Link></p>
                    <div className='optionContainer1__bar'></div>

                    <p className='optionContainer1__aide'><Link to="/home" className='linkAcceuilAdmin' onClick={logout}>Déconnexion</Link></p>
                </div>
                
            </div>

            <div className='headerAdminBar'></div>
            
            <div className='menuContainer2'>


                <div  className='menuContainer2__acceuil'>
                   
                    <p className='acceuilBtn'><Link to="/admin/classes" className='linkAdmin2'>Acceuil</Link></p>
                </div>

                <div className='menuContainer2__container'>

                    <div className='menuContainer2MiniContainer'>
                        <p className=''><Link to="" className='linkAdmin2'>Elèves</Link></p>
                        <div className='menuContainer2MiniContainer__bar'></div>
                    </div>
                    <div className='menuContainer2MiniContainer'>
                        <p className=''><Link to="" className='linkAdmin2'>Personnels</Link></p>
                        <div className='menuContainer2MiniContainer__bar'></div>
                    </div>
                    <div className='menuContainer2MiniContainer'>
                        <p className=''><Link to="" className='linkAdmin2'>Charges</Link></p>
                        <div className='menuContainer2MiniContainer__bar'></div>
                    </div>
                    <div className='menuContainer2MiniContainer'>
                        <p className=''><Link to="" className='linkAdmin2'>Entrés d'argent</Link></p>
                    </div>

                </div>
                
            </div>
        </div>
    );
};

export default HeaderAdmin;