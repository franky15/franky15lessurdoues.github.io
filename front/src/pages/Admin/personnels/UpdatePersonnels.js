
import React, { useState, useContext } from 'react';

//import { elevesServices } from '../../_services/Eleves.services';
import { personnelServices } from '../../../_services/Personnels.services';
import { AddEleveContext } from '../../../_utils/ContextAddEleve';
import { elevesServices } from '../../../_services/Eleves.services';


//import { AddEleveContext } from '../../_utils/ContextAddEleve';


                                //listeClassesContext,idClasse,
const UpdatePersonnels  = ({  personnelId,  openAddEleveWindow ,lockAddEleveWindow, addEleveWindow, listePersonnelContext  }) => {     //{lockAddEleveWindow }

    const { listeClassesContext, listeElevesContext } = useContext(AddEleveContext)

    let idPersonnel = personnelId.idPersonnel;
        console.log("*** idPersonnel : " + idPersonnel)
    
    console.log("** listeClassesContext dans updatePersonnel")
    console.log( listeClassesContext)

    //récupération du personnel encours
    const personnelCurrent = listePersonnelContext.find( element => element.id === idPersonnel)

    console.log("** personnelCurrent encours  dans updatePersonnel est ")
    console.log( personnelCurrent)

    //récupération de la classe en cours
    const classeCurrent = listeClassesContext.find( element => element.id === personnelCurrent.classes_id )

    console.log("** la classe encours  dans updatePersonnel est")
    console.log( classeCurrent)



    /////////////////////////

    //gestion du gros object pour un seul formulaire
    let [ formPersonnel, setFormPersonnel ]  = useState({

        nom : `${personnelCurrent.nom}`,
        prenom : `${personnelCurrent.prenom}`,
        contact : `${personnelCurrent.contact}`,
        email : `${personnelCurrent.email}`,
        groupeSalariale: `${personnelCurrent.groupeSalariale}`,
        poste : `${personnelCurrent.nom}`,
        section : `${personnelCurrent.section_id}`,
        classe : `${ classeCurrent.nom}`,//`${personnelCurrent.classes_id }`, //
        salaire : `${personnelCurrent.salaire}`


    })

    const personnelFunction = (e) => {

        setFormPersonnel({

            ...formPersonnel,
            [e.target.name] : e.target.value

        }) 


    }

    console.log("***formPersonnel")
    console.log(formPersonnel)
    /////////////////////////



  

    console.log("** listePersonnelContext dans updatePersonnel")
    console.log( listePersonnelContext)
    // gestion du state de l'input radio
    let [ inputRadio, setInputRadio ] = useState({})


        ///////////////////////////////////////////////:::: 

        let [ eleveCreate, setEleveCreate ] = useState(false) //false
        //let [ hidenEleveCreate, setHidenEleveCreate ] = useState(true)
     
         //confirmation de la mise à jour
        let confirmationPersonnelUpdate = () => {
     
        
         setEleveCreate(true)
        // setHidenEleveCreate(false)
        
     
         //cacher la confirmation après 3000 millisecondes
         setTimeout( () => {
     
             
             setEleveCreate(false)
             window.location.reload();
             
         }, 3000)
        
        
     
     }
     
      ///////////////////////////////////////////////:::: 

      let id = { id:idPersonnel }
      let personnelObject = {...id, ...formPersonnel}
      console.log("***** personnelObject")
      console.log(personnelObject)
      
    const submit = () => {

        
        //e.preventDefault()

       // let personnelObject = {...idPersonnel, formPersonnel}
        console.log("bienvenue au submit test de updatePersonnel")
                                                                    //valTextarea
         personnelServices.updatePersonnel(personnelObject)
            .then( res => {
                console.log("données du formulaire envoyées")
                console.log(res)
                //navigate("/admin/classes" ) 
               ////////////////////////////

               confirmationPersonnelUpdate()

               ////////////////////////////
            })
            .catch( err => console.log(err))
        
    }

    


    return (

        <div className='addpersonnelContainer'>

        
            <div className='addpersonnel'>
                
                <p className='titlePersonnel'>Ajouter un personnel</p>
                <p className='descriptionPersonnel'>Veuillez compléter les champs ci-dessous puis cliquer sur le bouton « Valider » pour modifier un personnel </p>
                <hr></hr>

                <form className='addpersonnel__form'>

                    <form  className='formulaireInputNomPrenom'>

                        <div className='formulaireInputNomPrenom__nomPrenom'>
                            <label for="nom"> Nom <span className='etoile'>*</span></label>
                            <input type='text' name='nom' id='decouverteEcole nomPrenom' className='nomPrenom' value={ formPersonnel.nom }  onChange={  personnelFunction }  maxLength={200} />
                        </div>
                        <div className='formulaireInputNomPrenom__nomPrenom'>
                            <label for="prenom"> Prénom <span className='etoile'>*</span></label>
                            <input type='text' name='prenom' id='prenom' className='nomPrenom' value={ formPersonnel.prenom }  onChange={ personnelFunction }  maxLength={200} />
                        </div>
                        <div className='formulaireInputNomPrenom__nomPrenom'>
                            <label for="contact">Tel <span className='etoile'>*</span></label>
                            <input type='text' name='contact' id='tel' className='nomPrenom' value={ formPersonnel.contact }  onChange={ personnelFunction }  maxLength={200} />
                        </div>
                        <div className='formulaireInputNomPrenom__nomPrenom'>
                            <label for="email"> Email <span className='etoile'>*</span></label>
                            <input type='text' name='email' id='email' className='nomPrenom' value={ formPersonnel.email }  onChange={ personnelFunction }  maxLength={200} />
                        </div>
                    
                    </form>

                    <form  className='formulaireInputgroupeSalarial'>

                        <form className='formulaireInputgroupeSalarial__element' onChange={ personnelFunction } >
                            <label for="groupeSalarial" className='formulaireInputgroupeSalarial__element--titre'> Groupe Salarial <span className='etoile'>*</span></label>
                            <select name="groupeSalariale" id='formulaireInputgroupeSalarial__element--select'  className='formulaireInputgroupeSalarial__element--select' >
                                
                                <option value={`${ formPersonnel.groupeSalariale}`} >{ formPersonnel.groupeSalariale} </option>
                                <option value="fondatrice" >Fondateur(s)</option>
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

                        <form className='formulaireInputSectionClasseSalaire__element' onChange={ personnelFunction } >
                            
                            <label for="classe" className='formulaireDateSectionClasse__element--titre'> Section <span className='etoile'>*</span></label>
                            <select name="section" id='formulaireDateSectionClasse__element--select'  className='dateSectionClasselist' >
                                


                                
                                        
                                { parseInt(formPersonnel.section) === 1  ? 

                                    <option value={ formPersonnel.section }>{ "Anglophone" }</option>
                                        
                                    : 

                                    <option value={ formPersonnel.section }>{ "Francophone" }</option>
                                }

                                
                                <option  value={ "1" }  >Anglophone </option >
                                <option  value={ "2" }  >Francophone </option >
                               

                            </select>
                            
                        </form>

                        <form className='formulaireInputSectionClasseSalaire__element' onChange={ personnelFunction }>
                                    
                            <label for="classe" className='formulaireDateSectionClasse__element--classe'>Classe <span className='etoile'>*</span></label>
                            <select name="classe" id='classe' className='classe' >

                                <option value={ formPersonnel.classe }  > { classeCurrent.nom} </option>
                                
                                { listePersonnelContext.map( (perso, index) => 

                                    listeClassesContext.map(classe => classe.id === perso.classes_id &&
                                        
                                        <option value={ classe.nom } key={classe-`${index}`} > { classe.nom } </option>)
                                        
                                )}
                             

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

//<option value={`${ formPersonnel.section_id}`} > { classeCurrent.section_id} </option>



/*
<option  value="anglophone"  >Anglophone </option >
<option  value="francophone"  >Francophone </option >

 <option value={ formPersonnel.section }  >Anglophone</option>
<option  value={ formPersonnel.section}  >Francophone </option >


{ listeClassesContext.map( perso => perso.id === formPersonnel.section &&
                                        
        <>
        
            { perso.id === 1  ? 

                <option value={`${ formPersonnel.section}`}>{ "Anglophone2" }</option>
                    
                : 

                <option value={`${ formPersonnel.section}`}>{ "Francophone2" }</option>
            }

            
        </> 

    )
    
}



*/



/*
 <div className='addpersonnelContainer'>

        
            <div className='addpersonnel'>
                
                <p className='titlePersonnel'>Ajouter un personnel</p>
                <p className='descriptionPersonnel'>Veuillez compléter les champs ci-dessous puis cliquer sur le bouton « Valider » pour modifier un personnel </p>
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
                            <label for="groupeSalarial" className='formulaireInputgroupeSalarial__element--titre'> Groupe Salarial <span className='etoile'>*</span></label>
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
                                
                                <option value={`${ classeCurrent.section_id}`} > { classeCurrent.section_id} </option>
                                <option value="anglophone"  >Anglophone</option>
                                <option  value="francophone"  >Francophone </option >

                            </select>
                            
                        </form>

                        <form className='formulaireInputSectionClasseSalaire__element' onChange={ classeInput }>
                                    
                            <label for="classe" className='formulaireDateSectionClasse__element--classe'>Classe <span className='etoile'>*</span></label>
                            <select name="classe" id='classe' className='classe' >

                            <option value={`${ classeCurrent.nom}`}  > { classeCurrent.nom} </option>
                                { listePersonnelContext.map( (classe, index) => 
                                    
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
*/