import React, { useState, useContext } from 'react'; //, useRef,useEffect
import { AddEleveContext } from '../../_utils/ContextAddEleve';
import { useNavigate } from 'react-router-dom';

const GetAllClassesEleves = () => {

    console.log("***** Bienvenue dans le GetAllClassesEleves ******")

    let navigate = useNavigate()

    const {listeClassesContext, listePositionPageContext} = useContext(AddEleveContext)

    let openpositionEleveContext = listePositionPageContext[1].openpositionEleveContext()
    
    console.log("**** openpositionEleveContext  dans getallpersonnels")
    console.log(openpositionEleveContext)

    //gestion du choix des sections
    //let [ classeChoice, setClasseChoice ] = useState([])

    //gestion de l'input de la recherche
    let [ inputSearch, setInputSearch ] = useState({})
       

    //gestion de l'affichage et masquage de l'input de la recherche
    let [ inputSearchShow, setInputSearchShow ] = useState(true)

   

    //gestion du focus sur la recherche
    let [ isFocused , setIsFocus ] = useState(false)
 
    
    
    const sectionAnglophone = listeClassesContext.filter( classe => classe.section_id === 1)
    const sectionFrancophone = listeClassesContext.filter( classe => classe.section_id === 2)
    

    //console.log("listeClassesContext GetAllClassesEleves")
    //console.log(listeClassesContext)

    
   ///////////////////////////////////////////////////////////////////
    const getElevesOneClasse = (idClasse) => {

        console.log("idClasse est : " + idClasse)
        
        //navigate(`/admin/eleves/getallclasseseleve/GetOneClasseEleves/${idClasse}`)

        navigate(`/admin/eleves/getallclasseseleve/${idClasse}`)

    }
    ///////////////////////////////////////////////////////////////////
    //console.log("classeChoice est : ")
    //console.log(classeChoice)

    
    /////////////////://////////////
    let searchClasse = (e) => {

        setInputSearch({
            ...inputSearch,
            [e.target.name] : e.target.value  ///.toLowerCase()
        })
        

    }
   // console.log("**** inputSearch est ")
    //console.log(inputSearch)

    const inputSearchClassesFilter = listeClassesContext.filter( element => element.nom === inputSearch.filtreClasseEleve )

    console.log("inputSearchClassesFilter resultat recherche ")
    console.log(inputSearchClassesFilter)

    console.log("inputSearchClassesFilter.length")
    console.log(inputSearchClassesFilter.length)
    //////////////////////////////

    /////////////////////////////
    let [ placeholder, setPlaceholder ] = useState({ place: 'Filtrer sur une ou plusieurs classes'})
    

    let openFocus = () => {

        setInputSearchShow(false)  
        setIsFocus(true)
    }
    
    let lockFocus = () => {

       // console.log("bienvenueeeeeeee ")
       if(inputSearchClassesFilter.length === 0) {

        setPlaceholder({
            ...placeholder,
            place: 'Filtrer sur une ou plusieurs classes'
        })
        setInputSearchShow(true)
        setIsFocus(false)
       }
       setIsFocus(false)
    }
    
    return (
        
        <div className='GetAllClassesEleves'>

        
                        <div  className='GetAllClassesEleves__filter'>
                            
                            <p className='GetAllClassesEleves__filter--input'> <span className='loupe'> <i className="fa-solid fa-magnifying-glass"></i> </span> <input type='text' placeholder={`${placeholder.place}`}  name='filtreClasseEleve' value={ inputSearch.filtreClasseEleve }  onFocus={openFocus} onBlur={lockFocus} onChange ={ searchClasse } />  </p>
                        </div>

                        
                    { 
                       
                        inputSearchShow  ?
                        <>
                            <div className='GetAllClassesEleves__section' >
                                <p className='sectionTitre'>Section Anglophone </p>
                                {
                                    sectionAnglophone.map( (classe, index) => 
                                    { 
                                        const backgroundColor = index % 2 === 0 ? "#eaeaea" : "white" ;
                                        
                                    return <p className='GetAllClassesEleves__section--value'  key={`index-${classe.nom}`} style= {{ backgroundColor }} onClick={ () => getElevesOneClasse( classe.id ) } >Student(s)  { classe.nom.toUpperCase() }</p> 
                                    }
                                        
                                    )  
                                }

                            </div>

                            <div className='GetAllClassesEleves__separateur'></div>

                            <div className='GetAllClassesEleves__section' >
                                <p className='sectionTitre'>Section Francophone</p>
                                {
                                sectionFrancophone.map( (classe, index) => 
                                
                                { 
                                    const backgroundColor = index % 2 === 0 ? "#eaeaea" : "white" ;
                                return <p className='GetAllClassesEleves__section--value' key={`index-${classe.nom}`} style= {{ backgroundColor }} onClick={ () => getElevesOneClasse( classe.id ) } >Elève(s) { classe.nom.toUpperCase() }</p> 
                                }
                                
                                )  
                                }
                                
                            </div> 
                        </> 
                        :
                        <>
                            <div>

                                {
                                    
                                   inputSearchClassesFilter.map( (classe, index) => 
                                    { 
                                        const backgroundColor = index % 2 === 0 ? "#eaeaea" : "white" ;
                                        
                                    return <p className='GetAllClassesEleves__section--value'  key={`index-${classe.nom}`} style= {{ backgroundColor }} onClick={ () => getElevesOneClasse( classe.id ) } >Elève(s){ classe.nom.toUpperCase() }</p> 
                                    }
                                        
                                    )  
                                }
                            </div>
                        </>
                       
                    }
                
                     
                    
                
           
                    
                           
            
        </div>
    );
};

export default GetAllClassesEleves;

//placeholder='Filtrer sur une ou plusieurs classes'