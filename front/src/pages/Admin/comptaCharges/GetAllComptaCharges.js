import React, { useContext, useEffect, useState} from 'react';
import CreateOneComptaCharge from './CreateOneComptaCharge';
//import ComptaChargeDetail from './ComptaChargeDetail';
import { AddEleveContext } from '../../../_utils/ContextAddEleve';
import ComptaChargeSearch  from './ComptaChargeSearch';

const GetAllComptaCharges = () => {


    let  { listeElevesContext, listeClassesContext, listePaiementContext, listeChargesContext, listePersonnelContext, listePositionPageContext }  = useContext(AddEleveContext)

    let openpositionChargesContext = listePositionPageContext[3].openpositionChargesContext()
    
    //gestion du state de l'affichage de la fenêtre de creation
    let [ createOpen, setcreateOpen ] = useState(false)

    const lockCreateOpen = () => {setcreateOpen (false)}
    const openCreateOpen = () => { setcreateOpen (true) }
                                   
    let [ idChargeCurrent, setidChargeCurrent ] = useState({})

    //gestion de l'affichage de la creation du paiement
    const windowShowCreateCompta = (idCharge) => {

        openCreateOpen()

        setisOpen(false)

        setshowWindowEleveDetailDown(true)
        setshowWindowEleveDetailUp(false)

        setidChargeCurrent({

            ...idChargeCurrent,
            idCharge
        })
    }

    //////////////////////////////::


     //gestion du state de la fenêtre du detail 
   let [ showWindowEleveDetailUp, setshowWindowEleveDetailUp ] = useState(false) //true


   let [ showWindowEleveDetailDown, setshowWindowEleveDetailDown ] = useState(true) //false

   let [ isOpen, setisOpen ] = useState(false) // true

    //fonction d'affichage du detail de l'élève de l'élève iconEleveDetailDown
    const iconEleveDetailUp = ( idCharge) => {

        
       //gestde l'affichage du detail
       const detail = document.querySelector(`.detail${idCharge}`)
       detail.style.display = "block"

       const arrowDow = document.querySelector(`.arrowDow${idCharge}`)
       arrowDow.style.display = "none"

       const arrowUp = document.querySelector(`.arrowUp${idCharge}`)
       arrowUp.style.display = "block"
  
       setidChargeCurrent({

            ...idChargeCurrent,
            idCharge
       })
          
  
    }

    //fonction d'affichage du detail du personnel 
    const iconEleveDetailDown = (idCharge) => {

        
        //gestde l'affichage du detail
        const detail = document.querySelector(`.detail${idCharge}`)
        detail.style.display = "none"

        const arrowDow = document.querySelector(`.arrowDow${idCharge}`)
        arrowDow.style.display = "block"

        const arrowUp = document.querySelector(`.arrowUp${idCharge}`)
        arrowUp.style.display = "none"

        setidChargeCurrent({

            ...idChargeCurrent,
            idCharge
        })

    }


let paiementCurrent = listeChargesContext.filter( (paiement) => paiement.personnels_id === idChargeCurrent.idCharge)  //eleve.id


let dernierElementPaiementCurrent = paiementCurrent[paiementCurrent.length - 1]

///////////////////////////////////////:
//récupération de tous les montants payé
const listeMontantPaye =  listeChargesContext.map( element => element.montantPaye)

//calcul du chifffre d'affaire
const mergeChargeTotale = listeMontantPaye.reduce( (acc, current) => {

    return acc + current

}, 0 )

//récupération de tous les montants payé
const listeMontantPayeEntree = listePaiementContext.map( element => element.montantPaye)

//calcul du chifffre d'affaire
const mergeChiffreAffaire =  listeMontantPayeEntree.reduce( (acc, current) => {

    return acc + current

}, 0 )

//calcul du benefice
const benefice = mergeChiffreAffaire - mergeChargeTotale
  
//récupération des clés ou noms des proprietés de chaque objet du tableau 
let listeClesPaiement = Object.keys(listePaiementContext)

 
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

    }else if(e.target.name === "recherche"){

        let value = [ e.target.name]
        value = e.target.value;
    
        setvaleurInputDate({})
        setfiltrebtn({})
        formSubmit.reset()

        // setvaleurInput({})

        setvaleurInput({value})

    }else if(e.target.value === "salaire" || e.target.value === "autreCharge" || e.target.value === "electricite"   ){

        let value = e.target.name;
        value = e.target.value;
        
      
        if(e.target.value === "salaire"){

            
            openisopenColor()
            
            lockisopenColor2()
            lockisopenColor3()

            setvaleurInput({})
            setvaleurInputDate({})
            formSubmit.reset()
            
            setfiltrebtn({value})
        
        }else if(e.target.value === "autreCharge"){


            openisopenColor2()

            lockisopenColor()
            
            lockisopenColor3()

            setvaleurInput({})
            setvaleurInputDate({})
            formSubmit.reset()
            
            setfiltrebtn({value})
            lockSearch()
        

        }else if(e.target.value === "electricite" ){

           
            openisopenColor3()
            
            lockisopenColor()
            lockisopenColor2()

            setvaleurInput({})
            setvaleurInputDate({})
            formSubmit.reset()
            lockSearch()

            setfiltrebtn({value})
        
        
        }


    }
    
    
}


useEffect( () => {

    if( valeurInput.value){

        lockOpenbodyDataNormal()
        openSearch()
        


    }else if(  valeurInputDate.dateDebut && valeurInputDate.dateFin ){

        lockOpenbodyDataNormal()
        openSearch()

    } else if(filtrebtn.value){

        lockOpenbodyDataNormal()
        openSearch()

    }
   
     //gestion du remasqauge des données

     if( valeurInput.value === "" ){
 
        lockSearch()
        openOpenbodyDataNormal()
    
    }
    
})



const onchange2 = (e) => {

    if(e.target.value === "salaire" || e.target.value === "autreCharge" || e.target.value === "electricite"   ){

        if(e.target.value === "salaire"){

            //openisopenColor()
            lockisopenColor()

            lockisopenColor2()
            lockisopenColor3()

            setvaleurInput({})
            setvaleurInputDate({})
            setfiltrebtn({})
   
            openOpenbodyDataNormal()
            lockSearch()
   
           // formSubmit.reset()

        }else if(e.target.value === "autreCharge"){

           // openisopenColor2()
           lockisopenColor2()

            lockisopenColor()
            
            lockisopenColor3()


            setvaleurInput({})
            setvaleurInputDate({})
            setfiltrebtn({})
   
            openOpenbodyDataNormal()
            lockSearch()
   
           // formSubmit.reset()

        }else if(e.target.value === "electricite" ){

            //openisopenColor3()
            lockisopenColor3()

            lockisopenColor()
            lockisopenColor2()
          

            setvaleurInput({})
            setvaleurInputDate({})
            setfiltrebtn({})
   
            openOpenbodyDataNormal()
            lockSearch()
   
           // formSubmit.reset()

        }
  
    }
      
}


    return (
        <div className='getAllEntreeContainer'>
            
            
            
           <div className='getAllEntree'>

                <div className='getAllEntree__chiffreEntree'>

                    <div className='getAllEntree__chiffreEntree--vid'></div>
                    <div className='getAllEntree__chiffreEntree--valeur'>

                        <p className='getAllEntree__chiffreEntree--element chiffreAffaire' >
                            Chiffre d'affaire : { mergeChiffreAffaire } FCFA
                        </p>
                        <p className='getAllEntree__chiffreEntree--element chargeTotale' >
                            Charge Totale : {mergeChargeTotale } FCFA
                        </p>
                        <p className='getAllEntree__chiffreEntree--element benefice' >
                            Bénéfice : { benefice } FCFA
                        </p>

                    </div>
                    
                </div>

                <div className='getAllEntree__Totaux'>

                    {
                        
                        
                        <div className='container containercharges' >

                    
                           {   isopenColor ? <button   className='container__btn--titre titreCharge container__btn charges chargeBackground' onClick ={  onchange2 }  value={"salaire"}  > Charge salaire</button>
                                :

                                <button   className='container__btn--titre titreCharge container__btn charges' onClick ={  onchange }  value={"salaire"}  > Charge salaire 1</button>
                           
                           }
                            
                           {
                                isopenColor3 ? <button   className='container__btn--titre titreCharge container__btn charges chargeBackground' onClick ={  onchange2 }  value={"electricite"}  > Charges électricité</button>
                                :
                           
                            <button   className='container__btn--titre titreCharge container__btn charges' onClick ={  onchange }  value={"electricite"}  > Charges électricité 1</button>
                           
                           }

                          {
                             isopenColor2 ? <button   className='container__btn--titre titreCharge container__btn charges chargeBackground' onClick ={  onchange2 }  value={"autreCharge"}  > Autres charges</button>
                             :

                            <button   className='container__btn--titre titreCharge container__btn charges' onClick ={  onchange }  value={"autreCharge"}  > Autres charges 1</button>
                        
                          }


                        </div>
                         
                    
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

                <div className='blockAdd'>

                     <form className='rechercheContainer'>

                        <label htmlFor="recherche" className='labelRecherche' ><i className="fa-solid fa-magnifying-glass"></i></label>
                        <input type='text' name='recherche' id='recherche' className='recherche' placeholder='Nom personnel, électricité, salaire, poste'
                            value={ valeurInput.value} onFocus={openFocus} onBlur={lockFocus}  onChange ={  onchange }/>
                

                
                    </form>

                    <div className='valeursIcon__choice' onClick={ () =>  windowShowCreateCompta() }> Ajouter une charge </div>

                </div>
               

                                                                                                                                

                
                <div className='getAllEntree__affichage'>

                    <div className='titre titreCharge' >

                        <div className='titre__item titreChargeItem '>Catégories</div>
                        <div className='titre__item titreChargeItem '>Montant</div>
                        <div className='titre__item titreChargeItem '>Date dernier paiement</div>
                        <div className='titre__item titreChargeItem '>Libellé autres charges</div>
                        <div className='titre__item titreChargeItem '>Commentaire</div>

                    </div>

                    
                    {
                        isOpenbodyDataNormal &&

                       listeChargesContext.map( (charge, index) => 
                        
                        <div key={ `${charge.nomPrenom}-${index}` }>
                            <hr></hr>
                            <div className='valeurs' >

                                <div className='valeurs__container'>

                                    <div className='titreValeur'> {charge.categorie} </div>
                                    <div className='titreValeur'>{charge.montantPaye}</div>

                                    <div className='titreValeur'  >{ (charge.datePaiement).slice(0,10) }</div>
                                        
                                    <div className='titreValeur'>{charge.libelle  }</div>
                                        
                                    
                                    
                                    
                                    <div className='titre__item titreChargeItem '>{charge.commentaire} </div>

                                    
                                </div>

                                <div className='valeursIcon' >


                                    {  <span style={{ display: 'block' }} className={ `arrow  arrowDow${charge.id}` }> <i className="fa-solid fa-angle-down"  title="plus de détails" onClick={ () => iconEleveDetailUp(charge.id) } ></i> </span> }
                                    { <span style={{ display: 'none' }} className={ `arrow  arrowUp${charge.id}` }> <i className="fa-solid fa-angle-up"  onClick={ () => iconEleveDetailDown(charge.id) } ></i> </span>} 
                                    

                                </div>

                            </div>

                            <div  className= { ` detail1 detailCharges  detail${charge.id}` } id='detail1' style={{ display: 'none' }}>
            

                                <div className='detail__titre1 detailCharges__titre' key={ charge.categorie-`${index}` } >

                                    {  <div className='detail__titre1--item valeur detailCharges__valeur'> <span className='valeurSpan'>pour quel mois ? </span>{ charge.electriciteMois   }</div>}
                                    {  <div className='detail__titre1--item valeur detailCharges__valeur'> <span className='valeurSpan'>Nom et prénom :</span>   { charge.nomPrenom  }</div>}
                                    {  <div className='detail__titre1--item valeur detailCharges__valeur'> <span className='valeurSpan'>poste :</span>  {charge.poste   }</div>}


                                </div>
                                    
                                
            
                            </div>

                            
                            
                        </div>
                        
                                
                        
                        )

                    }

                    

                    {
                        isOpenSearch &&

                        <ComptaChargeSearch  listeChargesContext={listeChargesContext}   listePersonnelContext={listePersonnelContext}  listePaiementContext={listePaiementContext} openSearch={openSearch } lockSearch={lockSearch } valeurInputSearch ={valeurInput.value}   valeurInputDate = {valeurInputDate} filtrebtn={filtrebtn.value}/>
                    }
                </div>
            </div>
                
            <div className='componentCreateEntree'>

                { createOpen && <CreateOneComptaCharge  idChargeCurrent = {idChargeCurrent} lockCreateOpen = { lockCreateOpen }/> } 
                

            </div>

        </div>
    );
};

export default GetAllComptaCharges;
