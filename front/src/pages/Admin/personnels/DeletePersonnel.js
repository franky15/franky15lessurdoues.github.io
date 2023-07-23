import React,{useState} from 'react';

import { personnelServices } from '../../../_services/Personnels.services';
import { useNavigate } from 'react-router-dom';

const DeletePersonnel = ({ lockwindowDeleteClasse, openwindowDeleteClasse, listeElevesContext, eleveId, listePersonnelContext,  personnelId }) => {
    
   
    let idPersonnel = personnelId.idPersonnel;
    console.log("*** idPersonnel")
    console.log(idPersonnel)
   

    let [ hidenUpdate, setHidenUpdate ] = useState(false)
    let [ classeUpdate1, setClasseUpdate1 ] = useState(true)

    
    let navigate = useNavigate()

    console.log("*******bienvenu au delePersonnel component *****")

    console.log("listePersonnelContext")
    console.log(listePersonnelContext)
    
    

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

    const deleteEleveClasse = () => {

        console.log("****** bienvenu à la fonction deleteEleve de delete ******* ")

        const personnel = listePersonnelContext.find( element => element.id =  idPersonnel )
       
        console.log(" la classe de delete assynchrone ")
        console.log(personnel.id)
        console.log(personnel)

        personnelServices.deletePersonnel(idPersonnel) //eleveId.idEleve
            .then( res => {

                confirmation1()
            
            } )
            .catch((error) => console.log(error))

    }
    
    return (
        <div className='deleteEleve'>
             
    
                { hidenUpdate && <p className='titreTiming'>L'élève a été suprimée avec succès</p> }
            { classeUpdate1 && <div className='deleteClasses'>

                <p className='deleteClasses__titleDelete'> Confirmez-vous vouloir supprimer cette élève ?<span className='valeurClasse'> valeur {} </span> </p>
                
                <div className='deleteClasses__btn'>
                    <button className='btn cancel' onClick={ lockwindowDeleteClasse }> Non </button>
                    <button className='btn valid' onClick={ deleteEleveClasse }> Oui </button>
                </div>
            </div>}

   
        </div>
    );
};

export default DeletePersonnel;