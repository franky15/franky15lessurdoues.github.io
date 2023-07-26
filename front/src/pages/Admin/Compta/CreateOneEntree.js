import React from 'react';

const CreateOneEntree = () => {

    let table = [ ]
    return (
        <div className='createonentree'>
           
            <form className='createonentree__container'>

                <div className='createonentree__container--item'>

                    <label for="typePaiement"  className='label'> Type de paiement<span className='etoile'>*</span></label>
                    <select name="typePaiement" id='typePaiement' className='typePaiement item' >

                        <option value={ "formPersonnel.classe" }  > { "classeCurrent.nom"} </option>
                        
                        { table.map( (perso, index) => 

                            table.map(classe => classe.id === perso.classes_id &&
                                
                                <option value={ classe.nom } key={classe-`${index}`} > { classe.nom } </option>)
                                
                        )}
                        

                    </select>

                </div>

                <div className='createonentree__container--item'>
                    <label for="datePaiement" className='label'> Date de paiement <span className='etoile'>*</span></label>
                    <input type='date' name='datePaiement' id='datePaiement' className='datePaiement item' value={ "ormPersonnel.salaire" }  onChange={ "personnelFunction" }  maxLength={200} />
                </div>

                <div className='createonentree__container--item' >
                    <label for="montantPaye" className='label'>Montant payé <span className='etoile'>*</span></label>
                    <input type='montantPaye' name='montantPaye' id='montantPaye' className='montantPaye item' value={ "ormPersonnel.salaire" }  onChange={ "personnelFunction" }  maxLength={200} />
                </div>

            </form>

            

           

                <div className='formulaireConfirm__btn'>
                    < button className='btn  colorCancel' onClick={ "lockAddEleveWindow" } > Annuler</button>
                    <button className='btn  colorValid' onClick={ "submit" }> Valider</button>
                </div>
                
         


        </div>
    );
};

export default CreateOneEntree;