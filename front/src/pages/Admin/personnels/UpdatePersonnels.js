
import React, { useState, useContext } from 'react';

//import { elevesServices } from '../../_services/Eleves.services';
import { personnelServices } from '../../../_services/Personnels.services';


//import { AddEleveContext } from '../../_utils/ContextAddEleve';



const UpdatePersonnels  = ({ listeClassesContext, openAddEleveWindow ,lockAddEleveWindow, addEleveWindow, listePersonnelContext  }) => { //{lockAddEleveWindow }

  
    // gestion du state de l'input radio
    let [ inputRadio, setInputRadio ] = useState({})

    //gestion du state du textarea
    let [ textarea, setTextarea ] = useState(false)

    let lockTextarea = () => {

        setTextarea(false)
    }
    let openTextarea = () => {

        lockTextareaAncien()

        setTextarea(true)
    }

    //gestion du state du textareaAncien
    let [ textareaAncien, setTextareaAncien ] = useState(false)

    let lockTextareaAncien = () => {


        setTextareaAncien(false)
    }
    let openTextareaAncien = () => {

        lockTextarea()

        setTextareaAncien(true)
    }

    //gestion du state de la valeur du testarea
    let [ valTextarea, setValTextarea ] = useState({})

    //gestion du state date ancien
    let [ valDateAncien, setValDateAncien ] = useState({})

    //gestion du state date decouverte et date d'arrivée
    let [ valDateDecouverte, setvalDateDecouverte ] = useState({

        decouverteDateArrivee: ""
    })


    //gestion du state des input nom prenom
    let [ valInput, setValInput ] = useState({})
    
    //gestion du state date section classe
    let [ valDate, setValDate ] = useState({})

    //gestion du state section 
    let [ valSection, setValSection ] = useState({})

    //gestion du state  classe
    let [ valClasse, setValClasse ] = useState({})

    //gestion du state des input nom prenom
    let [ valInputParent, setValInputParent ] = useState({})


    //fonction de l'input radio
    const radioAncien = (e) => {

        setInputRadio({

            ...inputRadio,
            anciennete: e.target.value
        })
      

    }
   //console.log("******* inputRadio est : ")
   //console.log(inputRadio)

    //fonction du textarea decouverte
    const textareaInput = (e) => {  //textareaAncien

        //lockTextareaAncien()

        /*
        setValTextarea({

            ...valTextarea,
            [e.target.name] : e.target.value
            //decouverte: e.target.value   //setvalDateDecouverte 
        })
        */
       
        setvalDateDecouverte({

            ...valDateDecouverte,
            [e.target.name] : e.target.value
            //decouverte: e.target.value   //setvalDateDecouverte 
        })
      

    }

    console.log("valDateDecouverte")
    console.log(valDateDecouverte)

    /*
     //fonction du textarea monatnt
    const textareaInputDate = (e) => {  //textareaAncien

        //lockTextareaAncien()

        
        setValTextarea({

            ...valTextarea,
            dateArrivee: e.target.value
        })
      

    }
    */

     //fonction de la date d'arrivée
     const dateInputAncien = (e) => {

        setValTextarea({

            ...valTextarea,
            decouverte: e.target.value
        })
      

    }
    console.log("******* valTextarea est : ")
    console.log(valTextarea)
    

    //fonction des noms et prénoms
    const nomPrenomInput = (e) => {

        setValInput({

            ...valInput,
            [e.target.name] : e.target.value
        })
      
       
    }
   //console.log("******* valInput nom prenom est : ")
    //console.log(valInput)

    //fonction de la date de naissance
    const dateInput = (e) => {

        setValDate({

            ...valDate,
            dateNaissance : e.target.value
        })
      

    }
    //console.log("******* ValDate est : ")
    //console.log(valDate)

    //fonction de la section
    const sectionInput = (e) => {

       
        setValSection({

            ...valSection,
            sectionNumber : e.target.value
        })
      
         
    }

    //console.log("******* ValSection est : ")
    //console.log(valSection.section_id)
   
    //fonction de la classe
    const classeInput = (e) => {

        setValClasse({

            ...valClasse,
            classes_id : e.target.value

        })

    }
    //console.log("******* ValSection est : ")
    //console.log(valClasse)

    //fonction du parent
    const parentInput = (e) => {


        setValInputParent({

            ...valInputParent,
            [e.target.name] : e.target.value


        })
    }
    console.log("******* valInputParent est : ")
    console.log(valInputParent)

    console.log({...inputRadio, ...valTextarea, ...valInput, ...valDate, ...valSection, ...valClasse, ...valInputParent})
    

        ///////////////////////////////////////////////:::: 

        let [ eleveCreate, setEleveCreate ] = useState(false) //false
        //let [ hidenEleveCreate, setHidenEleveCreate ] = useState(true)
     
         //confirmation de la mise à jour
        let confirmationEleveCreate = () => {
     
        
         setEleveCreate(true)
        // setHidenEleveCreate(false)
        
     
         //cacher la confirmation après 3000 millisecondes
         setTimeout( () => {
     
             
             setEleveCreate(false)
             window.location.reload();
             
         }, 3000)
        
        
     
     }
     
      ///////////////////////////////////////////////:::: 

      
    const submit = () => {

        
        //e.preventDefault()

        console.log("bienvenue au submit test de createEleve")
                                                                    //valTextarea
        personnelServices.createPersonnel ({...inputRadio, ...valInput, ...valDateDecouverte, ...valDate, ...valSection, ...valClasse, ...valInputParent})
            .then( res => {
                console.log("données du formulaire envoyées")
                console.log(res)
               // navigate("/admin/classes" ) 
               ////////////////////////////
               confirmationEleveCreate()
               ////////////////////////////
            })
            .catch( err => console.log(err))
        
    }

    


    return (

        <div className='addpersonnelContainer'>

        
            <div className='addpersonnel'>
                
                <p className='titlePersonnel'>Ajouter un personnel</p>
                <p className='descriptionPersonnel'>Veuillez compléter les champs ci-dessous puis cliquer sur le bouton « Valider » pour créer un personnel </p>
                <hr></hr>

                <form className='addpersonnel__form'>

                    <form  className='formulaireInputNomPrenom'>

                        <div className='formulaireInputNomPrenom__nomPrenom'>
                            <label for="nom"> Nom <span className='etoile'>*</span></label>
                            <input type='text' name='nom' id='decouverteEcole nomPrenom' className='nomPrenom' value={ valInput.nom }  onChange={ nomPrenomInput }  maxLength={200} />
                        </div>
                        <div className='formulaireInputNomPrenom__nomPrenom'>
                            <label for="prenom"> Prénom <span className='etoile'>*</span></label>
                            <input type='text' name='prenom' id='prenom' className='nomPrenom' value={ valInput.prenom }  onChange={ nomPrenomInput }  maxLength={200} />
                        </div>
                        <div className='formulaireInputNomPrenom__nomPrenom'>
                            <label for="tel">Tel <span className='etoile'>*</span></label>
                            <input type='text' name='tel' id='tel' className='nomPrenom' value={ valInput.prenom }  onChange={ nomPrenomInput }  maxLength={200} />
                        </div>
                        <div className='formulaireInputNomPrenom__nomPrenom'>
                            <label for="email"> Email <span className='etoile'>*</span></label>
                            <input type='text' name='email' id='email' className='nomPrenom' value={ valInput.prenom }  onChange={ nomPrenomInput }  maxLength={200} />
                        </div>
                    
                    </form>

                    <form  className='formulaireInputgroupeSalarial'>

                        <form className='formulaireInputgroupeSalarial__element' onChange={ sectionInput } >
                            <label for="groupeSalarial" className='formulaireInputgroupeSalarial__element--titre'> Section <span className='etoile'>*</span></label>
                            <select name="groupeSalarial" id='formulaireInputgroupeSalarial__element--select'  className='formulaireInputgroupeSalarial__element--select' >
                                
                                <option value="vide" > </option>
                                <option value="fondatrice" >Fondateur(s)</option>
                                <option  value="administration" >Administration </option >
                                <option  value="enseignant"  >Enseignant(s) </option >
                                <option  value="autrePersonnel"  >Autres Personnel(s) </option >

                            </select>
                        </form>
                        
                        <div className='formulaireInputgroupeSalarial__element'>
                            <label for="poste"> Poste <span className='etoile'>*</span></label>
                            <input type='text' name='poste' id='poste' className='poste' value={ valInput.prenom }  onChange={ nomPrenomInput }  maxLength={200} />
                        </div>

                    </form>

                    <form  className='formulaireInputSectionClasseSalaire'>

                        <form className='formulaireInputSectionClasseSalaire__element' onChange={ sectionInput } >
                            
                            <label for="classe" className='formulaireDateSectionClasse__element--titre'> Section <span className='etoile'>*</span></label>
                            <select name="sections" id='formulaireDateSectionClasse__element--select'  className='dateSectionClasselist' >
                                
                                <option value="vide" > </option>
                                <option value="anglophone"  >Anglophone</option>
                                <option  value="francophone"  >Francophone </option >

                            </select>
                            
                        </form>

                        <form className='formulaireInputSectionClasseSalaire__element' onChange={ classeInput }>
                                    
                            <label for="classe" className='formulaireDateSectionClasse__element--classe'>Classe <span className='etoile'>*</span></label>
                            <select name="classe" id='classe' className='classe' >

                            <option value="vid"  >  </option>
                                { listeClassesContext.map( (classe, index) => 
                                    
                                    <option value={ classe.nom } key={classe-`${index}`} > { classe.nom } </option>)
                                
                                } 

                            </select>

                        </form>

                        <div className='formulaireInputSectionClasseSalaire__element'>
                            <label for="salaire"> Salaire <span className='etoile'>*</span></label>
                            <input type='text' name='salaire' id='salaire' className='salaire' value={ valInput.prenom }  onChange={ nomPrenomInput }  maxLength={200} />
                        </div>

                    </form>
                    
                    <div className='formulaireConfirm'>

                        <div className='formulaireConfirm__container'></div>
                        <div className='formulaireConfirm__btn'>
                            < button className='form__confirme--cancel  colorCancel' onClick={ lockAddEleveWindow } > Annuler</button>
                            <button className='form__confirme--valid  colorValid' onClick={ submit }> Valider</button>
                        </div>
                            
                    </div>

                </form>

            </div>
        </div>
        
    );
};

export default UpdatePersonnels ;

/*
<form className='formulaireDateSectionClasse__element' onChange={ classeInput }>
                                
    <label for="classe" className='formulaireDateSectionClasse__element--classe'>Classe <span className='etoile'>*</span></label>
    <select name="sections" id='formulaireDateSectionClasse__element--select' className='dateSectionClasselist' >
        
        <option value={ `${ valClasse.classes_id }`} >{ valClasse.classes_id } </option>
        <option value="cM7"  >cM7</option>
        <option  value="classe7"  >class7 </option >

    </select>
</form>

*/
// ligne 302 textareaInputMontant
/*
import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { elevesServices } from '../../../_services/Eleves.services';
import { AddEleveContext } from '../../../_utils/ContextAddEleve';




const UpdatePersonnels = ( { showWindowEleveUpdate, setshowWindowEleveUpdate,  idClasse, personnelId, listePersonnelContext } ) => { 

    //récupération du params
    const {id} = useParams()
    console.log("**** idEleve params est : ****")
    console.log(id)

    console.log("****  personnelId  est : ****")
    console.log( personnelId )

    let idPersonnel = personnelId.idPersonnel;
    console.log("*** idPersonnel")
    console.log(idPersonnel)
    //////////////////////:

    const { listeClassesContext, listeElevesContext, openAddEleveWindow ,lockAddEleveWindow, addEleveWindow } = useContext(AddEleveContext)

  
   let idEleve = personnelId.idEleve

   console.log("idEleve est : " + idEleve)

   let [ eleveIdentifiant, setEleveId ] = useState({ idEleve: idEleve})
   
   let eleveCurrent = listeElevesContext.find( eleve => eleve.id === idEleve)
   
   console.log("eleveCurrent")
   console.log(eleveCurrent)

   //converstion de l'idSection de chiffre à lettre 
   let sectionAnglophone = "anglophone"
   let sectionFrancophone = "francophone"
   let sectionNumber1

   const personnel = listePersonnelContext.find( element => element.id =  idPersonnel )
  
   

   
    /////////////////////////

    // gestion du state de l'input radio
    let [ inputRadio, setInputRadio ] = useState({

        anciennete: eleveCurrent.anciennete
    })

    //gestion du state du textarea
    let [ textarea, setTextarea ] = useState(false)

    let lockTextarea = () => {

        setTextarea(false)
    }
    let openTextarea = () => {

        lockTextareaAncien()

        setTextarea(true)
    }

    //gestion du state du textareaAncien
    let [ textareaAncien, setTextareaAncien ] = useState(false)

    let lockTextareaAncien = () => {


        setTextareaAncien(false)
    }
    let openTextareaAncien = () => {

        lockTextarea()

        setTextareaAncien(true)
    }

    //gestion du state de la valeur du textarea de decouverte
    let [ valTextarea, setValTextarea ] = useState({

       // decouverte: eleveCurrent.decouverte,
        //dateArrivee: eleveCurrent.dateArrivee 
        decouverteDateArrivee: eleveCurrent.decouverteDateArrivee,
        
    })

    //gestion du state date ancien
    let [ valDateAncien, setValDateAncien ] = useState({})


    //gestion du state des input nom prenom
    let [ valInput, setValInput ] = useState({

        nom : eleveCurrent.nom,
        prenom : eleveCurrent.prenom
    })
    
    //gestion du state date  montant
    let [ valDate, setValDate ] = useState({

        dateNaissance : eleveCurrent.dateNaissance.slice(0,10),
        dateInscription : eleveCurrent.dateInscription.slice(0,10),
        montantPaye : eleveCurrent.montantPaye
        
        
    })


    

    //gestion du state section 
    let [ valSection, setValSection ] = useState({

        sectionNumber : `${sectionNumber1}` //eleveCurrent.section_id/////////
    })

    //gestion du state  classe
    let [ valClasse, setValClasse ] = useState({

        classes_id : eleveCurrent.classes_id
    })

    //gestion du state des input nom prenom
    let [ valInputParent, setValInputParent ] = useState({

        nomParent1 : eleveCurrent.nomParent1,
        contactParent1 : eleveCurrent.contactParent1,
        nomParent2 : eleveCurrent.nomParent2,
        contactParent2 : eleveCurrent.contactParent2,
        

    })


    //fonction de l'input radio
    const radioAncien = (e) => {

        setInputRadio({

            ...inputRadio,
            anciennete: e.target.value
        })
      

    }
   //console.log("******* inputRadio est : ")
   //console.log(inputRadio)

    //fonction du textarea decouverte
    const textareaInput = (e) => {  //textareaAncien

        //lockTextareaAncien()

        
        setValTextarea({

            ...valTextarea,
            [e.target.name] : e.target.value
            //decouverte: e.target.value
        })
      

    }

     //fonction du textarea monatnt
    const textareaInputDate = (e) => {  //textareaAncien

        //lockTextareaAncien()

        
        setValTextarea({

            ...valTextarea,
            dateArrivee: e.target.value
        })
      

    }

     //fonction de la date d'arrivée
     const dateInputAncien = (e) => {

        setValTextarea({

            ...valTextarea,
            decouverte: e.target.value
        })
      

    }
    console.log("******* valTextarea est : ")
    console.log(valTextarea)
    

    //fonction des noms et prénoms
    const nomPrenomInput = (e) => {

        setValInput({

            ...valInput,
            [e.target.name] : e.target.value
        })
      
       
    }
   //console.log("******* valInput nom prenom est : ")
    //console.log(valInput)

    //fonction de la date de naissance
    const dateInput = (e) => {

        setValDate({

            ...valDate,
            [e.target.name] : e.target.value
           // dateNaissance : e.target.value
        })
      

    }
    console.log("******* ValDate est : ********")
    console.log( (valDate.dateNaissance).slice(0,10).replace(""))

    //fonction de la section
    const sectionInput = (e) => {

       
        setValSection({

            ...valSection,
            [e.target.name] : e.target.value
            //sectionNumber : e.target.value
        })
      
         
    }

    //console.log("******* ValSection est : ")
    //console.log(valSection.section_id)
   
    //fonction de la classe
    const classeInput = (e) => {

        setValClasse({

            ...valClasse,
            [e.target.name] : e.target.value
            //classes_id : e.target.value

        })

    }
    //console.log("******* ValSection est : ")
    //console.log(valClasse)

    //fonction du parent
    const parentInput = (e) => {


        setValInputParent({

            ...valInputParent,
            [e.target.name] : e.target.value


        })
    }
    console.log("******* valInputParent est : ")
    console.log(valInputParent)

    console.log({ ...eleveIdentifiant, ...inputRadio, ...valTextarea, ...valInput, ...valDate, ...valSection, ...valClasse, ...valInputParent})
    

        ///////////////////////////////////////////////:::: 

        let [ eleveCreate, setEleveCreate ] = useState(false) //false
        //let [ hidenEleveCreate, setHidenEleveCreate ] = useState(true)
     
         //confirmation de la mise à jour
        let confirmationEleveCreate = () => {
     
        
         setEleveCreate(true)
        // setHidenEleveCreate(false)
        
     
         //cacher la confirmation après 3000 millisecondes
         setTimeout( () => {
     
             
             setEleveCreate(false)
             window.location.reload();
             
         }, 3000)
        
        
     
     }
     
      ///////////////////////////////////////////////:::: 

      
    const submit = () => {

        
        //e.preventDefault()

        
        console.log("bienvenue au submit test de createEleve")

        //elevesServices.updateEleve({...inputRadio, ...valInput, ...valTextarea, ...valDate, ...valSection, ...valClasse, ...valInputParent})
        elevesServices.updateEleve({ ...eleveIdentifiant, ...inputRadio, ...valTextarea, ...valInput, ...valDate, ...valSection, ...valClasse, ...valInputParent})
            .then( res => {
                console.log("données du formulaire envoyées")
                console.log(res)
               // navigate("/admin/classes" ) 
               ////////////////////////////
               confirmationEleveCreate()
               ////////////////////////////
            })
            .catch( err => console.log(err))
        
        
    }




    return (

        <div className='createElevesContainer'>
             
             { eleveCreate && <p className='titreTiming'>L'élèvé a été modifié avec succès</p> }
                <div className='createEleves'>
                    <div className='createEleves__entete'>
                        <p className='ajout'>Modifier un élève</p>
                        <p className='compléter'>Veuillez compléter les champs ci-dessous puis cliquer sur le bouton "Valider" pour modifier l'élève </p>
                    </div>
                    <hr></hr>
                    <form className='createEleves__formulaire'>

                        <p className='formulaireRadioTitre'>Elève</p>
                        <form className='formulaireRadio__option' value={ inputRadio.anciennete } onChange={ radioAncien }>
                            <div className='puce'>
                                <input type='radio' name='nouveauAncien' value="Non" id='puce__nouveau' onClick={openTextarea }   />
                                <label for="Non" >Je suis nouveau</label>
                            </div>
                            <div className='puce'>
                                <input type='radio' name='nouveauAncien' value="Oui" id='puce__ancien' onClick={openTextareaAncien} />
                                <label for="Oui" >Je suis ancien</label>
                            </div>
                        </form>

                        { textarea && <div  className='formulaireInputDecouverte'>
                            <label for="decouverteDateArrivee"> Comment avez-vous connu l'école ?</label>
                            <textarea type='text' name='decouverteDateArrivee' id='decouverteDateArrivee' value= {valTextarea.decouverteDateArrivee}  onChange={ textareaInput }  maxLength={200}/>
                        </div>}

                        { textareaAncien && <form  className='formulaireInputDecouverteDate' onChange={ textareaInput }>
                            <label for="decouverteDateArrivee"> Quelle est l'année d'arrivée à l'école</label>
                            <input type='date'   name='decouverteDateArrivee' id='decouverteDateArrivee' value={  valTextarea.decouverteDateArrivee.slice(0,10) }   className='dateSectionClasse' />
                           
                        </form>}

                        <form  className='formulaireInputNomPrenom'>
                            <div className='formulaireInputNomPrenom__nomPrenom'>
                                <label for="nom"> Nom <span className='etoile'>*</span></label>
                                <input type='text' name='nom' id='decouverteEcole nomPrenom' className='nomPrenom' value={ valInput.nom }  onChange={ nomPrenomInput }  maxLength={200} />
                            </div>
                            <div className='formulaireInputNomPrenom__nomPrenom'>
                                <label for="prenom"> Prénom <span className='etoile'>*</span></label>
                                <input type='text' name='prenom' id='prenom' className='nomPrenom' value={ valInput.prenom }  onChange={ nomPrenomInput }  maxLength={200} />
                            </div>
                        </form>

                        <div className='formulaireDateSectionClasse'>
                            <form className='formulaireDateSectionClasse__element'  onChange={ dateInput } >
                                <label for="dateNaissance">Date de naissance <span className='etoile'>*</span></label>
                                <input type='date'  name='dateNaissance' id='date dateNaissance' value={ valDate.dateNaissance.slice(0,10) }  className='dateSectionClasse'/>
                            </form>
                            <form className='formulaireDateSectionClasse__element' onChange={ sectionInput } >
                                <label for="classe" className='formulaireDateSectionClasse__element--titre'> Section <span className='etoile'>*</span></label>
                                <select name="section_id" id='formulaireDateSectionClasse__element--select'  className='dateSectionClasselist' >
                                    
                                    <option value={ valSection.sectionNumber } >{ valSection.sectionNumber } </option>
                                    <option value="anglophone"  >Anglophone</option>
                                    <option  value="francophone"  >Francophone </option >

                                </select>
                            </form>
                            <form className='formulaireDateSectionClasse__element' onChange={ classeInput }>
                                
                                <label for="classes_id" className='formulaireDateSectionClasse__element--classe'>Classe <span className='etoile'>*</span></label>
                                <select name="classes_id" id='formulaireDateSectionClasse__element--select' className='dateSectionClasselist' >

                                <option value={ valClasse.classes_id }  > { valClasse.classes_id } </option>
                                    { listeClassesContext.map( (classe, index) => 
                                        
                                        <option value={ valClasse.classes_id } key={classe-`${index}`} > { classe.nom } </option>)
                                    
                                    } 

                                </select>
                            </form>
                            <div className='formulaireDateSectionClasse__element'>
                                    
                                <label for="dateInscription" className='formulaireDateSectionClasse__element--classe'>Date d'inscription <span className='etoile'>*</span></label>
                                <input type='date' name='dateInscription' id='dateInscription' value= { valDate.dateInscription.slice(0,10) } className='DatemontantPaye' onChange={ parentInput } />
                            </div>

                            <div className='formulaireDateSectionClasse__element'>
                                    
                                <label for="montantPaye" className='formulaireDateSectionClasse__element--classe'>Montant scolarité payé <span className='etoile'>*</span></label>
                                <input type='text' name='montantPaye' id='montantPaye'  placeholder='0 FCFA'  value= { valDate.montantPaye } className='DatemontantPaye' onChange={ parentInput } />
                            </div>

                        </div>
                        
                        <div className='formulaireReprésentants'>
                            <p className='formulaireReprésentants__titre'>Représentants légaux</p>
                            
                            <form className='formulaireDateSectionClasseContainer'>

                                <div className='formulaireDateSectionClasseContainer__parent'>
                                    
                                    <label for="nomParent1" className='formulaireDateSectionClasse__element--classe'>Parent 1 <span className='etoile'>*</span></label>
                                    <input type='text' name='nomParent1' id='nomparent1' value= {  valInputParent.nomParent1 } className='parent' onChange={ parentInput } />
                                </div>
                                <div className='formulaireDateSectionClasseContainer__parent'>
                                    
                                    <label for="contactParent1" className='formulaireDateSectionClasse__element--classe'>Tel parent 1 <span className='etoile'>*</span></label>
                                    <input type='text' name='contactParent1' id='telparent1' value= { valInputParent.contactParent1 } className='parent' onChange={ parentInput } />
                                </div>
                                <div className='formulaireDateSectionClasseContainer__parent'>
                                    
                                    <label for="nomParent2" className='formulaireDateSectionClasse__element--classe'>Parent 2</label>
                                    <input type='text' name='nomParent2' id='parent2' value= { valInputParent.name } className='parent' onChange={ parentInput } />
                                </div>
                                <div className='formulaireDateSectionClasseContainer__parent'>
                                    
                                    <label for="contactParent2" className='formulaireDateSectionClasse__element--classe'>Tel Parent 2</label>
                                    <input type='text' name='contactParent2' id='telParent2' value= { valInputParent.name } className='parent' onChange={ parentInput } />
                                </div>
                               

                            </form>
                            
                        </div>

                        <div className='formulaireConfirm'>
                            <div className='formulaireConfirm__container'></div>
                            <div className='formulaireConfirm__btn'>
                                < button className='form__confirme--cancel  colorCancel' onClick={ lockAddEleveWindow } > Annuler</button>
                                <button className='form__confirme--valid  colorValid' onClick={ submit }> Valider</button>
                            </div>
                            
                        </div>

                    </form>
                    
                </div>

        </div>
        
    );
};

export default UpdatePersonnels;
*/