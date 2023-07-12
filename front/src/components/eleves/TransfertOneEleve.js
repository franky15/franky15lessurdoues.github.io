import React,{ useContext, useState } from 'react';
import { elevesServices } from '../../_services/Eleves.services';
import { useParams } from 'react-router-dom';
//import { AddEleveContext } from '../../_utils/ContextAddEleve';

const TransfertOneEleve = ( { lockshowWindowEleveTransfert, openshowWindowEleveTransfert, showWindowEleveTransfert, setshowWindowEleveTransfert, eleveId, listeElevesContext, listeClassesContext , listeEleves} ) => {  //, listeElevesContext, listeClassesContext

    //récupération du params
    const {id} = useParams()
    const idClasse = parseInt(id)

  

    console.log("$$la liste listeEleves de la classse est $$" )
    console.log(listeEleves )
    console.log(listeEleves[0] )
    /*
    console.log("eleveId")
    console.log(eleveId) 
    */

    //let  { listeElevesContext, listeClassesContext }  = useContext(AddEleveContext)

    console.log("listeElevesContext")
    console.log(listeElevesContext)

    console.log("listeClassesContext")
    console.log(listeClassesContext) 

    


   let idEleve = eleveId.idEleve

   console.log("idEleve est : " + idEleve)

   let [ eleveIdentifiant, setEleveId ] = useState({ idEleve: idEleve})
   
   let eleveCurrent = listeElevesContext.find( eleve => eleve.id === idEleve)
   
   console.log("eleveCurrent")
   console.log(eleveCurrent)

   

   //converstion de l'idSection de chiffre à lettre 
   let sectionAnglophone = "anglophone"
   let sectionFrancophone = "francophone"
   let sectionNumber1

   if(eleveCurrent.section_id === 1) {

       sectionNumber1 = sectionAnglophone

   }else if( eleveCurrent.section_id === 2 ) {

       sectionNumber1 = sectionFrancophone

   } 

   console.log("sectionNumber1 est : " + sectionNumber1 )
 

    //gestion du state section 
    let [ valSection, setValSection ] = useState({

        sectionNumber : `${sectionNumber1}` //eleveCurrent.section_id/////////
    })


    

    //gestion du state  classe
    let [ valClasse, setValClasse ] = useState({

        classes_id : eleveCurrent.classes_id
    })
    //////////////////////////////////////////

    let [ valClasse2, setValClasse2 ] = useState({

        
    })

    //fonction de la classe
    const classeInput2 = (e) => {

        setValClasse2({

            ...valClasse2,
            [e.target.name] : e.target.value
            //classes_id : e.target.value

        })

    }
    console.log("******* ValClasse2 est : ")
    console.log(valClasse2)

      /////////////////////////////////////
//conversion de la classe de chiffre en lettre
let classeconversion = listeClassesContext.find( classe => classe.classes_id === valClasse2.classes_id)

console.log("classeconversion")
console.log(classeconversion)
//console.log("classeconversion.id")
//console.log(classeconversion.id)

////////////////////////////////////

    ////////////////////////////////////////

    //fonction de la classe
    const classeInput = (e) => {

        setValClasse({

            ...valClasse,
            [e.target.name] : e.target.value
            //classes_id : e.target.value

        })

    }
    console.log("******* ValClasse est : ")
    console.log(valClasse)

    //fonction de la section
    const sectionInput = (e) => {

       
        setValSection({

            ...valSection,
            [e.target.name] : e.target.value
            //sectionNumber : e.target.value
        })
      
         
    }

    console.log("******* ValSection est : ")
    console.log(valSection.section_id)

    ////////////////////////////////:
    //conversion de la classe chiffre en lettre
    const classeConverter = listeClassesContext.find( classeId => classeId.id === valClasse.classes_id)
    
    //console.log("******* classeConverter  est : ")
    console.log(classeConverter)

    ///////////////////////////////

    
    let [ eleveCreate, setEleveCreate ] = useState(false) //false
    //let [ hidenEleveCreate, setHidenEleveCreate ] = useState(true)
 
     //confirmation de la mise à jour
    let confirmationEleveCreate = () => {
 
    
     //setEleveCreate(true)
    // setHidenEleveCreate(false)
    lockshowWindowEleveTransfert()
    
 
     //cacher la confirmation après 3000 millisecondes
     setTimeout( () => {
 
         
         setEleveCreate(false)
         window.location.reload();
         
     }, 3000)
    
    
 
 }


 //gestion du state date  montant
 let [ valDate, setValDate ] = useState({

   // dateInscription : eleveCurrent.dateInscription.slice(0,10),
    
})

 //fonction de la date de naissance
 const dateInput = (e) => {

    setValDate({

        ...valDate,
        [e.target.name] : e.target.value
       // dateNaissance : e.target.value
    })
  

}
console.log("******* ValDate est : ********")
console.log( (valDate.dateInscription))



console.log("l'object transfert")

console.log({ ...eleveIdentifiant, ...valClasse2, ...valSection, ...valDate})
//console.log( (valDate.dateNaissance).slice(0,10).replace(""))
 
  ///////////////////////////////////////////////::::

    const submit = () => {

        
        //e.preventDefault()

        
        console.log("bienvenue au submit test du transfert")


       
        elevesServices.updateEleve({ ...eleveIdentifiant, ...valClasse2, ...valSection, ...valDate})
            .then( res => {
                console.log("données du formulaire envoyées")
                console.log(res)
               // navigate("/admin/classes" ) 
               ////////////////////////////

               confirmationEleveCreate()

               ////////////////////////////
            })
            .catch( err => console.log(err))
        
        
    }

    console.log("**** valSection.sectionNumber ****")
    console.log( valSection.sectionNumber)
    return (

        <div className='transfertOneEleve'>
            
            <p className='transfertOneEleve__titre'>Changer la classe de l'élève {eleveCurrent.nom}</p>
            
            <form className='transfertOneEleve__form'>

                <div className='transfertOneEleve__form--element'>
                    
                    <label for="classeActulle" className='formulaireDateSectionClasse__element--classe label'>Classe Actuelle <span className='etoile'>*</span></label>
                    <input type='text' name='classeActulle' id='classeActulle' value= {  classeConverter.nom } className='transfert' onChange={ "parentInput" } />
                </div>
                <form className='transfertOneEleve__form--element' onChange={ classeInput2 } >

                    
                    <label for="newClasse" className='formulaireDateSectionClasse__element--classe label'>Nouvelle classe <span className='etoile'>*</span></label>
                    <select name="classes_id" id='formulaireDateSectionClasse__element--select' className='dateSectionClasselist transfertSection' >

                         
                        <option value={ "v" }  >  </option>
                        { listeClassesContext.map( (classe, index) => 
                            
                            <option value={ classe.nom } key={classe-`${index}`} > { classe.nom } </option> )
                        
                        } 
                    
                    </select>
                   
                </form>
                <form className='transfertOneEleve__form--element' onChange={ sectionInput } >

                    
                    <label for="sectionNumber" className='formulaireDateSectionClasse__element--classe label'>Section <span className='etoile'>*</span> </label>
                    <select name="sectionNumber" id='formulaireDateSectionClasse__element--select' className='dateSectionClasselist transfertSection' >

                        <option value={ valSection.sectionNumber } > { valSection.sectionNumber } </option>
                        <option value="anglophone"  >Anglophone</option>
                        <option  value="francophone"  >Francophone </option >
                    
                    </select>
                </form>

                <div className='transfertOneEleve__form--element'>
                    
                    <label for="dateInscription" className='formulaireDateSectionClasse__element--classe label'>Date d'inscription <span className='etoile'>*</span></label>
                    <input type='date' name='dateInscription' id='dateInscription' value= { valDate.dateNaissance } className='DatemontantPaye transfert' onChange={ dateInput } />
                </div>

                

            </form>
            
            <div className='formulaireConfirm__btn'>
                    < button className='form__confirme--cancel  btn colorCancel' onClick={ lockshowWindowEleveTransfert } > Annuler</button>
                    <button className='form__confirme--valid  btn colorValid' onClick={ submit }> Valider</button>
            </div>
            
            
        </div>
    );
};

export default TransfertOneEleve;