import React, {useState, useEffect} from 'react';
import { comptaChargesServices } from '../../../_services/ComptaCharges.services';

const ComptaAutreCharge = ({  openCreateOpen, idPersonnelCurrent, lockCreateOpen, listeChargesContext, listePersonnelContext, openAutreCharge, lockAutreCharge, autreCharge,
                            openSalaire, lockSalaire, lockElectricite, openElectricite
                        }) => {

    
                            //gestion du gros object pour un seul formulaire
    /////////////////////////
    let [ formCompta, setFormCompta ]  = useState({}) //{idPersonnel : idPersonnelCurrent.idPersonnel}
   
    let [ alerteForm, setalerteForm ] = useState(false)
   
    const comptaFunction = (e) => {

        console.log("bienvenue dans comptaFunction ")

        
        openAutreCharge()

        lockElectricite()
        lockSalaire()


        setFormCompta ({
    
            ...formCompta,
            [e.target.name] : e.target.value
        
        }) 

        console.log("{[e.target.name] : e.target.value}")
        console.log({[e.target.name] : e.target.value})

        console.log("****formCompta")
        console.log(formCompta)
      

    

    }

console.log("****** formCompta autre charge")
console.log(formCompta)
console.log(formCompta.categorie)

let { categorie, datePaiement, montantPaye, libelle, commentaire } = formCompta

const nomClasse1 = document.querySelector(".categorie")
const nomClasse2 = document.querySelector(".datePaiement")
const nomClasse3 = document.querySelector(".montantPaye")
const nomClasse4 = document.querySelector(".libelle")
const nomClasse5 = document.querySelector(".commentaire")




   console.log("******** nomClasse1")
   console.log(nomClasse1)


useEffect( () => {

    if(categorie || datePaiement || montantPaye || libelle|| commentaire ){

        setalerteForm(false)
    }

    const comptaFunction  = () => {


        const categorieSalaire = () => {

                if(formCompta.categorie === "salaire" ){
        
                    console.log("/////bienvenue au if  salaire")
                    
                    lockElectricite()
                    lockAutreCharge()

                    openSalaire()
        
                    
                }
                
        }
        categorieSalaire()
    
    
        const categorieElectricite = () => {  //categorieAutreCharge 
    
            if(formCompta.categorie === "electricite" ){
    
                console.log("/////bienvenue au if  electricite")
    
                openElectricite()

                lockAutreCharge()
                lockSalaire()
    
              
            }
    
           
            
        }
        categorieElectricite()

    }
   
    comptaFunction()


}, [formCompta,categorie ,datePaiement, montantPaye, libelle, commentaire , lockAutreCharge, lockElectricite, lockSalaire, openElectricite, openSalaire ] )


//gestion des alerte à l'origine
const alerteInitiale = () => {

    /*
    if( categorie  ){
 
     nomClasse1.style.border = "solid 1px black "
     
     //nomClasse1.style.display = "none"
 
    }*/
    
    if( datePaiement ){
 
     nomClasse2.style.border = "solid  0px black"
     //nomClasse2.style.display = "none"
 
    }
    
    if(montantPaye){
 
     nomClasse3.style.border = "solid  1px black"
     //nomClasse3.style.display = "none"
 
    }
    
    if(libelle ){
 
     nomClasse4.style.border = "solid 1px black"
     //nomClasse4.style.display = "none"
 
    }
    
    if(commentaire  ){
 
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




 ///////////////////////////////////////////////////////////

    console.log("****** formCompta autre charge")
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

   let [ autrechargecategorie, setautrechargecategorie ] = useState(true)

   const annuler = () => {

    lockCreateOpen()
    lockAutreCharge()
    lockElectricite()
    }


   const submit = (e) => {

       
       e.preventDefault()

       console.log("bienvenue au submit test de createOneEntree")
                                                                   //valTextarea

         if( !categorie || !datePaiement || !montantPaye || !libelle || !commentaire ){
    
            console.log("*** Tous les champs avec étoiles ou en rouge doivent être remplis *** ")
        
            setalerteForm(true)

            
           // }else{

           /* 
            if( !categorie   ){

                    console.log("bienvenue dans la condition nom")

                    setalerteForm(true)

        
                    const nomClasse = document.querySelector(".categorie")
                    nomClasse.style.border = "solid 1px red"

            } 
            */
            
            /*else*/ if( !datePaiement){

                    console.log("bienvenue dans la condition anciennete")

                    setalerteForm(true)
        
                    const nomClasse = document.querySelector(".datePaiement")
                    nomClasse.style.border = "solid 1px red"

            }

            /*else*/ if( !parseInt(montantPaye) || regexScolarite.test( parseInt(montantPaye)) === false  ){

                    console.log("bienvenue dans la condition nom")

                    setalerteForm(true)

                    console.log( regexScolarite.test( montantPaye )  )
        
                    const nomClasse = document.querySelector(".montantPaye")
                    
                    nomClasse.style.border = "solid 1px red"

            }  
            
            /*else*/ if( !libelle || regexNomPrenom.test( libelle ) === false  ){

                    console.log("bienvenue dans la condition nom")

                    setalerteForm(true)

                    const nomClasse = document.querySelector(".libelle")
                    nomClasse.style.border = "solid 1px red"

            } 

           /*else*/ if( !libelle || regexCommentaire.test( libelle ) === false ){

                    console.log("bienvenue dans la condition sectionNumber")

                    setalerteForm(true)
        
                    const nomClasse = document.querySelector(".libelle")
                    nomClasse.style.border = "solid 1px red"

            }  

            if(!commentaire || regexCommentaire.test( commentaire ) === false ){

                console.log("bienvenue dans la condition sectionNumber")

                setalerteForm(true)
    
                const nomClasse = document.querySelector(".commentaire")
                nomClasse.style.border = "solid 1px red"

        }  
            
           
            
        } else{

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

            </form>

            <form className='nomCommentaire'>

            
            
                
                {
                    
                    <div className='nomCommentaire__container'>
                        <label for="libelle" className='label'> Libellé autres charge<span className='etoile'>*</span></label>
                        <input type='text' name='libelle' id='libelle' className='libelle item' value={ formCompta.libelle }  onChange={ comptaFunction }  maxLength={200} />
                    </div>
                
                }


            { 
            

                <> 
                    <div className='nomCommentaire__container'>
                            <label for="commentaire" className='label'>Commentaire<span className='etoile'></span></label>
                            <input type='textarea' name='commentaire' id='commentaire' className='commentaire item' value={ formCompta.commentaire}  onChange={ comptaFunction }  maxLength={200} />
                    </div>

                </>
            }


            

        </form>

       
            {    autrechargecategorie &&

                <div className='formulaireConfirm__btn'>
                    < button className='btn  colorCancel' onClick={ annuler } > Annuler</button>
                    <button  type='submit' className='btn  colorValid' onClick={ submit }> Valider</button>
                </div>
        }

    </div>
    );
};

export default ComptaAutreCharge ;