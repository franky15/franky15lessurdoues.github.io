import React from 'react';
import CreateOneEntree from './CreateOneEntree';
import ComptaDetail from './ComptaDetail';

const GetAllEntree = () => {

    return (
        <div className='getAllEntreeContainer'>
            
           <div className='getAllEntree'>

                <div className='getAllEntree__chiffreEntree'>

                    <div className='getAllEntree__chiffreEntree--vid'></div>
                    <div className='getAllEntree__chiffreEntree--valeur'>

                        <p className='getAllEntree__chiffreEntree--element chiffreAffaire' >
                            Chiffre d'affaire : {"valeur"} FCFA
                        </p>
                        <p className='getAllEntree__chiffreEntree--element chargeTotale' >
                            Charge Totale : {"valeur"} FCFA
                        </p>
                        <p className='getAllEntree__chiffreEntree--element benefice' >
                            Bénéfice : {"valeur"} FCFA
                        </p>

                    </div>
                    
                </div>

                <div className='getAllEntree__Totaux'>

                    <div className='container'>

                        <di className='container__btn'>

                            <div className='container__btn--titre'>Scolarité Totale</div>
                            <div className='container__btn--valeur'>{"valeur"}FCFA</div>
                        
                        </di>
                        <di className='container__btn'>

                            <div className='container__btn--titre'>Tenue de classe</div>
                            <div className='container__btn--valeur'> {"valeur"}FCFA</div>
                            
                        </di>

                    </div>

                    <form className='container'>

                        <di className='container__btn date'>
                            <label for="dateDebut" className='container__btn--titre'> Date début</label>
                            <input type='date' name='dateDebut' id='dateDebut' className='container__btn--titre' />
                            
                        </di>
                        <di className='container__btn date'>
                            <label for="dateFin" className='container__btn--titre'> Date début</label>
                            <input type='date' name='dateFin' id='dateFin' className='container__btn--titre' />
                            
                        </di>

                    </form>
                </div>

            
                <div className='getAllEntree__affichage'>

                    <div className='titre' >

                        <div className='titre__item'>nom</div>
                        <div className='titre__item'>prénom</div>
                        <div className='titre__item'>Date de paiement</div>
                        <div className='titre__item'>Montant total payé</div>

                    </div>

                    <hr></hr>
                    <div className='valeurs'>

                        <div className='valeurs__container'>

                            <div className='titreValeur'>nom</div>
                            <div className='titreValeur'>prénom</div>
                            <div className='titreValeur'>Date de paiement</div>
                            <div className='titreValeur'>Montant total payé</div>

                        </div>

                        <div className='valeursIcon' >

                            <div className='valeursIcon__choice'> <i className="fa-solid fa-plus"></i></div>

                            <div className='arrow'> <i className="fa-solid fa-angle-down"  title="plus de détails"   ></i> </div>
                            

                        </div>
                    </div>
                </div>
            </div>
                
                <div className='componentCreateEntree'>

                   { <CreateOneEntree/> }
                   { < ComptaDetail/> }
                </div>
        </div>
    );
};

export default GetAllEntree;

//{  <span className='arrow'> <i className="fa-solid fa-angle-up"   ></i> </span>} 