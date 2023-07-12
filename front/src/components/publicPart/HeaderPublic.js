import React from 'react';
import { Link } from "react-router-dom"

const Header = () => {
    return (
        <div className='headerPublic'>
            
            
            <p className='acceuil'><Link to="/home" className='linkAcceuilPublic'>CARRERA</Link></p>
            <div className='optionContainer'>

                <div className='option'>
                    <div className='fa-solidContainer'><i className="fa-solid fa-question"></i></div>
                    <p><Link to="/question" className='linkHeaderPublic'>Une question ?</Link></p>
                    
                </div>

                <div className='option1'>
                    <div className='fa-solidContainer'>
                    <i className="fa-solid fa-user"></i>
                    </div>
                    <p><Link to="/service" className='linkHeaderPublic'>Créer un compte</Link></p>
                </div>

                <div className='option'>
                    <div className='fa-solidContainer'>
                        <i className="fa-solid fa-user"></i>
                    </div>
                    <p><Link to="/Auth/login" className='linkHeaderPublic'>Mon compte</Link></p>
                </div>

            </div>

        </div>
    );
};

export default Header;