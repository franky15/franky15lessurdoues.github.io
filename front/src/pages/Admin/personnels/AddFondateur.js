import React,{ useEffect, useState} from 'react';
import { personnelServices } from '../../../_services/Personnels.services';

const AddFondateur = ({ listeClassesContext, lockaddEnseignantgroupe} ) => {
    
    
    
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
      
        //cacher la confirmation après 3000 millisecondes
        setTimeout( () => {
    
            
            setEleveCreate(false)
            window.location.reload();

            /////////////////////////////
            //lockaddEnseignantgroupe()
            /////////////////////////////
            
        }, 1)
    }
    const submit = () => {

        
        //e.preventDefault()

        console.log("bienvenue au submit test de addpersonnels")
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
        <div>
            <h1>bienvenue dans AddFondateur</h1>

            {  
               
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
                               <label for="email"> Email <span className='etoile'> </span></label>
                               <input type='text' name='email' id='email' className='nomPrenom' value={ formPersonnel.email }  onChange={ personnelFunction }  maxLength={200} />
                           </div>
                       
                       </form>

                       <form  className='formulaireInputgroupeSalarial'>

                           <form className='formulaireInputgroupeSalarial__element' onChange={ personnelFunction } >
                               <label for="groupeSalarial" className='formulaireInputgroupeSalarial__element--titre'> Groupe Salarial <span className='etoile'>*</span></label>
                               <select name="groupeSalariale" id='formulaireInputgroupeSalarial__element--select'  className='formulaireInputgroupeSalarial__element--select' >
                                   
                                   <option value="vide" > </option>
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

                            <div className='formulaireInputSectionClasseSalaire__element'>
                                <label for="salaire"> Salaire <span className='etoile'>*</span></label>
                                <input type='text' name='salaire' id='salaire' className='salaire' value={ formPersonnel.salaire }  onChange={ personnelFunction }  maxLength={200} />
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
                   
               }
        </div>
    );
};

export default AddFondateur;

/*

 <div className='formulaireInputSectionClasseSalaire__element'>
    <label for="salaire"> Salaire <span className='etoile'>*</span></label>
    <input type='text' name='salaire' id='salaire' className='salaire' value={ formPersonnel.salaire }  onChange={ personnelFunction }  maxLength={200} />
</div>
*/