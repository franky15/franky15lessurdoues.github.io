import React,{useContext, useState, useEffect} from 'react';
import ComptaDetail from './ComptaDetail';

const ComptaEntreeSearch = ({ listeClassesContext, listeElevesContext, listePersonnelContext, listePaiementContext, openSearchEntree, lockSearchEntree, lockOpenbodyDataNormalEntree, valeurInputSearchEntree, valeurInputDateEntree, filtrebtnEntree, datePaiement }) => {

   

    console.log("***** listeElevesContext dans le composant comptaEntreeSearch ***")
    console.log(listeElevesContext)
 
     console.log("*****listeClassesContext dans le composant comptaEntreeSearch  ***")
     console.log(listeClassesContext)
 
     console.log("*****listePaiementContext dans le composant comptaEntreeSearch  ***")
     console.log(listePaiementContext)

     console.log("***** valeurInputSearch de comptaEntreeSearch")
    console.log(valeurInputSearchEntree)
 
     //gestion du state de l'affichage de la fenêtre de creation
     let [ createOpen, setcreateOpen ] = useState(false)
 
     const lockCreateOpen = () => {setcreateOpen (false)}
     const openCreateOpen = () => { setcreateOpen (true) }
                   
     let [ idEleveCurrent, setidEleveCurrent ] = useState({})

     //gestion de l'affichage de la creation du paiement
     const windowShowCreateCompta = (idEleve) => {
 
         openCreateOpen()
 
         setisOpen(false)
 
         setshowWindowEleveDetailDown(true)
         setshowWindowEleveDetailUp(false)
 
         setidEleveCurrent({
 
             ...idEleveCurrent,
             idEleve
         })
     }
                                    
                                 
 
    
 
     //////////////////////////////::
    


     //gestion du state de la fenêtre du detail 
   let [ showWindowEleveDetailUp, setshowWindowEleveDetailUp ] = useState(false) //true


   let [ showWindowEleveDetailDown, setshowWindowEleveDetailDown ] = useState(true) //false

   let [ isOpen, setisOpen ] = useState(false) // true

     //fonction d'affichage du detail de l'élève de l'élève iconEleveDetailDown
     const iconEleveDetailUp = ( idEleve) => {

        
        setshowWindowEleveDetailUp(true)
        setshowWindowEleveDetailDown(false)
  
       
         ////////////////////
        // lockCreateOpen()
         setisOpen(true)
  
  
         /////////////////
          //console.log("vous avez cliqué sur le detail de l'élève")
          console.log( idEleve)
  
          setidEleveCurrent({

            ...idEleveCurrent,
            idEleve
        })
          
  
     }

     //fonction d'affichage du detail du personnel 
   const iconEleveDetailDown = (idEleve) => {

        
    setshowWindowEleveDetailDown(true)
    setshowWindowEleveDetailUp(false)

   

    ////////////////////////
    
    setisOpen(false)

    ////////////////////////

    
    //console.log("vous avez cliqué sur le detail de l'élève")
    console.log( idEleve)
    
    setidEleveCurrent({

        ...idEleveCurrent,
        idEleve
    })

}

console.log("**** idEleveCurrent " )
console.log( idEleveCurrent)

////////////////////////////////////////



let dateDebut = valeurInputDateEntree.dateDebut
let dateFin = valeurInputDateEntree.dateFin

console.log("******  dateDebut")
console.log( dateDebut)

console.log("******  dateFin")
console.log( dateFin)



let mergeTable = [ ...listeElevesContext, ...listePaiementContext]

console.log("****** mergeTable")
console.log(mergeTable)

//let valeurInputEntree


let valeurInputEntree = mergeTable.filter( elevePaiement => (elevePaiement.prenom && (elevePaiement.prenom.toLowerCase() === valeurInputSearchEntree.toLowerCase() ) ) ||  (elevePaiement.nom && (elevePaiement.nom.toLowerCase() === valeurInputSearchEntree.toLowerCase() ) ) ||  

( elevePaiement.nomParent1 &&  ( elevePaiement.nomParent1.toLowerCase() === valeurInputSearchEntree.toLowerCase() ) )  || ( elevePaiement.nom && elevePaiement.prenom &&  elevePaiement.nom.toLowerCase()  +  " " +   elevePaiement.prenom.toLowerCase() === valeurInputSearchEntree.toLowerCase() ) /* ||
   
   ( elevePaiement.dateDernierPaiement  >= dateDebut  &&  elevePaiement.dateDernierPaiement  <= dateFin)  */ )



/*
   let valeurInputEntree = mergeTable.filter( elevePaiement => (elevePaiement.prenom === valeurInputSearchEntree ) ||   (elevePaiement.nom === valeurInputSearchEntree ) ||  

(   elevePaiement.nomParent1 === valeurInputSearchEntree )  || ( elevePaiement.nom && elevePaiement.prenom &&  elevePaiement.nom  +  " " +   elevePaiement.prenom === valeurInputSearchEntree ) ||
   
   ( elevePaiement.dateDernierPaiement  >= dateDebut  &&  elevePaiement.dateDernierPaiement  <= dateFin)   )

*/







////////////////////////:::::::::::

    return (

        <div>
            

            {
                valeurInputEntree.map( (eleve, index) => 
                
                <>
                    <hr></hr>
                     <div className='valeurs' key={ eleve.nom-`${index}` }>

                                <div className='valeurs__container'>

                                    <div className='titreValeur'>{eleve.nom}</div>
                                    <div className='titreValeur'>{eleve.prenom}</div>
                                    

                                   { 
                                      
                                         
                                        eleve.dateDernierPaiement
                                       
                                            
                                                                     ?

                                        <div className='titreValeur'  >{ (eleve.dateDernierPaiement) }</div>
                                       :

                                        <div className='titreValeur'  >{ (eleve.dateInscription)  }</div>
                                        
                                        
                                        
                                    }

                                    {
                                    
                                        eleve.montantTotalEleve ?

                                             <div className='titreValeur'>{eleve.montantTotalEleve }</div>

                                             :
                                        
                                            <div className='titreValeur'>{eleve.montantPaye  }</div>
                                        
                                        
                                    }

                                    
                                </div>

                                <div className='valeursIcon' >
                                                                                                            
                                    <div className='valeursIcon__choice'> <i className="fa-solid fa-plus"  onClick={ () =>  windowShowCreateCompta(eleve.id)  } ></i></div>

                                    {  showWindowEleveDetailDown && <span className='arrow'> <i className="fa-solid fa-angle-down"  title="plus de détails" onClick={ () => iconEleveDetailUp(eleve.id) } ></i> </span> }
                                    { showWindowEleveDetailUp && <span className='arrow'> <i className="fa-solid fa-angle-up"  onClick={ () => iconEleveDetailDown(eleve.id) } ></i> </span>} 
                                    

                                </div>

                                

                            </div>

                            {
                                

                                 isOpen && < ComptaDetail listePaiementContext = { listePaiementContext } listeElevesContext = { listeElevesContext } idEleveCurrent = {idEleveCurrent}/> 
                                 
                            }
                    
                </>
                

                
                )

            }
        </div>
    );
};

export default ComptaEntreeSearch;