import React, {  useRef,useState } from 'react';
//import { Link, useNavigate } from 'react-router-dom'; // useNavigate permet de parametrer un lien vers lequel on sera redirigé 
import { useEffect } from 'react';

//import { classesServices } from '@/_services/Classes.services';
import { classesServices } from '../../_services/Classes.services';



const GetClassesIframe = () => {

    

    let [ classe, setClasse ] = useState([])

    const flag = useRef(false) //permet d'éviter les doubles appel à l'api dû au useEffect qui fait des doubles appels
    
    //let navigate = useNavigate()

    ///************************************ sortie de l'iframe(retour sur le site normal)///////////////:
    //fonction de sortie de l'iframe, qui fonctionne avec l'attribut sendbox de <iframe>
    const redirectionClasse = (id) => {

        //navigate(`/admin/classes/getone/${id}`)
        if ('app' !== document.querySelector('body').getAttribute('id')) {
            window.top.location.href = `/admin/classes/getone/${id}`;  //insersion aussi de l'id dans le lien cible
             
            
         }

        //je met cette condition dans la fonction pour pouvoir l'exécuter
        //window.top.location.href permet de renvoyer à la fenêtre parent en gros l'iframe devient ce lien(on sort de l'iframe)
    }
    ////****************************************/////////////////////

    useEffect( () => {

        if(flag.current === false){
            /////////////////////////////////////fonctionne sans le if on l'a juste ajouté pour éviter d'avoir deux usEffect
            classesServices.getAllClasses()
                .then( res => {
                    console.log(res.data)
                    setClasse(res.data)
                })
                .catch(err => console.log(err))
        }
        return () => flag.current = true
            
    }, [])

     const classeFrancophone =  classe.filter( element => element.section_id === 2)
     const classeAnglophone =  classe.filter( element => element.section_id === 1)

    return (
        <div className='iframeClassesContainer'>
            
             <p className='iframeClassesContainer__title'>Liste des classes</p>

            <div className='sectionIframe'>
                <p className='sectionIframe__section'  >Section Francophone</p>
                
                
                <ul className='classes'>
                    {
                        classeFrancophone.map((element, index) => { 

                            const backgroundColor = index % 2 === 0 ? "#eaeaea" : "white" ;
                         return   <li className='classes__classe' key={index-`${element.nom}`}>
                            <a  style= {{ backgroundColor }} href={`/admin/eleves/getallclasseseleve/${element.id}`} className='linkClasse' onClick={ () => redirectionClasse(element.id) } >
                                    <span  >{ (element.nom).toUpperCase() }</span>
                                </a>
                            </li>
                        
                        } )
                    }
                </ul>
                
            </div>

            <div className='sectionIframe'>
                <p className='sectionIframe__section'> Section Anglophone</p>
                <ul className='classes'>
                    {
                        classeAnglophone.map((element, index) =>{ 

                            const backgroundColor = index % 2 === 0 ? "#eaeaea" : "white" ;
                         return   <li className='classes__classe' key={index-`${element.nom}`}>
                                    <a  style= {{ backgroundColor }} href={`/admin/eleves/getallclasseseleve/${element.id}`} className='linkClasse' onClick={ () => redirectionClasse(element.id) } >
                                            <span  >{ (element.nom).toUpperCase() }</span>
                                    </a>
                            </li>
                        
                        } )
                    }
                </ul>
                
            </div>
        </div>
    );
};

export default GetClassesIframe;

//gestion de l'iframe pour en sortir on est rediriger vers le lien  http://localhost:3001/ sans oublier le sendbox du parent de l'iframe
    /*useEffect(() => {
        if ('app' !== document.querySelector('body').getAttribute('id')) {
          window.top.location.href = 'http://localhost:3001/';
        }
      }, []);

    */

    //onClick={ () => redirectionIframe(element.id) }

    /*
<p   className='linkClasse'  >
<span onClick={ () => redirectionClasse(element.id) } >{ (element.nom).toUpperCase() }</span>
</p>
    */