import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { elevesServices } from '../../_services/Eleves.services';
import { AddEleveContext } from '../../_utils/ContextAddEleve';

const UpdateEleve = ( { showWindowEleveUpdate, setshowWindowEleveUpdate,  idClasse, eleveId } ) => { 

    //récupération du params
    const {id} = useParams()

    const { listeClassesContext, listeElevesContext, openAddEleveWindow ,lockAddEleveWindow, addEleveWindow } = useContext(AddEleveContext)

   let idEleve = eleveId.idEleve

   let [ eleveIdentifiant, setEleveId ] = useState({ idEleve: idEleve})
   
   let eleveCurrent = listeElevesContext.find( eleve => eleve.id === idEleve)
   
   //converstion de l'idSection de chiffre à lettre 
   let sectionAnglophone = "anglophone"
   let sectionFrancophone = "francophone"
   let sectionNumber1

   if(eleveCurrent.section_id === 1) {

       sectionNumber1 = sectionAnglophone

   }else if( eleveCurrent.section_id === 2 ) {

       sectionNumber1 = sectionFrancophone

   } 

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
   
    //fonction du textarea decouverte
    const textareaInput = (e) => {  //textareaAncien

        setValTextarea({

            ...valTextarea,
            [e.target.name] : e.target.value
            //decouverte: e.target.value
        })
      
    }

     //fonction du textarea monatnt
    const textareaInputDate = (e) => {  //textareaAncien

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
   
    //fonction des noms et prénoms
    const nomPrenomInput = (e) => {

        setValInput({

            ...valInput,
            [e.target.name] : e.target.value
        })
      
       
    }
  
    //fonction de la date de naissance
    const dateInput = (e) => {

        setValDate({

            ...valDate,
            [e.target.name] : e.target.value
           // dateNaissance : e.target.value
        })
      

    }
   
    //fonction de la section
    const sectionInput = (e) => {

       
        setValSection({

            ...valSection,
            [e.target.name] : e.target.value
            //sectionNumber : e.target.value
        })
      
         
    }

    //fonction de la classe
    const classeInput = (e) => {

        setValClasse({

            ...valClasse,
            [e.target.name] : e.target.value
            //classes_id : e.target.value

        })

    }
   
    //fonction du parent
    const parentInput = (e) => {


        setValInputParent({

            ...valInputParent,
            [e.target.name] : e.target.value


        })
    }
   
        ///////////////////////////////////////////////:::: 

    let [ eleveCreate, setEleveCreate ] = useState(false) //false
  
    //confirmation de la mise à jour
    let confirmationEleveCreate = () => {
     
        
         setEleveCreate(true)
        
         //cacher la confirmation après 3000 millisecondes
         setTimeout( () => {
     
             
             setEleveCreate(false)
             window.location.reload();
             
         }, 1)
        
        
     
     }
    
    const submit = () => {

        //elevesServices.updateEleve({...inputRadio, ...valInput, ...valTextarea, ...valDate, ...valSection, ...valClasse, ...valInputParent})
        elevesServices.updateEleve({ ...eleveIdentifiant, ...inputRadio, ...valTextarea, ...valInput, ...valDate, ...valSection, ...valClasse, ...valInputParent})
        .then( res => {
            
            // navigate("/admin/classes" ) 
            ////////////////////////////
            confirmationEleveCreate()
        
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
                            <textarea type='text' name='decouverteDateArrivee' id='decouverteDateArrivee' value= { `${ valTextarea.decouverteDateArrivee }` }  onChange={ textareaInput }  maxLength={200}/>
                        </div>}

                        { textareaAncien && <form  className='formulaireInputDecouverteDate' onChange={ textareaInput }>
                            <label for="decouverteDateArrivee"> Quelle est l'année d'arrivée à l'école</label>
                            <input type='date'   name='decouverteDateArrivee' id='decouverteDateArrivee' value={  `${ valTextarea.decouverteDateArrivee  }` }   className='dateSectionClasse' />
                           
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
                                <input type='date'  name='dateNaissance' id='date dateNaissance' value={  `${ valDate.dateNaissance }`}  className='dateSectionClasse'/>
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
                                <input type='date' name='dateInscription' id='dateInscription' value= {   `${ valDate.dateInscription }` } className='DatemontantPaye' onChange={ parentInput } />
                            </div>

                            <div className='formulaireDateSectionClasse__element'>
                                    
                                <label for="montantPaye" className='formulaireDateSectionClasse__element--classe'>Montant scolarité payé <span className='etoile'>*</span></label>
                                <input type='text' name='montantPaye' id='montantPaye'  placeholder='0 FCFA'  value= {   `${ valDate.montantPaye }` } className='DatemontantPaye' onChange={ parentInput } />
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

export default UpdateEleve;
