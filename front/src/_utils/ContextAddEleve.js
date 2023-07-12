import { createContext, useEffect, useRef, useState } from "react";
import { classesServices } from "../_services/Classes.services";
import { elevesServices } from "../_services/Eleves.services";




export const AddEleveContext = createContext({})

export const ContextAddEleveProvider = ({ children }) => {

    //console.log("***** Bienvenue dans le ContextAddEleve ******")

    let [ listeClassesContext, setListeClassesContext ] = useState([])

    let [ listeElevesContext, setListeElevesContext ] = useState([])

    let flag = useRef(false)

    //requete de récupération de toutes les classes
    useEffect( () => {

        //console.log("premier use effect")

      // console.log("bienvenue dans le useEffeect de ContextAddEleve")

        if(flag.current === false) {

            classesServices.getAllClasses()
            .then( res => {

                setListeClassesContext(res.data)
                
            })
            .catch(err => console.log(err))

            ///////////////////////
            elevesServices.getEleves()
            .then( res => {
    
                setListeElevesContext(res.data)
                
               
            })
            .catch(err => console.log(err))

            ////////////////////////
        }
        return () => flag.current = true

    }, []) 

    //console.log("***** listeClassesContext est:  ******")
    //console.log(listeClassesContext)

     //console.log("***** listeElevesContext est:  ******")
    //console.log(listeElevesContext)

    ///////////////////////////////
    let [ addEleveWindow, setAddEleveWindow ] = useState(false)


    const openAddEleveWindow  = () => {

        setAddEleveWindow(true)

    }
    const lockAddEleveWindow  = () => {

        setAddEleveWindow(false)

    }
    //////////////////////////////
   

     ///////////////////////////////////////////////:::: 

     let [ eleveCreate, setEleveCreate ] = useState(true) //false
     //let [ hidenEleveCreate, setHidenEleveCreate ] = useState(true)
  
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
  
   ///////////////////////////////////////////////:::: 
  
   //const flag2 = useRef(false)
   //requete de récupération de tous les élèves
   /*
   useEffect( () => {

    console.log("Deuxième use effect")

    //console.log("bienvenue dans le useEffect de  ContextAddEleve de la  récupération de tous les élèves")
    
    if(flag.current === false) {

        elevesServices.getEleves()
        .then( res => {

            setListeElevesContext(res.data)
            
           
        })
        .catch(err => console.log(err))
    }
    return () => flag.current = true


   }, [])
   */
  // console.log("listeElevesContext")
   //console.log(listeElevesContext)

    return (

        <AddEleveContext.Provider  value={ { listeClassesContext, addEleveWindow, openAddEleveWindow ,lockAddEleveWindow,confirmationEleveCreate,eleveCreate, listeElevesContext } } >
            
            {children}
        </AddEleveContext.Provider>
    )
};

