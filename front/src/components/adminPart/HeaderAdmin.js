import React, { useState, useContext, useEffect } from 'react';
import { Link } from "react-router-dom"
//import { useNavigate } from 'react-router-dom';
import { accountServices } from '../../_services/Account.services';
import CreateEleves from '../eleves/CreateEleve';

import { AddEleveContext } from '../../_utils/ContextAddEleve';



const HeaderAdmin = () => {

    ////////////////////////////
   const { listePositionPageContext, listeClassesContext, openAddEleveWindow ,lockAddEleveWindow, addEleveWindow, confirmationEleveCreate, eleveCreate } = useContext(AddEleveContext)
    /////////////////////////////

   // const openWindowAddEleveContext = useContext(AddEleveContext)


    /*
   let [ addEleveWindow, setAddEleveWindow ] = useState(false)

   const openAddEleveWindow  = () => {

    setAddEleveWindow(true)

    }
    const lockAddEleveWindow  = () => {

        setAddEleveWindow(false)

    }
    */

    //let navigate = useNavigate();

    const logout = () => {
        accountServices.logout()
        //navigate("/admin")
    }

    ////////////////////////////////////////
    //gestion des position de la page

    /*
    useEffect( () => {



    }, [])
    */

    console.log("****** listePositionPageContext")
    console.log(listePositionPageContext)

    let listeAcceuil = listePositionPageContext[0]
    let listeEleve = listePositionPageContext[1]
    let listePersonnel = listePositionPageContext[2]
    let listeCharge = listePositionPageContext[3]
    let listeEntrees = listePositionPageContext[4]
    
    //gestion de la barre Acceuil
    const acceuilPosition = () => {


        const openColorAcceuil =  listeAcceuil.openpositionAcceuilContext()


        const lockColorEleve  = listeEleve.lockpositionEleveContext()
        const lockColorPersonnel= listePersonnel.lockpositionPersonnelContext()
        const lockColorCharge = listeCharge.lockpositionChargesContext()
        const lockColorEntrees = listeEntrees.lockpositionEntreesContext()

       // const lockColorAcceuil = listeAcceuil.lockpositionAcceuilContext()

    }

    //gestion de la barre eleve
    const elevePosition = () => {

        
        const openColorEleve =  listeEleve.openpositionEleveContext()


        const lockColorAcceuil = listeAcceuil.lockpositionAcceuilContext()
        const lockColorPersonnel= listePersonnel.lockpositionPersonnelContext()
        const lockColorCharge = listeCharge.lockpositionChargesContext()
        const lockColorEntrees = listeEntrees.lockpositionEntreesContext()

       // const lockColorEleve  = listeEleve.lockpositionEleveContext()

    }

    //gestion de la barre personnel
    const personnelPosition = () => {

        
        const openColorPersonnel =  listePersonnel.openpositionPersonnelContext()

        const lockColorAcceuil = listeAcceuil.lockpositionAcceuilContext()
        const lockColorEleve  = listeEleve.lockpositionEleveContext()
        const lockColorCharge = listeCharge.lockpositionChargesContext()
        const lockColorEntrees = listeEntrees.lockpositionEntreesContext()
       // const lockColorPersonnel= listePersonnel.lockpositionPersonnelContext()

    }

    //gestion de la barre charge
    const chargesPosition = () => {

        
        const openColorCharge =  listeCharge.openpositionChargesContext()


        const lockColorAcceuil = listeAcceuil.lockpositionAcceuilContext()
        const lockColorEleve  = listeEleve.lockpositionEleveContext()
        const lockColorPersonnel= listePersonnel.lockpositionPersonnelContext()
        const lockColorEntrees = listeEntrees.lockpositionEntreesContext()
       // const lockColorCharge = listeCharge.lockpositionChargeContext()

    }

    //gestion de la barre entrée d'argent
    const EntreesPosition = () => {

        
        const openColorEntree =  listeEntrees.openpositionEntreesContext()


        const lockColorAcceuil = listeAcceuil.lockpositionAcceuilContext()
        const lockColorEleve  = listeEleve.lockpositionEleveContext()
        const lockColorPersonnel= listePersonnel.lockpositionPersonnelContext()
        const lockColorCharge = listeCharge.lockpositionChargesContext()

       // const lockColorEntrees = listeEntrees.lockpositionEntreesContext()

    }





    //////////////////////////////////////////::
    
    return (
        <div className='headerAdmin'>
            
           

            { addEleveWindow && <CreateEleves lockAddEleveWindow={lockAddEleveWindow } />  }
            
            <div className='menuContainer1'>
                <p className='menuContainer1__acceuil'><Link to="/home" className='linkAcceuilAdmin'>CARRERA</Link></p>
                <div className='optionContainer1'>
                    
                     <p className='optionContainer1__ajouteleve'><Link  className='linkAcceuilAdmin' onClick={ openAddEleveWindow }>Ajout élève</Link></p> 
                    
                    <div className='optionContainer1__bar'></div>
                    <p className='optionContainer1__aide'><Link to="/aide" className='linkAcceuilAdmin'>Aide</Link></p>
                    <div className='optionContainer1__bar'></div>

                    <p className='optionContainer1__aide'><Link to="/home" className='linkAcceuilAdmin' onClick={logout}>Déconnexion</Link></p>
                </div>
                
            </div>

            <div className='headerAdminBar'></div>
            
            <div className='menuContainer2'>


                <div  className='menuContainer2__acceuil'>
                   {

                    listeAcceuil.positionAcceuilContext ?

                
                    <div className='acceuilBtn'>
                        <div className='Bar' ></div>
                        <Link to="/admin/classes" className='linkAdmin2' onClick={ acceuilPosition }>Acceuil</Link>
                    
                    </div>
                    :
                    <p ><Link to="/admin/classes" className='linkAdmin2' onClick={ acceuilPosition }>Acceuil</Link></p>
                        
                       
                   }
                    
                </div>

                <div className='menuContainer2__container'>

                    <div className='menuContainer2MiniContainer'>

                         {

                            listeEleve.positionEleveContext ?

                        
                            <div className='acceuilBtn'>
                                <div className='Bar' ></div>
                                <Link to="/admin/eleves/getallclasseseleve" className='linkAdmin2' onClick={ elevePosition }>Elèves</Link>
                            
                            </div>
                            :
                            
                            <p className=''><Link to="/admin/eleves/getallclasseseleve" className='linkAdmin2' onClick={ elevePosition }>Elèves</Link></p>
                                
                            
                        }
                    
                        <div className='menuContainer2MiniContainer__bar'></div>
                    </div>
                    <div className='menuContainer2MiniContainer'>

                        {

                            listePersonnel.positionPersonnelContext ?

                        
                            <div className='acceuilBtn'>
                                <div className='Bar' ></div>
                                <Link to="/admin/personnels" className='linkAdmin2' onClick={ personnelPosition }>Personnels</Link>
                            
                            </div>
                            :
                            <p className=''><Link to="/admin/personnels" className='linkAdmin2' onClick={ personnelPosition }>Personnels</Link></p>
                           
                        
                       
                        }
                        
                        <div className='menuContainer2MiniContainer__bar'></div>
                    </div>

                    <div className='menuContainer2MiniContainer'>

                        {

                            listeCharge.positionChargesContext ?

                        
                            <div className='acceuilBtn'>
                                <div className='Bar' ></div>
                                <Link to="/admin/comptacharges" className='linkAdmin2' onClick={ chargesPosition }>Charges</Link>
                                
                            
                            </div>
                            :
                            <p className=''><Link to="/admin/comptacharges" className='linkAdmin2' onClick={ chargesPosition }>Charges</Link></p>
                            
                           
                        
                       
                        }

                       
                        <div className='menuContainer2MiniContainer__bar'></div>
                    </div>
                    <div className='menuContainer2MiniContainer'>

                        {

                            listeEntrees.positionEntreesContext ?

                        
                            <div className='acceuilBtn'>
                                <div className='Bar' ></div>
                                <Link to="/admin/compta" className='linkAdmin2' onClick={ EntreesPosition }>Entrés d'argent</Link>
                                
                            
                            </div>
                            :
                            <p className=''><Link to="/admin/compta" className='linkAdmin2' onClick={ EntreesPosition }>Entrés d'argent</Link></p>
                           
                        
                       
                        }
                       
                    </div>

                </div>
                
            </div>
        </div>
    );
};

export default HeaderAdmin;

// <p className='optionContainer1__ajouteleve'><Link to="/eleve" className='linkAcceuilAdmin'>Ajout élève</Link></p>