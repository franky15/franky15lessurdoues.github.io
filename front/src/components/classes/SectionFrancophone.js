import React, {  useState, useEffect} from 'react';
import SectionUpdate from './SectionUpdate';
import DeleteClasses from './DeleteClasses';
//import { classesServices } from '../../../_services/Classes.services';


const SectionFrancophone = ({classes}) => {

    //gestion du state des quantité de classes Anglophone
    let [ classesFilterAnglo, setClassesFilterAnglo ] = useState([])

    //gestion du state des  quantité de classes Francophone ////////////////////////////
    let [ classesFilterFranco, setClassesFilterFranco ] = useState([])
        

    //gestion de l'affichage des valeurs////////////////////////////
    let [ startIsOpen, setStartIsOpen ] = useState(true)

    let lockGet = () => setStartIsOpen(false); 
    let openGet = () => setStartIsOpen(true); 

    //ouverture Anglophone////////////////////////////
    let [ sectionAnglophoneOpen, setsectionAnglophoneOpen ] = useState(false)

    let openAn = () => setsectionAnglophoneOpen(true);
    let lockAn = () => setsectionAnglophoneOpen(false);

     //ouverture Francophone////////////////////////////
    let [ sectionFrancophoneOpen, setsectionFrancophoneOpen ] = useState(false)

    let openFr = () => setsectionFrancophoneOpen(true);
    let lockFr = () => setsectionFrancophoneOpen(false);

    //gestion de la valeur de l'input ////////////////////////////
    let [ valeurInput, setValeurInput ] = useState("")

    //gestion de l'affichage des valeurs////////////////////////////
    let [ valeurInputIsOpen, setValeurInputIsOpen ] = useState(true)

    let lockInput = () => setValeurInputIsOpen(false); 
    let openInput = () => setValeurInputIsOpen(true); 

    //gestion de l'affichage de la feêtre ajouter une classe
    let [ windowAddClasse, setWindowAddClasse ] = useState(false) //false

    let lockWindowAddClasse = () => setWindowAddClasse(false); 
    let openWindowAddClasse = () => setWindowAddClasse(true); 

    //gestion de l'affichage de la feêtre ajouter une classe
    let [ windowUpdateClasse, setWindowUpdateClasse ] = useState(false) //false

    let lockwindowUpdateClasse = () => setWindowUpdateClasse(false); 
    let openwindowUpdateClasse = () => setWindowUpdateClasse(true); 

    //gestion de la suppréssion
    let [ windowDeleteClasse, setWindowDeleteClasse ] = useState(false)

    let lockwindowDeleteClasse = () => setWindowDeleteClasse(false); 
    let openwindowDeleteClasse = () => setWindowDeleteClasse(true); 

    //gestion du dataset
    let [ classeId, setClasseId] = useState("")

    //gestion de la désactivation des élément
    let [ disabled, setDisabled ] = useState(false)

    const listeclasses = classes;

    //gestion du state des section
    let [ sectionFilterFrancophone, setSectionFilterFrancophone ] = useState([])

    useEffect( () => {
      
        //filtre des sections
        let tableFrancophone = listeclasses.filter( element => element.section_id === 2)
        setSectionFilterFrancophone(tableFrancophone)

    }, [listeclasses])


    //affichage des sections en lettre
    let section = (section_id) => {

        if(section_id === 2 ){
            section_id = "Francophone"
            return section_id
        }else{

            section_id = "Anglophone"
             return section_id
        }
        
    }


    const btnSectionAn = (classes) => {

        lockFr()
         lockGet()
         openAn()
         setDisabled(true)
         
        
     }
 
     const btnSectionFr = (classes) => {
 
        lockAn()
        lockGet()
        lockInput()
        openFr()
        setDisabled(true)
        
       
     }
     
     //ouverture de toutes les classes
     const btnAllClasses = () => {
 
         lockAn()
         lockFr()
         lockInput()
         openGet()
         setDisabled(true)
 
     }
    
     const openwindowDelete = (id) => {
 
         lockwindowUpdateClasse()
 
         setClasseId(id)
         openwindowDeleteClasse()
         
     }
    
 
     const openwindowUpdate = (id) => {
         
         setClasseId(id)
         openwindowUpdateClasse()
     }
 
    return (
       
        <div>
                { windowUpdateClasse && < SectionUpdate classes = { classes}  windowAddClasse = { windowAddClasse} lockWindowAddClasse  = { lockWindowAddClasse }
                lockwindowUpdateClasse = {lockwindowUpdateClasse} openwindowUpdateClasse = { openwindowUpdateClasse } idclasse = {classeId} /> }
               
                { windowDeleteClasse && <DeleteClasses classes = {classes} lockwindowDeleteClasse = { lockwindowDeleteClasse }  idclasse = { classeId } />   } 
                
                {sectionFilterFrancophone.map((element, index) => (  
                       
                <>
                <hr></hr>

                <div className='valeurs effectifClass' key={`index-${element.nom}`}>
                        
                    <p className='nomEffectif'> { element.nom } </p>
                    <p className='nomEffectif'> { element.effectif ?? 0 } </p>
                    <p className='enseignant'>{element.enseignant } </p>
                    <p className='section'> {  section(element.section_id) } </p>
                                
                    <div className='actionValeurs'>

                        <div className='actionValeurs__element' >
                            <i className="fa-solid fa-pen-to-square icons" title='Modifier la classe'  data-id= "idDonnee" onClick={ () => openwindowUpdate(element.id)  }></i>
                        </div>

                        <div className='actionValeurs__element'>
                            <i className="fa-solid fa-x  icons"  title='Supprimer la classe'  data-id={element.id} id= {element.id} onClick={ () => openwindowDelete(element.id)  } ></i>
                        </div>
                        <div className='actionValeurs__element  icons'>
                            <i className="fa-solid fa-circle-info" title='Afficher plus de détails' id= {element.id} onClick={ () => openwindowDelete(element.id)  } ></i>
                        </div>
                    </div>
                        
                </div>
                </>
                
                ) ) }
            
        </div>
   );
};

export default SectionFrancophone;
