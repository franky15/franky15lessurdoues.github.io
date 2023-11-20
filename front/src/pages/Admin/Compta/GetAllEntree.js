import React, { useContext, useState, useEffect, useRef} from 'react';
import CreateOneEntree from './CreateOneEntree';
import ComptaDetail from './ComptaDetail';
import { AddEleveContext } from '../../../_utils/ContextAddEleve';
import ComptaEntreeSearch from './ComptaEntreeSearch';

const GetAllEntree = () => {


    let  { listePositionPageContext, listeElevesContext, listeClassesContext, listePaiementContext, listeChargesContext }  = useContext(AddEleveContext)

    let openpositionEntreesContext = listePositionPageContext[4].openpositionEntreesContext()
    
    //gestion du state de l'affichage de la fenêtre de creation
    let [ createOpen, setcreateOpen ] = useState(false)

    const lockCreateOpen = () => {setcreateOpen (false)}
    const openCreateOpen = () => { setcreateOpen (true) }
          
    let [ idEleveCurrent, setidEleveCurrent ] = useState({})

    //gestion de l'affichage de la creation du paiement
    const windowShowCreateCompta = (idEleve) => {

        openCreateOpen()

        setisOpenEntree(false)

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

   let [ isOpenEntree, setisOpenEntree ] = useState(false) // true

     //fonction d'affichage du detail de l'élève de l'élève iconEleveDetailDown
     const iconEleveDetailUp = ( idEleve) => {

        //gestde l'affichage du detail
        const detail = document.querySelector(`.detail${idEleve}`)
        detail.style.display = "block"

        const arrowDow = document.querySelector(`.arrowDow${idEleve}`)
        arrowDow.style.display = "none"

        const arrowUp = document.querySelector(`.arrowUp${idEleve}`)
        arrowUp.style.display = "block"

          setidEleveCurrent({

            ...idEleveCurrent,
            idEleve
        })
          
  
     }

     //fonction d'affichage du detail du personnel 
   const iconEleveDetailDown = ( idEleve) => {

         ////////////////////////////////////

        //gestde l'affichage du detail
        const detail = document.querySelector(`.detail${idEleve}`)
        detail.style.display = "none"

        const arrowDow = document.querySelector(`.arrowDow${idEleve}`)
        arrowDow.style.display = "block"

        const arrowUp = document.querySelector(`.arrowUp${idEleve}`)
        arrowUp.style.display = "none"

        ////////////////////////////////////
   
    setidEleveCurrent({

        ...idEleveCurrent,
        idEleve
    })

}

//////////////////////////::
let [listeScolariteEleve1, setlisteScolariteEleve1 ] = useState([])

let [ listetenueClasseEleve1, setlistetenueClasseEleve1 ] = useState([])

let [listeTransportEleve1 , setlisteTransportEleve1  ] = useState([])

let [listeCantineEleve1 , setlisteCantineEleve1  ] = useState([])

let [ mergeChiffreAffaire1 , setmergeChiffreAffaire1  ] = useState() 

let [ mergeChargeTotale1 , setmergeChargeTotale1  ] = useState() 


let [ benefice1 , setbenefice1  ] = useState()



///////////////////////////
useEffect( () => {

    //let listeScolariteEleve1 = listeElevesContext.map( element => element.scolariteTotale)
    let listeScolariteEleve1 = listePaiementContext.map( element => element.scolarite)

    setlisteScolariteEleve1(listeScolariteEleve1 )

    //let listetenueClasseEleve1 = listeElevesContext.map( element => element.tenueClasseTotale)
    let listetenueClasseEleve1 = listePaiementContext.map( element => element.tenueClasse)

    setlistetenueClasseEleve1( listetenueClasseEleve1 )

    //let listeTransportEleve1 = listeElevesContext.map( element => element.transportTotale)
    let listeTransportEleve1 = listePaiementContext.map( element => element.transport)

    setlisteTransportEleve1( listeTransportEleve1 )

    ///let listeCantineEleve1 = listeElevesContext.map( element => element.cantineTotale)
    let listeCantineEleve1 =listePaiementContext.map( element => element.cantine)
    setlisteCantineEleve1( listeCantineEleve1 )


     //récupération de tous les montants payé
     const listeMontantPaye = listePaiementContext.map( element => element.montantPaye)

     //calcul du chifffre d'affaire
     const mergeChiffreAffaire1 = listeMontantPaye.reduce( (acc, current) => {
 
         return acc + current
 
     }, 0 )

     setmergeChiffreAffaire1(mergeChiffreAffaire1 )
 
      //récupération de tous les montants payé
      const listeMontantPayeCharge = listeChargesContext.map( element => element.montantPaye)
 
     //calcul du chifffre d'affaire listeChargesContext
     const mergeChargeTotale1 = listeMontantPayeCharge.reduce( (acc, current) => {
 
         return acc + current
 
     }, 0 )

     setmergeChargeTotale1(mergeChargeTotale1)
 
     const benefice1 = mergeChiffreAffaire1 - mergeChargeTotale1

     setbenefice1(benefice1)



},[listeElevesContext, listeChargesContext, listePaiementContext ])


     //récupération de tous les montants payé
     const listeMontantTotalEleve = listePaiementContext.map( element => element.montantPaye)

    
     //récupération des entrées totales par catégorie
      
     
    // let listeEntrees = [ "scolariteTotale", "tenueClasseTotale", "transportTotale", "cantineTotale" ]
     
     //récupération des clés ou noms des proprietés de chaque objet du tableau 
     let listeClesPaiement = Object.keys(listePaiementContext)

    let valeursTotauxCategorie = {}

    
    //let listelistePaiementCategorie = [ { scolarite: listeScolariteEleve }, { tenueClasse: listetenueClasseEleve }, { transport : listeTransportEleve }, { cantine : listeCantineEleve }]
    let listelistePaiementCategorie = [ { scolarite: listeScolariteEleve1 }, { tenueClasse: listetenueClasseEleve1}, { transport : listeTransportEleve1}, { cantine : listeCantineEleve1}]
   ///////////////////////////
      //calcul du montantde la catégorie totale payée par l'élève

    for( let i = 0; i < listelistePaiementCategorie.length; i++ ){

       
       
        let categoriecurrentKey = Object.keys(listelistePaiementCategorie[i])[0]

        const listecategoriecurrent = listelistePaiementCategorie[i]

        if(listecategoriecurrent) {

            let valeurTotauxmerge = listecategoriecurrent[categoriecurrentKey].reduce( (acc, current) => {
            
                return acc + current
        
            }, 0 )
        
           
            valeursTotauxCategorie[categoriecurrentKey] = valeurTotauxmerge
        
        }
        

    }

  ////////////////////////////////////////////

  let [ valeurInputEntree, setvaleurInputEntree ] = useState({})

  let [ valeurInputDateEntree, setvaleurInputDateEntree ] = useState({
 
                                                         dateDebut: "",
                                                         dateFin: ""                             
     
                                                         })
 
  let [  isOpenbodyDataNormalEntree, setisOpenbodyDataNormalEntree ] = useState(true)
 
  let lockOpenbodyDataNormalEntree = () => { setisOpenbodyDataNormalEntree(false)} 
  let openOpenbodyDataNormalEntree = () => { setisOpenbodyDataNormalEntree(true)} 
 
  let [ isOpenSearchEntree, setisOpenSearchEntree ] = useState(false)
 
  let lockSearchEntree = () => { setisOpenSearchEntree(false)} 
  let openSearchEntree = () => { setisOpenSearchEntree(true)} 
 
     
  
 
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

 //création du tableau de ref des div de filtres
 
 let [ filtrebtnEntree, setfiltrebtnEntree ] = useState({})
 //récupération de l'entrée de l'input et mise à jor du state
 const onchange = (e) => {
 
     if( e.target.name === "dateDebut" || e.target.name === "dateFin" ){
 
        for( let i=0; i<= tableDate.length; i++){
 
            setvaleurInputEntree({})
            setfiltrebtnEntree({})
             //formSubmit.reset()
             
            setvaleurInputDateEntree({
 
                 ...valeurInputDateEntree,
                 [ e.target.name]: e.target.value
                     
            })
             
 
        }
 
     }else if(e.target.name === "recherche"){
 
        let value = [ e.target.name]
      
        value = e.target.value;
       
         setvaleurInputDateEntree({})
         setfiltrebtnEntree({})
         formSubmit.reset()
 
         setvaleurInputEntree({})
 
         setvaleurInputEntree({value})
 
    
     
     } 
     
     
}


useEffect( () => {
 
    if( valeurInputEntree.value){

        openSearchEntree()
        lockOpenbodyDataNormalEntree()
    
    }else if(  valeurInputDateEntree.dateDebut && valeurInputDateEntree.dateFin ){

        openSearchEntree()
        lockOpenbodyDataNormalEntree()
    

    } else if(filtrebtnEntree.value){

        openSearchEntree()
        lockOpenbodyDataNormalEntree()
    

    }

    //gestion du remasqauge des données

    if( valeurInputEntree.value === "" ){

        lockSearchEntree()
        openOpenbodyDataNormalEntree()

    } 
 
})
 

//montant de la scolarité
const PriceScolarite = 150000


    return (
        <div className='getAllEntreeContainer'>
            
           <div className='getAllEntree'>

                <div className='getAllEntree__chiffreEntree'>

                    <div className='getAllEntree__chiffreEntree--vid'></div>
                    <div className='getAllEntree__chiffreEntree--valeur'>

                        <p className='getAllEntree__chiffreEntree--element chiffreAffaire' >
                            Chiffre d'affaire : {mergeChiffreAffaire1} FCFA
                        </p>
                        <p className='getAllEntree__chiffreEntree--element chargeTotale' >
                            Charge Totale : {mergeChargeTotale1} FCFA
                        </p>
                        <p className='getAllEntree__chiffreEntree--element benefice' >
                            Bénéfice : {benefice1} FCFA
                        </p>

                    </div>
                    
                </div>

                <div className='getAllEntree__Totaux'>

                    {
                        
                        
                            <div className='container' >

                                <div className='container__btn' >

                                    
                                    < div className='container__btn--titre'  value ="scolarite"   onClick ={  onchange  }> Scolarité Totale </div>
                                    <div className='container__btn--valeur'>{ valeursTotauxCategorie.scolarite }FCFA</div>
                                
                                </div>

                                <div className='container__btn'  >

                                    <div className='container__btn--titre' value ="tenueClasse"  onClick ={  onchange }> Tenue de classe  </div>
                                    <div className='container__btn--valeur'> {valeursTotauxCategorie.tenueClasse}FCFA</div>
                                    
                                </div>

                                <div className='container__btn'   >

                                    <div className='container__btn--titre' value ="transport" onClick ={ onchange  } >Transport</div>
                                    <div className='container__btn--valeur'> {valeursTotauxCategorie.transport}FCFA</div>
                                    
                                </div>

                                <div className='container__btn'  >

                                    <div   value ="cantine" className='container__btn--titre' onClick ={  onchange  }> Cantine </div>
                                    <div className='container__btn--valeur'> {valeursTotauxCategorie.cantine}FCFA</div>
                                    
                                </div>
                                

                            </div>
                         
                    
                    }

                 
                        <form className='containerDateFiltre deactiveDate' >

                            <div className='containerDateFiltre__btn deactiveDate__btn'>
                                <label htmlFor="dateDebut" className='date'> Date début</label>
                                <input type='date' name='dateDebut' id='dateDebut' className='containerDateFiltre__btn--titre'  value={ valeurInputDateEntree.dateDebut  } onChange  ={  onchange }  />
                                
                            </div>
                            <div className='containerDateFiltre__btn deactiveDate__btn'>
                                <label htmlFor="dateFin" className='date'> Date de fin</label>
                                <input type='date' name='dateFin' id='dateFin' className='containerDateFiltre__btn--titre'  value={ valeurInputDateEntree.dateFin  }  onChange ={  onchange } />
                                
                            </div>

                        </form>

                 
                </div>

                <div className='rechercheContainerblock'>

                    <form className='rechercheContainer1'>

                        <label htmlFor="recherche" className='labelRecherche' ><i className="fa-solid fa-magnifying-glass"></i></label>
                        <input type='text' name='recherche' id='recherche' className='recherche' placeholder="Nom élève, Prénom élève, Nom Parent, Téléphone parent"
                        value={ valeurInputEntree.value } onFocus={ openFocus } onBlur={ lockFocus }  onChange ={  onchange }/>

                    </form>
                    
                   

                </div>

               
                
                <div className='getAllEntree__affichage'>

                    <div className='titre' >

                        <div className='titre__item'>nom</div>
                        <div className='titre__item'>prénom</div>
                        <div className='titre__item'>Date dernier paiement</div>
                        <div className='titre__item'>Montant total payé</div>

                    </div>

                    
                    {
                        isOpenbodyDataNormalEntree &&

                        listeElevesContext.map( (eleve, index) => 
                        
                        < div key={ `${eleve.nom}-${index}` }>
                            <hr></hr>
                            <div className='valeurs' >

                                <div className='valeurs__container'>

                                    <div className='titreValeur'>{eleve.nom}</div>
                                    <div className='titreValeur'>{eleve.prenom}</div>

                                   { 
                                      
                                         
                                        eleve.dateDernierPaiement
                                       
                                            
                                                                     ?

                                        <div className='titreValeur'  >{ (eleve.dateDernierPaiement).slice(0,10) }</div>
                                        :

                                        <div className='titreValeur'  >{ (eleve.dateInscription).slice(0,10)  }</div>
                                        
                                        
                                        
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

                                    {  <button   style={{ display: 'block' }} className={ `arrow  arrowDow${eleve.id}` }  value={eleve.nom}  > <i className="fa-solid fa-angle-down"  title="plus de détails" onClick={ () => iconEleveDetailUp(eleve.id) } ></i> </button> }
                                    {  <button style={{ display: 'none' }} className={ `arrow  arrowUp${eleve.id}` } value={eleve.nom} > <i className="fa-solid fa-angle-up"  onClick={ () => iconEleveDetailDown(eleve.id) } ></i> </button>} 
                                

                                </div>
                              
                            </div>

                            {
                                

                                <div className= { `detail${eleve.id}` } style={{ display: 'none' }}>
            
                                    <div className='detail__titre' >
                        
                                        <div className='detail__titre--item titre'> Date du paiement</div>
                                        <div className='detail__titre--item titre'> Montant Payé</div>
                                        <div className='detail__titre--item titre'> Scolarité</div>
                                        <div className='detail__titre--item titre'> Tenues de classe</div>
                                        <div className='detail__titre--item titre'> Transport</div>
                                        <div className='detail__titre--item titre'> Cantine</div>
                        
                                    </div>
                    
                    
                               
                                    { 
                                    

                                        listePaiementContext.filter( paiement => paiement.eleves_id === eleve.id ).map( (paiement, index) =>

                                            <div className='detail__titre'  key={ paiement.montantPaye-`${index}` } >
                        
                                                {   <div className='detail__titre--item valeur'> { (paiement.datePaiement).slice(0,10) }</div>}
                                                {  <div className='detail__titre--item valeur'> {paiement.montantPaye}</div>}
                                                {  <div className='detail__titre--item valeur'> {paiement.scolarite}</div>}
                                                {  <div className='detail__titre--item valeur'> {paiement.tenueClasse}</div>}
                                                {    <div className='detail__titre--item valeur'> {paiement.transport}</div>}
                                                {  <div className='detail__titre--item valeur'> {paiement.cantine}</div>}
                        
                                            </div>
                                        
                                        
                                        )
                                            
                                       
                        
                                    }

                                    {
                                        
                                         <div className='detail__totaux' >

                                                {   <div className='detail__titre--item valeur'> Totaux de l'élève</div>}
                                                {  <div className='detail__titre--item valeur'> {eleve.montantTotalEleve}</div>}
                                                {  <div className='detail__titre--item valeur  valeurScolarite'> <span className='prixTotal'> {eleve.scolariteTotale  }</span> <span className='resteAPayer' title='Reste à payer'> { "RP:"}  {   PriceScolarite - eleve.scolariteTotale}</span> </div>}
                                                {  <div className='detail__titre--item valeur'> {eleve.tenueClasseTotale}</div>}
                                                {    <div className='detail__titre--item valeur'> {eleve.transportTotale}</div>}
                                                {  <div className='detail__titre--item valeur'> {eleve.cantineTotale}</div>}
                        

                                         </div>
                                    }
                                
                                
                                </div>
                                 
                            }
                            
                        </div>
                        

                        
                        )

                    }

{
                        isOpenSearchEntree &&

                        <ComptaEntreeSearch  listeClassesContext={listeClassesContext}  listeElevesContext={listeElevesContext}   listePaiementContext={listePaiementContext} openSearchEntree={openSearchEntree } lockSearchEntree={lockSearchEntree }  lockOpenbodyDataNormalEntree={lockOpenbodyDataNormalEntree}  valeurInputSearchEntree ={valeurInputEntree.value}   valeurInputDateEntree = {valeurInputDateEntree} filtrebtnEntree={filtrebtnEntree.value}/>
                    }
                </div>
            </div>
                
            <div className='componentCreateEntree'>

                { createOpen && <CreateOneEntree  idEleveCurrent = {idEleveCurrent} lockCreateOpen = { lockCreateOpen }/> } 
                

            </div>

        </div>
    );
};

export default GetAllEntree;

