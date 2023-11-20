import React from 'react';


const DetailsOnePersonnel = ( {  personnelId, listeElevesContext, listePersonnelContext }) => {
    
    const personnel = listePersonnelContext.find( element => element.id === personnelId)
   
    return (
        <div className='detailsOneEleve'>
            
           
            <p> Email : { personnel.email }</p>
            <p> Salaire : { personnel.salaire }</p>
            
        </div>
    );
};

export default DetailsOnePersonnel;
