import React,{ useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AddEleveContext } from '../../../_utils/ContextAddEleve';


import DetailsOnePersonnel from './DetailsOnePersonnel';
import AddPersonnels from "./AddPersonnels";
import UpdatePersonnels from './UpdatePersonnels';
import GetOnePersonnels from "./GetOnePersonnels";
import DeletePersonnel from "./DeletePersonnel"



const PersonnelsSearch = ({  valeurInputSearch, filtrebtn }) => {

    ////////////////////////////////////////////////////////////////


    console.log("***$ filtrebtn dans PersonnelSearch")
    console.log(filtrebtn)

    console.log("***$ valeurInputSearch dans PersonnelSearch")
    console.log(valeurInputSearch)

    //gestion de l'affichage de la fenêtre ajouter un personnel
    let [ WindowAddPersonnel, setWindowAddPersonnel ] = useState(false) //false

    let lockWindowAddPersonnel = () => setWindowAddPersonnel(false); 
    let openWindowAddPersonnel = () => setWindowAddPersonnel(true); 
    ////////////////////////////////////////////////////////////////
    //console.log("***** Bienvenue dans le GetOneClasseEleves ******")

    //récupération du params
    const {id} = useParams()
    const idClasse = parseInt(id)

    //console.log("l'id du params de la classse est "+ idClasse )

    //const date = new Date();

    let  { listeElevesContext, listeClassesContext, listePersonnelContext, listePositionPageContext }  = useContext(AddEleveContext)

    let openpositionPersonnelContext = listePositionPageContext[2].openpositionPersonnelContext()
    
    console.log("**** listePositionPageContext dans getallpersonnels")
    console.log(listePositionPageContext)


    console.log("*****listePersonnelContext dans le composant getPerssonels***")
   console.log(listePersonnelContext)

    console.log("*****listeClassesContext dans le composant getOneClasseEleves***")
    console.log(listeClassesContext)

    //gestion du state d'affichage de la fenêtre de modification du personnel
   let [ showWindowEleveUpdate, setshowWindowEleveUpdate ] = useState(false)

   //gestion dus state de l'affichage de la fenêtre de suppression
   let [ showWindowEleveDelete, setshowWindowEleveDelete ] = useState(false)


   //gestion du state de la fenêtre du detail 
   let [ showWindowEleveDetailUp, setshowWindowEleveDetailUp ] = useState(false) //true


   let [ showWindowEleveDetailDown, setshowWindowEleveDetailDown ] = useState(true) //false

   let [ isOpen, setisOpen ] = useState(false) // true

   //gestion du state de l'id du personnel
   let [ personnelId, setPersonnelId ] = useState({})

   

   //////////////////////////////

    //gestion de la suppréssion
    let [ windowDeleteClasse, setWindowDeleteClasse ] = useState(false)
    
    let lockwindowDeleteClasse = () => setWindowDeleteClasse(false); 
    let openwindowDeleteClasse = () => setWindowDeleteClasse(true); 

   //////////////////////////////

   
    //fonction de la modification de l'élève
   const iconEleveUpdate = (idPersonnel) => {

        

            setshowWindowEleveUpdate(true)

            setshowWindowEleveDelete(false)
           

            setshowWindowEleveDetailUp(false)
            setshowWindowEleveDetailDown(true)

            //setshowWindowEleveDetailUp(true)
            //setshowWindowEleveDetailDown(false)

            //console.log("vous avez cliqué sur modifier")
            //console.log(idEleve)

            setPersonnelId({
                ...personnelId,
                idPersonnel

            })
        
        

   }

   //fonction de la suppresssion de l'élève
   const iconEleveDelete = (idPersonnel) => {

        
        setWindowDeleteClasse(true)
        //setshowWindowEleveDelete(true)

        setshowWindowEleveUpdate(false)
        

        setshowWindowEleveDetailUp(false)
        setshowWindowEleveDetailDown(true)

        //setshowWindowEleveDetailUp(true)
        //setshowWindowEleveDetailDown(false)

        //console.log("vous avez cliqué sur supression")
        //console.log(idEleve)

        setPersonnelId({
            ...personnelId,
            idPersonnel

        })

    }

    //fonction de modification de la classe de l'élève de l'élève iconEleveDetailUp(eleve.id) }
    const iconEleveUpdateTransfert = (idPersonnel) => {

       

        setshowWindowEleveDelete(false)
        setshowWindowEleveUpdate(false)
        setshowWindowEleveDetailUp(false)
        setshowWindowEleveDetailDown(true)

       // setshowWindowEleveDetailUp(true)
       // setshowWindowEleveDetailDown(false)
       
        //console.log("vous avez cliqué sur transfert de l'élève")
        //console.log(idEleve)

        setPersonnelId({
            ...personnelId,
            idPersonnel

        })

   }

    //fonction d'affichage du detail de l'élève de l'élève iconEleveDetailDown
    const iconEleveDetailUp = (idPersonnel) => {

        
      setshowWindowEleveDetailUp(true)
      setshowWindowEleveDetailDown(false)

       //setshowWindowEleveDetailUp(false)
       //setshowWindowEleveDetailDown(true)
       ////////////////////
       setisOpen(true) //


       /////////////////
    
        
       
        setshowWindowEleveDelete(false)
        setshowWindowEleveUpdate(false)

        //console.log("vous avez cliqué sur le detail de l'élève")
        console.log(idPersonnel)

        setPersonnelId({
            ...personnelId,
            idPersonnel

        })
        

   }

   //fonction d'affichage du detail du personnel 
   const iconEleveDetailDown = (idPersonnel) => {

        
        setshowWindowEleveDetailDown(true)
        setshowWindowEleveDetailUp(false)

       // setshowWindowEleveDetailDown(false)
        //setshowWindowEleveDetailUp(true)

        ////////////////////////
        setisOpen(false) //

        ////////////////////////

        
        setshowWindowEleveDelete(false)
        setshowWindowEleveUpdate(false)
        
        //console.log("vous avez cliqué sur le detail de l'élève")
        console.log(idPersonnel)
        
        setPersonnelId({
            ...personnelId,
            idPersonnel

        })

    }

    //////////////////////////

    const valeur = () => {
       // console.log("valeur provisoire")
    }

   
   ////////////////////////////////////////////

   let [ classeValue, setclasseValue ] = useState({})
    //copie du tableau par élément complexe
    
    
    useEffect( () => {
        

        let ElevesArray = [...listeClassesContext]
       let eleve = ElevesArray.find(element => element.id === idClasse)
       if(eleve){

       // console.log("******** eleve")
       // console.log(eleve.enseignant)
       setclasseValue(eleve)
       }


    }, [idClasse, listeClassesContext])
       
    console.log("classeValue") 
    console.log(classeValue) 

    //////////////////////////////////:

    //gestion du display de detail
    
    const masquerDetail = (id) => {

       // let idCible = `${id}`
        //let detail = document.querySelector("#" + idCible)
        let detail = document.getAttribute(`data-${id}`)
        detail.style.display = "block"

    }

    const afficherDetail = (id) => {

       // let idCible = `${id}`
        //let detail = document.querySelector("#" + idCible)
        let detail = document.getAttribute(`data-${id}`)
        detail.style.display = "none"

    }


    ///////////////////////////////////


    ////////////////////////////////////////

    //gestion de de l'affichage des données


    let valeurInput =  listePersonnelContext.filter( personnel => personnel.nom.toLowerCase() === valeurInputSearch ||  personnel.nom.toUpperCase() === valeurInputSearch || personnel.nom === valeurInputSearch || personnel.prenom.toLowerCase() === valeurInputSearch || personnel.prenom.toUpperCase() === valeurInputSearch || personnel.prenom === valeurInputSearch 
    || personnel.contact === valeurInputSearch 
        || personnel.poste.toUpperCase() === valeurInputSearch  || personnel.poste.toLowerCase() === valeurInputSearch  || personnel.poste === valeurInputSearch || personnel.groupeSalariale === filtrebtn 
        || personnel.groupeSalariale.toUpperCase() === filtrebtn || personnel.groupeSalariale.toLowerCase() === filtrebtn || personnel.groupeSalariale === filtrebtn)
             

    let valeurInput1 =  listePersonnelContext.filter( personnel =>  personnel.groupeSalariale === filtrebtn  )
    
    console.log("****** valeurInput dans personnerlSearch")
    console.log(valeurInput1)
    




////////////////////////:::::::::::

    return (
        <div>
              
            { 

                
                valeurInput.map( (personnel, index) => 
                
                <>
                      <hr></hr>
                        <div className='getOneClasseEleves__btn3--bloc' key={ personnel.nom-`${index}` }>
                            
                        
                            <div className='btn3Option'>
                                <p className='DateRedoublant'>{personnel.nom}</p>
                                <p className='nomPrenom'> {personnel.prenom} </p>
                                <p className='nomPrenom'>{personnel.poste}</p>
                                <p className='DateRedoublant'>{ personnel.contact }</p>

                                { listeClassesContext.map( perso => perso.id === personnel.classes_id &&
                                    
                                        <>
                                        
                                            { perso.id === 1  ? 

                                                <p className='DateRedoublant'>{ "Anglophone" }</p>
                                                    
                                                : 

                                                <p className='DateRedoublant'>{ "Francophone" }</p>
                                            }

                                            <p className='DateRedoublant'>{ perso.nom }</p>

                                            <div>

                                            
                                            </div>
                                        </> 
        
                                    )
                                    
                                }
                                <p className='DateRedoublant'> { personnel.groupeSalariale }</p>

                            </div>
                            
                            <div className='btn3Icon'>
                                
                                <div className='btn3IconChoice'> <i className="fa-solid fa-pen-to-square" title="modifier le personnel" onClick={ () => iconEleveUpdate(personnel.id) } ></i> </div>
                                <div className='btn3IconChoice'> <i className="fa-solid fa-x" title="supprimer le personnel" onClick={ () => iconEleveDelete(personnel.id) } ></i> </div>
                                
                                <div className='btn3IconChoice'>
                                
                                    
                                {  showWindowEleveDetailDown && <span className='arrow'> <i className="fa-solid fa-angle-down"  title="plus de détails" onClick={ () => iconEleveDetailUp(personnel.id) } ></i> </span> }
                                { showWindowEleveDetailUp && <span className='arrow'> <i className="fa-solid fa-angle-up"  onClick={ () => iconEleveDetailDown(personnel.id) } ></i> </span>} 
                                    
                                </div> 

                            </div>
                            
                        
                        </div> 
                        
                        { 
                                    
                            isOpen &&   <DetailsOnePersonnel   iconEleveDetailDown={iconEleveDetailDown} listePersonnelContext={listePersonnelContext}  idClasse={idClasse}   personnelId={personnel.id}   /> 
                                    
                    
                        }
                </> 
                

                ) 
                
            }
            
        </div>  
    );
    
};

export default PersonnelsSearch;

