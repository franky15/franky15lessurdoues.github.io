import React,{ useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AddEleveContext } from '../../../_utils/ContextAddEleve';


import DetailsOnePersonnel from './DetailsOnePersonnel';
import AddPersonnels from "./AddPersonnels";
import UpdatePersonnels from './UpdatePersonnels';
import GetOnePersonnels from "./GetOnePersonnels";
import DeletePersonnel from "./DeletePersonnel"



const GetAllPersonnels = () => {

    ////////////////////////////////////////////////////////////////




    //gestion de l'affichage de la fenêtre ajouter un personnel
    let [ WindowAddPersonnel, setWindowAddPersonnel ] = useState(false) //false

    let lockWindowAddPersonnel = () => setWindowAddPersonnel(false); 
    let openWindowAddPersonnel = () => setWindowAddPersonnel(true); 
    ////////////////////////////////////////////////////////////////
    //console.log("***** Bienvenue dans le GetOneClasseEleves ******")

    //récupération du params
    const {id} = useParams()
    const idClasse = parseInt(id)

    //console.log("l'id du params de la classse est "+ idClasse )

    //const date = new Date();

    let  { listeElevesContext, listeClassesContext, listePersonnelContext }  = useContext(AddEleveContext)

    console.log("*****listePersonnelContext dans le composant getPerssonels***")
   console.log(listePersonnelContext)

    console.log("*****listeClassesContext dans le composant getOneClasseEleves***")
    console.log(listeClassesContext)

    //gestion du state d'affichage de la fenêtre de modification du personnel
   let [ showWindowEleveUpdate, setshowWindowEleveUpdate ] = useState(false)

   //gestion dus state de l'affichage de la fenêtre de suppression
   let [ showWindowEleveDelete, setshowWindowEleveDelete ] = useState(false)


   //gestion du state de la fenêtre du detail 
   let [ showWindowEleveDetailUp, setshowWindowEleveDetailUp ] = useState(false) //true


   let [ showWindowEleveDetailDown, setshowWindowEleveDetailDown ] = useState(true) //false

   let [ isOpen, setisOpen ] = useState(false) // true

   //gestion du state de l'id du personnel
   let [ personnelId, setPersonnelId ] = useState({})

   

   //////////////////////////////

    //gestion de la suppréssion
    let [ windowDeleteClasse, setWindowDeleteClasse ] = useState(false)
    
    let lockwindowDeleteClasse = () => setWindowDeleteClasse(false); 
    let openwindowDeleteClasse = () => setWindowDeleteClasse(true); 

   //////////////////////////////

   
    //fonction de la modification de l'élève
   const iconEleveUpdate = (idPersonnel) => {

        

            setshowWindowEleveUpdate(true)

            setshowWindowEleveDelete(false)
           

            setshowWindowEleveDetailUp(false)
            setshowWindowEleveDetailDown(true)

            //setshowWindowEleveDetailUp(true)
            //setshowWindowEleveDetailDown(false)

            //console.log("vous avez cliqué sur modifier")
            //console.log(idEleve)

            setPersonnelId({
                ...personnelId,
                idPersonnel

            })
        
        

   }

   //fonction de la suppresssion de l'élève
   const iconEleveDelete = (idPersonnel) => {

        
        setWindowDeleteClasse(true)
        //setshowWindowEleveDelete(true)

        setshowWindowEleveUpdate(false)
        

        setshowWindowEleveDetailUp(false)
        setshowWindowEleveDetailDown(true)

        //setshowWindowEleveDetailUp(true)
        //setshowWindowEleveDetailDown(false)

        //console.log("vous avez cliqué sur supression")
        //console.log(idEleve)

        setPersonnelId({
            ...personnelId,
            idPersonnel

        })

    }

    //fonction de modification de la classe de l'élève de l'élève iconEleveDetailUp(eleve.id) }
    const iconEleveUpdateTransfert = (idPersonnel) => {

       

        setshowWindowEleveDelete(false)
        setshowWindowEleveUpdate(false)
        setshowWindowEleveDetailUp(false)
        setshowWindowEleveDetailDown(true)

       // setshowWindowEleveDetailUp(true)
       // setshowWindowEleveDetailDown(false)
       
        //console.log("vous avez cliqué sur transfert de l'élève")
        //console.log(idEleve)

        setPersonnelId({
            ...personnelId,
            idPersonnel

        })

   }

    //fonction d'affichage du detail de l'élève de l'élève iconEleveDetailDown
    const iconEleveDetailUp = (idPersonnel) => {

        
      setshowWindowEleveDetailUp(true)
      setshowWindowEleveDetailDown(false)

       //setshowWindowEleveDetailUp(false)
       //setshowWindowEleveDetailDown(true)
       ////////////////////
       setisOpen(true) //


       /////////////////
    
        
       
        setshowWindowEleveDelete(false)
        setshowWindowEleveUpdate(false)

        //console.log("vous avez cliqué sur le detail de l'élève")
        console.log(idPersonnel)

        setPersonnelId({
            ...personnelId,
            idPersonnel

        })
        

   }

   //fonction d'affichage du detail du personnel 
   const iconEleveDetailDown = (idPersonnel) => {

        
        setshowWindowEleveDetailDown(true)
        setshowWindowEleveDetailUp(false)

       // setshowWindowEleveDetailDown(false)
        //setshowWindowEleveDetailUp(true)

        ////////////////////////
        setisOpen(false) //

        ////////////////////////

        
        setshowWindowEleveDelete(false)
        setshowWindowEleveUpdate(false)
        
        //console.log("vous avez cliqué sur le detail de l'élève")
        console.log(idPersonnel)
        
        setPersonnelId({
            ...personnelId,
            idPersonnel

        })

    }

    //////////////////////////

    const valeur = () => {
       // console.log("valeur provisoire")
    }

   
   ////////////////////////////////////////////

   let [ classeValue, setclasseValue ] = useState({})
    //copie du tableau par élément complexe
    
    
    useEffect( () => {

        let ElevesArray = [...listeClassesContext]
       let eleve = ElevesArray.find(element => element.id === idClasse)
       if(eleve){

       // console.log("******** eleve")
       // console.log(eleve.enseignant)
       setclasseValue(eleve)
       }


    }, [idClasse, listeClassesContext])
       
    console.log("classeValue") 
    console.log(classeValue) 

    

    return (
        <div className='getAllPersonnels'>

          

            <div className='getAllPersonnels__btn1'>

                

                    <div className='blocBtn'>

                         < div className='blocBtn__btn1'>

                            <p  className='btn__button' > Enseignant(s)</p>
                            <div className='btn__donnee'> {"valeur"} </div>
                        </div>

                        < div className='blocBtn__btn1'>

                            <p  className='btn__button' > Administration</p>
                            <div className='btn__donnee'> {"valeur"} </div>
                        </div>

                        < div className='blocBtn__btn1'>

                            <p  className='btn__button' > Autre(s) Personnel</p>
                            <div className='btn__donnee'> {"valeur"} </div>
                        </div>

                        < div className='blocBtn__btn1'>

                            <p  className='btn__button' > Fondateur(s)</p>
                            <div className='btn__donnee'> {"valeur"} </div>
                        </div>

                        < div className='blocBtn__btn1'>

                            <p  className='btn__button' > Tout le personnel</p>
                            <div className='btn__donnee'> {"valeur"} </div>
                        </div>

                </div>
                
            </div>

           
            <div className='getAllPersonnels__btn2'>

                <p className='enseignant'>Total Personnel: { classeValue.enseignant } <span>{ "valeur"}</span> </p>

                <div className='getOneClasseEleves__btn2--btn'>

                    <div  className='btnInput'>
                            
                        <p className='inputSearch'> <span className='loupe'> <i className="fa-solid fa-magnifying-glass"></i> </span> <input type='text' placeholder="Rechercher par nom, prénom, tel"  name='filtreClasseEleve' value={ "Rechercher élève" }  onFocus={ valeur } onBlur={ valeur } onChange ={ valeur } />  </p>
                    </div>

                    < div className='blocbtn2'>
    
                    <p  className='btn__button' onClick={ openWindowAddPersonnel }> Ajoutter Personnel</p>
                        
                    </div>

                </div>
                
               
            </div>

            <div className='getOneClasseEleves__btn3'>
                
                    
                {
                    <div className='getOneClasseEleves__btn3--titre'>

                        <p className='DateRedoublant'>Nom</p>
                        <p className='nomPrenom'> Prenom </p>
                        <p className='nomPrenom'>poste</p>
                        <p className='DateRedoublant'>Tel</p>
                        <p className='DateRedoublant'>Section </p>
                        <p className='DateRedoublant'>Classe</p>
                    
                    </div>
                }
                
                <hr></hr>
               
                { 
                    listePersonnelContext.map( (personnel, index) => 
                   
                    <>
                    
                            <div className='getOneClasseEleves__btn3--bloc' key={ personnel.nom-`${index}` }>
                                
                            
                                <div className='btn3Option'>
                                    <p className='DateRedoublant'>{personnel.nom}</p>
                                    <p className='nomPrenom'> {personnel.prenom} </p>
                                    <p className='nomPrenom'>{personnel.poste}</p>
                                    <p className='DateRedoublant'>{ personnel.contact }</p>

                                    { listeClassesContext.map( perso => perso.id === personnel.classes_id &&
                                        
                                            <>
                                            
                                                { perso.id === 1  ? 

                                                    <p className='DateRedoublant'>{ "Anglophone" }</p>
                                                        
                                                    : 

                                                    <p className='DateRedoublant'>{ "Francophone" }</p>
                                                }

                                                <p className='DateRedoublant'>{ perso.nom }</p>
                                                
                                            </> 
            
                                        )
                                       
                                    }

                                </div>
                                
                                <div className='btn3Icon'>
                                    
                                    <div className='btn3IconChoice'> <i className="fa-solid fa-pen-to-square" title="modifier le personnel" onClick={ () => iconEleveUpdate(personnel.id) } ></i> </div>
                                    <div className='btn3IconChoice'> <i className="fa-solid fa-x" title="supprimer le personnel" onClick={ () => iconEleveDelete(personnel.id) } ></i> </div>
                                   
                                    <div className='btn3IconChoice'>
                                    
                                        {  showWindowEleveDetailDown && <span className='arrow'> <i className="fa-solid fa-angle-down"  title="plus de détails" onClick={ () => iconEleveDetailUp(personnel.id) } ></i> </span> }
                                        { showWindowEleveDetailUp && <span className='arrow'> <i className="fa-solid fa-angle-up"  onClick={ () => iconEleveDetailDown(personnel.id) } ></i> </span>} 
                                        
                                    </div> 

                                </div>
                               
                            
                            </div> 
                            
                            { isOpen && <DetailsOnePersonnel   iconEleveDetailDown={iconEleveDetailDown} listePersonnelContext={listePersonnelContext}  idClasse={idClasse}   personnelId={personnel.id}   />  }
                    </> 
                    

                    ) 
                    
                }
            
            </div> 
            
           
            { WindowAddPersonnel && <AddPersonnels listeClassesContext={listeClassesContext}  lockWindowAddPersonnel = { lockWindowAddPersonnel } personnelId={personnelId} /> }
             

            { showWindowEleveUpdate && <UpdatePersonnels showWindowEleveUpdate={showWindowEleveUpdate} setshowWindowEleveUpdate={setshowWindowEleveUpdate}  idClasse={idClasse} personnelId={personnelId } listePersonnelContext={listePersonnelContext} /> }
            {  windowDeleteClasse && <DeletePersonnel showWindowEleveDelete={showWindowEleveDelete} setshowWindowEleveDelete={setshowWindowEleveDelete}  idClasse={idClasse}   personnelId={personnelId } listeElevesContext={listeElevesContext} listeClassesContext={listeClassesContext} lockwindowDeleteClasse={lockwindowDeleteClasse} openwindowDeleteClasse={openwindowDeleteClasse} listePersonnelContext={listePersonnelContext}  />  }

            
        </div>
    );
    
};

export default GetAllPersonnels;

/*
<p className='DateRedoublant'>{ personnel.section_id }</p>
 <p className='DateRedoublant'>{ personnel.classes_id }</p>

*/

/*

 { listeClassesContext.map( perso => perso.section_id === personnel.section_id &&
                                        
    (perso.section_id === 1 ) ? 

        
            <p className='DateRedoublant'>{ "Anglophone" }</p>
        
        
        : 

        
            
            <p className='DateRedoublant'>{ "Francophone" }</p>
        

    
    
        )
        
}

*/