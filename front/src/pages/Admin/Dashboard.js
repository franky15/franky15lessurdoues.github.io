import React from 'react';
//import { useEffect,useState } from 'react';
//import { classesServices } from '@/_services/Classes.services';


const Dashboard = () => {

    //const [ utilisateur, setUtilisateur ] = useState([])

    /*useEffect( () => {

        classesServices.get
    })*/
   

    return (
        <div className='dashboardContainer'>

            
            
            <p className='dashboardContainer__utilisateur'> Utilisateur connecté : a rentrer plustard lors que je ferai les utilisateurs{ }</p>
            <div className='dashboardContainer__bar'></div>
            
            
            <div className='dashboardContainer__form'>                                                          

                <iframe src='/getalliframe'  border="solid red" height="300px" width="100%" title='iframe_test'  sandbox="allow-top-navigation allow-scripts allow-forms allow-same-origin"> </iframe>
                            
            </div>

            <div className='dashboardContainer__gestion' >
                <a href='/admin/classes/getall' className='dashboardContainer__gestion--titel' title='cliquer ici pour accéder à l’écran de gestion des classes'>
                    Gestion des classes
                </a>
               
                
            </div>
        </div>
    );
};

export default Dashboard;
