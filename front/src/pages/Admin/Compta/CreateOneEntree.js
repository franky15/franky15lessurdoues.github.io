import React, { useState , useEffect} from 'react';
import { comptaServices } from '../../../_services/Compta.Services';

const CreateOneEntree = ({ openCreateOpen, idEleveCurrent, lockCreateOpen }) => {

    let idEleve = idEleveCurrent
    console.log( "**** idEleve  de CreateOneEntree ")
    console.log(idEleve)

   

    let table = [ ]


    //gestion du gros object pour un seul formulaire
    /////////////////////////
    let [ formCompta, setFormCompta ]  = useState({idEleve : idEleveCurrent.idEleve})

    const comptaFunction = (e) => {

        setFormCompta ({

            ...formCompta,      ///// attention insérer idpaiement////////
            [e.target.name] : e.target.value

        }) 


    }

    console.log("***formCompta")
    console.log(formCompta)

    let object


    let [ eleveCreate, setEleveCreate ] = useState(false) //false
     //confirmation de la mise à jour
     let confirmationPaiementCreate = () => {
     
        
        setEleveCreate(true)
       // setHidenEleveCreate(false)
       
    
        //cacher la confirmation après 3000 millisecondes
        setTimeout( () => {
    
            
            setEleveCreate(false)
            window.location.reload();
            
        }, 1)
    }


let [ alerteForm, setalerteForm ] = useState(false)

let { typePaiement, datePaiement, montantPaye } = formCompta

const nomClasse1 = document.querySelector(".typePaiement")
const nomClasse2 = document.querySelector(".datePaiement")
const nomClasse3 = document.querySelector(".montantPaye")
const nomClasse4 = document.querySelector(".libelle")
const nomClasse5 = document.querySelector(".commentaire")

    useEffect( () => {

        if(typePaiement || datePaiement || montantPaye  ){
    
            setalerteForm(false)
        }
    
           
    }, [formCompta, typePaiement, datePaiement, montantPaye] )

    // gestion des expressions régulières 
    let regexNomPrenom = new RegExp("^[a-zA-Z]{2,}$")

    let regexScolarite = new RegExp("^[0-9]{1,6}$")

    let reagexTel = new RegExp("^[0-9]{1,20}$")

    let regexCommentaire = new RegExp("^[a-zA-Z ]{5,}$")

    let regexEmail = new RegExp("[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+")




//gestion des alerte à l'origine
const alerteInitiale = () => {

    
    if( typePaiement  ){
 
     nomClasse1.style.border = "solid 1px black "
     
     //nomClasse1.style.display = "none"
 
    }
    
    if( datePaiement ){
 
     nomClasse2.style.border = "solid  0px black"
     //nomClasse2.style.display = "none"
 
    }
    
    if(montantPaye){
 
     nomClasse3.style.border = "solid  1px black"
     //nomClasse3.style.display = "none"
 
    }
    
 
    }
 
    alerteInitiale()


    const submit = (e) => {

        
        e.preventDefault()

        console.log("bienvenue au submit test de createOneEntree")
            
       
        console.log("bienvenue au submit test de createOneEntree")
        //valTextarea

    if( !typePaiement|| !datePaiement || !montantPaye ){

    console.log("*** Tous les champs avec étoiles ou en rouge doivent être remplis *** ")

    setalerteForm(true)


    // }else{

    
    if( !typePaiement  ){

    console.log("bienvenue dans la condition nom")

    setalerteForm(true)


    const nomClasse = document.querySelector(".typePaiement")
    nomClasse.style.border = "solid 1px red"

    } 


    /*else*/ if( !datePaiement){

    console.log("bienvenue dans la condition anciennete")

    setalerteForm(true)

    const nomClasse = document.querySelector(".datePaiement")
    nomClasse.style.border = "solid 1px red"

    }

    /*else*/ if( !parseInt(montantPaye) || regexScolarite.test( parseInt(montantPaye)) === false  ){

    console.log("bienvenue dans la condition nom")

    setalerteForm(true)

    console.log( regexScolarite.test( montantPaye )  )

    const nomClasse = document.querySelector(".montantPaye")

    nomClasse.style.border = "solid 1px red"

    }  


    } else{
            comptaServices.createCompta(formCompta)
                .then( res => {
                    console.log("données du formulaire envoyées")
                    console.log(res)
                    //navigate("/admin/classes" ) 
                ////////////////////////////

                confirmationPaiementCreate()

                ////////////////////////////
                })
                .catch( err => console.log(err))
            
        }
    }

    console.log("**** formCompta")
    console.log(formCompta)


    /////////////////////////////////

   
    


    //////////////////////////////////

    return (
        <div className='createonentree'>
           
            <form className='createonentree__container'>

                <form className='createonentree__container--item' onChange={ comptaFunction }>

                    <label for="typePaiement"  className='label'> Type de paiement<span className='etoile'>*</span></label>
                    <select name="typePaiement" id='typePaiement' className='typePaiement item' >

                        <option value="vide" > </option>
                        <option value="scolarite" >Scolarité</option>
                        <option  value="tenueClasse" >Tenues de Classe </option >
                        <option  value="transport"  >Transport </option >
                        <option  value="cantine"  >Cantine </option >
                        

                    </select>

                </form>

                <div className='createonentree__container--item'>
                    <label for="datePaiement" className='label'> Date de paiement <span className='etoile'>*</span></label>
                    <input type='date' name='datePaiement' id='datePaiement' className='datePaiement item' value={ formCompta.datePaiement }  onChange={ comptaFunction }  maxLength={200} />
                </div>

                <div className='createonentree__container--item' >
                    <label for="montantPaye" className='label'>Montant payé <span className='etoile'>*</span></label>
                    <input type='montantPaye' name='montantPaye' id='montantPaye' className='montantPaye item' value={ formCompta.montantPaye  }  onChange={ comptaFunction }  maxLength={200} />
                </div>

            </form>

            <div className='formulaireConfirm__btn'>
                < button className='btn  colorCancel' onClick={ lockCreateOpen } > Annuler</button>
                <button className='btn  colorValid' onClick={ submit }> Valider</button>
            </div>
                
         
        </div>
    );
};

export default CreateOneEntree;

//new Date(formCompta.datePaiement).toLocaleDateString("fr") 