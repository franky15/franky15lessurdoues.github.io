import React from 'react';

const ComptaDetail = () => {
    return (
        <div className='detail'>
            
            <div className='detail__titre'>

                <div className='detail__titre--item titre'> Date</div>
                <div className='detail__titre--item titre'> Montant Payé</div>
                <div className='detail__titre--item titre'> Scolarité</div>
                <div className='detail__titre--item titre'> Tenues de classe</div>
                <div className='detail__titre--item titre'> Transport</div>
                <div className='detail__titre--item titre'> Cantine</div>

            </div>
            <div className='detail__titre'>

                <div className='detail__titre--item valeur'> {"valeur"} </div>
                <div className='detail__titre--item valeur'> {"valeur"}</div>
                <div className='detail__titre--item valeur'> {"valeur"}</div>
                <div className='detail__titre--item valeur'> {"valeur"}</div>
                <div className='detail__titre--item valeur'> {"valeur"}</div>
                <div className='detail__titre--item valeur'> {"valeur"}</div>

            </div>


        </div>
    );
};

export default ComptaDetail;