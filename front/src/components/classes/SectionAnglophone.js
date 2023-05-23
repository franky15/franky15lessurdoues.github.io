import React, {  useState, useEffect } from 'react';
//import SectionFrancophone from './SectionFrancophone';
//import { classesServices } from '../../../_services/Classes.services';



const SectionAnglophone = ({classes}) => {

    const listeclasses = classes;

    //gestion du state des classes par filtre 
    let [ sectionFilterAnglophone, setSectionFilterAnglophone ] = useState([])

    useEffect( () => {
        console.log( " clique sur la section Anglophone " )
            //filtre des sections
        let tableAnglophone = listeclasses.filter( element => element.section_id === 1)
        setSectionFilterAnglophone(tableAnglophone)
    }, [listeclasses])

    //affichage des sections en lettre
    let section = (section_id) => {

        if(section_id === 2 ){
            section_id = "Francophone"
            return section_id
        }else{

            section_id = "Anglophone"
             return section_id
        }
        
    }

    return (
       
        <div>
            {
               
               sectionFilterAnglophone.map((element, index) => (  
                                    
                <div className='valeurs' key={`index-${element.nom}`}>
                        
                    <p className='nomEffectif'> { element.nom } </p>
                    <p className='nomEffectif'> { element.effectif } </p>
                    <p className='enseignant'>{element.enseignant } </p>
                    <p className='section'> {  section(element.section_id) } </p>
                                
                    <div className='actionValeurs'>

                        <div className='actionValeurs__element'>
                            <i class="fa-solid fa-pen-to-square"></i>
                        </div>
                        <div className='actionValeurs__element'>
                            <i class="fa-solid fa-x"></i>
                        </div>
                        <div className='actionValeurs__element'>
                            <i class="fa-solid fa-circle-info"></i>
                        </div>
                    </div>
                        
                </div> ) )  
                
            }
        </div>
   );
};

export default SectionAnglophone;

/*

 <>
    {
        
        sectionOpen  ? sectionFilterAnglophone.map((element, index) => (  
                            
        <div className='valeurs' key={`index-${element.nom}`}>
                
            <p className='nomEffectif'> { element.nom } </p>
            <p className='nomEffectif'> { element.effectif } </p>
            <p className='enseignant'>{element.enseignant } </p>
            <p className='section'> {  section(element.section_id) } </p>
                        
            <div className='actionValeurs'>

                <div className='actionValeurs__element'>
                    <i class="fa-solid fa-pen-to-square"></i>
                </div>
                <div className='actionValeurs__element'>
                    <i class="fa-solid fa-x"></i>
                </div>
                <div className='actionValeurs__element'>
                    <i class="fa-solid fa-circle-info"></i>
                </div>
            </div>
                
        </div> ) )  : <SectionFrancophone  classes={ classes }/>
        
    }
</>



*/