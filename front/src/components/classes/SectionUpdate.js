import React, {  useState, useEffect} from 'react'; 
//import { classesServices } from '@/_services/Classes.services';
import { classesServices } from '../../_services/Classes.services';

const SectionUpdate = ( { classes, windowAddClasse, lockWindowAddClasse, openwindowUpdateClasse, lockwindowUpdateClasse, idclasse}) => {

  //gestion du state des sections
  let [ sectionChoice, setSectionChoice ] = useState({})
  
  //gestion du state de l'id insertion 
  let [ idVal, setIdVal ] = useState({})

   //gestion du state de confirmation de mise à jour du composant
    
   let [ classeUpdate1, setClasseUpdate1 ] = useState(false)
   let [ hidenUpdate, setHidenUpdate ] = useState(true)

    //récupération de classe encours
    const classeCurrent = classes.find(element => element.id === idclasse)

    //conversion des section_id en lettre 
    let sectionNumber //section
    
    if(classeCurrent.section_id === 1){  //section_id

        sectionNumber = "Anglophone"
    
    }else if(classeCurrent.section_id === 2) { //section_id
        
        sectionNumber = "Francophone" //section
 
    }
    
    //gestion du state des formulaires
    let [ input, setInput ] = useState({

        id: classeCurrent.id,
        nom: `${classeCurrent.nom}`,
        enseignant: `${classeCurrent.enseignant}`,
        section_id: sectionNumber // sectionNumber, // section //section_id
        

    })

    //récupérations des inputs du formulaire
    const onchange = (e) => {

        setInput({

            ...input,
            [e.target.name] : e.target.value,
            //sectionChoice //section
        })

        

        setIdVal({
            ...idVal,
            "id" : idclasse
        })
   
    }

    
    //récupération du data-anglophone
    const dataSelect = (e) => {
 
        setSectionChoice({
  
            ...sectionChoice,
            section_id : e.target.value //sectionNumber
        })
  
    }
   ///////////////////////////////////////////////:::: 

    //confirmation de la mise à jour
   let confirmation1 = () => {

   
        setClasseUpdate1(true)
        setHidenUpdate(false)
       

        //cacher la confirmation après 3000 millisecondes
        setTimeout( () => {

            
            setClasseUpdate1(false)
            window.location.reload();
            
        }, 3000)
       
       

    }

    ///////////////////////////////////////////////:::: 

    let classeObject = {  ...idVal, ...input, ...sectionChoice } 

    
    //soumission du formulaire
    let onsubmit = (e) => {

        e.preventDefault()

        classesServices.updateClasse( classeObject ) //insertion du state de l'input dans la requete
        .then( res => {

          confirmation1()
          //window.location.reload();
          
        })
        .catch( err => console.log(err))

    }
    

    return (

       <>
        { classeUpdate1 && <p className='titreTiming'>La classe a été modifiée avec succès</p> }
        
       

         { hidenUpdate && <div className='AddClassContainer'>
            
            <div className='AddClassContainer__option'>
                <p className='AddClassContainer__option--titre'>
                    Modifier la classe 
                </p>
                <div className='AddClassContainer__option--picture'>
                  
                    <i className="fa-thin fa-x" onClick={ lockwindowUpdateClasse}></i>
                   
                </div>
            </div>

            <div className='AddClassContainer__entete'>

                <div className='AddClassContainer__entete--classe' >
                    <div className='block'>
                        <span className='titre'>Nom de la class</span><span className='etoile'>*</span>
                    </div>
                </div>
                <div className='AddClassContainer__entete--enseignant' >
                    <div className='block'>
                        <span className='titre'>Enseignant</span><span className='etoile'>*</span>
                    </div>
                </div>
                <div className='AddClassContainer__entete--section' >
                    <div className='block'>
                        <span className='titre'>Section</span><span className='etoile'>*</span>
                    </div>
                </div>

            </div>
          
            <form className='form'>

                <div className='form__entete'>

                        <input  type='text' className='form__entete--classe nomClasse'     name='nom'  value={input.nom} onChange={onchange} />

                        <input  type='text' className='form__entete--enseignant enseignant'   name='enseignant' value={input.enseignant} onChange={onchange} />
                        
                    <form className='form2 section' >
                    
                        <select name="sections" id='sections' onChange={ dataSelect }  >
                            
                            <option value={`${input.sectionNumber}`} > {sectionNumber}</option>
                            <option value="anglophone"  >Anglophone</option>
                            <option  value="francophone"  >Francophone </option >

                        </select>
                
                    </form>

                </div>

                <div className='form__confirm'>
                    < button className='form__confirme--cancel  colorCancel' onClick={ lockwindowUpdateClasse }> Annuler</button>
                    <button className='form__confirme--valid  colorValid' onClick={ onsubmit } > Valider</button>
                </div>
               
            </form>
   
        </div> }
   
        </>
    );
};

export default SectionUpdate;
