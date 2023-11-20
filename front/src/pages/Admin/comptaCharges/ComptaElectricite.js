import React, { useState , useEffect} from 'react';
import { comptaChargesServices } from '../../../_services/ComptaCharges.services';

const ComptaElectricite = ( {openCreateOpen, idPersonnelCurrent, lockCreateOpen, listeChargesContext, listePersonnelContext, lockElectricite, openElectricite, electriciteMois,
                                openSalaire, lockSalaire, openAutreCharge,lockAutreCharge

                            }) => {

    //gestion du gros object pour un seul formulaire
    /////////////////////////
    let [ formCompta, setFormCompta ]  = useState({}) //{idPersonnel : idPersonnelCurrent.idPersonnel}


    const comptaFunction = (e) => {

       openElectricite()
       lockAutreCharge()
       lockSalaire()


       setFormCompta ({
    
           ...formCompta,
           [e.target.name] : e.target.value
        
       }) 

    }
  
let [ alerteForm, setalerteForm ] = useState(false)

let {  categorie, datePaiement, montantPaye, electriciteMois1 } = formCompta

const nomClasse1 = document.querySelector(".categorie")
const nomClasse2 = document.querySelector(".datePaiement")
const nomClasse3 = document.querySelector(".montantPaye")
const nomClasse4 = document.querySelector(".quelMois")

   
useEffect( () => {

    const comptaFunction  = () => {

        if( datePaiement || montantPaye || formCompta.electriciteMois ){

            setalerteForm(false)
        }

        const categorieSalaire = () => {

            if(formCompta.categorie === "salaire" ){
    
                lockElectricite()
                lockAutreCharge()

                openSalaire()
    
            }
            
        }
        categorieSalaire()
    
    
        const categorieAutrecharge = () => {  //categorieAutreCharge 
    
            if(formCompta.categorie === "autreCharge" ){
    
                openAutreCharge()
    
                lockElectricite()
                lockSalaire()
    
                
            }
    
        }
        categorieAutrecharge()

    }
      
    comptaFunction()


   }, [formCompta, datePaiement, montantPaye, formCompta.electriciteMois, lockAutreCharge, lockElectricite, lockSalaire, openAutreCharge, openSalaire] )

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

   //gestion du state de l'électricité
   let [ electricitecategorie, setelectricitecategorie ] = useState(true)

   const annuler = () => {

    lockCreateOpen()
    lockAutreCharge()
    lockElectricite()
}


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
    
    if(formCompta.electriciteMois ){
 
     nomClasse4.style.border = "solid 1px black"
     //nomClasse4.style.display = "none"
 
    }
    

}
 
alerteInitiale()

// gestion des expressions régulières 
let regexNomPrenom = new RegExp("^[a-zA-Z]{2,}$")

let regexScolarite = new RegExp("^[0-9]{1,6}$")

const submit = (e) => {

       
    e.preventDefault()

    if( !datePaiement || !montantPaye || !formCompta.electriciteMois ){
 
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
         
        if( !formCompta.electriciteMois || regexNomPrenom.test( formCompta.electriciteMois) === false  ){

            setalerteForm(true)

            const nomClasse = document.querySelector(".quelMois")
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
                
                <>
                
                    <div className='createonentree__container--item createoneCharge__container--item' >
                        <label for="electriciteMois" className='label'>Pour quel mois ? <span className='etoile'>*</span></label>
                        <input type='text' name='electriciteMois' id='electriciteMois' className='electriciteMois item quelMois' value={ formCompta.electriciteMois }  onChange={ comptaFunction }  maxLength={200} />
                    </div>

                </>
                
            }

          

        </form>

       
       {    electricitecategorie &&

                    <div className='formulaireConfirm__btn'>
                        < button className='btn  colorCancel' onClick={ annuler } > Annuler</button>
                        <button  type='submit' className='btn  colorValid' onClick={ submit }> Valider</button>
                    </div>
        }
   
    </div>
    );
};

export default ComptaElectricite;