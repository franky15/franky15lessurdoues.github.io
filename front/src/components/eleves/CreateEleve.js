import React, { useState, useContext } from 'react';

import { elevesServices } from '../../_services/Eleves.services';


import { AddEleveContext } from '../../_utils/ContextAddEleve';



const CreateEleves = () => { //{lockAddEleveWindow }

    //////////////////////:

    const { listeClassesContext, openAddEleveWindow ,lockAddEleveWindow, addEleveWindow } = useContext(AddEleveContext)

   console.log("listeClassesContext")
   console.log(listeClassesContext)

   console.log("addEleveWindow")
   console.log(addEleveWindow)
   

    /////////////////////////

    //const listeClassesContext = useContext(AddEleveContext)
    //console.log("listeClassesContext")
   //console.log(listeClassesContext)

    //let navigate = useNavigate()

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
        elevesServices.createEleve({...inputRadio, ...valInput, ...valDateDecouverte, ...valDate, ...valSection, ...valClasse, ...valInputParent})
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
             
             { eleveCreate && <p className='titreTiming'>L'élèvé a été crée avec succès</p> }
                <div className='createEleves'>
                    <div className='createEleves__entete'>
                        <p className='ajout'>Ajouter un élève</p>
                        <p className='compléter'>Veuillez compléter les champs ci-dessous puis cliquer sur le bouton "Valider" pour créer l'élève </p>
                    </div>
                    <hr></hr>
                    <form className='createEleves__formulaire'>

                        <p className='formulaireRadioTitre'>Elève</p>
                        <form className='formulaireRadio__option' onChange={ radioAncien }>
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
                            <textarea type='text' name='decouverteDateArrivee' id='decouverteDateArrivee' value= {valTextarea.decouverte}  onChange={ textareaInput }  maxLength={200}/>
                        </div>}

                        { textareaAncien && <form  className='formulaireInputDecouverteDate' onChange={ textareaInput }>
                            <label for="decouvertDateArrivee"> Quelle est l'année d'arrivée à l'école</label>
                            <input type='date'   name='decouverteDateArrivee' id='decouverteDateArrivee'  value={  valTextarea.dateArrivee }   className='dateSectionClasse' />
                           
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
                            <form className='formulaireDateSectionClasse__element' onChange={ dateInput } >
                                <label for="dateNaissance">Date de naissance <span className='etoile'>*</span></label>
                                <input type='date'   name='dateNaissance' id='dateNaissance' value={ `${ valDate.dateNaissance }`}  className='dateSectionClasse'/>
                            </form>
                            <form className='formulaireDateSectionClasse__element' onChange={ sectionInput } >
                                <label for="classe" className='formulaireDateSectionClasse__element--titre'> Section <span className='etoile'>*</span></label>
                                <select name="sections" id='formulaireDateSectionClasse__element--select'  className='dateSectionClasselist' >
                                    
                                    <option value="vide" > </option>
                                    <option value="anglophone"  >Anglophone</option>
                                    <option  value="francophone"  >Francophone </option >

                                </select>
                            </form>
                            <form className='formulaireDateSectionClasse__element' onChange={ classeInput }>
                                
                                <label for="classe" className='formulaireDateSectionClasse__element--classe'>Classe <span className='etoile'>*</span></label>
                                <select name="sections" id='formulaireDateSectionClasse__element--select' className='dateSectionClasselist' >

                                <option value="vid"  >  </option>
                                    { listeClassesContext.map( (classe, index) => 
                                        
                                        <option value={ classe.nom } key={classe-`${index}`} > { classe.nom } </option>)
                                    
                                    } 

                                </select>
                            </form>
                            <div className='formulaireDateSectionClasse__element'>
                                    
                                <label for="dateInscription" className='formulaireDateSectionClasse__element--classe'>Date d'inscription <span className='etoile'>*</span></label>
                                <input type='date' name='dateInscription' id='dateInscription' value= { valInputParent.name }  className='DatemontantPaye' onChange={ parentInput } />
                            </div>

                            <div className='formulaireDateSectionClasse__element'>
                                    
                                <label for="contactParent2" className='formulaireDateSectionClasse__element--classe'>Montant scolarité payé <span className='etoile'>*</span></label>
                                <input type='text' name='montantPaye' id='montantPaye'  placeholder='0 FCFA'  value= { valInputParent.name } className='DatemontantPaye' onChange={ parentInput } />
                            </div>

                        </div>
                        
                        <div className='formulaireReprésentants'>
                            <p className='formulaireReprésentants__titre'>Représentants légaux</p>
                            
                            <form className='formulaireDateSectionClasseContainer'>

                                <div className='formulaireDateSectionClasseContainer__parent'>
                                    
                                    <label for="nomParent1" className='formulaireDateSectionClasse__element--classe'>Parent 1 <span className='etoile'>*</span></label>
                                    <input type='text' name='nomParent1' id='nomparent1' value= {  valInputParent.name } className='parent' onChange={ parentInput } />
                                </div>
                                <div className='formulaireDateSectionClasseContainer__parent'>
                                    
                                    <label for="contactParent1" className='formulaireDateSectionClasse__element--classe'>Tel parent 1 <span className='etoile'>*</span></label>
                                    <input type='text' name='contactParent1' id='telparent1' value= { valInputParent.name } className='parent' onChange={ parentInput } />
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

export default CreateEleves;

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