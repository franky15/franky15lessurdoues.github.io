import React from 'react'; //{ useEffect, useState, useRef}
import { classesServices } from '../../_services/Classes.services';

const DeleteClasses = ( { classes, lockwindowDeleteClasse, idclasse } ) => {

    console.log("*******bienvenu au deleteClasses component *****")

    console.log("idclasse est : " + idclasse)
    

    

    const deleteClasse = () => {

        console.log("****** bienvenu à la fonction deleteClasse de delete ******* ")

        const classe = classes.find( element => element.id = idclasse )
       
        console.log(" la classe de delete assynchrone ")
        console.log(classes)
        console.log(classe)

        classesServices.deleteClasse() //classe
            .then( res => {

                
                lockwindowDeleteClasse()
            } )
            .catch((error) => console.log(error))

    }

    return (
        <div className='deleteClasses'>

            <p className='deleteClasses__titleDelete'> Confirmez-vous vouloir supprimer la classe ?<span className='valeurClasse'> valeur {} </span> </p>
            
            <div className='deleteClasses__btn'>
                <button className='btn cancel' onClick={lockwindowDeleteClasse}> Non </button>
                <button className='btn valid' onClick={ deleteClasse  }> Oui </button>
            </div>
        </div>
    );
};

export default DeleteClasses;