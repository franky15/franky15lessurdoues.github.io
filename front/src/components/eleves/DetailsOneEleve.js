import React from 'react';

const DetailsOneEleve = ( {  iconEleveDetailDown, idClasse,   eleveId, listeElevesContext, listeClassesContext, listeEleves }) => {
    
    const eleve = listeElevesContext.find( element => element.id === eleveId)
    console.log("eleve")
    console.log(eleve)

    console.log("listeElevesContext")
    console.log(listeElevesContext)

    console.log("eleveId")
    console.log(eleveId)

    return (
        <div className='detailsOneEleve'>
            
          

            <p> Nom du parent 1: { eleve.nomParent1 }</p>
            <p> Contact parent 1: { eleve.contactParent1 }</p>
            <p> Nom du parent 2: { eleve.nomParent2 }</p>
            <p> Contact parent 2: { eleve.contactParent2 }</p>
            <p> Montant payé: { eleve.contactParent1 }</p>
        </div>
    );
};

export default DetailsOneEleve;