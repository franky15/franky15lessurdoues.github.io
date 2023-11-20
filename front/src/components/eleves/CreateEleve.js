import React, { useState, useContext, useEffect, useMemo } from 'react';
import { elevesServices } from '../../_services/Eleves.services';
import { AddEleveContext } from '../../_utils/ContextAddEleve';

const CreateEleves = () => { //{lockAddEleveWindow }

    const { listeClassesContext, openAddEleveWindow ,lockAddEleveWindow, addEleveWindow } = useContext(AddEleveContext)

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

    //fonction du textarea decouverte
    const textareaInput = (e) => {  //textareaAncien

        setvalDateDecouverte({

            ...valDateDecouverte,
            [e.target.name] : e.target.value
            //decouverte: e.target.value   //setvalDateDecouverte 
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
            dateNaissance : e.target.value
        })
      

    }
   
    //fonction de la section
    const sectionInput = (e) => {

       
        setValSection({

            ...valSection,
            sectionNumber : e.target.value
        })
      
         
    }

    //fonction de la classe
    const classeInput = (e) => {

        setValClasse({

            ...valClasse,
            classes_id : e.target.value

        })

    }
    
    //fonction du parent
    const parentInput = (e) => {


        setValInputParent({

            ...valInputParent,
            [e.target.name] : e.target.value


        })
    }
  
    let valformulaire = {...inputRadio, ...valTextarea, ...valInput, ...valDate, ...valSection, ...valClasse, ...valInputParent}
  

    ///////////////////////////////////////////////:::: 
    let [ alerteForm, setalerteForm ] = useState(false)

    let [ eleveCreate, setEleveCreate ] = useState(false) //false
    
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
     
 
   let { anciennete, nom, prenom, dateNaissance, sectionNumber,
   classes_id, dateInscription, montantPaye, nomParent1, contactParent1, nomParent2, contactParent2 } = valformulaire

   const nomClasse = document.querySelector(".anciennete")
   const nomClasse1 = document.querySelector(".nom")
   const nomClasse2 = document.querySelector(".formulaireRadio__option")
   const nomClasse3 = document.querySelector(".prenom")
   const nomClasse4 = document.querySelector(".dateNaissance")
   const nomClasse5 = document.querySelector(".section")
   const nomClasse6 = document.querySelector(".classe")
   const nomClasse7 = document.querySelector(".dateInscription")
   const nomClasse8 = document.querySelector(".montantPaye")
   const nomClasse9 = document.querySelector(".nomParent1")
   const nomClasse10 = document.querySelector(".contactParent1")
   const nomClasse11 = document.querySelector(".nomParent2")
   const nomClasse12 = document.querySelector(".contactParent1")

    useEffect( ()=> {

        

        if( anciennete || nom || prenom  || dateNaissance || sectionNumber
            || classes_id || dateInscription || montantPaye || nomParent1 || contactParent1 ){


                setalerteForm(false)
        }

    }, [ anciennete, nom, prenom, dateNaissance, sectionNumber,
        classes_id, dateInscription, montantPaye, nomParent1, contactParent1, nomParent2, contactParent2 /*, listeValue,  listeElementsTag */])
    
//gestion des alerte à l'origine
const alerteInitiale = () => {

   if( nom   ){

    nomClasse1.style.border = "solid 1px black "
    
    //nomClasse1.style.display = "none"

   }
   
   if( anciennete  ){

    nomClasse2.style.border = "solid  0px black"
    //nomClasse2.style.display = "none"

   }
   
   if(prenom){

    nomClasse3.style.border = "solid  1px black"
    //nomClasse3.style.display = "none"

   }
   
   if(dateNaissance ){

    nomClasse4.style.border = "solid 1px black"
    //nomClasse4.style.display = "none"

   }
   
   if(sectionNumber  ){

    nomClasse5.style.border = "solid 1px black"
    //nomClasse5.style.display = "none"

   }
   
   if(classes_id  ){

    nomClasse6.style.border = "solid 1px black"
    //nomClasse6.style.display = "none"

   }
   
   if(dateInscription  ){

    nomClasse7.style.border = "solid 1px black"
   // nomClasse7.style.display = "none"

   }
   
   if(montantPaye  ){

    nomClasse8.style.border = "solid 1px black"
    //nomClasse8.style.display = "none"

   }
   
   if(nomParent1  ){

    nomClasse9.style.border = "solid 1px black"
    //nomClasse9.style.display = "none"

   }

    if(contactParent1 ){

    nomClasse10.style.border = "solid  1px black"
    //nomClasse10.style.display = "none"

   }
   
    if(nomParent2  ){

    nomClasse11.style.border = "solid 1px black"
    //nomClasse11.style.display = "none"
    
   }
   
   if(contactParent2 ){

    nomClasse12.style.border = "solid 1px black"
    //nomClasse12.style.display = "none"

   }

   

}

alerteInitiale()

    // gestion des expressions régulières 
    let regexNomPrenom = new RegExp("^[a-zA-Z]{2,}$")

    let regexScolarite = new RegExp("^[0-9]{1,6}$")

    let reagexTel = new RegExp("^[0-9]{1,20}$")

    let regexEmail = new RegExp("[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+")

    ////////////////////////////////////////

     //gestion du state de l'erreur si la classe qu'on veut créer existe déjà 
     let [ classExist, setclassExist ] = useState()

    let validationBtn = document.querySelector(".form__confirme--valid")

    const submit = (e) => {

       
        e.preventDefault()

        if( !anciennete || !nom || !prenom  || !dateNaissance || !sectionNumber
        || !classes_id || !dateInscription || !montantPaye || !nomParent1 || !contactParent1 ){
    
            setalerteForm(true)

            if( !nom || regexNomPrenom.test( nom ) === false ){


                setalerteForm(true)
                const nomClasse = document.querySelector(".nom")
                nomClasse.style.border = "solid 1px red"

            } 
            
            if( !anciennete){

                  
                setalerteForm(true)
    
                const nomClasse = document.querySelector(".formulaireRadio__option")
                nomClasse.style.border = "solid 1px red"

            }

            if( !prenom || regexNomPrenom.test( prenom ) === false ){

                setalerteForm(true)
                const nomClasse = document.querySelector(".prenom")
                
                nomClasse.style.border = "solid 1px red"

            }  
            
            if( !dateNaissance ){

                setalerteForm(true)

                const nomClasse = document.querySelector(".dateNaissance")
                nomClasse.style.border = "solid 1px red"

            } 

            if( !sectionNumber){

                setalerteForm(true)
    
                const nomClasse = document.querySelector(".section")
                nomClasse.style.border = "solid 1px red"

            }  

            if( !classes_id){

                setalerteForm(true)
    
                const nomClasse = document.querySelector(".classe")
                nomClasse.style.border = "solid 1px red"

            }  
            
            if( !dateInscription ){

                setalerteForm(true)

                const nomClasse = document.querySelector(".dateInscription")
                nomClasse.style.border = "solid 1px red"

            } 
            
            if( !parseInt(montantPaye) || regexScolarite.test( parseInt(montantPaye)) === false ){

                setalerteForm(true)
                const nomClasse = document.querySelector(".montantPaye")
                nomClasse.style.border = "solid 1px red"

            }  
            
            if( !nomParent1 || regexNomPrenom.test( nomParent1 ) === false ){

                setalerteForm(true)
                const nomClasse = document.querySelector(".nomParent1")
                nomClasse.style.border = "solid 1px red"

            }
            
            if( !parseInt(contactParent1 ) || reagexTel.test( parseInt(contactParent1 )) === false ){

                setalerteForm(true)
                const nomClasse = document.querySelector(".contactParent1 ")
                nomClasse.style.border = "solid 1px red"

            }  
            
            if( nomParent2  ){

                if( regexNomPrenom.test( nomParent2 ) === false){

                    setalerteForm(true)
                    const nomClasse = document.querySelector(".nomParent2")
                    nomClasse.style.border = "solid 1px red"

                }

            }
            
            if( parseInt(contactParent2 ) ){

                if( reagexTel.test( parseInt(contactParent2 )) === false ){

                    setalerteForm(true)
                    const nomClasse = document.querySelector(".contactParent1 ")
                    nomClasse.style.border = "solid 1px red"

                }

            }
            
            } else{

                elevesServices.createEleve({...inputRadio, ...valInput, ...valDateDecouverte, ...valDate, ...valSection, ...valClasse, ...valInputParent})
                .then( res => {
                   
                    confirmationEleveCreate() 

                })
                .catch( err => {

                    setclassExist(`Vous ne pouvez pas créer l'élève ${nom} car il existe déjà` )
                 
                    console.log(` **** l'élève ${nom} existe déjà : ` + err)
                   
                
                })

            }

     
    }

    return (

        <div className='createElevesContainer'>

             { alerteForm &&   <p className='alerteError'>Tous les champs avec étoiles ou en rouge doivent être remplis</p> }
             { classExist &&   <p className='alerteError' style={{ color: 'red', fontSize: '16px', fontWeight: 'bold' }} >{classExist}</p> }
             { 
             
             
                eleveCreate && <p className='titreTiming'>L'élèvé a été crée avec succès</p> }

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
                            <input type='date'   name='decouverteDateArrivee' id='decouverteDateArrivee'  value={    valTextarea.dateArrivee }   className='dateSectionClasse' />
                           
                        </form>}

                        <form  className='formulaireInputNomPrenom'>
                            <div className='formulaireInputNomPrenom__nomPrenom '>
                                <label for="nom"> Nom <span className='etoile'>*</span></label>
                                <input type='text' name='nom' id='decouverteEcole nomPrenom' className='nomPrenom nom' value={ valInput.nom }  onChange={ nomPrenomInput }  maxLength={200} />
                               
                               
                            </div>
                            <div className='formulaireInputNomPrenom__nomPrenom'>
                                <label for="prenom"> Prénom <span className='etoile'>*</span></label>
                                <input type='text' name='prenom' id='prenom' className='nomPrenom prenom' value={ valInput.prenom }  onChange={ nomPrenomInput }  maxLength={200} />
                            </div>
                        </form>

                        <div className='formulaireDateSectionClasse'>
                            <form className='formulaireDateSectionClasse__element' onChange={ dateInput } >
                                <label for="dateNaissance">Date de naissance <span className='etoile'>*</span></label>
                                <input type='date'   name='dateNaissance' id='dateNaissance' value={ valDate.dateNaissance}  className='dateSectionClasse dateNaissance'/>
                            </form>
                            <form className='formulaireDateSectionClasse__element' onChange={ sectionInput } >
                                <label for="classe" className='formulaireDateSectionClasse__element--titre'> Section <span className='etoile'>*</span></label>
                                <select name="sections" id='formulaireDateSectionClasse__element--select'  className='dateSectionClasselist section' >
                                    
                                    <option value="vide" > </option>
                                    <option value="anglophone"  >Anglophone</option>
                                    <option  value="francophone"  >Francophone </option >

                                </select>
                            </form>
                            <form className='formulaireDateSectionClasse__element' onChange={ classeInput }>
                                
                                <label for="classe" className='formulaireDateSectionClasse__element--classe'>Classe <span className='etoile'>*</span></label>
                                <select name="sections" id='formulaireDateSectionClasse__element--select' className='dateSectionClasselist classe' >

                                <option value="vid"  >  </option>
                                    { listeClassesContext.map( (classe, index) => 
                                        
                                        <option value={ classe.nom } key={classe-`${index}`} > { classe.nom } </option>)
                                    
                                    } 

                                </select>
                            </form>
                            <div className='formulaireDateSectionClasse__element'>
                                    
                                <label for="dateInscription" className='formulaireDateSectionClasse__element--classe'>Date d'inscription <span className='etoile'>*</span></label>
                                <input type='date' name='dateInscription' id='dateInscription' value= {   valInputParent.name}  className='DatemontantPaye dateInscription' onChange={ parentInput } />
                            </div>

                            <div className='formulaireDateSectionClasse__element'>
                                    
                                <label for="contactParent2" className='formulaireDateSectionClasse__element--classe'>Montant scolarité payé <span className='etoile'>*</span></label>
                                <input type='text' name='montantPaye' id='montantPaye'  placeholder='0 FCFA'  value= { valInputParent.name } className='DatemontantPaye montantPaye' onChange={ parentInput } />
                            </div>

                        </div>
                        
                        <div className='formulaireReprésentants'>
                            <p className='formulaireReprésentants__titre'>Représentants légaux</p>
                            
                            <form className='formulaireDateSectionClasseContainer'>

                                <div className='formulaireDateSectionClasseContainer__parent'>
                                    
                                    <label for="nomParent1" className='formulaireDateSectionClasse__element--classe'>Parent 1 <span className='etoile'>*</span></label>
                                    <input type='text' name='nomParent1' id='nomparent1' value= {  valInputParent.name } className='parent nomParent1' onChange={ parentInput } />
                                </div>
                                <div className='formulaireDateSectionClasseContainer__parent'>
                                    
                                    <label for="contactParent1" className='formulaireDateSectionClasse__element--classe'>Tel parent 1 <span className='etoile'>*</span></label>
                                    <input type='text' name='contactParent1' id='telparent1' value= { valInputParent.name } className='parent contactParent1' onChange={ parentInput } />
                                </div>
                                <div className='formulaireDateSectionClasseContainer__parent'>
                                    
                                    <label for="nomParent2" className='formulaireDateSectionClasse__element--classe'>Parent 2</label>
                                    <input type='text' name='nomParent2' id='parent2' value= { valInputParent.name } className='parent nomParent2' onChange={ parentInput } />
                                </div>
                                <div className='formulaireDateSectionClasseContainer__parent'>
                                    
                                    <label for="contactParent2" className='formulaireDateSectionClasse__element--classe'>Tel Parent 2</label>
                                    <input type='text' name='contactParent2' id='telParent2' value= { valInputParent.name } className='parent contactParent2' onChange={ parentInput } />
                                </div>
                               

                            </form>
                            
                        </div>

                        <div className='formulaireConfirm'>
                            <div className='formulaireConfirm__container'></div>
                            <div className='formulaireConfirm__btn'>
                                < button className='form__confirme--cancel  colorCancel' onClick={ lockAddEleveWindow } > Annuler</button>

                                <button  type='submit'  className='form__confirme--valid  colorValid' onClick={   submit }> Valider</button>
                            </div>
                            
                        </div>

                    </form>
                    
                </div>
                
        </div>
        
    );
};

export default CreateEleves;



