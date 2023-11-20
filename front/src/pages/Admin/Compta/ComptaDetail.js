import React, { useState } from 'react';

const ComptaDetail = ( { listeElevesContext,  idEleveCurrent, listePaiementContext }) => {

    const idEleve = idEleveCurrent.idEleve;

    const eleveCurrent = listeElevesContext.find( element => element.id === idEleve)

    //récupération de tous les paiements de l'élève en encours
    const paiementCurrentEleve = listePaiementContext.filter( paiements => paiements.eleves_id === idEleve)

    ////////////////////////////////////

    //récupération de chaque objet  paiement  de l'élève qui ont la même date
    const listeOnePaiementDateIdentiqueEleve = paiementCurrentEleve.filter( (paiement, index) => 
        
                                        //index de item qui respecte cette condition            //cette index précédent != de ce dernier index
        paiementCurrentEleve.findIndex( item => item.datePaiement === paiement.datePaiement ) !== index
    
    )
    
   ////////////////////////////////////::

   /* réduction du tableau de tous les paiements de l'élève on veut réduire
      les paiements(objets)  que l'élève a fait à la même date en un seule paiement(objet)
      mais mis à jour en additionnant les valeurs et en conservant les paiements 
      qui n'auront pas de date communes.
      Ainsi on se débarasse des << doublons>>

   */
   const mergedPaiement = paiementCurrentEleve.reduce( (acc, current) => {

        const existingPaiement = acc.find( (obj) => obj.datePaiement === current.datePaiement)

        if(existingPaiement){

            // Si l'objet avec l'id existe déjà, on ajoute les valeurs

           existingPaiement.datePaiement = current.datePaiement
            
            existingPaiement.montantPaye += current.montantPaye
            existingPaiement.scolarite += current.scolarite
            existingPaiement.tenueClasse += current.tenueClasse
            existingPaiement.transport += current.transport
            existingPaiement.cantine += current.cantine
            
 
        }else{

            // Sinon, on ajoute l'objet au résultat accumulé

            acc.push({ 

                id : current.id,
                eleves_id : current.eleves_id,
                datePaiement : current.datePaiement,
                montantPaye : current.montantPaye,
                scolarite : current.scolarite,
                tenueClasse : current.tenueClasse,
                transport : current.transport,
                cantine : current.cantine,


             }); //
        }

        return acc;

   }, [] )


    return (
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
    );
};

export default ComptaDetail;
