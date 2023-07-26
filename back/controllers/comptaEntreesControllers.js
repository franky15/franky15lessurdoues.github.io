//import des modules nécessaires
const DB = require("../mysql.config")
const { response } = require("../app");
const e = require("cors");

//POST creation de l'entrée d'argent
exports.createEntree = (req, res, next ) => {

    console.log("***bienvenue dans createEntree*** " )
    console.log("***userId du token*** : " + req.auth.userId ) 

    console.log(req.body)

    //récupération des données de la requete
    let { idEleve, typePaiement, datePaiement,montantPaye } = req.body;

    //let eleveCurrent
    let idPaiement

    //requete de récupération de tous les paiements
    let sqlSelectAllPaiement = "SELECT * FROM entreesArgent"
    let sqlSelectAllPaiement2 = "SELECT * FROM entreesArgent"

    //requete de création du paiement
    let sqlCreatePaiement = `INSERT INTO entreesArgent (typePaiement, datePaiement,montantPaye)
        VALUES ( "${typePaiement}", "${datePaiement}", ${parseInt(montantPaye)}) ;`

    //requete de récupération de tous les élèves
    let sqlSelectAllEleve = "SELECT * FROM eleves"


    DB.query( sqlCreatePaiement, (errPaiement, resPaiement) => {

        console.log("**** le resultat de sqlCreatePaiement")
        console.log(sqlCreatePaiement)

        if(errPaiement){ 

            res.status(400).json({errPaiement})
            console.log("***erreur de sqlCreatePaiement*** " +  errPaiement)  

        }else{

            DB.query( sqlSelectAllPaiement, (errSelectPaiement2, resSelectPaiement2) => {

                console.log("bienvenue au sqlSelectAllPaiement deuxième appel")

             
                if(errSelectPaiement2){ 

                    res.status(400).json({errSelectPaiement2})
                    console.log("***erreur de sqlSelectAllPaiement 2*** " +  errSelectPaiement2)  
        
                }else{

                    let listePaiementDeuxième = resSelectPaiement2

                    console.log("****  le dernier élément de listePaiementDeuxième  après creation paiement actuel est ")
                    let dernierpaiement = listePaiementDeuxième[listePaiementDeuxième.length - 1]
                    console.log(dernierpaiement)
                    console.log("dernierpaiement.id : " + dernierpaiement.id)

                    
                    DB.query(sqlSelectAllEleve , (errAllEleve, resAllEleve) => {

                        if(errAllEleve){ 

                            console.log("***erreur de sqlCreatePaiement*** " +  errAllEleve)  
                            res.status(400).json({errAllEleve})
                            
                
                        }else{

                            
                           let eleveCurrent = resAllEleve.find( element => element.id === parseInt(idEleve) ) //parseInt(idEleve)

                            console.log("**** eleveCurrent ")
                            console.log(eleveCurrent)
                            idPaiement = eleveCurrent.id

                            //requete de mis à jour de entreesArgent_id l'élève
                            let sqlSUpdateEleve = `UPDATE eleves SET entreesArgent_id = ${ dernierpaiement.id }  WHERE id = ${parseInt(idEleve)} ;`                    

                            DB.query( sqlSUpdateEleve, (errUpdateEleve, resUpdateEleve) => {

                                console.log("****** resultat de la requete sqlSUpdateEleve")
                                console.log(sqlSUpdateEleve)

                                if(errUpdateEleve){ 

                                    console.log("*** erreur de sqlSUpdateEleve *** " +  errUpdateEleve)  
                                    res.status(400).json({errUpdateEleve})
                                    
                                    
                        
                                }else{

                                    console.log("*** modification de l'élève effectuée avec succès*** ") 
                                    console.log(resUpdateEleve)

                                }

                            })

                        }

                    })
                }

            })

            console.log("*** paiement créer avec succès*** ") 
            res.status(200).json(resPaiement)
        }

    })



};

//GET récupération de toutes les entrées d'argent
exports.getAllEntrees = (req, res, next ) => {

    console.log("*** bienvenue dans getAllEntrees *** " )
    console.log("***userId du token*** : " + req.auth.userId ) 

    console.log(req.body)

    //récupération des données de la requete
    //let { idEleve, typePaiement, datePaiement,montantPaye } = req.body;

    //requete de récupération de tous les paiements
    let sqlSelectAllPaiement = "SELECT * FROM entreesArgent"

    DB.query( sqlSelectAllPaiement, (errPaiement, resPaiement) => {


        console.log("****** resultat de la requete sqlSelectAllPaiement")
        console.log(resPaiement)

        if(errPaiement){ 

            console.log("*** erreur de sqlSelectAllPaiement *** " +  errPaiement)  
            res.status(400).json({errPaiement})
            
            

        }else{

            console.log("*** paiement récupérés avec succès*** ") 
            res.status(200).json(resPaiement)

        }


    })


};



//GET  récupération d'une entrée d'argent
exports.getOneEntree = (req, res, next ) => {

    console.log("*** bienvenue dans getOneEntree *** " )
    console.log("***userId du token*** : " + req.auth.userId ) 

    console.log(req.body)

    let eleveCurrent
    let paiementCurrent

    

    //requete de récupération de tous les paiements
    let sqlSelectAllPaiement = "SELECT * FROM entreesArgent"

    //requete de récupération de tous les élèves
    let sqlSelectAllEleve = "SELECT * FROM eleves"


    let idPaiement = parseInt(req.params.id)
    console.log(" ***** idPaiement : " + idPaiement)

    DB.query( sqlSelectAllPaiement, (errPaiement, resPaiement) => {


        console.log("****** resultat de la requete sqlSelectAllPaiement")
        console.log(resPaiement)

        if(errPaiement){ 

            console.log("*** erreur de sqlSelectAllPaiement *** " +  errPaiement)  
            res.status(400).json({errPaiement})
            
            

        }else{

            const paiement = resPaiement.find( element => element.id == idPaiement)

            if(!paiement){
                res.status(404).json({message: "paiement non trouvé"})
                console.log("***paiement non trouvé*** " +  err)
            }else{
                console.log("****** paiement trouvé avec succès")
                console.log(paiement)
                res.status(200).json(paiement)

            }

        }
    })

    /*
    DB.query( sqlSelectAllPaiement, (errPaiement, resPaiement) => {


        console.log("****** resultat de la requete sqlSelectAllPaiement")
        console.log(resPaiement)

        if(errPaiement){ 

            console.log("*** erreur de sqlSelectAllPaiement *** " +  errPaiement)  
            res.status(400).json({errPaiement})
            
            

        }else{


            DB.query(sqlSelectAllEleve, (errAllEleve, resAllEleve) => {

                if(errAllEleve){ 
        
                    console.log("***erreur de sqlCreatePaiement*** " +  errAllEleve)  
                    res.status(400).json({errAllEleve})
                    
        
                }else{
        
                    eleveCurrent = resAllEleve.find( element => element.id === idEleve)
        
                    console.log("**** eleveCurrent ")
                    console.log(eleveCurrent)
        
                    //requete de mis à jour de entreesArgent_id l'élève
                    let sqlSUpdateEleve = `UPDATE eleves SET entreesArgent_id = ${ idPaiement }  WHERE id = ${idEleve} ;`                    
        
                    DB.query( sqlSUpdateEleve, (errUpdateEleve, resUpdateEleve) => {
        
                        console.log("****** resultat de la requete sqlSUpdateEleve")
                        console.log(sqlSUpdateEleve)
        
                        if(errUpdateEleve){ 
        
                            console.log("*** erreur de sqlSUpdateEleve *** " +  errUpdateEleve)  
                            res.status(400).json({errUpdateEleve})
                            
                            
                
                        }else{
        
                            console.log("*** modification de l'élève effectuée avec succès*** ") 
                            console.log(resUpdateEleve)
        
                        }
        
                    })
        
                }
        
        
        
            } )



            //////////////////////////////////::

            console.log("*** paiement récupérés avec succès*** ") 
            res.status(200).json(resPaiement)

        }


    })
    */

   

   


};


