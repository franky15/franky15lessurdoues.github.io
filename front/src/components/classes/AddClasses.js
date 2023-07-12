import React, {  useState } from 'react'; 
import { classesServices } from '@/_services/Classes.services';
import { useNavigate } from 'react-router-dom';
//import SectionAdd from './SectionAdd';
//import SectionUpdate from './SectionUpdate';


const AddClasses = ( { windowAddClasse, lockWindowAddClasse } ) => {  //{ windowAddClasse, lockWindowAddClasse, openwindowUpdateClasse, lockwindowUpdateClasse, windowUpdateClasse }

    let navigate = useNavigate()

    //gestion du state des formulaires
    let [ input, setInput ] = useState({})

    //gestion du state des sections
    let [ sectionChoice, setSectionChoice ] = useState([])


    const display = ( windowAddClasse, setWindowAddClasse) => {
        
        console.log("bienvanu dans addClasses")
        lockWindowAddClasse()
    }
    
    
    //récupération du data-anglophone
    const dataSeclect = (e) => {

       console.log("*****clique sur anglophone*****")
       console.log(e.target.value)
        
       setSectionChoice({

            ...sectionChoice,
            sectionNumber : e.target.value
        })

    }
    console.log("*****valeur du state de la sectionChoice  extérieure : *****")
    console.log(sectionChoice)

     //récupérations des inputs du formulaire
     const onchange = (e) => {

        setInput({

            ...input,
            [e.target.name] : e.target.value,
            //sectionChoice //section
        })
            
    }
    console.log("*****valeur du state de l'input : *****") 
    console.log(input)
    
    console.log("*****fusion des states : *****")
    console.log({...input, ...sectionChoice})

    //soumission du formulaire
    let onsubmit = (e) => {


        e.preventDefault()
        classesServices.addClasse( {...input, ...sectionChoice} ) //insertion du state de l'input dans la requete
            .then( res => {
                console.log("données du formulaire envoyées")
                console.log(res)
                navigate("/admin/classes")
            })
            .catch( err => console.log(err))

    }
    

    return (
        <div className='AddClassContainer'>
            <div className='AddClassContainer__option'>
                <p className='AddClassContainer__option--titre'>
                    Veuillez renseigner les champs suivant pour ajouter une classe 
                </p>
                <div className='AddClassContainer__option--picture'>
                  
                    <i className="fa-thin fa-x" onClick={ display }></i>
                   
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
            <hr className='ligne'></hr>
            <form className='form'>

                <div className='form__entete'>

                        <input  type='text' className='form__entete--classe' name='nom'  value={input.name} onChange={onchange} />

                        <input  type='text' className='form__entete--enseignant' name='enseignant' value={input.name} onChange={onchange} />
                        
                    <form className='form2' >
                    
                        <select name="sections" id='sections' onChange={ dataSeclect } >
                            
                            <option value="vid" > </option>
                            <option value="anglophone"  >Anglophone</option>
                            <option  value="francophone"  >Francophone </option >

                        </select>
                
                    </form>

                </div>

                <div className='form__confirm'>
                    < button className='form__confirme--cancel  colorCancel' onClick={ display }> Annuler</button>
                    <button className='form__confirme--valid  colorValid' onClick={ onsubmit }> Valider</button>
                </div>

            </form>

        </div>
    );
};

export default AddClasses;
