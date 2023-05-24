import React, { useEffect, useState, useRef} from 'react'; 
import { classesServices } from '../../../_services/Classes.services';
import SectionAnglophone from '../../../components/classes/SectionAnglophone';
import SectionFrancophone from '../../../components/classes/SectionFrancophone';
import SectionSearch from '../../../components/classes/SectionSearch';
import AddClasses from '../../../components/classes/AddClasses';
import SectionUpdate from '../../../components/classes/SectionUpdate'; 
import DeleteClasses from '../../../components/classes/DeleteClasses';

const GetAllClasses = ( ) => {

    //gestion du state de toutes les classes
    let [ classes, setclasses ] = useState([])

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


    

    const flag = useRef(false)

    
    //requete de récupération de toutes les classes
    useEffect( () => {

        if(flag.current === false) {

            classesServices.getAllClasses()
            .then( res => {

                setclasses(res.data)
                
                let classAngloQuantity = res.data.filter( element => element.section_id === 1 )
                setClassesFilterAnglo(classAngloQuantity)

                let classFrancoQuantity = res.data.filter( element => element.section_id === 2 )
                setClassesFilterFranco(classFrancoQuantity)
               
            })
            .catch(err => console.log(err))
        }
        return () => flag.current = true

    }, [])

    
    

    const anglophoneRef = useRef(null);
    const francophoneRef = useRef(null);

    
    const btnSectionAn = (classes) => {

       lockFr()
        lockGet()
        openAn()
        
       
    }

    const btnSectionFr = (classes) => {

       lockAn()
       lockGet()
       lockInput()
       openFr()
       
      
    }
    
    //ouverture de toutes les classes
    const btnAllClasses = () => {

        lockAn()
        lockFr()
        lockInput()
        openGet()

    }

    ////////////////////////////
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

    ///////////////////////////
    //récupération de l'entrée de l'input et mise à jor du state
    let onchange = (e) => {

        lockGet()
        lockAn()
        lockFr()
        openInput()
      
        let value = e.target.value;
        value.length > 0 && setValeurInput( value  )
        //console.log("mon  value : " +  e.target.value)
       
    }
    console.log("valeurInput")
    console.log(valeurInput)
   
    /*
    const addClasse = (classes) => {

        console.log("ouverture de la fen^tre ajouter classes");
        openWindowAddClasse()
        
    }*/

    //récupération de la id de la classe
    const classeIdRef = useRef(null);

    const openwindowDelete = () => {

        let idClasse = classeIdRef.current.dataset.id
        setClasseId(idClasse)
        openwindowDeleteClasse()
        
        console.log("bienvenue openwindowDelete")
        console.log("idClasse current est : " + idClasse)
    }

    const openwindowUpdate = () => {

        let idClasse = classeIdRef.current.dataset.id
        setClasseId(idClasse)
        openwindowUpdateClasse()
    }


    return (

        <div className='GetAllClasses'>


            <div className='GetAllClassesContainerSection'>

                <div className='GetAllClassesContainerSection__mini'  onClick={() => btnAllClasses()}>
                    <div className='GetAllClassesContainer__mini--classes'  >
                        <span>Liste des classes</span>
                    </div>
                    <div className='GetAllClassesContainer__mini--quantity'>
                        {

                        }
                        <span> { classes.length }</span>
                    </div>
                </div>

                <div className='GetAllClassesContainerSection__mini' ref={anglophoneRef} data-section = "1" onClick={() => btnSectionAn() }> 
                    <div className='GetAllClassesContainer__mini--classes'   >
                        <span>Section Anglophone</span>
                    </div>
                    <div className='GetAllClassesContainer__mini--quantity'>
                        {

                        }
                        <span> { classesFilterAnglo.length }</span>
                    </div>
                </div>

                <div className='GetAllClassesContainerSection__mini' ref={francophoneRef} data-section = "2" onClick={() => btnSectionFr() }>  
                    <div className='GetAllClassesContainer__mini--classes'>
                        <span>Section Francophone  </span>
                    </div>
                    <div className='GetAllClassesContainer__mini--quantity'>
                        <span> { classesFilterFranco.length } </span>
                    </div>
                </div>

            </div>

            <div className='GetAllClassesContainerFiltre'>

                <div className='GetAllClassesContainerFiltre__mini1'>

                    <form  className='GetAllClassesContainerFiltre__mini1--loupe' >
                        <p>
                            <label for="recherche" className='label'>
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </label>
                            <input type="text" name="recherche" id="recherche" placeholder="Classe, Enseignant"  value={ valeurInput.name } onChange={ onchange } />
                        </p>
                    </form>

                </div>

                <div className='GetAllClassesContainerFiltre__mini2'>

                    <div className='GetAllClassesContainerFiltre__mini2--Ajout' onClick={ openWindowAddClasse }> <span>Ajouter une classe</span></div>

                </div> 
                

            </div>

            { windowAddClasse && <AddClasses classes = { classes}  windowAddClasse = { windowAddClasse} lockWindowAddClasse  = { lockWindowAddClasse }
                    lockwindowUpdateClasse = {lockwindowUpdateClasse} openwindowUpdateClasse = { openwindowUpdateClasse }/> }

            { windowUpdateClasse && < SectionUpdate classes = { classes}  windowAddClasse = { windowAddClasse} lockWindowAddClasse  = { lockWindowAddClasse }
                    lockwindowUpdateClasse = {lockwindowUpdateClasse} openwindowUpdateClasse = { openwindowUpdateClasse } idclasse = {classeId} /> }

            { windowDeleteClasse && <DeleteClasses classes = {classes} lockwindowDeleteClasse = { lockwindowDeleteClasse }  idclasse = {classeId} /> }
            
            <div className='GetAllClassesContainerTable__mini'>

                <div className='GetAllClassesContainerValeur__mini--valeur'>

                    <p className='nomEffectif'>Nom de la classe</p>
                    <p className='nomEffectif'>Effectif</p>
                    <p className='enseignant'>Enseignant</p>
                    <p className='section'>Section</p>

                </div>

                <hr></hr>

                <div className='GetAllClassesContainerValeur2__mini--valeur'>
                    
                  
                { startIsOpen ? classes.map((element, index) => (  
                  
                  <div className='valeurs' key={`index-${element.nom}`}>
                          
                      <p className='nomEffectif'> { element.nom } </p>
                      <p className='nomEffectif'> { element.effectif } </p>
                      <p className='enseignant'>{element.enseignant } </p>
                      <p className='section'> {  section(element.section_id) } </p>
                                  
                      <div className='actionValeurs'>

                          <div className='actionValeurs__element' >
                              <i class="fa-solid fa-pen-to-square" ref={ classeIdRef } data-id={`${element.id}`} onClick={ openwindowUpdate  }></i>
                          </div>
                          <div className='actionValeurs__element'>
                              <i class="fa-solid fa-x" ref={ classeIdRef } data-id={`${element.id}`} onClick={ openwindowDelete } ></i>
                          </div>
                          <div className='actionValeurs__element'>
                              <i class="fa-solid fa-circle-info" ref={ classeIdRef } data-id={`${element.id}`} ></i>
                          </div>
                      </div>
                          
                  </div> ) ) : 

                   <>
                        {
                            sectionAnglophoneOpen && <SectionAnglophone classes = { classes }/>
                            
                        }
                    
                 
                        {
                            
                            sectionFrancophoneOpen && <SectionFrancophone classes = { classes } />
                        }

                        {
                            
                            valeurInputIsOpen && <SectionSearch classes = { classes }  valeurInput = { valeurInput }/>
                        }
               
                    </>  
                  
                }

                </div>
            </div>
        </div>
    );
};

export default GetAllClasses;



