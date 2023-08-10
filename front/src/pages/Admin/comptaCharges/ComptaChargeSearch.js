import React, { useState, useContext, useEffect} from 'react';
import ComptaChargeDetail from './ComptaChargeDetail';

const ComptaChargeSearch = ({ listeChargesContext, listePersonnelContext, listePaiementContext, openSearch, lockSearch, valeurInputSearch, valeurInputDate, filtrebtn, datePaiement }) => {

    let [ idChargeCurrent, setidChargeCurrent ] = useState({})

    //gestion de l'affichage de la creation du paiement
    const windowShowCreateCompta = (idCharge) => {

       

        setisOpen(false)

        setshowWindowEleveDetailDown(true)
        setshowWindowEleveDetailUp(false)

        setidChargeCurrent({

            ...idChargeCurrent,
            idCharge
        })
    }


     //gestion du state de la fenêtre du detail 
   let [ showWindowEleveDetailUp, setshowWindowEleveDetailUp ] = useState(false) //true


   let [ showWindowEleveDetailDown, setshowWindowEleveDetailDown ] = useState(true) //false

   let [ isOpen, setisOpen ] = useState(false) // true

     //fonction d'affichage du detail de l'élève de l'élève iconEleveDetailDown
     const iconEleveDetailUp = ( idCharge) => {

        
        setshowWindowEleveDetailUp(true)
        setshowWindowEleveDetailDown(false)
  
       
         ////////////////////
        
         setisOpen(true)
  
  
         /////////////////
          //console.log("vous avez cliqué sur le detail de l'élève")
          console.log( idCharge)
  
          setidChargeCurrent({

            ...idChargeCurrent,
            idCharge
        })
          
  
     }

     //fonction d'affichage du detail du personnel 
   const iconEleveDetailDown = (idCharge) => {

        
    setshowWindowEleveDetailDown(true)
    setshowWindowEleveDetailUp(false)

   

    ////////////////////////
    
    setisOpen(false)

    ////////////////////////

    
    //console.log("vous avez cliqué sur le detail de l'élève")
    console.log( idCharge)
    
    setidChargeCurrent({

        ...idChargeCurrent,
        idCharge
    })

}

console.log("**** idChargeCurrent " )
console.log( idChargeCurrent)

////////////////////////////////////////

let dateDebut = valeurInputDate.dateDebut
let dateFin = valeurInputDate.dateFin


/*
let dateDebut = datePaiement.dateDebut
let dateFin = datePaiement.dateFin
*/

let valeurInput = listeChargesContext.filter( charge => charge.categorie === valeurInputSearch || charge.nomPrenom === valeurInputSearch || charge.poste === valeurInputSearch  || 
   ( charge.datePaiement >= dateDebut &&  charge.datePaiement <= dateFin ) || charge.categorie === filtrebtn )
    
    




////////////////////////:::::::::::

    return (
        <div>
           
          
           
            {
                valeurInput.map( (charge, index) => 
                
                <>
                    <hr></hr>
                    <div className='valeurs' key={ charge.nomPrenom-`${index}` }>

                        <div className='valeurs__container'>

                            <div className='titreValeur'> {charge.categorie} </div>
                            <div className='titreValeur'>{charge.montantPaye}</div>

                            <div className='titreValeur'  >{ (charge.datePaiement).slice(0,10) }</div>
                                
                            <div className='titreValeur'>{charge.libelle  }</div>
                                
                            
                            
                            
                            <div className='titre__item titreChargeItem '>{charge.commentaire} </div>

                            
                        </div>

                        <div className='valeursIcon' >
                                                                                                    
                            <div className='valeursIcon__choice'> <i className="fa-solid fa-plus"  onClick={ () =>  windowShowCreateCompta(charge.id)  } ></i></div>

                            {  showWindowEleveDetailDown && <span className='arrow'> <i className="fa-solid fa-angle-down"  title="plus de détails" onClick={ () => iconEleveDetailUp(charge.id) } ></i> </span> }
                            { showWindowEleveDetailUp && <span className='arrow'> <i className="fa-solid fa-angle-up"  onClick={ () => iconEleveDetailDown(charge.id) } ></i> </span>} 
                            

                        </div>

                        

                    </div>

                    { isOpen && < ComptaChargeDetail listePaiementContext = { listePaiementContext }  idChargeCurrent = {idChargeCurrent} listePersonnelContext = {listePersonnelContext} listeChargesContext= {listeChargesContext}/> }
                    
                </>
                

                
                )

            }
        </div>
    );
};

export default ComptaChargeSearch ;