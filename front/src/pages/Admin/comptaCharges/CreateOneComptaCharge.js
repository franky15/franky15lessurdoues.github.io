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

    if(categorie || datePaiement || montantPaye || poste|| commentaire || nomPrenom ){

        setalerteForm(false)
    }

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
             
             /*else*/ if( !poste || regexNomPrenom.test( poste ) === false  ){
    
                     console.log("bienvenue dans la condition nom")
    
                     setalerteForm(true)
    
                     const nomClasse = document.querySelector(".poste")
                     nomClasse.style.border = "solid 1px red"
    
             } 
    
            /*else*/ if( !commentaire  || regexCommentaire.test( commentaire  ) === false ){
    
                     console.log("bienvenue dans la condition sectionNumber")
    
                     setalerteForm(true)
         
                     const nomClasse = document.querySelector(".commentaire ")
                     nomClasse.style.border = "solid 1px red"
    
             }  
    
             if(!nomPrenom || regexCommentaire.test( nomPrenom ) === false ){
    
                 console.log("bienvenue dans la condition sectionNumber")
    
                 setalerteForm(true)
     
                 const nomClasse = document.querySelector(".nomPrenom")
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
    /*
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
    */
    
  

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