
import React, {  useState, useEffect} from 'react';

const SectionSearch = ({classes, valeurInput}) => {

    const listeclasses = classes;
    let input = valeurInput;

    //gestion du state des section
    let [ sectionInput, setsectionInput ] = useState([])

    useEffect( () => {
        
        //filtre des sections
         let listeSearch = listeclasses.filter( element => element.nom.toLowerCase() === input.toLowerCase())
      
        setsectionInput(listeSearch )

    }, [listeclasses, input])


    
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
               
               sectionInput.map((element, index) => (  
                  
                <>
                <hr></hr>
                <div className='valeurs effectifClass' key={`index-${element.nom}`}>
                        
                    <p className='nomEffectif'> { element.nom } </p>
                    <p className='nomEffectif'> {  element.effectif ?? 0} </p>
                    <p className='enseignant'>{element.enseignant } </p>
                    <p className='section'> {  section(element.section_id) } </p>
                                
                    <div className='actionValeurs'>

                        <div className='actionValeurs__element'>
                            <i className="fa-solid fa-pen-to-square"></i>
                        </div>
                        <div className='actionValeurs__element'>
                            <i className="fa-solid fa-x"></i>
                        </div>
                        <div className='actionValeurs__element'>
                            <i className="fa-solid fa-circle-info"></i>
                        </div>
                    </div>
                        
                </div> </>
                
                ) ) 

                
            }
        </div>
   );
};

export default SectionSearch;