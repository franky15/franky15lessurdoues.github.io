import React, {useState, useEffect} from 'react';
import { comptaChargesServices } from '../../../_services/ComptaCharges.services';

const ComptaAutreCharge = ({  openCreateOpen, idPersonnelCurrent, lockCreateOpen, listeChargesContext, listePersonnelContext, openAutreCharge, lockAutreCharge, autreCharge,
                            openSalaire, lockSalaire, lockElectricite, openElectricite
                        }) => {

    
                            //gestion du gros object pour un seul formulaire
    /////////////////////////
    let [ formCompta, setFormCompta ]  = useState({}) //{idPersonnel : idPersonnelCurrent.idPersonnel}
   
   
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



useEffect( () => {



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


}, [formCompta] )








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
                    <button className='btn  colorValid' onClick={ submit }> Valider</button>
                </div>
        }

    </div>
    );
};

export default ComptaAutreCharge ;