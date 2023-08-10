import React, { useState , useEffect} from 'react';
import { comptaServices } from '../../../_services/Compta.Services';

const CreateOneEntree = ({ openCreateOpen, idEleveCurrent, lockCreateOpen }) => {

    let idEleve = idEleveCurrent
    console.log( "**** idEleve  de CreateOneEntree ")
    console.log(idEleve)

   

    let table = [ ]


    //gestion du gros object pour un seul formulaire
    /////////////////////////
    let [ formCompta, setFormCompta ]  = useState({idEleve : idEleveCurrent.idEleve})

    const comptaFunction = (e) => {

        setFormCompta ({

            ...formCompta,      ///// attention insérer idpaiement////////
            [e.target.name] : e.target.value

        }) 


    }

    console.log("***formCompta")
    console.log(formCompta)

    let object


    let [ eleveCreate, setEleveCreate ] = useState(false) //false
     //confirmation de la mise à jour
     let confirmationPaiementCreate = () => {
     
        
        setEleveCreate(true)
       // setHidenEleveCreate(false)
       
    
        //cacher la confirmation après 3000 millisecondes
        setTimeout( () => {
    
            
            setEleveCreate(false)
            window.location.reload();
            
        }, 1)
    }
    const submit = () => {

        
        //e.preventDefault()

        console.log("bienvenue au submit test de createOneEntree")
                                                                    //valTextarea
        comptaServices.createCompta(formCompta)
            .then( res => {
                console.log("données du formulaire envoyées")
                console.log(res)
                //navigate("/admin/classes" ) 
               ////////////////////////////

               confirmationPaiementCreate()

               ////////////////////////////
            })
            .catch( err => console.log(err))
        
    }

    console.log("**** formCompta")
    console.log(formCompta)


    /////////////////////////////////

    //formatage de la date
    


    //////////////////////////////////

    return (
        <div className='createonentree'>
           
            <form className='createonentree__container'>

                <form className='createonentree__container--item' onChange={ comptaFunction }>

                    <label for="typePaiement"  className='label'> Type de paiement<span className='etoile'>*</span></label>
                    <select name="typePaiement" id='typePaiement' className='typePaiement item' >

                        <option value="vide" > </option>
                        <option value="scolarite" >Scolarité</option>
                        <option  value="tenueClasse" >Tenues de Classe </option >
                        <option  value="transport"  >Transport </option >
                        <option  value="cantine"  >Cantine </option >
                        

                    </select>

                </form>

                <div className='createonentree__container--item'>
                    <label for="datePaiement" className='label'> Date de paiement <span className='etoile'>*</span></label>
                    <input type='date' name='datePaiement' id='datePaiement' className='datePaiement item' value={ formCompta.datePaiement }  onChange={ comptaFunction }  maxLength={200} />
                </div>

                <div className='createonentree__container--item' >
                    <label for="montantPaye" className='label'>Montant payé <span className='etoile'>*</span></label>
                    <input type='montantPaye' name='montantPaye' id='montantPaye' className='montantPaye item' value={ formCompta.montantPaye  }  onChange={ comptaFunction }  maxLength={200} />
                </div>

            </form>

            <div className='formulaireConfirm__btn'>
                < button className='btn  colorCancel' onClick={ lockCreateOpen } > Annuler</button>
                <button className='btn  colorValid' onClick={ submit }> Valider</button>
            </div>
                
         
        </div>
    );
};

export default CreateOneEntree;

//new Date(formCompta.datePaiement).toLocaleDateString("fr") 