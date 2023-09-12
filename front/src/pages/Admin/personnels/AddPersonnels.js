import React, { useState, useContext, useEffect } from 'react';

//import { elevesServices } from '../../_services/Eleves.services';
import { personnelServices } from '../../../_services/Personnels.services';
import AddAdministration from './AddAdministration';
import AddAutrePersonnel from "./AddAutrePersonnel"
import AddFondateur from "./AddFondateur"


//import { AddEleveContext } from '../../_utils/ContextAddEleve';



const AddPersonnels = ({ listeClassesContext, openAddEleveWindow ,lockAddEleveWindow, addEleveWindow, listePersonnelContext, lockaddEnseignantgroupe,  openaddEnseignantgroupe  } ) => { 

  
    //gestion du gros object pour un seul formulaire
    /////////////////////////
    let [ formPersonnel, setFormPersonnel ]  = useState({})

    const personnelFunction = (e) => {

        setFormPersonnel({

            ...formPersonnel,
            [e.target.name] : e.target.value

        }) 


    }

    console.log("***formPersonnel")
    console.log(formPersonnel)

    let groupeSalarialValueExForm = formPersonnel.groupeSalariale;
    let nomValueExForm = formPersonnel.nom;
    let prenomValueExForm = formPersonnel.prenom;
    let posteValueExForm = formPersonnel.poste;
    let contactValueExForm = formPersonnel.contact;
    let sectionValueExForm = formPersonnel.section;
    let classeValueExForm = formPersonnel.classe;
    let emeilValueExForm = formPersonnel.email;
    let salaireValueExForm = formPersonnel.salaire;
    /////////////////////////

    let [ eleveCreate, setEleveCreate ] = useState(false) //false
     //confirmation de la mise à jour
     let confirmationPersonnelCreate = () => {
     
        
        setEleveCreate(true)
      
        //cacher la confirmation après 3000 millisecondes
        setTimeout( () => {
    
            
            setEleveCreate(false)
            window.location.reload();

            /////////////////////////////
            //lockaddEnseignantgroupe()
            /////////////////////////////
            
        }, 1)
    }



       //////////////////////////////////////

//    let {  nom, prenom, contact,email, groupeSalariale,poste, section_id, classes_id, salaire } = formPersonnel
let {  nom, prenom, contact,email, groupeSalariale,poste, section, classe, salaire } = formPersonnel
   
    console.log("******** nom")
    console.log(nom)

   const nomClasse = document.querySelector(".nom")
   const nomClasse1 = document.querySelector(".prenom")
   const nomClasse2 = document.querySelector(".contact")
   const nomClasse3 = document.querySelector(".email")
   const nomClasse4 = document.querySelector(".groupeSalariale")
   const nomClasse5 = document.querySelector(".poste")
   const nomClasse6 = document.querySelector(".section_id")
   const nomClasse7 = document.querySelector(".classes_id")
   const nomClasse8 = document.querySelector(".salaire")
   


   console.log("******** nomClasse1")
   console.log(nomClasse1)

   //gestion des alerte à l'origine
const alerteInitiale = () => {

    if( nom   ){
 
     nomClasse.style.border = "solid 1px black "
     
     //nomClasse1.style.display = "none"
 
    }
  
    
    if(prenom){
 
     nomClasse1.style.border = "solid  1px black"
     //nomClasse3.style.display = "none"
 
    }
    
    if(contact ){
 
     nomClasse2.style.border = "solid 1px black"
     //nomClasse4.style.display = "none"
 
    }
    
    if(email  ){
 
     nomClasse3.style.border = "solid 1px black"
     //nomClasse5.style.display = "none"
 
    }
    
    if(groupeSalariale ){
 
     nomClasse4.style.border = "solid 1px black"
     //nomClasse6.style.display = "none"
 
    }
    
    if(poste  ){
 
     nomClasse5.style.border = "solid 1px black"
    // nomClasse7.style.display = "none"
 
    }
    
    if(section ){ //section_id
 
     nomClasse6.style.border = "solid 1px black"
     //nomClasse8.style.display = "none"
 
    }
    
    if(classe ){ //classes_id
 
     nomClasse7.style.border = "solid 1px black"
     //nomClasse9.style.display = "none"
 
    }
 
     if(salaire ){
 
     nomClasse8.style.border = "solid  1px black"
     //nomClasse10.style.display = "none"
 
    }
    
    
 
    
 
    }
 
    alerteInitiale()
 
    // gestion des expressions régulières 
    let regexNomPrenom = new RegExp("^[a-zA-Z]{2,}$")

    let regexScolarite = new RegExp("^[0-9]{1,6}$")

    let reagexTel = new RegExp("^[0-9]{1,20}$")

    let regexEmail = new RegExp("[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+")
    /////////////////////////////////////////////////////////////////

        //gestion du state de l'erreur si la classe qu'on veut créer existe déjà 
        let [ classExist, setclassExist ] = useState()

    const submit = (e) => {

        
        e.preventDefault()

        console.log("bienvenue au submit test de addpersonnels")
                                                                    //valTextarea

         console.log("bienvenue au submit test de createEleve")

        if( !nom || !prenom || !contact || !email || !groupeSalariale || !poste || !section || !classe || !salaire ){  //section_id, classes_id
    
            console.log("*** Tous les champs avec étoiles ou en rouge doivent être remplis *** ")
        
            setalerteForm(true)

            
           // }else{

            if( !nom || regexNomPrenom.test( nom ) === false ){

                    console.log("bienvenue dans la condition nom")

                    setalerteForm(true)

                    console.log( regexNomPrenom.test( nom )  )
        
                    const nomClasse = document.querySelector(".nom")
                    nomClasse.style.border = "solid 1px red"

            } 

            /*else*/ if( !prenom || regexNomPrenom.test( prenom ) === false ){

                    console.log("bienvenue dans la condition nom")

                    setalerteForm(true)

                    console.log( regexNomPrenom.test( prenom )  )
        
                    const nomClasse = document.querySelector(".prenom")
                    
                    nomClasse.style.border = "solid 1px red"

            }  
            
            /*else*/ if( !parseInt(contact ) || reagexTel.test( parseInt(contact )) === false){

                    console.log("bienvenue dans la condition nom")

                    setalerteForm(true)

                    const nomClasse = document.querySelector(".contact")
                    nomClasse.style.border = "solid 1px red"

            } 

           /*else*/ if( !email || regexEmail.test( email ) === false ){

                    console.log("bienvenue dans la condition sectionNumber")

                    setalerteForm(true)
        
                    const nomClasse = document.querySelector(".email")
                    nomClasse.style.border = "solid 1px red"

            }  

            if( !groupeSalariale){

                console.log("bienvenue dans la condition sectionNumber")

                setalerteForm(true)
    
                const nomClasse = document.querySelector(".groupeSalariale")
                nomClasse.style.border = "solid 1px red"

        }  
            
            /*else*/ if( !poste || regexNomPrenom.test( poste ) === false ){

                    console.log("bienvenue dans la condition nom")

                    setalerteForm(true)

                    const nomClasse = document.querySelector(".poste")
                    nomClasse.style.border = "solid 1px red"

            } 
            
            /*else*/ if( !section){ //section_id

                    console.log("bienvenue dans la condition regexScolarite")

                    setalerteForm(true)

                    console.log( regexScolarite.test( parseInt(section) )  ) //section_id
        
                    const nomClasse = document.querySelector(".section_id")
                    nomClasse.style.border = "solid 1px red"

            }  
            
            /*else*/ if( !classe ){ //classes_id

                    console.log("bienvenue dans la condition nomParent1")

                    setalerteForm(true)

                    console.log( regexNomPrenom.test(classe)  ) //classes_id
        
                    const nomClasse = document.querySelector(".classes_id")
                    nomClasse.style.border = "solid 1px red"

            }
            
  
            
            /*else*/ if(!parseInt(salaire) || regexScolarite.test( parseInt(salaire)) === false  ){

                console.log("bienvenue dans la condition nomParent1")

                setalerteForm(true)
    
                const nomClasse = document.querySelector(".salaire")
                nomClasse.style.border = "solid 1px red"

                    

            }
            
            
            
            } else{

                personnelServices.createPersonnel (formPersonnel)
                .then( res => {
                    console.log("données du formulaire envoyées")
                    console.log(res)
                    //navigate("/admin/classes" ) 
                ////////////////////////////

                confirmationPersonnelCreate()

                ////////////////////////////
                })
                //.catch( err => console.log(err))
                .catch( err => {

                    setclassExist(`Vous ne pouvez pas créer le personnel ${nom} car il existe déjà` )
                 
                    console.log(` **** le personnel ${nom} existe déjà : ` + err)
                   
                
                })

            }

        /*
        personnelServices.createPersonnel (formPersonnel)
            .then( res => {
                console.log("données du formulaire envoyées")
                console.log(res)
                //navigate("/admin/classes" ) 
               ////////////////////////////

               confirmationPersonnelCreate()

               ////////////////////////////
            })
            .catch( err => console.log(err))
        */
        
    }

    //gestion du state de l'affichage de la fenêtre de creation

  
     /////////////////////////////////:
    //récupération du groupeSalarial
    let groupeSalarialAdaministration = formPersonnel.administration
    let groupeSalarialFondateur = formPersonnel.fondateurs
    let groupeSalarialAutrePersonnel = formPersonnel.autrePersonnel

   

    /////////////////////////////////
    let [ formenseignant, setformenseignant ] = useState(true)


    const openenseignantgroupe = () => setformenseignant(true) 
    const lockenseignantgroupe = () => setformenseignant(false) 

    

    //gestion d'autres charges
    let [ formAdministration, setComptaAdministration ]  = useState({}) 

    let [ administrationgroupe, setadministrationgroupe ] = useState(false)

    const openadministrationgroupe = () => setadministrationgroupe(true) 
    const lockadministrationgroupe = () => setadministrationgroupe(false) 
    

    //gestion de l'électricité
    let [ formAutrePersonnel, setformAutrePersonnel, ]  = useState({}) //idPersonnel : idPersonnelCurrent.idPersonnel

    //gestion du state de l'électricité
    let [ autrePersonnelgroupe, setautrePersonnelgroupe ] = useState(false)

    const openautrePersonnelgroupe = () => setautrePersonnelgroupe(true) 
    const lockautrePersonnelgroupe = () => setautrePersonnelgroupe(false)


    //gestion de l'électricité
    let [ formAFondateur, setformAFondateur ]  = useState({}) //idPersonnel : idPersonnelCurrent.idPersonnel

    //gestion du state de l'électricité
    let [ fondateurgroupe, setfondateurgroupe ] = useState(false)

    const openfondateurgroupe = () => setfondateurgroupe(true) 
    const lockfondateurgroupe = () => setfondateurgroupe(false)

    


    let listeStateWindow = [ {openaddEnseignantgroupe, lockaddEnseignantgroupe}, {openadministrationgroupe, lockadministrationgroupe}, {openautrePersonnelgroupe, lockautrePersonnelgroupe}, {openfondateurgroupe, lockfondateurgroupe }]
   
    let [ alerteForm, setalerteForm ] = useState(false)


    useEffect( () => {

        if( nom || prenom || contact || email || groupeSalariale || poste || section || classe || salaire ){  //section_id ,classes_id
    
    
            setalerteForm(false)
        }

        //gestion d'affichage des composants
        if(formPersonnel.groupeSalariale === "administration"){

            console.log("**** bienvenue à la condition formPersonnel.administration")

            openadministrationgroupe()

            lockautrePersonnelgroupe()
            lockfondateurgroupe()
            lockenseignantgroupe()
           // lockaddEnseignantgroupe()
        }else if(formPersonnel.groupeSalariale === "fondateurs"){

            console.log("**** bienvenue à la condition formPersonnel.fondateurs")

            openfondateurgroupe()
            

            lockautrePersonnelgroupe()
            lockadministrationgroupe()
            lockenseignantgroupe()
           // lockaddEnseignantgroupe()
        }else if(formPersonnel.groupeSalariale === "autrePersonnel"){

            console.log("**** bienvenue à la condition formPersonnel.autrePersonnel")

            openautrePersonnelgroupe()

            lockfondateurgroupe()
            lockadministrationgroupe()
            lockenseignantgroupe()
            

        }else if(formPersonnel.groupeSalariale === "enseignant"){

            console.log("**** bienvenue à la condition formPersonnel.administration")

            openaddEnseignantgroupe()

            lockfondateurgroupe()
            lockautrePersonnelgroupe()
            lockadministrationgroupe()
            

        }


        


    }, [formPersonnel, lockaddEnseignantgroupe, openaddEnseignantgroupe,nom, prenom, contact,email, groupeSalariale,poste, section, classe, salaire ]) //section_id, //classes_id
    
    ////////////////////////////

  

    return (

        <>
       {   formenseignant &&
        <div className='addpersonnelContainer'>

            { alerteForm &&   <p className='alerteError' style={{ fontWeight: "bold", color: 'red', marginLeft: "20px" }} >Tous les champs avec étoiles ou en rouge doivent être remplis</p> }
            { classExist &&   <p className='alerteError2' style={{ color: 'red', fontSize: '16px', fontWeight: 'bold' }} >{classExist}</p> }
            
            <div className='addpersonnel'>
                
                { // formenseignant && }

                    <>
                        <p className='titlePersonnel'>Ajouter un personnel</p>
                        <p className='descriptionPersonnel'>Veuillez compléter les champs ci-dessous puis cliquer sur le bouton « Valider » pour créer un personnel </p>
                        <hr></hr>

                    
                    
                        <form className='addpersonnel__form'>

                                <form  className='formulaireInputNomPrenom'>

                                    <div className='formulaireInputNomPrenom__nomPrenom'>
                                        <label for="nom"> Nom <span className='etoile'>*</span></label>
                                        <input type='text' name='nom' id='decouverteEcole nomPrenom' className='nomPrenom nom' value={ formPersonnel.nom }  onChange={  personnelFunction }  maxLength={200} />
                                    </div>
                                    <div className='formulaireInputNomPrenom__nomPrenom'>
                                        <label for="prenom"> Prénom <span className='etoile'>*</span></label>
                                        <input type='text' name='prenom' id='prenom' className='nomPrenom prenom' value={ formPersonnel.prenom }  onChange={ personnelFunction }  maxLength={200} />
                                    </div>
                                    <div className='formulaireInputNomPrenom__nomPrenom'>
                                        <label for="contact">Tel <span className='etoile'>*</span></label>
                                        <input type='text' name='contact' id='tel' className='nomPrenom contact' value={ formPersonnel.tel }  onChange={ personnelFunction }  maxLength={200} />
                                    </div>
                                    <div className='formulaireInputNomPrenom__nomPrenom'>
                                        <label for="email"> Email <span className='etoile'> </span></label>
                                        <input type='text' name='email' id='email' className='nomPrenom email' value={ formPersonnel.email }  onChange={ personnelFunction }  maxLength={200} />
                                    </div>
                                
                                </form>

                                <form  className='formulaireInputgroupeSalarial'>

                                    <form className='formulaireInputgroupeSalarial__element ' onChange={ personnelFunction } >
                                        <label for="groupeSalarial" className='formulaireInputgroupeSalarial__element--titre'> Groupe Salarial <span className='etoile'>*</span></label>
                                        <select name="groupeSalariale" id='formulaireInputgroupeSalarial__element--select'  className='formulaireInputgroupeSalarial__element--select groupeSalariale' >
                                            
                                            <option  ></option>
                                            <option value="fondateurs" >Fondateur(s)</option>
                                            <option  value="administration" >Administration </option >
                                            <option  value="enseignant"  >Enseignant(s) </option >
                                            <option  value="autrePersonnel"  >Autres Personnel(s) </option >

                                        </select>
                                    </form>
                                    
                                    <div className='formulaireInputgroupeSalarial__element'>
                                        <label for="poste"> Poste <span className='etoile'>*</span></label>
                                        <input type='text' name='poste' id='poste' className='poste' value={ formPersonnel.poste }  onChange={ personnelFunction }  maxLength={200} />
                                    </div>

                                </form>

                                <form  className='formulaireInputSectionClasseSalaire'>

                                    <form className='formulaireInputSectionClasseSalaire__element ' onChange={ personnelFunction } >
                                        
                                        <label for="section" className='formulaireDateSectionClasse__element--titre'> Section <span className='etoile'>*</span></label>
                                        <select name="section" id='formulaireDateSectionClasse__element--select'  className='dateSectionClasselist section_id' >
                                            
                                            <option value="vide" > </option>
                                            <option value="anglophone"  >Anglophone</option>
                                            <option  value="francophone"  >Francophone </option >

                                        </select>
                                        
                                    </form>

                                    <form className='formulaireInputSectionClasseSalaire__element ' onChange={ personnelFunction }>
                                                
                                        <label for="classe" className='formulaireDateSectionClasse__element--classe'>Classe <span className='etoile'>*</span></label>
                                        <select name="classe" id='classe' className='classe classes_id' >

                                        <option value="vid"  >  </option>
                                            { listeClassesContext.map( (classe, index) => 
                                                
                                                <option value={ classe.nom } key={classe.nom-`${index}`} > { classe.nom } </option>)
                                            
                                            } 

                                        </select>

                                    </form>

                                    <div className='formulaireInputSectionClasseSalaire__element'>
                                        <label for="salaire"> Salaire <span className='etoile'>*</span></label>
                                        <input type='text' name='salaire' id='salaire' className='salaire' value={ formPersonnel.salaire }  onChange={ personnelFunction }  maxLength={200} />
                                    </div>

                                </form>
                                
                                <div className='formulaireConfirm'>

                                    <div className='formulaireConfirm__container'></div>
                                    <div className='formulaireConfirm__btn'>
                                        < button className='form__confirme--cancel  colorCancel' onClick={ lockaddEnseignantgroupe  } > Annuler</button>
                                        <button  type='submit' className='form__confirme--valid  colorValid' onClick={ submit }> Valider</button>
                                    </div>
                                        
                                </div>

                        </form>
                        
                    </>
                }

                { /*
                
                { 

                    administrationgroupe && 
                    
                    <AddAdministration groupeSalarialValueExForm = {groupeSalarialValueExForm} listeClassesContext={listeClassesContext}  lockaddEnseignantgroupe={lockaddEnseignantgroupe} openaddEnseignantgroupe={openaddEnseignantgroupe}
                     nomValueExForm={nomValueExForm} prenomValueExForm={prenomValueExForm} contactValueExForm={contactValueExForm}
                     sectionValueExForm={sectionValueExForm} classeValueExForm={classeValueExForm}
                     emeilValueExForm={emeilValueExForm} salaireValueExForm={salaireValueExForm} posteValueExForm={posteValueExForm}/> 

                }

                { 

                    autrePersonnelgroupe  && 
                    
                    <AddAutrePersonnel  groupeSalarialValueExForm = {groupeSalarialValueExForm}  listeClassesContext={listeClassesContext}  lockaddEnseignantgroupe={lockaddEnseignantgroupe} openaddEnseignantgroupe={openaddEnseignantgroupe}
                     nomValueExForm={nomValueExForm} prenomValueExForm={prenomValueExForm} contactValueExForm={contactValueExForm}
                     sectionValueExForm={sectionValueExForm} classeValueExForm={classeValueExForm}
                     emeilValueExForm={emeilValueExForm} salaireValueExForm={salaireValueExForm} posteValueExForm={posteValueExForm}
                    /> 

                }

                { 

                    fondateurgroupe && 
                    
                    <AddFondateur  groupeSalarialValueExForm = {groupeSalarialValueExForm} listeClassesContext={listeClassesContext}  lockaddEnseignantgroupe={lockaddEnseignantgroupe} openaddEnseignantgroupe={openaddEnseignantgroupe}
                     nomValueExForm={nomValueExForm} prenomValueExForm={prenomValueExForm} contactValueExForm={contactValueExForm}
                     sectionValueExForm={sectionValueExForm} classeValueExForm={classeValueExForm}
                     emeilValueExForm={emeilValueExForm} salaireValueExForm={salaireValueExForm} posteValueExForm={posteValueExForm}
                    
                     AddPersonnels={AddPersonnels} AddAutrePersonnel={AddAutrePersonnel} AddAdministration={AddAdministration}
                    
                    /> 

                } */
                
                }

            </div>
        </div>}


        {/*********************************$ */}


        { 

            administrationgroupe && 
            
            <AddAdministration groupeSalarialValueExForm = {groupeSalarialValueExForm} listeClassesContext={listeClassesContext}  lockaddEnseignantgroupe={lockaddEnseignantgroupe} openaddEnseignantgroupe={openaddEnseignantgroupe}
             nomValueExForm={nomValueExForm} prenomValueExForm={prenomValueExForm} contactValueExForm={contactValueExForm}
             sectionValueExForm={sectionValueExForm} classeValueExForm={classeValueExForm}
             emeilValueExForm={emeilValueExForm} salaireValueExForm={salaireValueExForm} posteValueExForm={posteValueExForm}
             
             AddPersonnels={AddPersonnels} AddFondateur={AddFondateur} AddAutrePersonnel={AddAutrePersonnel}
             /> 


        }

        { 

            autrePersonnelgroupe  && 
            
            <AddAutrePersonnel  groupeSalarialValueExForm = {groupeSalarialValueExForm}  listeClassesContext={listeClassesContext} 
             lockaddEnseignantgroupe={lockaddEnseignantgroupe} openaddEnseignantgroupe={openaddEnseignantgroupe} 
             nomValueExForm={nomValueExForm} prenomValueExForm={prenomValueExForm} contactValueExForm={contactValueExForm}
             sectionValueExForm={sectionValueExForm} classeValueExForm={classeValueExForm}
             emeilValueExForm={emeilValueExForm} salaireValueExForm={salaireValueExForm} posteValueExForm={posteValueExForm}

             AddPersonnels={AddPersonnels} AddAdministration={AddAdministration} AddFondateur={AddFondateur}
            /> 

        }

        { 

            fondateurgroupe && 
            
            <AddFondateur  groupeSalarialValueExForm = {groupeSalarialValueExForm} listeClassesContext={listeClassesContext}  lockaddEnseignantgroupe={lockaddEnseignantgroupe} openaddEnseignantgroupe={openaddEnseignantgroupe}
             nomValueExForm={nomValueExForm} prenomValueExForm={prenomValueExForm} contactValueExForm={contactValueExForm}
             sectionValueExForm={sectionValueExForm} classeValueExForm={classeValueExForm}
             emeilValueExForm={emeilValueExForm} salaireValueExForm={salaireValueExForm} posteValueExForm={posteValueExForm}
            
             AddPersonnels={AddPersonnels} AddAutrePersonnel={AddAutrePersonnel} AddAdministration={AddAdministration}
            
            /> 

        }

    </>


     
        
    );
};

export default AddPersonnels;
