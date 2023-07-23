import React, { useState, useContext } from 'react';

//import { elevesServices } from '../../_services/Eleves.services';
import { personnelServices } from '../../../_services/Personnels.services';


//import { AddEleveContext } from '../../_utils/ContextAddEleve';



const AddPersonnels = ({ listeClassesContext, openAddEleveWindow ,lockAddEleveWindow, addEleveWindow, listePersonnelContext  }) => { 

  
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
    /////////////////////////

    let [ eleveCreate, setEleveCreate ] = useState(false) //false
     //confirmation de la mise à jour
     let confirmationPersonnelCreate = () => {
     
        
        setEleveCreate(true)
       // setHidenEleveCreate(false)
       
    
        //cacher la confirmation après 3000 millisecondes
        setTimeout( () => {
    
            
            setEleveCreate(false)
            window.location.reload();
            
        }, 3000)
    }
    const submit = () => {

        
        //e.preventDefault()

        console.log("bienvenue au submit test de createEleve")
                                                                    //valTextarea
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
                            <input type='text' name='nom' id='decouverteEcole nomPrenom' className='nomPrenom' value={ formPersonnel.nom }  onChange={  personnelFunction }  maxLength={200} />
                        </div>
                        <div className='formulaireInputNomPrenom__nomPrenom'>
                            <label for="prenom"> Prénom <span className='etoile'>*</span></label>
                            <input type='text' name='prenom' id='prenom' className='nomPrenom' value={ formPersonnel.prenom }  onChange={ personnelFunction }  maxLength={200} />
                        </div>
                        <div className='formulaireInputNomPrenom__nomPrenom'>
                            <label for="contact">Tel <span className='etoile'>*</span></label>
                            <input type='text' name='contact' id='tel' className='nomPrenom' value={ formPersonnel.tel }  onChange={ personnelFunction }  maxLength={200} />
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
                                
                                <option value="vide" > </option>
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
                            
                            <label for="section" className='formulaireDateSectionClasse__element--titre'> Section <span className='etoile'>*</span></label>
                            <select name="section" id='formulaireDateSectionClasse__element--select'  className='dateSectionClasselist' >
                                
                                <option value="vide" > </option>
                                <option value="anglophone"  >Anglophone</option>
                                <option  value="francophone"  >Francophone </option >

                            </select>
                            
                        </form>

                        <form className='formulaireInputSectionClasseSalaire__element' onChange={ personnelFunction }>
                                    
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

export default AddPersonnels;
