import { createContext, useEffect, useRef, useState } from "react";
import { classesServices } from "../_services/Classes.services";
import { elevesServices } from "../_services/Eleves.services";
import { personnelServices } from "../_services/Personnels.services";
import { comptaServices } from "../_services/Compta.Services";
import { comptaChargesServices } from "../_services/ComptaCharges.services";




export const AddEleveContext = createContext({})

export const ContextAddEleveProvider = ({ children }) => {

    //console.log("***** Bienvenue dans le ContextAddEleve ******")

    let [ listeClassesContext, setListeClassesContext ] = useState([])

    let [ listeElevesContext, setListeElevesContext ] = useState([])

    let [ listePersonnelContext, setListePersonnelContext ] = useState([])

    let [ listePaiementContext, setlistePaiementContext ] = useState([])


    let [ listeChargesContext, setlisteChargesContext] = useState([])

    //////////////////////:
    let [ positionAcceuilContext, setpositionAcceuilContext] = useState(false)
    const openpositionAcceuilContext = () => setpositionAcceuilContext(true)
    const lockpositionAcceuilContext = () => setpositionAcceuilContext(false)

    let [ positionEleveContext, setpositionEleveContext] = useState(false)
    const openpositionEleveContext = () => setpositionEleveContext(true)
    const lockpositionEleveContext = () => setpositionEleveContext(false)

    let [ positionPersonnelContext, setpositionPersonnelContext] = useState(false)
    const openpositionPersonnelContext = () => setpositionPersonnelContext(true)
    const lockpositionPersonnelContext = () => setpositionPersonnelContext(false)


    let [ positionChargesContext, setpositionChargesContext] = useState(false)
    const openpositionChargesContext = () => setpositionChargesContext(true)
    const lockpositionChargesContext = () => setpositionChargesContext(false)


    let [ positionEntreesContext, setpositionEntreesContext] = useState(false)
    const openpositionEntreesContext = () => setpositionEntreesContext(true)
    const lockpositionEntreesContext = () => setpositionEntreesContext(false)

    let listePositionPageContext = [ {positionAcceuilContext, openpositionAcceuilContext, lockpositionAcceuilContext} ,{positionEleveContext,
        
        openpositionEleveContext, lockpositionEleveContext}, {positionPersonnelContext, openpositionPersonnelContext, lockpositionPersonnelContext},
       { positionChargesContext, openpositionChargesContext, lockpositionChargesContext},
        {positionEntreesContext, openpositionEntreesContext, lockpositionEntreesContext}
    ]

    ///////////////////////

    let [ section, setSection ] = useState([])

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

            //////////////////////
            personnelServices.getPersonnels()
            .then( res => {

                setListePersonnelContext(res.data)

                console.log("***** liste personnel du contexte ")
                console.log( res.data)
                
            })
            .catch(err => console.log(err))


            //////////////////////

            ///////////////////////
            comptaServices.getComptas()
            .then( res => {
    
                setlistePaiementContext(res.data)
                
               
            })
            .catch(err => console.log(err))

            ////////////////////////

            ///////////////////////
            comptaChargesServices.getComptacharges()
            .then( res => {
    
                //setlistePaiementContext(res.data)
                setlisteChargesContext(res.data)
                
               
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
  
  
  
   

    return (

        <AddEleveContext.Provider  value={ { listePaiementContext, listeClassesContext, addEleveWindow, openAddEleveWindow ,lockAddEleveWindow,confirmationEleveCreate,eleveCreate, listeElevesContext, listePersonnelContext, listeChargesContext, listePositionPageContext } } >
            
            {children}
        </AddEleveContext.Provider>
    )
};

