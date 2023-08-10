import React, { useState } from 'react';

const ComptaDetail = ( { listeElevesContext,  idEleveCurrent, listePaiementContext }) => {


     /*
    /////////////////////////
    let [ total, setTotal ] = useState({
                                            datePaiement : " ",
                                            montantPaye : " ",
                                            scolarite : " ",
                                            tenueClasse : " ",
                                            transport : " ",
                                            cantine : " ",

                                        })


    ///////////////////////

    */
    const idEleve = idEleveCurrent.idEleve;

    console.log("idEleve : " + idEleve)

    const eleveCurrent = listeElevesContext.find( element => element.id === idEleve)

    //récupération de tous les paiements de l'élève en encours
    const paiementCurrentEleve = listePaiementContext.filter( paiements => paiements.eleves_id === idEleve)

    console.log("**** paiementCurrentEleve  tous les paiements de l'élève  dans comptaDetail ")
    console.log(paiementCurrentEleve )
   
    
    ////////////////////////////////////

    //récupération de chaque objet  paiement  de l'élève qui ont la même date
    const listeOnePaiementDateIdentiqueEleve = paiementCurrentEleve.filter( (paiement, index) => 
        
                                        //index de item qui respecte cette condition            //cette index précédent != de ce dernier index
        paiementCurrentEleve.findIndex( item => item.datePaiement === paiement.datePaiement ) !== index
    
    )
    
    console.log("**** listeOnePaiementDateIdentiqueEleve tous les paiements de l'élève dont les dates sont identiques  dans comptaDetail ")
    console.log(listeOnePaiementDateIdentiqueEleve)

   

   ////////////////////////////////////::

   /* réduction du tableau de tous les paiements de l'élève on veut réduire
      les paiements(objets)  que l'élève a fait à la même date en un seule paiement(objet)
      mais mis à jour en additionnant les valeurs et en conservant les paiements 
      qui n'auront pas de date communes.
      Ainsi on se débarasse des << doublons>>

   */
   const mergedPaiement = paiementCurrentEleve.reduce( (acc, current) => {

        const existingPaiement = acc.find( (obj) => obj.datePaiement === current.datePaiement)

        console.log("****** existingPaiement")
        console.log(existingPaiement)

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


   console.log( "***** mergedPaiement ")
   console.log( mergedPaiement)
   ////////////////////////////////////::
   


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

/*

<>
                        
        <div className='detail__titre--item valeur'> {eleveCurrent.datePaiement} </div>
        <div className='detail__titre--item valeur'> {eleveCurrent.montantPaye}</div>
        <div className='detail__titre--item valeur'> {eleveCurrent.typePaiement}</div>
        <div className='detail__titre--item valeur'> {eleveCurrent.tenueClasse}</div>
        <div className='detail__titre--item valeur'> {eleveCurrent.transport}</div>
        <div className='detail__titre--item valeur'> {eleveCurrent.cantine}</div>
    
</>



{ 
allPaiementDateDifferenteEleve.map( (paiement, index) =>

    <div className='detail__titre' key={ paiement.typePaiement-`${index}` } >

        <div className='detail__titre--item valeur'> { (paiement.datePaiement).slice(0,10) }</div>
        <div className='detail__titre--item valeur'> {paiement.montantPaye}</div>
        <div className='detail__titre--item valeur'> {paiement.scolarite}</div>
        <div className='detail__titre--item valeur'> {paiement.tenueClasse}</div>
        <div className='detail__titre--item valeur'> {paiement.transport}</div>
        <div className='detail__titre--item valeur'> {paiement.cantine}</div>

    </div>

)

}




 let objet = {
        id : paiementCurrentEleve[i].id, 
        datePaiement : `${paiementCurrentEleve[i].datePaiement}`,
        montantPaye : paiementCurrentEleve[i].montantPaye + paiementCurrentEleve[i].montantPaye,
        scolarite : paiementCurrentEleve[i].scolarite + paiementCurrentEleve[i].scolarite,
        tenueClasse : paiementCurrentEleve[i].tenueClasse + paiementCurrentEleve[i].tenueClasse,
        transport : paiementCurrentEleve[i].transport + paiementCurrentEleve[i].transport,
        cantine : paiementCurrentEleve[i].cantine + paiementCurrentEleve[i].cantine,

    }
*/