import React, { useContext, useState, useEffect, useRef} from 'react';
import CreateOneEntree from './CreateOneEntree';
import ComptaDetail from './ComptaDetail';
import { AddEleveContext } from '../../../_utils/ContextAddEleve';
import ComptaEntreeSearch from './ComptaEntreeSearch';

const GetAllEntree = () => {


    let  { listePositionPageContext, listeElevesContext, listeClassesContext, listePaiementContext, listeChargesContext }  = useContext(AddEleveContext)

    let openpositionEntreesContext = listePositionPageContext[4].openpositionEntreesContext()
    
    console.log("**** openpositionEntreeContext  dans getallpersonnels")
    console.log(openpositionEntreesContext )



    console.log("***** listePositionPageContext dans le composant getAllEntree ***")
    console.log(listePositionPageContext)

    console.log("***** listeElevesContext dans le composant getAllEntree ***")
   console.log(listeElevesContext)

    console.log("*****listeClassesContext dans le composant getAllEntree  ***")
    console.log(listeClassesContext)

    console.log("*****listePaiementContext dans le composant getAllEntree  ***")
    console.log(listePaiementContext)

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

         ////////////////////////////////////

        //gestde l'affichage du detail
        const detail = document.querySelector(`.detail${idEleve}`)
        detail.style.display = "block"

        const arrowDow = document.querySelector(`.arrowDow${idEleve}`)
        arrowDow.style.display = "none"

        const arrowUp = document.querySelector(`.arrowUp${idEleve}`)
        arrowUp.style.display = "block"


         /////////////////
          //console.log("vous avez cliqué sur le detail de l'élève")
          console.log( idEleve)
  
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
    
    //console.log("vous avez cliqué sur le detail de l'élève")
    console.log( idEleve)
    
    setidEleveCurrent({

        ...idEleveCurrent,
        idEleve
    })

}

console.log("**** idEleveCurrent " )
console.log( idEleveCurrent)

   
let paiementCurrent = listePaiementContext.filter( (paiement) => paiement.eleves_id === idEleveCurrent.idEleve)  //eleve.id

//console.log("***** paiementCurrent")
//// console.log(paiementCurrent)


 let dernierElementPaiementCurrent = paiementCurrent[paiementCurrent.length - 1]

// console.log("***** dernierElementPaiementCurrent")
 //console.log(dernierElementPaiementCurrent)

 ///////////////////////////////////////:
    //récupération de tous les montants payé
    const listeMontantPaye = listePaiementContext.map( element => element.montantPaye)

   // console.log("***** listeMontantPaye")
   // console.log(listeMontantPaye)


    //calcul du chifffre d'affaire
    const mergeChiffreAffaire = listeMontantPaye.reduce( (acc, current) => {

       // console.log("***** acc.montantPaye += current.montantPaye")
        //console.log(acc + current)

        return acc + current

    }, 0 )

     //récupération de tous les montants payé
     const listeMontantPayeCharge = listeChargesContext.map( element => element.montantPaye)

    //calcul du chifffre d'affaire listeChargesContext
    const mergeChargeTotale = listeMontantPayeCharge.reduce( (acc, current) => {

       // console.log("***** acc.montantPaye += current.montantPaye")
       // console.log(acc + current)

        return acc + current

    }, 0 )

    //console.log("****** mergeChargeTotale  dans charges")
    //console.log(mergeChargeTotale )

    const benefice = mergeChiffreAffaire - mergeChargeTotale


   // console.log("****** mergeChiffreAffaire")
   // console.log(mergeChiffreAffaire)

    //calcul du montant total payé par l'élève

     //récupération de tous les montants payé
     const listeMontantTotalEleve = listePaiementContext.map( element => element.montantPaye)

    // console.log("***** listeMontantTotalEleve")
    // console.log(listeMontantTotalEleve)
 
 
     //calcul du montant total payé par l'élève
     const mergemontantTotalEleve = listeMontantTotalEleve.reduce( (acc, current) => {
 
        // console.log("***** acc.montantPaye += current.montantPaye")
        // console.log(acc + current)
 
         return acc + current
 
     }, 0 )
 
    // console.log("****** mergemontantTotalEleve ")
    // console.log(mergemontantTotalEleve )
  
    
     //récupération des entrées totales par catégorie
      
     
    // let listeEntrees = [ "scolariteTotale", "tenueClasseTotale", "transportTotale", "cantineTotale" ]
     
     //récupération des clés ou noms des proprietés de chaque objet du tableau 
     let listeClesPaiement = Object.keys(listePaiementContext)

     
    // console.log("******listeClesPaiement")
    // console.log(listeClesPaiement)

 

     let listeScolariteEleve = listePaiementContext.map( element => element.scolarite)
     let listetenueClasseEleve = listePaiementContext.map( element => element.tenueClasse)
     let listeTransportEleve = listePaiementContext.map( element => element.transport)
     let listeCantineEleve = listePaiementContext.map( element => element.cantine)

    let valeursTotauxCategorie = {}

    

   //let listelistePaiementCategorie = [ listeScolariteEleve, listetenueClasseEleve, listeTransportEleve, listeCantineEleve]
   let listelistePaiementCategorie = [ { scolarite: listeScolariteEleve }, { tenueClasse: listetenueClasseEleve}, { transport : listeTransportEleve}, { cantine : listeCantineEleve}]
   ///////////////////////////
      //calcul du montantde la catégorie totale payée par l'élève

      for( let i = 0; i < listelistePaiementCategorie.length; i++ ){

       
       
        let categoriecurrentKey = Object.keys(listelistePaiementCategorie[i])[0]

       // console.log("***** categoriecurrentKey ")
       // console.log(categoriecurrentKey )

        const listecategoriecurrent = listelistePaiementCategorie[i]

       // console.log("***** listecategoriecurrent")
       // console.log(listecategoriecurrent)

       // console.log(listecategoriecurrent[categoriecurrentKey])
        
        
        if(listecategoriecurrent) {

           // console.log("***** listecategoriecurrent")
          //  console.log(listecategoriecurrent)
            
            let valeurTotauxmerge = listecategoriecurrent[categoriecurrentKey].reduce( (acc, current) => {
            
               // console.log("***** acc.montantPaye += current.montantPaye")
               // console.log(acc + current)
        
                return acc + current
        
            }, 0 )
        
           // console.log("***** valeurTotauxmerge")
           // console.log(valeurTotauxmerge)
            
            valeursTotauxCategorie[categoriecurrentKey] = valeurTotauxmerge
            
            
            
        }
        

      }

    //  console.log("***** valeursTotauxCategorie")
      //  console.log(valeursTotauxCategorie)
     



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
 /*let tableFilterRef = [ useRef("scolarite"),  useRef("tenueClasse"),  useRef("transport"),  useRef("cantine")]
 
 let tableFilter = [ "scolarite", "tenueClasse",  "transport",  "cantine"]
*/

 let [ filtrebtnEntree, setfiltrebtnEntree ] = useState({})
 //récupération de l'entrée de l'input et mise à jor du state
 const onchange = (e) => {
 
     
     console.log("***** bienvenue dans onchange " )
 
     console.log("mon  value : " +  e.target.value)

     if( e.target.name === "dateDebut" || e.target.name === "dateFin" ){
 
         console.log("****** bienvenue à la condition date") 
 
         for( let i=0; i<= tableDate.length; i++){
 
             setvaleurInputEntree({})
             setfiltrebtnEntree({})
             //formSubmit.reset()
             
             setvaleurInputDateEntree({
 
                 ...valeurInputDateEntree,
                 [ e.target.name]: e.target.value
                     
             })
             
 
         }
 
       //  console.log("******  valeurInputDateEntree") 
       //  console.log( valeurInputDateEntree) 
        
     }else if(e.target.name === "recherche"){
 
         console.log("***** bienvenue à la condition recherche" )
 
         let value = [ e.target.name]
         value = e.target.value;
     
         setvaleurInputDateEntree({})
         setfiltrebtnEntree({})
         formSubmit.reset()
 
         setvaleurInputEntree({})
 
         setvaleurInputEntree({value})
 
        // console.log("mon  value : " +  e.target.value)
     
     }else if(e.target.value === "scolarite" || e.target.value === "tenueClasse" || e.target.value === "transport"  || e.target.value === "cantine"  ){

        console.log("***** bienvenue dans onchange  bouton filtre" )

        let value = e.target.name;
         value = e.target.value;
        
      

         setvaleurInputEntree({})
         setvaleurInputDateEntree({})
         setfiltrebtnEntree({})
         formSubmit.reset()
        
         setfiltrebtnEntree({value})
    
      
        // console.log("****** filtrebtnEntree") 
        // console.log(filtrebtnEntree)  

    }
     
     
 }


 //console.log("******  valeurInputDate") 
 //console.log( valeurInputDateEntree)  
 
 //console.log("dateDebut "+ valeurInputDateEntree.dateDebut) 
 //console.log( "dateFin "+valeurInputDateEntree.dateFin) 
 

// console.log("***** filtrebtnEntree")
 //console.log(filtrebtnEntree)

 //console.log("***** valeurInputEntree")
 //console.log(valeurInputEntree)
 
 
 useEffect( () => {
 
     if( valeurInputEntree.value){
 
        console.log("***** condition  valeurInputEntree.value")

        openSearchEntree()
         lockOpenbodyDataNormalEntree()
        
         
 
 
     }else if(  valeurInputDateEntree.dateDebut && valeurInputDateEntree.dateFin ){
 
        console.log("***** condition  valeurInputDateEntree.dateDebut && valeurInputDateEntree.dateFin ")
        
        openSearchEntree()
        lockOpenbodyDataNormalEntree()
        
 
     } else if(filtrebtnEntree.value){
 
        console.log("***** condition  filtrebtnEntree.value ")

         openSearchEntree()
         lockOpenbodyDataNormalEntree()
        
 
     }

     //gestion du remasqauge des données

     if( valeurInputEntree.value === "" ){
 
        console.log("***** condition  valeurInputEntree.value")

        lockSearchEntree()
        openOpenbodyDataNormalEntree()
        
         
 
 
     }
    
 
 })
 
 
 
 




    return (
        <div className='getAllEntreeContainer'>
            
           <div className='getAllEntree'>

                <div className='getAllEntree__chiffreEntree'>

                    <div className='getAllEntree__chiffreEntree--vid'></div>
                    <div className='getAllEntree__chiffreEntree--valeur'>

                        <p className='getAllEntree__chiffreEntree--element chiffreAffaire' >
                            Chiffre d'affaire : {mergeChiffreAffaire} FCFA
                        </p>
                        <p className='getAllEntree__chiffreEntree--element chargeTotale' >
                            Charge Totale : {mergeChargeTotale} FCFA
                        </p>
                        <p className='getAllEntree__chiffreEntree--element benefice' >
                            Bénéfice : {benefice} FCFA
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

                    <form className='containerDateFiltre '>

                        <di className='containerDateFiltre__btn '>
                            <label for="dateDebut" className='date'> Date début</label>
                            <input type='date' name='dateDebut' id='dateDebut' className='containerDateFiltre__btn--titre'  value={ valeurInputDateEntree.dateDebut  } onChange  ={  onchange } />
                            
                        </di>
                        <di className='containerDateFiltre__btn '>
                            <label for="dateFin" className='date'> Date de fin</label>
                            <input type='date' name='dateFin' id='dateFin' className='containerDateFiltre__btn--titre'  value={ valeurInputDateEntree.dateFin  }  onChange ={  onchange }/>
                            
                        </di>

                    </form>
                </div>

                <div className='rechercheContainerblock'>

                    <form className='rechercheContainer1'>

                        <label for="recherche" className='labelRecherche' ><i className="fa-solid fa-magnifying-glass"></i></label>
                        <input type='text' name='recherche' id='recherche' className='recherche' placeholder='Nom personnel, électricité, salaire, poste'
                        value={ valeurInputEntree.value } onFocus={ openFocus } onBlur={ lockFocus }  onChange ={  onchange }/>

                    </form>
                    
                    <div className='valeursIcon__choice' onClick={ () =>  windowShowCreateCompta()  }> Ajouter un paiement</div>

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
                        
                        <>
                            <hr></hr>
                            <div className='valeurs' key={ eleve.nom-`${index}` }>

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
                                
                                
                                </div>
                                 
                            }
                            
                        </>
                        

                        
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



/*

// isOpenEntree && < ComptaDetail listePaiementContext = { listePaiementContext } listeElevesContext = { listeElevesContext } idEleveCurrent = {idEleveCurrent}/> 

 <div className='valeursIcon' >
                                                                                                            
                                   

    {  showWindowEleveDetailDown && <button className='arrow' > <i className="fa-solid fa-angle-down"  title="plus de détails" onClick={ () => iconEleveDetailUp(eleve.id) } ></i> </button> }
    { showWindowEleveDetailUp && <button className='arrow'> <i className="fa-solid fa-angle-up"  onClick={ () => iconEleveDetailDown(eleve.id) } ></i> </button>} 
    

</div>
*/

/*


 mergedPaiement.map( (paiement, index) =>
                    
    <div className='detail__titre' key={ paiement.typePaiement-`${index}` } >

        {   <div className='detail__titre--item valeur'> { (paiement.datePaiement).slice(0,10) }</div>}
        {  <div className='detail__titre--item valeur'> {paiement.montantPaye}</div>}
        {  <div className='detail__titre--item valeur'> {paiement.scolarite}</div>}
        {  <div className='detail__titre--item valeur'> {paiement.tenueClasse}</div>}
        {    <div className='detail__titre--item valeur'> {paiement.transport}</div>}
        {  <div className='detail__titre--item valeur'> {paiement.cantine}</div>}

    </div>
    
)

*/