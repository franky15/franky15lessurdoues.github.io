import React from 'react';


const DetailsOnePersonnel = ( {  personnelId, listeElevesContext, listePersonnelContext }) => {
    
    const personnel = listePersonnelContext.find( element => element.id === personnelId)
   

   // console.log("listePersonnelContext")
    //console.log(listePersonnelContext)

    

    return (
        <div className='detailsOneEleve'>
            
            <p> GroupeSalariale : { personnel.groupeSalariale }</p>
            <p> Email : { personnel.email }</p>
            <p> Salaire : { personnel.salaire }</p>
            
        </div>
    );
};

export default DetailsOnePersonnel;