import React,{useState, useEffect } from 'react';
import DetailsOneEleve from './DetailsOneEleve';

const ElevesSearch = ({ idClasse, listeClassesContext, listeElevesContext, valeurInputSearch,  filtrebtn, valeurInputDate }) => {
 
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
 
    //////////////////////////////
 
     //gestion de la suppréssion
     let [ windowDeleteClasse, setWindowDeleteClasse ] = useState(false)
     
     let lockwindowDeleteClasse = () => setWindowDeleteClasse(false); 
     let openwindowDeleteClasse = () => setWindowDeleteClasse(true); 
 
    //////////////////////////////
 
    
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
 
         
        setshowWindowEleveDetailUp(true)
        setshowWindowEleveDetailDown(false)
 
        setisOpen(true)

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
 
         
         setshowWindowEleveDetailDown(true)
         setshowWindowEleveDetailUp(false)
 
         setisOpen(false) 
         setshowWindowEleveTransfert(false)
         setshowWindowEleveDelete(false)
         setshowWindowEleveUpdate(false)
         
         setEleveId({
             ...eleveId,
             idEleve
 
         })
 
     }
 
    ////////////////////////////////////////////
 
    let [ classeValue, setclasseValue ] = useState({})
     //copie du tableau par élément complexe
     
     
     useEffect( () => {
 
         let ElevesArray = [...listeClassesContext]
        let eleve = ElevesArray.find(element => element.id === idClasse)
        if(eleve){
 
        setclasseValue(eleve)
        }
 
 
     }, [idClasse, listeClassesContext])

    //gestion de de l'affichage des données  

    let dateDebut = valeurInputDate.dateDebut
    let dateFin = valeurInputDate.dateFin

    let valeurInput =  listeEleves.filter( Eleve => Eleve.nom.toLowerCase()  === valeurInputSearch || Eleve.nom.toUpperCase() === valeurInputSearch ||  Eleve.nom === valeurInputSearch || Eleve.prenom === valeurInputSearch
    || Eleve.prenom.toLowerCase() === valeurInputSearch || Eleve.prenom.toUpperCase() === valeurInputSearch
        || ( Eleve.dateInscription  >= dateDebut &&  Eleve.dateInscription  <= dateFin ) ||  Eleve.anciennete.toLowerCase() ===  filtrebtn ||  Eleve.anciennete.toLowerCase() ===  filtrebtn || Eleve.anciennete ===  filtrebtn )
        
             

   let valeurInput2 =  listeEleves.filter( Eleve =>  Eleve.anciennete === filtrebtn )

  
    return (
        <>
           
        { 
           valeurInput.map( (eleve, index) => 
            
            < div key={ `${eleve.nom}-${index}` }>
              <hr></hr>
                    <div className='getOneClasseEleves__btn3--bloc'  >
                        
                    
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
                            
                                {  showWindowEleveDetailDown && <span className='arrow'> <i className="fa-solid fa-angle-down" id={`${eleve.id}`} title="plus de détails" onClick={ () => iconEleveDetailUp(eleve.id) } ></i> </span> }
                                { showWindowEleveDetailUp && <span className='arrow'> <i className="fa-solid fa-angle-up" id={`${eleve.id}`}  onClick={ () => iconEleveDetailDown(eleve.id) } ></i> </span>} 
                                
                            </div> 

                        </div>
                        
                    
                    </div> 
                    
                    { isOpen && <DetailsOneEleve   iconEleveDetailDown={iconEleveDetailDown}  idClasse={idClasse}   eleveId={eleve.id} listeElevesContext={listeElevesContext} listeClassesContext={listeClassesContext} listeEleves={listeEleves}/>  }
            </div> 
            

            ) 
            
        }


        </>
    );
};

export default ElevesSearch;