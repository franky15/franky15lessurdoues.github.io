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



let [ alerteForm, setalerteForm ] = useState(false)

let { categorie, datePaiement, montantPaye, poste, commentaire, nomPrenom } = formCompta

const nomClasse1 = document.querySelector(".categorie")
const nomClasse2 = document.querySelector(".datePaiement")
const nomClasse3 = document.querySelector(".montantPaye")
const nomClasse4 = document.querySelector(".poste")
const nomClasse5 = document.querySelector(".commentaire")
const nomClasse6 = document.querySelector(".nomPrenom")

   //gestion des alerte à l'origine
const alerteInitiale = () => {

    if( datePaiement ){
 
     nomClasse2.style.border = "solid  0px black"
     //nomClasse2.style.display = "none"
 
    }
    
    if(montantPaye){
 
     nomClasse3.style.border = "solid  1px black"
     //nomClasse3.style.display = "none"
 
    }
    
    if(poste ){
 
     nomClasse4.style.border = "solid 1px black"
     //nomClasse4.style.display = "none"
 
    }
    
    if(commentaire  ){
 
     nomClasse5.style.border = "solid 1px black"
     //nomClasse5.style.display = "none"
 
    }

    if(nomPrenom  ){
 
        nomClasse5.style.border = "solid 1px black"
        //nomClasse5.style.display = "none"
    
       }
    
 
    }
 
    alerteInitiale()
 
   // gestion des expressions régulières 
   let regexNomPrenom = new RegExp("^[a-zA-Z]{2,}$")

   let regexScolarite = new RegExp("^[0-9]{1,6}$")

   let reagexTel = new RegExp("^[0-9]{1,20}$")

   let regexCommentaire = new RegExp("^[a-zA-Z ]{5,}$")

   let regexEmail = new RegExp("[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+")



   const submit = (e) => {

       
    e.preventDefault()

    console.log("bienvenue au submit test de createOneEntree")
                                                                //valTextarea

    if( !categorie || !datePaiement || !montantPaye || !poste || !commentaire ){
 
        
        setalerteForm(true)

        if( !datePaiement){

            setalerteForm(true)

            const nomClasse = document.querySelector(".datePaiement")
            nomClasse.style.border = "solid 1px red"

        }

        if( !parseInt(montantPaye) || regexScolarite.test( parseInt(montantPaye)) === false  ){

            setalerteForm(true)

            const nomClasse = document.querySelector(".montantPaye")
            
            nomClasse.style.border = "solid 1px red"

        }  
         
        if( !poste || regexNomPrenom.test( poste ) === false  ){

            setalerteForm(true)

            const nomClasse = document.querySelector(".poste")
            nomClasse.style.border = "solid 1px red"

        } 

        if( !commentaire  || regexCommentaire.test( commentaire  ) === false ){

            setalerteForm(true)

            const nomClasse = document.querySelector(".commentaire ")
            nomClasse.style.border = "solid 1px red"

        }  

        if(!nomPrenom || regexCommentaire.test( nomPrenom ) === false ){

            setalerteForm(true)

            const nomClasse = document.querySelector(".nomPrenom")
            nomClasse.style.border = "solid 1px red"

        }  
         
        
         
    } else{

         comptaChargesServices.createComptacharges(formCompta)
         .then( res => {
            
            confirmationPaiementCreate()
 
         })
         .catch( err => console.log(err))

    }
   
    
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