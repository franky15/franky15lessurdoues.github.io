import React, { useState , useEffect} from 'react';
import { comptaChargesServices } from '../../../_services/ComptaCharges.services';
import ComptaSalaire from './ComptaSalaire';
import ComptaAutreCharge from './comptaAutreCharge';
import ComptaElectricite from './ComptaElectricite';




const CreateOneComptaCharge = ({ openCreateOpen, idPersonnelCurrent, lockCreateOpen, listeChargesContext, listePersonnelContext, valeurInputDate }) => {

    let idPersonnel = idPersonnelCurrent
    console.log( "**** idPersonnel de CreateOneEntree ")
    console.log(idPersonnel)

   
    //gestion du gros object pour un seul formulaire
    /////////////////////////
    let [ formCompta, setFormCompta ]  = useState({}) //{idPersonnel : idPersonnelCurrent.idPersonnel}

   
     //gestion du state du salaire
     let [ salairecategorie, setsalairecategorie ] = useState(true)

     const openSalaire = () => setsalairecategorie(true) 
     const lockSalaire = () => setsalairecategorie(false) 

    
    /////////////////////////////////

     //gestion d'autres charges
     let [ formComptaAutreCharge, setformComptaAutreCharge ]  = useState({}) 

     let [ autrechargecategorie, setautrechargecategorie ] = useState(false)
 
     const openAutreCharge = () => setautrechargecategorie(true) 
     const lockAutreCharge = () => setautrechargecategorie(false) 
     

   //gestion de l'électricité
   let [ formComptaElectricite, setformComptaElectricite ]  = useState({}) //idPersonnel : idPersonnelCurrent.idPersonnel

    //gestion du state de l'électricité
    let [ electricitecategorie, setelectricitecategorie ] = useState(false)

    const openElectricite = () => setelectricitecategorie (true) 
    const lockElectricite = () => setelectricitecategorie (false) 

    const comptaFunction = (e) => {

        console.log("bienvenue dans comptaFunction ")

        
      
        lockAutreCharge()
        lockElectricite()
        openSalaire()


        setFormCompta ({
     
            ...formCompta,
            [e.target.name] : e.target.value
         
        }) 

        console.log("{[e.target.name] : e.target.value}")
        console.log({[e.target.name] : e.target.value})

        console.log("****formCompta")
        console.log(formCompta)
       //////////////////////////////////:

      

    }
    console.log("****** formCompta autre charge")
    console.log(formCompta)
    console.log(formCompta.categorie)

    
    
   useEffect( () => {



        const comptaFunction  = () => {


            const categorieElectricite = () => {

                if(formCompta.categorie === "electricite" ){
        
                    console.log("/////bienvenue au if  electricite")
                    openElectricite()
        
                    lockAutreCharge()
                    lockSalaire()
        
                    /*
                    setFormCompta({
        
                        ...formCompta,
                        [e.target.name] : e.target.value
                    })
                    
                   */
        
                }
                
                }
                categorieElectricite()
        
        
                const categorieAutrecharge = () => {  //categorieAutreCharge 
        
                if(formCompta.categorie === "autreCharge" ){
        
                    console.log("/////bienvenue au if  autreCharge")
        
                    openAutreCharge()
        
                    lockElectricite()
                    lockSalaire()
        
                    /*
                    setformComptaAutreCharge({
        
                        ...formComptaAutreCharge
                        [e.target.name] : e.target.value
                    })
                    */

                    ////////////////////////////////
                    




                    ///////////////////////////////
                    
        
                }
        
               
                
            }
            categorieAutrecharge()

        }
       
        comptaFunction()


    }, [formCompta] )


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
        <div className='createonentree'>
           
            {

                salairecategorie &&
                <>
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

                 </>
            
            }



       
            {
                autrechargecategorie  &&
                    <ComptaAutreCharge  openAutreCharge = {  openAutreCharge } lockAutreCharge = { lockAutreCharge } autreCharge = {formCompta.autreCharge}  openSalaire = {openSalaire } lockSalaire={lockSalaire}  openElectricite={openElectricite} lockElectricite={lockElectricite}/>
            
            }

            {
                 electricitecategorie &&
                    <ComptaElectricite  lockElectricite = { lockElectricite } openElectricite = { openElectricite } electricite = {formCompta.electricite} openSalaire = {openSalaire } lockSalaire={lockSalaire} openAutreCharge={openAutreCharge }   lockAutreCharge={lockAutreCharge }  electricitecategorie ={electricitecategorie} />
            
            }
           

           {    salairecategorie &&

                    <div className='formulaireConfirm__btn'>
                        < button className='btn  colorCancel' onClick={ annuler } > Annuler</button>
                        <button className='btn  colorValid' onClick={ submit }> Valider</button>
                    </div>
            }
                
         
        </div>
    );
};

export default CreateOneComptaCharge;

//new Date(formCompta.datePaiement).toLocaleDateString("fr") 


/*

{
    salairecategorie &&
        <ComptaSalaire  openSalaire  = {openSalaire }  lockSalaire = {lockSalaire} idPersonnelCurrent = { idPersonnelCurrent } 
                        openAutreCharge = {  openAutreCharge } lockAutreCharge = { lockAutreCharge } autreCharge = {formComptaCategorie.autreCharge}
                        lockElectricite = { lockElectricite } openElectricite = { openElectricite } electriciteMois = {formComptaCategorie.electricite}
                />

}

*/


/*

 //gestion du state de autres charge
    let [ autreCharge, setautreCharge ]  = useState({
            
            idPersonnel : idPersonnelCurrent.idPersonnel,
            
            autreCharge : "autreCharge",
            datePaiement : "",
            montantPaye : "",
            libelle : "",
            commentaire : ""
            
        }) 

*/

/*

 <div className='createonentree'>
           
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
                    electricite.categorie === electricitereVal && 
                    <>
                    
                        <div className='createonentree__container--item createoneCharge__container--item' >
                            <label for="electriciteMois" className='label'>Pour quel mois ? <span className='etoile'>*</span></label>
                            <input type='text' name='electriciteMois' id='electriciteMois' className='electriciteMois item' value={ formCompta.electriciteMois }  onChange={ comptaFunction }  maxLength={200} />
                        </div>

                    </>
                    
                }

               { 
                    salaire.categorie === salaireVal  && 
                    
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
                            autreCharge.categorie === autrechargeVal  && 

                            <div className='nomCommentaire__container'>
                                <label for="libelle" className='label'> Libellé autres charge<span className='etoile'>*</span></label>
                                <input type='text' name='libelle' id='libelle' className='libelle item' value={ formCompta.libelle }  onChange={ comptaFunction }  maxLength={200} />
                            </div>
                        
                        }


                { 
                   
                   salaire.categorie  === salaireVal && 
                    <> 
                        <div className='nomCommentaire__container'>
                                <label for="commentaire" className='label'>Commentaire<span className='etoile'></span></label>
                                <input type='textarea' name='commentaire' id='commentaire' className='commentaire item' value={ formCompta.commentaire}  onChange={ comptaFunction }  maxLength={200} />
                        </div>

                    </>
                }
                

                {
                    salaire.categorie  === salaireVal && 
                    <>
                        <div className='nomCommentaire__container'>
                            <label for="nomPrenom" className='label'> Nom et prénom<span className='etoile'>*</span></label>
                            <input type='text' name='nomPrenom' id='nomPrenom' className='nomPrenom item' value={ formCompta.nomPrenom}  onChange={ comptaFunction }  maxLength={200} />
                        </div>

                    </>
                }

            </form>
           

            <div className='formulaireConfirm__btn'>
                < button className='btn  colorCancel' onClick={ lockCreateOpen } > Annuler</button>
                <button className='btn  colorValid' onClick={ submit }> Valider</button>
            </div>
                
         
        </div>



*/