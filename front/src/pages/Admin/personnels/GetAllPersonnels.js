import React,{ useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AddEleveContext } from '../../../_utils/ContextAddEleve';


import DetailsOnePersonnel from './DetailsOnePersonnel';
import AddPersonnels from "./AddPersonnels";
import UpdatePersonnels from './UpdatePersonnels';
import GetOnePersonnels from "./GetOnePersonnels";
import DeletePersonnel from "./DeletePersonnel"
import PersonnelsSearch from './PersonnelsSearch';
import AddAdministration from './AddAdministration';
import AddAutrePersonnel from "./AddAutrePersonnel"
import AddFondateur from "./AddFondateur"



const GetAllPersonnels = ({ listeGroupeSalarialeState  }) => {

    ////////////////////////////////////////////////////////////////
    
    //gestion de l'affichage de la fenêtre ajouter un personnel
    let [ WindowAddPersonnel, setWindowAddPersonnel ] = useState(false) //false

    let lockWindowAddPersonnel = () => setWindowAddPersonnel(false); 
    let openWindowAddPersonnel = () => setWindowAddPersonnel(true); 
    ////////////////////////////////////////////////////////////////
    
    //récupération du params
    const {id} = useParams()
    const idClasse = parseInt(id)

    let  { listeElevesContext, listeClassesContext, listePersonnelContext, listePositionPageContext }  = useContext(AddEleveContext)

    let openpositionPersonnelContext = listePositionPageContext[2].openpositionPersonnelContext()
   
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

        setPersonnelId({
            ...personnelId,
            idPersonnel

        })

   }

    //fonction d'affichage du detail de l'élève de l'élève iconEleveDetailDown
    const iconEleveDetailUp = (idPersonnel) => {

        
      setshowWindowEleveDetailUp(true)
      setshowWindowEleveDetailDown(false)

       //gestde l'affichage du detail
       const detail = document.querySelector(`.detail${idPersonnel}`)
       detail.style.display = "block"

       const arrowDow = document.querySelector(`.arrowDow${idPersonnel}`)
       arrowDow.style.display = "none"

       const arrowUp = document.querySelector(`.arrowUp${idPersonnel}`)
       arrowUp.style.display = "block"
       ////////////////////
       setisOpen(true) //


       /////////////////
    
        setshowWindowEleveDelete(false)
        setshowWindowEleveUpdate(false)

        setPersonnelId({
            ...personnelId,
            idPersonnel

        })
        

   }

   //fonction d'affichage du detail du personnel 
   const iconEleveDetailDown = (idPersonnel) => {

        
        setshowWindowEleveDetailDown(true)
        setshowWindowEleveDetailUp(false)

       //gestde l'affichage du detail
       const detail = document.querySelector(`.detail${idPersonnel}`)
       detail.style.display = "none"

       const arrowDow = document.querySelector(`.arrowDow${idPersonnel}`)
       arrowDow.style.display = "block"

       const arrowUp = document.querySelector(`.arrowUp${idPersonnel}`)
       arrowUp.style.display = "none"

        ////////////////////////
        setisOpen(false) //

        ////////////////////////

        
        setshowWindowEleveDelete(false)
        setshowWindowEleveUpdate(false)
        
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
    
    // calcule des totaux des filtres
    let enseignant = []
    let admistration = []
    let autrePersonnel = []
    let fondateurs = []
    let toutPersonnel = []

    let filtre = [ enseignant, admistration, autrePersonnel, fondateurs, toutPersonnel ]
    
    
    let tableFiltre1 = [ "enseignant", "admistratin", "autrePersonnel", "fondateurs", "toutPersonnel" ]
    
    ///////////////////////////////

    
    useEffect( () => {
        
       let ElevesArray = [...listeClassesContext]
       let eleve = ElevesArray.find(element => element.id === idClasse)
       if(eleve){

       setclasseValue(eleve)
       }


    }, [idClasse, listeClassesContext])
     
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

 let [ valeurInput, setvaleurInput ] = useState({})

 let [ valeurInputDate, setvaleurInputDate ] = useState({

                                                        dateDebut: "",
                                                        dateFin: ""                             
    
                                                        })

 let [  isOpenbodyDataNormal, setisOpenbodyDataNormal ] = useState(true)

 let lockOpenbodyDataNormal = () => { setisOpenbodyDataNormal(false)} 
 let openOpenbodyDataNormal= () => { setisOpenbodyDataNormal(true)} 

 let [ isOpenSearch, setisOpenSearch ] = useState(false)

 let lockSearch = () => { setisOpenSearch(false)} 
 let openSearch = () => { setisOpenSearch(true)} 

//gestion de la couleur du bouton filtre
let [ isopenColor, setisopenColor  ] = useState(false)

const openisopenColor = () => {setisopenColor(true)  }
const lockisopenColor = () => {setisopenColor(false)  }


let [ isopenColor2, setisopenColor2  ] = useState(false)

const openisopenColor2 = () => {setisopenColor2(true)  }
const lockisopenColor2 = () => {setisopenColor2(false)  }

let [ isopenColor3, setisopenColor3  ] = useState(false)

const openisopenColor3 = () => {setisopenColor3(true)  }
const lockisopenColor3 = () => {setisopenColor3(false)  }

let [ isopenColor4, setisopenColor4  ] = useState(false)

const openisopenColor4 = () => {setisopenColor4(true)  }
const lockisopenColor4 = () => {setisopenColor4(false)  }



let [ isopenColor5, setisopenColor5  ] = useState(false)

const openisopenColor5 = () => {setisopenColor5(true)  }
const lockisopenColor5 = () => {setisopenColor5(false)  }
 

//gestion de la désactivation des élément
let [ disabled, setDisabled ] = useState(false)

//gestion du focus sur la recherche
let [ isFocused , setIsFocus ] = useState(false)


let openFocus = () => {

    
    setIsFocus(true)
}
let lockFocus = () => {

    
    setIsFocus(false)
}

//récupération du formulaire
let formSubmit = document.querySelector("form")



let [ filtrebtn, setfiltrebtn ] = useState({})

//récupération de l'entrée de l'input et mise à jor du state
const onchange = (e) => {

     if(e.target.name === "recherche"){

        let value = [ e.target.name]
        value = e.target.value;

        lockSearch()
    
        setfiltrebtn({})
        //formSubmit.reset()

       // setvaleurInput({})

        setvaleurInput({value})

    }else if(e.target.value === "enseignant" || e.target.value === "administration" || e.target.value === "autrePersonnel"   || e.target.value === "fondateurs"    ){

        let value = e.target.name;
         value = e.target.value;
        
         if(e.target.value === "enseignant"){

           ////////:

           openisopenColor()
            
            lockisopenColor2()
            lockisopenColor3()
            lockisopenColor4()
            lockisopenColor5()

            setvaleurInput({})
          
           // formSubmit.reset()
            
            setfiltrebtn({value})
            lockSearch()
        
        }else if(e.target.value === "administration"){

            openisopenColor2()

            lockisopenColor()
            lockisopenColor3()
            lockisopenColor4()
            lockisopenColor5()

            setvaleurInput({})
            setfiltrebtn({value})
            lockSearch()
        
        }else if(e.target.value === "autrePersonnel" ){

            ////////:

            openisopenColor3()
            
           
            lockisopenColor2()
            lockisopenColor()
            lockisopenColor4()
            lockisopenColor5()

            setvaleurInput({})
            setfiltrebtn({value})
            lockSearch()
        
        
        }else if(e.target.value === "fondateurs" ){

   
            ////////:

            openisopenColor4()
            
           
            lockisopenColor2()
            lockisopenColor()
            lockisopenColor3()
            lockisopenColor5()

            setvaleurInput({})
            setfiltrebtn({value})
            lockSearch()
           

        }


    }

    
    
}

useEffect( () => {

    

    if( valeurInput.value){

        lockOpenbodyDataNormal()
        openSearch()
        
    } else if(filtrebtn.value ){

        lockOpenbodyDataNormal()
        openSearch()

    }else if( valeurInput.value === "" ){
 
        lockSearch()
        openOpenbodyDataNormal()
        
        
    }
   

})


const onchange2 = (e) => {

    
    if(e.target.value === "enseignant" || e.target.value === "administration" || e.target.value === "autrePersonnel" || e.target.value === "fondateurs"  || e.target.value === "toutPersonnel"   ){

        lockisopenColor()

        lockisopenColor2()
        lockisopenColor3()
        lockisopenColor4()
        lockisopenColor5()

        setvaleurInput({})
        setfiltrebtn({})

        openOpenbodyDataNormal()
        lockSearch()


    } 
    
    
    
}

 
    let listeGroupeSalariale = listePersonnelContext.map( element => element.groupeSalariale)
    let enseignantTotal = listeGroupeSalariale.filter( element => element === "enseignant" )
    let admistrationTotal = listeGroupeSalariale.filter( element => element === "administration")
    let autrePersonnelTotal = listeGroupeSalariale.filter( element => element === "autrePersonnel")
    let fondateursTotal = listeGroupeSalariale.filter( element => element === "fondateurs")
   
    //gestion du state du salaire
    let [ addEnseignantgroupe, setaddEnseignantgroupe ] = useState(false)

    const openaddEnseignantgroupe = () => setaddEnseignantgroupe(true) 
    const lockaddEnseignantgroupe = () => setaddEnseignantgroupe(false) 

    return (
        <div className='getAllPersonnels'>

          

            <div className='getAllPersonnels__btn1'>

                

                    <div className='blocBtn'>

                         < div className='blocBtn__btn1'>

                            {   isopenColor ? <button   className='container__btn--titre titreCharge container__btn  personnelBackground btn__button' onClick ={  onchange2 }  value={"enseignant"}  >  Enseignant(s) <span className='btn__donnee'>{enseignantTotal.length}</span> </button>
                                :

                                
                                <button  className='btn__button' onClick ={  onchange }  value={"enseignant"} > Enseignant(s) <span className='btn__donnee'>{enseignantTotal.length}</span> </button>
                           }

                        </div>

                        < div className='blocBtn__btn1'>

                            {   isopenColor2 ? <button   className='container__btn--titre titreCharge container__btn charges personnelBackground  btn__button' onClick ={  onchange2 }  value={"administration"}  >  Administration <span className='btn__donnee'>{admistrationTotal.length}</span> </button>
                                    :

                                    
                                    <button  className='btn__button' onClick ={  onchange }  value={"administration"} >Administration  <span className='btn__donnee'>{admistrationTotal.length}</span> </button>
                            }

                           
                        </div>

                        < div className='blocBtn__btn1'>

                            {   isopenColor3 ? <button   className='container__btn--titre titreCharge container__btn charges personnelBackground  btn__button' onClick ={  onchange2 }  value={"autrePersonnel"}  >  Autre(s) Personnel  <span className='btn__donnee'>{autrePersonnelTotal.length}</span> </button>
                                    :

                                    
                                    <button  className='btn__button' onClick ={  onchange }  value={"autrePersonnel"} >Autre(s) Personnel  <span className='btn__donnee'>{autrePersonnelTotal.length}</span> </button>
                            }


                        </div>

                        < div className='blocBtn__btn1'>

                            {   isopenColor4 ? <button   className='container__btn--titre titreCharge container__btn charges personnelBackground  btn__button' onClick ={  onchange2 }  value={"fondateurs"}  >  Fondateur(s) <span className='btn__donnee'>{fondateursTotal.length}</span> </button>
                                    :

                                    
                                    <button  className='btn__button' onClick ={  onchange }  value={"fondateurs"} >Fondateur(s)  <span className='btn__donnee'>{fondateursTotal.length}</span> </button>
                            }

                            
                        </div>

                        

                </div>
                
            </div>

           
            <div className='getAllPersonnels__btn2'>



                    <p className='totalPerson'>Total du personnel : {listeGroupeSalariale.length}</p>

                    <form className='rechercheContainer '>

                        <label htmlFor="recherche" className='labelRecherche' ><i className="fa-solid fa-magnifying-glass"></i></label>
                        <input type='text' name='recherche' id='recherche' className='recherche' placeholder='Rechercher par nom, prénom, tel'
                        value={ valeurInput.value} onFocus={openFocus} onBlur={lockFocus}  onChange ={  onchange }/>
                    
                    </form>
                   

                   
    
                    <p  className='btn__button' onClick={ openaddEnseignantgroupe }> Ajouter Personnel</p>
                        
                   

               
                
               
            </div>

            <div className='getOneClasseEleves__btn3'>
                
                    
                {
                    <div className='getOneClasseEleves__btn3--titre'>

                        <p className='DateRedoublant'>Nom</p>
                        <p className='nomPrenom'> Prenom </p>
                        <p className='nomPrenom'>poste</p>
                        <p className='DateRedoublant'>Tel</p>
                        <p className='DateRedoublant'>Section </p>
                        <p className='DateRedoublant'>Classe</p>
                        <p className='DateRedoublant'>Groupe salariale</p>
                    
                    </div>
                }
                
               
               
                { 
                    isOpenbodyDataNormal &&

                    listePersonnelContext.map( (personnel, index) => 
                   
                    <div key={ `${personnel.nom}-${index}` }>
                      <hr></hr>
                            <div className='getOneClasseEleves__btn3--bloc'  >
                                
                            
                                <div className='btn3Option'>
                                    <p className='DateRedoublant'>{personnel.nom}</p>
                                    <p className='nomPrenom'> {personnel.prenom} </p>
                                    <p className='nomPrenom'>{personnel.poste}</p>
                                    <p className='DateRedoublant'>{ personnel.contact }</p>

                                    { listeClassesContext.map( (perso, index) => perso.id === personnel.classes_id &&
                                        
                                            <>
                                            
                                                { perso.id === 1  ? 

                                                    <p className='DateRedoublant'>{ "Anglophone" }</p>
                                                        
                                                    : 

                                                    <p className='DateRedoublant'>{ "Francophone" }</p>
                                                }

                                                <p className='DateRedoublant'>{ perso.nom }</p>

                                                <div>

                                               
                                                </div>
                                            </ > 
            
                                        )
                                       
                                    }
                                     <p className='DateRedoublant'> { personnel.groupeSalariale }</p>

                                </div>
                                
                                <div className='btn3Icon'>
                                    
                                    <div className='btn3IconChoice'   > <i className="fa-solid fa-pen-to-square" title="modifier le personnel" onClick={ () => iconEleveUpdate(personnel.id) } ></i> </div>
                                    <div className='btn3IconChoice'> <i className="fa-solid fa-x" title="supprimer le personnel" onClick={ () => iconEleveDelete(personnel.id) } ></i> </div>
                                   
                                    <div className='btn3IconChoice'>
                                    
                                      
                                    {  <span    style={{ display: 'block' }} className={ `arrow  arrowDow${personnel.id}` }  > <i className="fa-solid fa-angle-down"  title="plus de détails" onClick={ () => iconEleveDetailUp(personnel.id) } ></i> </span> }
                                    { <span style={{ display: 'none' }} className={ `arrow  arrowUp${personnel.id}` }> <i className="fa-solid fa-angle-up"  onClick={ () => iconEleveDetailDown(personnel.id) } ></i> </span>} 
                                        
                                    </div> 

                                </div>
                               
                            
                            </div> 

                            <div  className= { ` detailsOneEleve detail${personnel.id}` } style={{ display: 'none' }} >
            
           
                                <p> Email : { personnel.email }</p>
                                <p> Salaire : { personnel.salaire }</p>
                                
                            </div>
                            
                           
                    </ div> 
                    

                    ) 
                    
                }
                {
                    isOpenSearch &&

                    <PersonnelsSearch     listePersonnelContext={listePersonnelContext}   openSearch={openSearch } lockSearch={lockSearch } valeurInputSearch ={valeurInput.value}    filtrebtn={filtrebtn.value} />
                }
            
            </div> 
            
           
            { 
                addEnseignantgroupe && 

                 <AddPersonnels listeClassesContext={listeClassesContext}  lockWindowAddPersonnel = { lockWindowAddPersonnel } personnelId={personnelId}  lockaddEnseignantgroupe ={lockaddEnseignantgroupe}  openaddEnseignantgroupe={openaddEnseignantgroupe}  /> 
                
            }

           
            { showWindowEleveUpdate && <UpdatePersonnels showWindowEleveUpdate={showWindowEleveUpdate} setshowWindowEleveUpdate={setshowWindowEleveUpdate}  idClasse={idClasse} personnelId={personnelId } listePersonnelContext={listePersonnelContext} /> }
            {  windowDeleteClasse && <DeletePersonnel showWindowEleveDelete={showWindowEleveDelete} setshowWindowEleveDelete={setshowWindowEleveDelete}  idClasse={idClasse}   personnelId={personnelId } listeElevesContext={listeElevesContext} listeClassesContext={listeClassesContext} lockwindowDeleteClasse={lockwindowDeleteClasse} openwindowDeleteClasse={openwindowDeleteClasse} listePersonnelContext={listePersonnelContext}  />  }

            
        </div>
    );
    
};

export default GetAllPersonnels;



