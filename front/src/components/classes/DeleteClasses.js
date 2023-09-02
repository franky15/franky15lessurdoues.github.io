import React,{useState} from 'react'; //{ useEffect, useState, useRef}
//import { classesServices } from '@/_services/Classes.services';
import { classesServices } from '../../_services/Classes.services';
import { useNavigate } from 'react-router-dom';

const DeleteClasses = ( { classes, lockwindowDeleteClasse, idclasse } ) => {

    let [ hidenUpdate, setHidenUpdate ] = useState(false)
    let [ classeUpdate1, setClasseUpdate1 ] = useState(true)

    let navigate = useNavigate()

    console.log("*******bienvenu au deleteClasses component *****")

    console.log("idclasse est : " + idclasse)
    

    //confirmation de la mise à jour
   let confirmation1 = () => {

        setHidenUpdate(true)
        setClasseUpdate1(false)
        
        //cacher la confirmation après 3000 millisecondes
        setTimeout( () => {

            
            setClasseUpdate1(false)
            setHidenUpdate(false)
            
            window.location.reload();
            
        }, 3000)
   
   

    }

    const deleteClasse = () => {

        console.log("****** bienvenu à la fonction deleteClasse de delete ******* ")

        const classe = classes.find( element => element.id = idclasse )
       
        console.log(" la classe de delete assynchrone ")
        console.log(classes)
        console.log(classe)

        classesServices.deleteClasse(idclasse) 
            .then( res => {

                confirmation1()
            
            } )
            .catch((error) => console.log(error))

    }

    return (
        <>
    
         { hidenUpdate && <p className='titreTiming'>La classe a été suprimée avec succès</p> }
        { classeUpdate1 && <div className='deleteClasses'>

            <p className='deleteClasses__titleDelete'> Confirmez-vous vouloir supprimer la classe ?<span className='valeurClasse'> valeur {} </span> </p>
            
            <div className='deleteClasses__btn'>
                <button className='btn cancel' onClick={lockwindowDeleteClasse}> Non </button>
                <button className='btn valid' onClick={ deleteClasse  }> Oui </button>
            </div>
        </div>}

        </>
    );
};

export default DeleteClasses;