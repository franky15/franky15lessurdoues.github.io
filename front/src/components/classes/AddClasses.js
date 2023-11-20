import React, {  useState, useEffect } from 'react'; 
//import { classesServices } from '@/_services/Classes.services';
import { classesServices } from '../../_services/Classes.services';

import { useNavigate } from 'react-router-dom';

const AddClasses = ( { windowAddClasse, lockWindowAddClasse } ) => {  //{ windowAddClasse, lockWindowAddClasse, openwindowUpdateClasse, lockwindowUpdateClasse, windowUpdateClasse }

    let navigate = useNavigate()

    //gestion du state des formulaires
    let [ input, setInput ] = useState({})

    //gestion du state des sections
    let [ sectionChoice, setSectionChoice ] = useState([])


    const display = ( windowAddClasse, setWindowAddClasse) => {
        
        lockWindowAddClasse()
    }
    
    
    //récupération du data-anglophone
    const dataSeclect = (e) => {

       setSectionChoice({

            ...sectionChoice,
            sectionNumber : e.target.value
        })

    }

     //récupérations des inputs du formulaire
     const onchange = (e) => {

        setInput({

            ...input,
            [e.target.name] : e.target.value, 
            //sectionChoice //section
        })
            
    }
   

    //////////////////////////////////////

    let [ alerteForm, setalerteForm ] = useState(false)

    const nomClasse1 = document.querySelector(".nom")
    const nomClasse2 = document.querySelector(".enseignant")
    const nomClasse3 = document.querySelector(".section")

    let valeurClasse = {...input, ...sectionChoice}
    let {  nom, enseignant, sectionNumber } =   valeurClasse

    useEffect( ()=> {

       

        if( enseignant || nom || sectionNumber ){
    
    
                setalerteForm(false)
        }

    },[ enseignant, nom, sectionNumber])


    


    //gestion des alerte à l'origine
    const alerteInitiale = () => {

        if( nom  ){

            nomClasse1.style.border = "solid 1px black "
            
           }
           
           if( enseignant  ){
        
            nomClasse2.style.border = "solid  0px black"
           
           }
           
           if( sectionNumber){
        
            nomClasse3.style.border = "solid  1px black"
        
           }
    }
    alerteInitiale()

     // gestion des expressions régulières 
     let regexNomPrenom = new RegExp("^[a-zA-Z]{2,}$")

    /////////////////////////////////////////

    //gestion du state de l'erreur si la classe qu'on veut créer existe déjà 
    let [ classExist, setclassExist ] = useState()


    //soumission du formulaire
    let onsubmit = (e) => {


        e.preventDefault()

        if( !enseignant || !nom || !sectionNumber){

            setalerteForm(true)

                if( !nom || regexNomPrenom.test( nom ) === false ){

                    setalerteForm(true)

                    const nomClasse1 = document.querySelector(".nom")
                    nomClasse1.style.border = "solid 1px red"

            } 

            if( !enseignant || regexNomPrenom.test( enseignant ) === false ){

                setalerteForm(true)

                const nomClasse2 = document.querySelector(".enseignant")
                nomClasse2.style.border = "solid 1px red"

            } 

            if( !sectionNumber){

                setalerteForm(true)

                const nomClasse3 = document.querySelector(".section")
                nomClasse3.style.border = "solid 1px red"

            } 
        }else{

            classesServices.addClasse( {...input, ...sectionChoice} ) //insertion du state de l'input dans la requete
            .then( res => {
              
                navigate("/admin/classes")
            })
            .catch( err => {

                setclassExist(`Vous ne pouvez pas créer la classe ${nom} car elle existe déjà` )
             
            })

        }
       

    }
   

    return (
        <div className='AddClassContainer'>

            { alerteForm &&   <p className='alerteError'>Tous les champs avec étoiles ou en rouge doivent être remplis</p> }
            { classExist &&   <p className='alerteError' style={{ color: 'red', fontSize: '16px', fontWeight: 'bold' }} >{classExist}</p> }
           
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
                    <div className='block '>
                        <span className='titre'>Nom de la classe</span><span className='etoile'>*</span>
                    </div>
                </div>
                <div className='AddClassContainer__entete--enseignant' >
                    <div className='block '>
                        <span className='titre'>Enseignant</span><span className='etoile'>*</span>
                    </div>
                </div>
                <div className='AddClassContainer__entete--section' >
                    <div className='block '>
                        <span className='titre'>Section</span><span className='etoile'>*</span>
                    </div>
                </div>

            </div>
            <hr className='ligne'></hr>
            <form className='form'>

                <div className='form__entete'>

                        <input  type='text' className='form__entete--classe nom' name='nom'  value={input.name} onChange={onchange} />

                        <input  type='text' className='form__entete--enseignant enseignant' name='enseignant' value={input.name} onChange={onchange} />
                        
                    <form className='form2 ' >
                    
                        <select name="sections" id='sections' onChange={ dataSeclect } className='section' >
                            
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

