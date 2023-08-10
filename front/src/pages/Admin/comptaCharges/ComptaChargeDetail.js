import React, { useState } from 'react';

const ComptaChargeDetail = ( { listeElevesContext,  idPersonnelCurrent, listePaiementContext, listePersonnelContext, listeChargesContext }) => {


    console.log(" listeChargesContext.categorie")
     console.log( listeChargesContext[0])
   


    return (
        <div className='detail1 detailCharges'>
            

            

           
            { 
                listeChargesContext.map( (charge, index) =>

                    <div className='detail__titre1 detailCharges__titre' key={ charge.categorie-`${index}` } >

                       {  <div className='detail__titre1--item valeur detailCharges__valeur'> pour quel mois ? { charge.electriciteMois }</div>}
                       {  <div className='detail__titre1--item valeur detailCharges__valeur'>  Nom et prénom :  { charge.nomPrenom }</div>}
                       {  <div className='detail__titre1--item valeur detailCharges__valeur'> poste :  {charge.poste }</div>}


                    </div>
                 
                )

            }
            
            
        </div>
    );
};

export default ComptaChargeDetail;

/*



<div className='detail'>
            
            
    <div className='detail__titre'>

        <div className='detail__titre--item titre'> Date du paiement</div>
        <div className='detail__titre--item titre'> Montant Payé</div>
        <div className='detail__titre--item titre'> Scolarité</div>
        <div className='detail__titre--item titre'> Tenues de classe</div>
        <div className='detail__titre--item titre'> Transport</div>
        <div className='detail__titre--item titre'> Cantine</div>

    </div>


    
    { 
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

    }
    
    
</div>
*/