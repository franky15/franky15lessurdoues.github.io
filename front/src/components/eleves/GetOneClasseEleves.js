import React,{ useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AddEleveContext } from '../../_utils/ContextAddEleve';
import UpdateEleve from './UpdateEleve';
import DeleteEleve from './DeleteEleve';
import TransfertOneEleve from './TransfertOneEleve';
import DetailsOneEleve from './DetailsOneEleve';
import ElevesSearch from './ElevesSearch';
import CreateEleve from "./CreateEleve"

//import moment from 'moment';

const GetOneClasseEleves = () => {

    //récupération du params
    const {id} = useParams()
    const idClasse = parseInt(id)

    let  { listeElevesContext, listeClassesContext }  = useContext(AddEleveContext)

    //gestion du state d'affichage de la fenêtre de modification de l'élève
   let [ showWindowEleveUpdate, setshowWindowEleveUpdate ] = useState(false)

   //gestion dus state de l'affichage de la fenêtre de suppression
   let [ showWindowEleveDelete, setshowWindowEleveDelete ] = useState(false)

   //gestion dus state de l'affichage de la fenêtre de modification du transfert de l'élève
   let [ showWindowEleveTransfert, setshowWindowEleveTransfert ] = useState(false) //false

   let lockshowWindowEleveTransfert = () => setshowWindowEleveTransfert(false); 
    let openshowWindowEleveTransfert = () => setshowWindowEleveTransfert(true); 

   //gestion du state de la fenêtre du detail 
   let [ showWindowEleveDetailUp, setshowWindowEleveDetailUp ] = useState(false) //true


   let [ showWindowEleveDetailDown, setshowWindowEleveDetailDown ] = useState(true) //false

   let [ isOpen, setisOpen ] = useState(false) // true

   //gestion du state de l'id de l'élève
   let [ eleveId, setEleveId ] = useState({})

   //récupération de la liste des élèves d'une classe précise
    let listeEleves = listeElevesContext.filter( element => element.classes_id === idClasse  )

    const ancienEleveTotal = listeEleves.filter( total => total.anciennete === "Oui")

    const nouveauEleveTotal = listeEleves.filter( total => total.anciennete === "Non")

    //gestion de la suppréssion
    let [ windowDeleteClasse, setWindowDeleteClasse ] = useState(false)
    
    let lockwindowDeleteClasse = () => setWindowDeleteClasse(false); 
    let openwindowDeleteClasse = () => setWindowDeleteClasse(true); 

    //fonction de la modification de l'élève
   const iconEleveUpdate = (idEleve) => {

        

        setshowWindowEleveUpdate(true)

        setshowWindowEleveDelete(false)
        setshowWindowEleveTransfert(false)

        setshowWindowEleveDetailUp(false)
        setshowWindowEleveDetailDown(true)

        setEleveId({
            ...eleveId,
            idEleve

        })
    
   }

   //fonction de la suppresssion de l'élève
   const iconEleveDelete = (idEleve) => {

        
        setWindowDeleteClasse(true)
        //setshowWindowEleveDelete(true)

        setshowWindowEleveUpdate(false)
        setshowWindowEleveTransfert(false)

        setshowWindowEleveDetailUp(false)
        setshowWindowEleveDetailDown(true)

        setEleveId({
            ...eleveId,
            idEleve

        })

    }

    //fonction de modification de la classe de l'élève de l'élève iconEleveDetailUp(eleve.id) }
    const iconEleveUpdateTransfert = (idEleve) => {

        setshowWindowEleveTransfert(true)

        setshowWindowEleveDelete(false)
        setshowWindowEleveUpdate(false)
        setshowWindowEleveDetailUp(false)
        setshowWindowEleveDetailDown(true)

        setEleveId({
            ...eleveId,
            idEleve

        })

   }

    //fonction d'affichage du detail de l'élève de l'élève iconEleveDetailDown
    const iconEleveDetailUp = (idEleve) => {

        
       //gestde l'affichage du detail
       const detail = document.querySelector(`.detail${idEleve}`)
       detail.style.display = "block"

       const arrowDow = document.querySelector(`.arrowDow${idEleve}`)
       arrowDow.style.display = "none"

       const arrowUp = document.querySelector(`.arrowUp${idEleve}`)
       arrowUp.style.display = "block"

       setisOpen(true) //

       setshowWindowEleveTransfert(false)
       setshowWindowEleveDelete(false)
       setshowWindowEleveUpdate(false)

       setEleveId({

        ...eleveId,
        idEleve

       })
        

   }

   //fonction d'affichage du detail de l'élève de l'élève 
   const iconEleveDetailDown = (idEleve) => {

        
        //gestde l'affichage du detail
        const detail = document.querySelector(`.detail${idEleve}`)
        detail.style.display = "none"

        const arrowDow = document.querySelector(`.arrowDow${idEleve}`)
        arrowDow.style.display = "block"

        const arrowUp = document.querySelector(`.arrowUp${idEleve}`)
        arrowUp.style.display = "none"

        setisOpen(false)

        setshowWindowEleveTransfert(false)
        setshowWindowEleveDelete(false)
        setshowWindowEleveUpdate(false)
        
        setEleveId({

            ...eleveId,
            idEleve

        })

    }

   let [ classeValue, setclasseValue ] = useState({})
   
    useEffect( () => {

        let ElevesArray = [...listeClassesContext]
       let eleve = ElevesArray.find(element => element.id === idClasse)
       if(eleve){

        setclasseValue(eleve)
       }

       


    }, [idClasse, listeClassesContext])
     
     //gestion du state de l'apparition de la fenêtre creation élévève
     let [ createEleve, setcreateEleve ] = useState(false)

    const  lockAddEleveWindow = () => { setcreateEleve(false) }

    const  createEleveFunction = () => {

        setcreateEleve(true)

        setshowWindowEleveUpdate(false)
        setshowWindowEleveTransfert(false)
        setshowWindowEleveDelete(false)
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
  
  let tableDate = [ "dateDebut", "dateFin" ] 
 
  let [ filtrebtn, setfiltrebtn ] = useState({})
  
  //récupération de l'entrée de l'input et mise à jor du state
const onchange = (e) => {
  
    if( e.target.name === "dateDebut" || e.target.name === "dateFin" ){
 
        for( let i=0; i<= tableDate.length; i++){
 
            setvaleurInput({})
            setfiltrebtn({})
            //formSubmit.reset()
            
            setvaleurInputDate({

                ...valeurInputDate,
                [ e.target.name]: e.target.value
                    
            })
          
        }
       
    
    } else if(e.target.name === "recherche"){
  
          let value = [ e.target.name]
          value = e.target.value;
  
         lockSearch()
         lockOpenbodyDataNormal()
         setvaleurInput({})
        
        setvaleurInput({value})
  
    }else if(e.target.value === "Oui" || e.target.value === "Non"   ){
  
        let value = e.target.name;
        value = e.target.value;
        
        if(e.target.value === "Oui"){

            openisopenColor()
            lockisopenColor2()
            setvaleurInput({})
            setfiltrebtn({value})
           

        }else if(e.target.value === "Non"){

            openisopenColor2()
            lockisopenColor()
            setvaleurInput({})
            setfiltrebtn({value})
            
        }
          
    }
   

}
  
  
useEffect( () => {

    

    if( valeurInput.value){

        lockOpenbodyDataNormal()
        openSearch()
        
    }else if(  valeurInputDate.dateDebut && valeurInputDate.dateFin ){

        openSearch()
        lockOpenbodyDataNormal()
    

    } else if(filtrebtn.value ){

        lockOpenbodyDataNormal()
        openSearch()

    }else if( valeurInput.value === "" ){

        lockSearch()
        openOpenbodyDataNormal()
   
    }
    

})
  
  
  
  
const onchange2 = (e) => {
  
    if(e.target.value === "Oui"    ){
  
      lockisopenColor()
      lockisopenColor2()
      setvaleurInput({})
      setfiltrebtn({})
  
      openOpenbodyDataNormal()
      lockSearch()
  
      
     } else if( e.target.value === "Non"){
  
            
        
        lockisopenColor()

        lockisopenColor2()
        

        setvaleurInput({})
        setfiltrebtn({})

        openOpenbodyDataNormal()
        lockSearch()
    
    }
      
}


    return (
        <div className='getOneClasseEleves'>

            <p className='enseignant'>Enseignant: { classeValue.enseignant }  </p>

            <div className='getOneClasseEleves__btn1'>

                

                <div className='blocBtn'>

                {   
                    isopenColor ?
                    <button  className='btn__button blocBtn__btn1  personnelBackground '  onClick ={  onchange2 } value={"Oui"} > Ancien élève(s) <span className='eleveSpanVal'>{ancienEleveTotal.length }</span></button >
               
                    :

                    <button  className='btn__button blocBtn__btn1 '  onClick ={  onchange } value={"Oui"} > Ancien élève(s)  <span className='eleveSpanVal'>{ancienEleveTotal.length }</span></button >
                    
                }
                   
                {   
                    isopenColor2 ?
                    <button  className='btn__button blocBtn__btn1  personnelBackground '  onClick ={  onchange2 } value={"Non"} > Nouvel élève(s) <span className='eleveSpanVal'>{nouveauEleveTotal.length}</span></button >
               
                    :

                    <button  className='btn__button blocBtn__btn1  '  onClick ={  onchange } value={"Non"} > Nouvel élève(s)  <span className='eleveSpanVal'>{nouveauEleveTotal.length}</span></button >
                    
                }
                       
                   

 

                    <form className='containerDateFiltre '>

                        <div className='containerDateFiltre__btn '>
                            <label htmlFor="dateDebut" className='date'> Date début</label>
                            <input type='date' name='dateDebut' id='dateDebut' className='containerDateFiltre__btn--titre'  value={ valeurInputDate.dateDebut  } onChange  ={  onchange } />
                            
                        </div>

                        <div className='containerDateFiltre__btn date'>
                            <label htmlFor="dateFin" className='date'> Date de fin</label>
                            <input type='date' name='dateFin' id='dateFin' className='containerDateFiltre__btn--titre' value={ valeurInputDate.dateFin  }  onChange ={  onchange }/>
                            
                        </div>

                    </form>
                        
                    
             </div>

                
                

            </div>

           
            <div className='getOneClasseEleves__btn2'>

                <p className='getOneClasseEleves__btn2--effectif'>Effectif de la classe: {classeValue.effectif}</p>

                <div className='getOneClasseEleves__btn2--btn'>

                    

                    <form className='btnInput'>

                        <label htmlFor="recherche" className='labelRecherche' ><i className="fa-solid fa-magnifying-glass"></i></label>
                        <input type='text' name='recherche' id='recherche' className='recherche' placeholder='Rechercher par nom, prénom'
                        value={ valeurInput.value} onFocus={openFocus} onBlur={lockFocus}  onChange ={  onchange }/>
                    
                    </form>

                  
                    <button  className='btn__button' value={"ajoutEleve"}  onClick={ createEleveFunction}> Ajouter un élève </button >
                        
               

                </div>
                
               
            </div>

            <div className='getOneClasseEleves__btn3'>
                   
                {
                    <div className='getOneClasseEleves__btn3--titre'>

                        <p className='DateRedoublant'>Ancien</p>
                        <p className='nomPrenom'> Nom </p>
                        <p className='nomPrenom'>Prenom</p>
                        <p className='DateRedoublant'>Date de naissance</p>
                        <p className='DateRedoublant'>Année d'arrivée </p>
                        <p className='DateRedoublant'>Date d'inscription</p>
                    
                    </div>
                }
               
                { isOpenbodyDataNormal &&

                    listeEleves.map( (eleve, index) => 
                  
                    <div key={ `${eleve.nom}-${index}` }>
                            <hr></hr>
                    
                            <div className='getOneClasseEleves__btn3--bloc' > 
                                
                            
                                <div className='btn3Option'>
                                    <p className='DateRedoublant'>{eleve.anciennete}</p>
                                    <p className='nomPrenom'> {eleve.nom} </p>
                                    <p className='nomPrenom'>{eleve.prenom}</p>
                                    <p className='DateRedoublant'>{ (eleve.dateNaissance).slice(0,10) }</p>
                                    { parseInt(eleve.decouverteDateArrivee)  ?  <p className='DateRedoublant'> { (eleve.decouverteDateArrivee).slice(0,10) }</p> :  <p className='DateRedoublant'>{ " " } </p> }
                                
                                    <p className='DateRedoublant'> {(eleve.dateInscription).slice(0,10) }</p>
                                
                                
                                </div>
                                
                                <div className='btn3Icon'>
                                    
                                    <div className='btn3IconChoice'> <i className="fa-solid fa-pen-to-square" title="modifier l'élève" onClick={ () => iconEleveUpdate(eleve.id) } ></i> </div>
                                    <div className='btn3IconChoice'> <i className="fa-solid fa-x" title="supprimer l'élève" onClick={ () => iconEleveDelete(eleve.id) } ></i> </div>
                                    <div className='btn3IconChoice'><i className="fa-solid fa-right-left" title="changer la classe de l'élève" onClick={ () => iconEleveUpdateTransfert(eleve.id) } ></i></div>
                                
                                    <div className='btn3IconChoice'>
                                    
                                        { <span   style={{ display: 'block' }} className={ `arrow  arrowDow${eleve.id}` }> <i className="fa-solid fa-angle-down" id={`${eleve.id}`} title="plus de détails" onClick={ () => iconEleveDetailUp(eleve.id) } ></i> </span> }
                                        { <span style={{ display: 'none' }} className={ `arrow  arrowUp${eleve.id}` }  > <i className="fa-solid fa-angle-up" id={`${eleve.id}`}  onClick={ () => iconEleveDetailDown(eleve.id) } ></i> </span>} 
                                        
                                    </div> 

                                </div>
                               
                            
                            </div> 

                            <div   className= { ` detailsOneEleve   detail${eleve.id}` } style={{ display: 'none' }}>
            
                                <p> Nom du parent 1: { eleve.nomParent1 }</p>
                                <p> Contact parent 1: { eleve.contactParent1 }</p>
                                <p> Nom du parent 2: { eleve.nomParent2 }</p>
                                <p> Contact parent 2: { eleve.contactParent2 }</p>
                                <p> Montant payé: { eleve.contactParent1 }</p>
                            </div>
                            
                           
                    </div> 
                    

                    ) 
                    
                }
                {
                    isOpenSearch &&
                    <ElevesSearch idClasse={idClasse} listeClassesContext={listeClassesContext} listeElevesContext={listeElevesContext}  listeEleves={listeEleves} openSearch={openSearch } lockSearch={lockSearch } valeurInputSearch ={valeurInput.value}    filtrebtn={filtrebtn.value}  valeurInputDate={valeurInputDate}/>
                }
            
            </div> 

            { showWindowEleveUpdate && <UpdateEleve  showWindowEleveUpdate={showWindowEleveUpdate} setshowWindowEleveUpdate={setshowWindowEleveUpdate}  idClasse={idClasse} eleveId={eleveId} /> }
            {  windowDeleteClasse && <DeleteEleve showWindowEleveDelete={showWindowEleveDelete} setshowWindowEleveDelete={setshowWindowEleveDelete}  idClasse={idClasse}   eleveId={eleveId} listeElevesContext={listeElevesContext} listeClassesContext={listeClassesContext} lockwindowDeleteClasse={lockwindowDeleteClasse} openwindowDeleteClasse={openwindowDeleteClasse}/>  }
            {  showWindowEleveTransfert && <TransfertOneEleve  lockshowWindowEleveTransfert={lockshowWindowEleveTransfert} openshowWindowEleveTransfert={openshowWindowEleveTransfert} showWindowEleveTransfert={showWindowEleveTransfert} setshowWindowEleveTransfert={setshowWindowEleveTransfert} idClasse={idClasse}   eleveId={eleveId} listeElevesContext={listeElevesContext} listeClassesContext={listeClassesContext} listeEleves={listeEleves}/>  } 
            
            { 
                createEleve &&  <CreateEleve lockAddEleveWindow /> 
                
            }
        </div>
    );
};

export default GetOneClasseEleves;
