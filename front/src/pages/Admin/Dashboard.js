import React, {  useRef,useState } from 'react';
import { useEffect } from 'react';

//import { classesServices } from '@/_services/Classes.services';
import { classesServices } from '../../_services/Classes.services';

import { useNavigate } from 'react-router-dom';

const Dashboard = ( ) => {

    let navigate = useNavigate()

    let [ classe, setClasse ] = useState([])

    const flag = useRef(false)

   useEffect( () => {

    if(flag.current === false){
        /////////////////////////////////////fonctionne sans le if on l'a juste ajouté pour éviter d'avoir deux usEffect
        classesServices.getAllClasses()
            .then( res => {

                setClasse(res.data)
            })
            .catch(err => console.log(err))

    }
    return () => flag.current = true
        
    }, [])

   

    const classeFrancophone =  classe.filter( element => element.section_id === 2)
    const classeAnglophone =  classe.filter( element => element.section_id === 1)

    ///////////////////////////////////////////////////////////////////
    const getElevesOneClasse = (idClasse) => {

        navigate(`/admin/eleves/getallclasseseleve/${idClasse}`)
        //navigate(`/admin/eleves/getallclasseseleve/${idClasse}`)

    }
    ///////////////////////////////////////////////////////////////////

    return (
        <div className='dashboardContainer'>

            <p className='dashboardContainer__utilisateur'> Bienvenue votre espace CARRERA</p>
            <div className='dashboardContainer__bar'></div>
            
            
            <div className='dashboardContainer__form'>                                                          

                <p className='iframeClassesContainer__title'>Liste des classes</p>
                <div className='GetAllClassesEleves__section' >
                    <p className='sectionTitre'>Section Anglophone</p>

                    <div className='contaiterClasse'>

                        {
                            classeAnglophone.map( (classe, index) => 
                            { 
                                const backgroundColor = index % 2 === 0 ? "#eaeaea" : "white" ;
                                
                            return <p className='GetAllClassesEleves__section--value'  key={`index-${classe.nom}`} style= {{ backgroundColor }} onClick={ () => getElevesOneClasse( classe.id ) } >{ classe.nom.toUpperCase() }</p> 
                            }
                                
                            )  
                        }
                        
                    </div>
                    

                </div>

                <div className='GetAllClassesEleves__separateur'></div>

                <div className='GetAllClassesEleves__section' >
                    <p className='sectionTitre'>Section Francophone</p>

                     <div className='contaiterClasse'>

                        {
                            classeFrancophone.map( (classe, index) => 
                            
                            { 
                                const backgroundColor = index % 2 === 0 ? "#eaeaea" : "white" ;
                            return <p className='GetAllClassesEleves__section--value' key={`index-${classe.nom}`} style= {{ backgroundColor }} onClick={ () => getElevesOneClasse( classe.id ) } >{ classe.nom.toUpperCase() }</p> 
                            }
                            
                            )  
                        }
                    </div>
                    
                    
                </div>  

                            
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

// <iframe src='/getalliframe'  border="solid red" height="300px" width="100%" title='iframe_test'  sandbox="allow-top-navigation allow-scripts allow-forms allow-same-origin"> </iframe>