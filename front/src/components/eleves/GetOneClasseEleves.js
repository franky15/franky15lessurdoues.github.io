import React,{ useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AddEleveContext } from '../../_utils/ContextAddEleve';
import UpdateEleve from './UpdateEleve';
import DeleteEleve from './DeleteEleve';
import TransfertOneEleve from './TransfertOneEleve';
import DetailsOneEleve from './DetailsOneEleve';
//import moment from 'moment';

const GetOneClasseEleves = () => {

    //console.log("***** Bienvenue dans le GetOneClasseEleves ******")

    //récupération du params
    const {id} = useParams()
    const idClasse = parseInt(id)

    //console.log("l'id du params de la classse est "+ idClasse )

    //const date = new Date();

    let  { listeElevesContext, listeClassesContext }  = useContext(AddEleveContext)

   // console.log("*****listeElevesContext dans le composant getOneClasseEleves***")
    //console.log(listeElevesContext)

    //console.log("*****listeClassesContext dans le composant getOneClasseEleves***")
    //console.log(listeClassesContext)

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

    console.log("$$la liste listeEleves de la classse est $$" )
    console.log(listeEleves )

    //let classe = listeClassesContext.find(element => element.id === idClasse)
    //console.log("classe")
   // console.log(classe.enseignant)

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

            //setshowWindowEleveDetailUp(true)
            //setshowWindowEleveDetailDown(false)

            //console.log("vous avez cliqué sur modifier")
            //console.log(idEleve)

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

        //setshowWindowEleveDetailUp(true)
        //setshowWindowEleveDetailDown(false)

        //console.log("vous avez cliqué sur supression")
        //console.log(idEleve)

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

       // setshowWindowEleveDetailUp(true)
       // setshowWindowEleveDetailDown(false)
       
        //console.log("vous avez cliqué sur transfert de l'élève")
        //console.log(idEleve)

        setEleveId({
            ...eleveId,
            idEleve

        })

   }

    //fonction d'affichage du detail de l'élève de l'élève iconEleveDetailDown
    const iconEleveDetailUp = (idEleve) => {

        
      setshowWindowEleveDetailUp(true)
      setshowWindowEleveDetailDown(false)

       //setshowWindowEleveDetailUp(false)
       //setshowWindowEleveDetailDown(true)
       ////////////////////
       setisOpen(true) //


       /////////////////
    
        
        setshowWindowEleveTransfert(false)
        setshowWindowEleveDelete(false)
        setshowWindowEleveUpdate(false)

        //console.log("vous avez cliqué sur le detail de l'élève")
        console.log(idEleve)

        setEleveId({
            ...eleveId,
            idEleve

        })
        

   }

   //fonction d'affichage du detail de l'élève de l'élève 
   const iconEleveDetailDown = (idEleve) => {

        
        setshowWindowEleveDetailDown(true)
        setshowWindowEleveDetailUp(false)

       // setshowWindowEleveDetailDown(false)
        //setshowWindowEleveDetailUp(true)

        ////////////////////////
        setisOpen(false) //

        ////////////////////////

        setshowWindowEleveTransfert(false)
        setshowWindowEleveDelete(false)
        setshowWindowEleveUpdate(false)
        
        //console.log("vous avez cliqué sur le detail de l'élève")
        console.log(idEleve)
        
        setEleveId({
            ...eleveId,
            idEleve

        })

    }

    //////////////////////////

    const valeur = () => {
       // console.log("valeur provisoire")
    }

   
   
  

    return (
        <div className='getOneClasseEleves'>

            <p className='enseignant'>Enseignant: {  }  </p>

            <div className='getOneClasseEleves__btn1'>

                

                    <div className='blocBtn'>

                        <form className='blocBtn__btn1 blocBtn__btn1Color'>

                            <input type='date' name='dateArrive'  value={"valeur"} className='btn__buttonDate'  onChange={valeur}/>
                           
                        </form>

                        < div className='blocBtn__btn1'>

                            <p  className='btn__button' > Ancien élève(s)</p>
                            <div className='btn__donnee'> {"valeur"} </div>
                        </div>

                        < div className='blocBtn__btn1'>

                            <p  className='btn__button' > Nouvel élève(s)</p>
                            <div className='btn__donnee'> "valeur" </div>
                        </div>

                        
                    
                </div>
                

            </div>

           
            <div className='getOneClasseEleves__btn2'>

                <p className='getOneClasseEleves__btn2--effectif'>Effectif de la classe: {"valeur"}</p>

                <div className='getOneClasseEleves__btn2--btn'>

                    <div  className='btnInput'>
                            
                        <p className='inputSearch'> <span className='loupe'> <i className="fa-solid fa-magnifying-glass"></i> </span> <input type='text' placeholder="Rechercher élève"  name='filtreClasseEleve' value={ "Rechercher élève" }  onFocus={ valeur } onBlur={ valeur } onChange ={ valeur } />  </p>
                    </div>

                    < div className='blocbtn2'>
    
                        <p  className='btn__button' > Ajouter un élève </p>
                        
                    </div>

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
                
                <hr></hr>
               
                { 
                    listeEleves.map( (eleve, index) => 
                   
                    <>
                    
                            <div className='getOneClasseEleves__btn3--bloc' key={ `${eleve.nom}-${index}` }>
                                
                            
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
                    </> 
                    

                    ) 
                    
                }
            
            </div> 

            { showWindowEleveUpdate && <UpdateEleve  showWindowEleveUpdate={showWindowEleveUpdate} setshowWindowEleveUpdate={setshowWindowEleveUpdate}  idClasse={idClasse} eleveId={eleveId} /> }
            {  windowDeleteClasse && <DeleteEleve showWindowEleveDelete={showWindowEleveDelete} setshowWindowEleveDelete={setshowWindowEleveDelete}  idClasse={idClasse}   eleveId={eleveId} listeElevesContext={listeElevesContext} listeClassesContext={listeClassesContext} lockwindowDeleteClasse={lockwindowDeleteClasse} openwindowDeleteClasse={openwindowDeleteClasse}/>  }
            {  showWindowEleveTransfert && <TransfertOneEleve  lockshowWindowEleveTransfert={lockshowWindowEleveTransfert} openshowWindowEleveTransfert={openshowWindowEleveTransfert} showWindowEleveTransfert={showWindowEleveTransfert} setshowWindowEleveTransfert={setshowWindowEleveTransfert} idClasse={idClasse}   eleveId={eleveId} listeElevesContext={listeElevesContext} listeClassesContext={listeClassesContext} listeEleves={listeEleves}/>  } 
            
        </div>
    );
};

export default GetOneClasseEleves;

/*

 {  showWindowEleveDetailDown && <span className='arrow'> <i className="fa-solid fa-angle-down" id={`${eleve.id}`} title="plus de détails" onClick={ () => iconEleveDetailUp(eleve.id) } ></i> </span> }
{ showWindowEleveDetailUp && <span className='arrow'> <i className="fa-solid fa-angle-up" id={`${eleve.id}`}  onClick={ () => iconEleveDetailDown(eleve.id) } ></i> </span>} 


{  showWindowEleveDetailDown && <DetailsOneEleve showWindowEleveDetailDown={showWindowEleveDetailDown} setshowWindowEleveDetailDown={setshowWindowEleveDetailDown} idClasse={idClasse}   eleveId={eleveId} listeElevesContext={listeElevesContext} listeClassesContext={listeClassesContext} listeEleves={listeEleves}/>  }


{   isOpen && <DetailsOneEleve   idClasse={idClasse}   eleveId={eleve.id} listeElevesContext={listeElevesContext} listeClassesContext={listeClassesContext} listeEleves={listeEleves}/>  }

*/

/*
        {  showWindowEleveDetailDown && <span className='arrow'> <i className="fa-solid fa-angle-down" id={`${eleve.id}`} title="plus de détails" onClick={ () => iconEleveDetailUp(eleve.id) } ></i> </span> }
        { showWindowEleveDetailUp && <span className='arrow'> <i className="fa-solid fa-angle-up" id={`${eleve.id}`}  onClick={ () => iconEleveDetailDown(eleve.id) } ></i> </span>} 



        { 
                                        
            showWindowEleveDetailDown ? <span className='arrow'> <i className="fa-solid fa-angle-down" id={`${eleve.id}`} title="plus de détails" onClick={ () => iconEleveDetailUp(eleve.id) } ></i> gg</span> 
            :
            
            
            <DetailsOneEleve   iconEleveDetailDown={iconEleveDetailDown}  idClasse={idClasse}   eleveId={eleve.id} listeElevesContext={listeElevesContext} listeClassesContext={listeClassesContext} listeEleves={listeEleves}/>  
        } 


        { isOpen && <DetailsOneEleve   iconEleveDetailDown={iconEleveDetailDown}  idClasse={idClasse}   eleveId={eleve.id} listeElevesContext={listeElevesContext} listeClassesContext={listeClassesContext} listeEleves={listeEleves}/>  }
*/

/*
{  showWindowEleveDetailDown ? <span className='arrow'> <i className="fa-solid fa-angle-down" id={`${eleve.id}`} title="plus de détails" onClick={ () => iconEleveDetailUp(eleve.id) } ></i> </span> 
                                        :   <span className='arrow'> <i className="fa-solid fa-angle-up" id={`${eleve.id}`}  onClick={ () => iconEleveDetailDown(eleve.id) } ></i> </span> }

*/