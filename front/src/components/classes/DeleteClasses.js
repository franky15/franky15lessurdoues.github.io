import React from 'react'; //{ useEffect, useState, useRef}
import { classesServices } from '../../_services/Classes.services';

const DeleteClasses = ( { classes, lockwindowDeleteClasse, idclasse } ) => {

    console.log("*******bienvenu au deleteClasses component *****")

    const submit = (e) => {

        e.preventDefault()

        const classe = classes.find( element => element.id === parseInt(idclasse))
        classesServices.deleteClasse(classe)
            .then( res =>{


                lockwindowDeleteClasse()
            } )
            .catch((error) => console.log(error))

    }

    return (
        <div className='deleteClasses'>

            <p className='deleteClasses__titleDelete'> Confirmez-vous vouloir supprimer la classe <span className='valeurClasse'> valeur {} </span> </p>
            
            <div className='deleteClasses__btn'>
                <button className='btn cancel' onClick={lockwindowDeleteClasse}> Non </button>
                <button className='btn valid' onSubmit={ submit }> Oui </button>
            </div>
        </div>
    );
};

export default DeleteClasses;