import React, {useState} from 'react';
import { comptaChargesServices } from '../../../_services/ComptaCharges.services';

const ComptaSalaire = ( {  openCreateOpen, idPersonnelCurrent, lockCreateOpen, listeChargesContext, listePersonnelContext,
                            lockElectricite, openElectricite, electriciteMois,
                            openAutreCharge, lockAutreCharge, autreCharge,
                            openSalaire, lockSalaire
            } ) => {


    //////////////////////////////

   let [ formComptaCategorie, setformComptaCategorie ]  = useState({idPersonnel : idPersonnelCurrent.idPersonnel}) 
   
   const categorieFunction = (e) => {

        if(formComptaCategorie.categorie === "electricite" ){

            lockSalaire()
            lockAutreCharge()

            openElectricite()
            
            setformComptaCategorie ({

                ...formComptaCategorie,
                [e.target.name] : e.target.value
            })

        }else if(formComptaCategorie.categorie === "autreCharge" ){

            lockSalaire()
            lockElectricite()

            openAutreCharge()

            setformComptaCategorie({

                ...formComptaCategorie,
                [e.target.name] : e.target.value
            })

        }
    
    }

    ///////////////////////////////:

    //gestion du gros object pour un seul formulaire
    /////////////////////////
    let [ formCompta, setFormCompta ]  = useState({idPersonnel : idPersonnelCurrent.idPersonnel}) 

    const comptaFunction = (e) => {


        setFormCompta ({
     
            ...formCompta,      ///// attention insérer idpaiement////////
            [e.target.name] : e.target.value
         
        }) 
 
 
    }

    console.log("****** formCompta salaire")
    console.log(formCompta)

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
       comptaChargesServices.createComptacharges(formCompta)
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

   
    return (

    <div>
            

        <form className='createonentree__container  createoneCharge__container'>

            <form className='createonentree__container--item  createoneCharge__container--item ' onChange={ comptaFunction }>

                <label for="categorie"  className='label'> Catégorie<span className='etoile'>*</span></label>
                <select name="categorie" id='typePaiement' className='typePaiement item' >

                    <option value="vide" > </option>
                    <option value="salaire" >Salaire</option>
                    <option  value="electricite" >Electricité</option >
                    <option  value="autreCharge"  >Autres charge </option >
                    
                    

                </select>

            </form>


            <div className='createonentree__container--item createoneCharge__container--item'>
                <label for="datePaiement" className='label'> Date de paiement <span className='etoile'>*</span></label>
                <input type='date' name='datePaiement' id='datePaiement' className='datePaiement item' value={ formCompta.datePaiement }  onChange={ comptaFunction }  maxLength={200} />
            </div>

            <div className='createonentree__container--item createoneCharge__container--item' >
                <label for="montantPaye" className='label'>Montant payé <span className='etoile'>*</span></label>
                <input type='text' name='montantPaye' id='montantPaye' className='montantPaye item' value={ formCompta.montantPaye  }  onChange={ comptaFunction }  maxLength={200} />
            </div>


            { 
                
                
                    <form className='createonentree__container--item  createoneCharge__container--item' onChange={ comptaFunction }>

                        <label for="poste"  className='label'> Poste<span className='etoile'>*</span></label>
                        <select name="poste" id='poste' className='poste item' >

                            <option value="vide" > </option>
                            <option value="fondateur" >Fondateur(s)</option>
                            <option  value="administration" >Administration</option >
                            <option  value="enseignant"  >Enseignant(s) </option >
                            <option  value="autrePersonnel"  >Autres personnel </option >
                            
                            
                        </select>

                     </form>

            }

        </form>

        <form className='nomCommentaire'>

            
            { 
            
          

                <> 
                    <div className='nomCommentaire__container'>
                            <label for="commentaire" className='label'>Commentaire<span className='etoile'></span></label>
                            <input type='textarea' name='commentaire' id='commentaire' className='commentaire item' value={ formCompta.commentaire}  onChange={ comptaFunction }  maxLength={200} />
                    </div>

                </>
            }


            {
              
                
                <>
                    <div className='nomCommentaire__container'>
                        <label for="nomPrenom" className='label'> Nom et prénom<span className='etoile'>*</span></label>
                        <input type='text' name='nomPrenom' id='nomPrenom' className='nomPrenom item' value={ formCompta.nomPrenom}  onChange={ comptaFunction }  maxLength={200} />
                    </div>

                </>
            }

        </form>

    </div>

    );
};

export default ComptaSalaire;