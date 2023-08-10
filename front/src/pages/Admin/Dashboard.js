import React, {  useRef,useState, useContext } from 'react';
//import { Link, useNavigate } from 'react-router-dom'; // useNavigate permet de parametrer un lien vers lequel on sera redirigé 
import { useEffect } from 'react';
import { classesServices } from '@/_services/Classes.services';
import { useNavigate } from 'react-router-dom';
import { GetAllClassesEleves } from '../../components/eleves';
import { AddEleveContext } from '../../_utils/ContextAddEleve';



const Dashboard = ( ) => {

    let  { listeElevesContext, listeClassesContext , listePositionPageContext}  = useContext(AddEleveContext)
    let openpositionAcceuilContext = listePositionPageContext[0].openpositionAcceuilContext()
    
    console.log("**** openpositionAcceuilContext  dans getallpersonnels")
    console.log(openpositionAcceuilContext)
    console.log("*** Bienvenue dans le dashboard ***")

    let navigate = useNavigate()

    let [ classe, setClasse ] = useState([])

    const flag = useRef(false)

    //const contextValue = useContext(myContext);
   // console.log("context value" + contextValue)

   useEffect( () => {

    if(flag.current === false){
        /////////////////////////////////////fonctionne sans le if on l'a juste ajouté pour éviter d'avoir deux usEffect
        classesServices.getAllClasses()
            .then( res => {

                console.log(res.data)//////

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

        console.log("idClasse est : " + idClasse)
        
        navigate(`/admin/eleves/getallclasseseleve/${idClasse}`)
        //navigate(`/admin/eleves/getallclasseseleve/${idClasse}`)

    }
    ///////////////////////////////////////////////////////////////////

    return (
        <div className='dashboardContainer'>

            
            
            <p className='dashboardContainer__utilisateur'> Utilisateur connecté : a rentrer plustard lors que je ferai les utilisateurs{ }</p>
            <div className='dashboardContainer__bar'></div>
            
            
            <div className='dashboardContainer__form'>                                                          

                <p className='iframeClassesContainer__title'>Liste des classes</p>
                <div className='GetAllClassesEleves__section' >
                    <p className='sectionTitre'>Section Anglophone</p>
                    {
                        classeAnglophone.map( (classe, index) => 
                        { 
                            const backgroundColor = index % 2 === 0 ? "#eaeaea" : "white" ;
                            
                        return <p className='GetAllClassesEleves__section--value'  key={`index-${classe.nom}`} style= {{ backgroundColor }} onClick={ () => getElevesOneClasse( classe.id ) } >{ classe.nom.toUpperCase() }</p> 
                        }
                            
                        )  
                    }

                </div>

                <div className='GetAllClassesEleves__separateur'></div>

                <div className='GetAllClassesEleves__section' >
                    <p className='sectionTitre'>Section Francophone</p>
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