import React,{ useEffect, useState} from 'react';
import { personnelServices } from '../../../_services/Personnels.services';

const AddFondateur = ({ listeClassesContext, lockaddEnseignantgroupe, openaddEnseignantgroupe,
    groupeSalarialValueExForm, nomValueExForm, prenomValueExForm, contactValueExForm,
    sectionValueExForm, classeValueExForm,emeilValueExForm, salaireValueExForm,
     openAddEleveWindow ,lockAddEleveWindow, addEleveWindow, listePersonnelContext,posteValueExForm,
     
     AddPersonnels,AddAutrePersonnel,AddAdministration
} ) => {
    
    
    
             //gestion du gros object pour un seul formulaire
    /////////////////////////
    let [ formPersonnel, setFormPersonnel ]  = useState({


        // "classe": `${classeValueExForm ?? ""}`,
        // "section": `${sectionValueExForm ?? ""}`,
       "contact": `${contactValueExForm ?? ""}`,
       "email": `${emeilValueExForm ?? ""}`,
       "groupeSalariale": `${groupeSalarialValueExForm}`,
       "nom": `${nomValueExForm ?? ""}`,
       "prenom": `${prenomValueExForm ?? ""}`,
       "poste": `${posteValueExForm ?? ""}`,
       "salaire": `${salaireValueExForm ?? ""}`


    })

    const personnelFunction = (e) => {

        setFormPersonnel({

            ...formPersonnel,
            [e.target.name] : e.target.value

        }) 


    }

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

    
//    let {  nom, prenom, contact,email, groupeSalariale,poste, section_id, classes_id, salaire } = formPersonnel
let {  nom, prenom, contact,email, groupeSalariale,poste,  salaire } = formPersonnel //section, classe,
 
const nomClasse = document.querySelector(".nom")
const nomClasse1 = document.querySelector(".prenom")
const nomClasse2 = document.querySelector(".contact")
const nomClasse3 = document.querySelector(".email")
const nomClasse4 = document.querySelector(".groupeSalariale")
const nomClasse5 = document.querySelector(".poste")
// const nomClasse6 = document.querySelector(".section_id")
// const nomClasse7 = document.querySelector(".classes_id")
const nomClasse8 = document.querySelector(".salaire")

// gestion des expressions régulières 
let regexNomPrenom = new RegExp("^[a-zA-Z]{2,}$")

let regexScolarite = new RegExp("^[0-9]{1,6}$")

let reagexTel = new RegExp("^[0-9]{1,20}$")

 let regexEmail = new RegExp("[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+")


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

    if(email && regexEmail.test( email ) === true ){

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

    if(salaire ){

        nomClasse8.style.border = "solid  1px black"
        //nomClasse10.style.display = "none"

    }

}

alerteInitiale()


/////////////////////////////////////////////////////////////////

    //gestion du state de l'erreur si la classe qu'on veut créer existe déjà 
    let [ classExist, setclassExist ] = useState()
    let [ classExistShow, setclassExistShow ] = useState(false)

    const classExistShowIsOpen = () =>{ setclassExistShow(true) }
    const classExistShowIsLock = () =>{ setclassExistShow(false) }

const submit = (e) => {

    
    e.preventDefault()

    if( !nom || !prenom || !contact  || !groupeSalariale || !poste || !salaire ){  //|| !email

        setalerteForm(true)

        if( !nom || regexNomPrenom.test( nom ) === false || nom === "" || nom === "undefined" ){   //!nom || regexNomPrenom.test( nom ) === false 

            const nomClasse = document.querySelector(".nom")
            nomClasse.style.border = "solid 1px red"

        } 

        if( !prenom || regexNomPrenom.test( prenom ) === false  || prenom === "" || prenom === "undefined"){

            setalerteForm(true)

            const nomClasse = document.querySelector(".prenom")
            
            nomClasse.style.border = "solid 1px red"

        }  
        
        if( !parseInt(contact ) || reagexTel.test( parseInt(contact )) === false  || contact === "" || contact === undefined){

               
            setalerteForm(true)

            const nomClasse = document.querySelector(".contact")
            nomClasse.style.border = "solid 1px red"

        } 

        if(  regexEmail.test( email ) === false ){  // !email || || email === "" || email === "undefined"

                
            setalerteForm(true)

            const nomClasse = document.querySelector(".email")
            nomClasse.style.border = "solid 1px red"

        }  

        if( !groupeSalariale || groupeSalariale === "" || groupeSalariale === "undefined"){

            setalerteForm(true)

            const nomClasse = document.querySelector(".groupeSalariale")
            nomClasse.style.border = "solid 1px red"

        }  
        
        if( !poste || regexNomPrenom.test( poste ) === false || poste === "" || poste === "undefined"){

            setalerteForm(true)

            let nomClasse = document.querySelector(".poste")
            nomClasse.style.border = "solid 1px red"

        } 
        if( regexScolarite.test( parseInt(salaire)) === false   ){  //|| salaire === "undefined"  || salaire === ""

            setalerteForm(true)

            const nomClasse = document.querySelector(".salaire")
            nomClasse.style.border = "solid 1px red"

        }
        
        
        
    } else{

        personnelServices.createPersonnel (formPersonnel)
        .then( res => {
            
            //navigate("/admin/classes" ) 
        ////////////////////////////

        confirmationPersonnelCreate()

        ////////////////////////////
        })

        .catch( err => {

            classExistShowIsOpen() //
            setclassExist(`Vous ne pouvez pas créer le personnel ${nom} car il existe déjà` )
            
            console.log(` **** le personnel ${nom} existe déjà : ` + err)
            
        
        })

    }

    
    
}

 /////////////////////////////////:
//récupération du groupeSalarial
let groupeSalarialAdaministration = formPersonnel.administration
let groupeSalarialFondateur = formPersonnel.fondateurs
let groupeSalarialAutrePersonnel = formPersonnel.autrePersonnel



/////////////////////////////////
let [ formenseignant, setformenseignant ] = useState(false) //true


const openenseignantgroupe = () => setformenseignant(true) 
const lockenseignantgroupe = () => setformenseignant(false) 



//gestion d'autres charges
let [ formAdministration, setComptaAdministration ]  = useState({}) 

let [ administrationgroupe, setadministrationgroupe ] = useState(false) //false

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
let [ fondateurgroupe, setfondateurgroupe ] = useState(true)

const openfondateurgroupe = () => setfondateurgroupe(true) 
const lockfondateurgroupe = () => setfondateurgroupe(false)




let listeStateWindow = [ {openaddEnseignantgroupe, lockaddEnseignantgroupe}, {openadministrationgroupe, lockadministrationgroupe}, {openautrePersonnelgroupe, lockautrePersonnelgroupe}, {openfondateurgroupe, lockfondateurgroupe }]

let [ alerteForm, setalerteForm ] = useState(false)


useEffect( () => {

    if( nom || prenom || contact || email || groupeSalariale || poste  || salaire ){  //|| section || classe


        setalerteForm(false)
    }

    //gestion d'affichage des composants
    if(formPersonnel.groupeSalariale === "administration"){

        openadministrationgroupe()

        lockautrePersonnelgroupe()
        lockfondateurgroupe()
        lockenseignantgroupe()
       // lockaddEnseignantgroupe()

    } else if(formPersonnel.groupeSalariale === "fondateurs"){

        openfondateurgroupe()
        

        lockautrePersonnelgroupe()
        lockadministrationgroupe()
        lockenseignantgroupe()
        //lockaddEnseignantgroupe()//

    } else if(formPersonnel.groupeSalariale === "autrePersonnel"){

        openautrePersonnelgroupe()

        lockfondateurgroupe()
        lockadministrationgroupe()
        lockenseignantgroupe()
        

    }else if(formPersonnel.groupeSalariale === "enseignant"){

        openaddEnseignantgroupe()

        lockfondateurgroupe()
        lockautrePersonnelgroupe()
        lockadministrationgroupe()
        

    }


}, [formPersonnel, lockaddEnseignantgroupe, openaddEnseignantgroupe,nom, prenom, contact,email, groupeSalariale,poste, salaire ]) //section, classe,


    return (
        

        <>
            

            {    fondateurgroupe &&

                <div className='addpersonnelContainer'>

                    
                
                    { alerteForm &&   <p className='alerteError' style={{ fontWeight: "bold", color: 'red', marginLeft: "20px" }} >Tous les champs avec étoiles ou en rouge doivent être remplis</p> }
                    { classExistShow &&   <p className='alerteError2' style={{ color: 'red', fontSize: '16px', fontWeight: 'bold' }} >{classExist}</p> }

                    <div className='addpersonnel'>
                        <>
                            <p className='titlePersonnel'>Ajouter un(e) Fondateur(trice)</p>
                            <p className='descriptionPersonnel'>Veuillez compléter les champs ci-dessous puis cliquer sur le bouton « Valider » pour créer un(e) Fondateur(trice) </p>
                            <hr></hr>
                            
                            <form className='addpersonnel__form'> 

                                <form  className='formulaireInputNomPrenom'>

                                    <div className='formulaireInputNomPrenom__nomPrenom'>
                                        <label for="nom"> Nom <span className='etoile'>*</span></label>
                                        <input type='text' name='nom' id='decouverteEcole nomPrenom' className='nomPrenom nom' value={ formPersonnel.nom  }  onChange={  personnelFunction }  maxLength={200} />
                                    </div>
                                    <div className='formulaireInputNomPrenom__nomPrenom'>
                                        <label for="prenom"> Prénom <span className='etoile'>*</span></label>
                                        <input type='text' name='prenom' id='prenom' className='nomPrenom prenom' value={ formPersonnel.prenom }  onChange={ personnelFunction }  maxLength={200} />
                                    </div>
                                    <div className='formulaireInputNomPrenom__nomPrenom'>
                                        <label for="contact">Tel <span className='etoile'>*</span></label>
                                        <input type='text' name='contact' id='tel' className='nomPrenom contact' value={  formPersonnel.contact }  onChange={ personnelFunction }  maxLength={200} />
                                    </div>
                                    <div className='formulaireInputNomPrenom__nomPrenom'>
                                        <label for="email"> Email <span className='etoile'> </span></label>
                                        <input type='text' name='email' id='email' className='nomPrenom email' value={   formPersonnel.email  ?? "mail@domain.com"}  onChange={ personnelFunction }  maxLength={200} />
                                    </div>
                                
                                </form>

                                <form  className='formulaireInputgroupeSalarial'>

                              

                                    <div className='formulaireInputgroupeSalarial__element'>
                                        <label for="groupeSalarial" className='formulaireInputgroupeSalarial__element--titre'> Groupe Salarial <span className='etoile'>*</span></label>
                                        <input type='text' name='groupeSalarial' id='formulaireInputgroupeSalarial__element--select' className='formulaireInputgroupeSalarial__element--select groupeSalariale' value={ formPersonnel.groupeSalariale }  onChange={ personnelFunction }    maxLength={200} />
                                    </div>
                                    
                                    <div className='formulaireInputgroupeSalarial__element'>
                                        <label for="poste"> Poste <span className='etoile'>*</span></label>
                                        <input type='text' name='poste' id='poste' className='poste' value={ formPersonnel.poste  }  onChange={ personnelFunction }  maxLength={200} />
                                    </div>

                                </form>

                                <form  className='formulaireInputSectionClasseSalaire'>

                                        <div className='formulaireInputSectionClasseSalaire__element'>
                                            <label for="salaire"> Salaire <span className='etoile'>*</span></label>
                                            <input type='text' name='salaire' id='salaire' className='salaire' value={ formPersonnel.salaire  }  onChange={ personnelFunction }  maxLength={200} />
                                        </div>

                                </form>
                                
                                <div className='formulaireConfirm'>

                                    <div className='formulaireConfirm__container'></div>
                                    <div className='formulaireConfirm__btn'>
                                        < button className='form__confirme--cancel  colorCancel' onClick={ lockaddEnseignantgroupe  } > Annuler</button>
                                        <button className='form__confirme--valid  colorValid' onClick={ submit }> Valider</button>
                                    </div>
                                        
                                </div>

                            </form>

                        </>

                    </div>

                </div>
                   
            }

              

               

    </>
        
    );
};

export default AddFondateur;


/*
        <form className='formulaireInputgroupeSalarial__element' onChange={ personnelFunction } >
                                        <label for="groupeSalarial" className='formulaireInputgroupeSalarial__element--titre'> Groupe Salarial <span className='etoile'>*</span></label>
                                        <select name="groupeSalariale" id='formulaireInputgroupeSalarial__element--select'  className='formulaireInputgroupeSalarial__element--select groupeSalariale' >
                                            
                                        
                                            <option value="fondateurs" >Fondateur(s)</option>
                                            <option  value="administration" >Administration </option >
                                            <option  value="enseignant"  >Enseignant(s) </option >
                                            <option  value="autrePersonnel"  >Autres Personnel(s) </option >

                                        </select>
                                    </form>
*/

/*

 { 

                    administrationgroupe && 
                    
                    <AddAdministration groupeSalarialValueExForm = {groupeSalarialValueExForm} listeClassesContext={listeClassesContext}  lockaddEnseignantgroupe={lockaddEnseignantgroupe} openaddEnseignantgroupe={openaddEnseignantgroupe}
                     nomValueExForm={nomValueExForm} prenomValueExForm={prenomValueExForm} contactValueExForm={contactValueExForm}
                     sectionValueExForm={sectionValueExForm} classeValueExForm={classeValueExForm}
                     emeilValueExForm={emeilValueExForm} salaireValueExForm={salaireValueExForm} posteValueExForm={posteValueExForm}/> 

                }


               { 
                addEnseignantgroupe && 

                 <AddPersonnels listeClassesContext={listeClassesContext}   lockaddEnseignantgroupe ={lockaddEnseignantgroupe}  openaddEnseignantgroupe={openaddEnseignantgroupe}  /> 
                
                }

                { 

                    autrePersonnelgroupe  && 
                    
                    <AddAutrePersonnel  groupeSalarialValueExForm = {groupeSalarialValueExForm}  listeClassesContext={listeClassesContext}  lockaddEnseignantgroupe={lockaddEnseignantgroupe} openaddEnseignantgroupe={openaddEnseignantgroupe}
                     nomValueExForm={nomValueExForm} prenomValueExForm={prenomValueExForm} contactValueExForm={contactValueExForm}
                     sectionValueExForm={sectionValueExForm} classeValueExForm={classeValueExForm}
                     emeilValueExForm={emeilValueExForm} salaireValueExForm={salaireValueExForm} posteValueExForm={posteValueExForm}

                     AddPersonnels={AddPersonnels}   AddAdministration={AddAdministration}
                    /> 

                }

                

*/

