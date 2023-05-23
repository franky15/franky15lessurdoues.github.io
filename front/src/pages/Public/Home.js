import React from 'react';
import ecole from '../../images/imageEcole.jpg'

const Home = () => {
    return (
        <div className='homeContainer'>
            
            <div className='ecoleImageContainer'>
                <img src={ecole} alt='ecole' className='ecoleImage'/>
            </div>
            
            
        </div>
    );
};

export default Home;