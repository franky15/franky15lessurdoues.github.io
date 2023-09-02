import React,{useState} from 'react';

//import { elevesServices } from '@/_services/Eleves.services'; 
import { elevesServices } from '../../_services/Eleves.services';

import { useNavigate } from 'react-router-dom';

const DeleteEleve = ({ lockwindowDeleteClasse, openwindowDeleteClasse, listeElevesContext, eleveId }) => {
    
    let [ hidenUpdate, setHidenUpdate ] = useState(false)
    let [ classeUpdate1, setClasseUpdate1 ] = useState(true)

    

    let navigate = useNavigate()

    console.log("*******bienvenu au deleteEleve component *****")

    console.log("eleveId est : ")
    console.log( eleveId)

    console.log("listeElevesContext")
    console.log(listeElevesContext)
    

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

        const eleve = listeElevesContext.find( element => element.id = eleveId.idEleve)
       
        console.log(" la classe de delete assynchrone ")
        console.log(eleveId)
        console.log(eleve)

        elevesServices.deleteEleve (eleveId.idEleve) 
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

export default DeleteEleve;