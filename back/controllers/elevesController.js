//import des modules nécessaires
const DB = require("../mysql.config")
const { response } = require("../app"); 
 
//POST creation de l'élève
exports.createEleve = (req, res, next) => {  
 
    console.log("***bienvenue dans createEleve*** " )
    console.log("***elementId du token*** : " + req.auth.userId ) 

    
    console.log("*** req.body *** " )
    console.log(req.body) 

   /* let { anciennete, decouverteDateArrivee, nom, prenom, dateNaissance, sectionNumber,
        classes_id, dateInscription, montantPaye, nomParent1, contactParent1, nomParent2, contactParent2 } = req.body;
    
        if( !anciennete || !decouverteDateArrivee || !nom || !prenom || !dateNaissance || !sectionNumber ||
        !classes_id  || !dateInscription || !montantPaye ||  !nomParent1 || !contactParent1    ){

        console.log("***veillez entrer correctement toutes les information du formulaire*** ")
        res.status(400).json({ message: "***veillez entrer correctement toutes les information du formulaire***"})
    }
    
    */
    
    let { anciennete, nom, prenom, decouverteDateArrivee, dateNaissance, sectionNumber,
            classes_id, dateInscription, montantPaye, nomParent1, contactParent1, nomParent2, contactParent2 } = req.body
    
    if( !anciennete || !nom || !prenom || !decouverteDateArrivee || !dateNaissance || !sectionNumber
       || !classes_id || !dateInscription || !montantPaye || !nomParent1 || !contactParent1 ){

        console.log("***veillez entrer correctement toutes les information du formulaire*** ")
        res.status(400).json({ message: "***veillez entrer correctement toutes les information du formulaire***"})
    }
   
     
        /*
    let { anciennete, decouverte, dateArrivee, nom, prenom, dateNaissance, sectionNumber,
        classes_id, dateInscription, montantPaye, nomParent1, contactParent1, nomParent2, contactParent2 } = req.body;

    */ 


        //cas ou le parent 2 n'existe pas
   /* if( !req.body.nomParent2 || !req.body.contactParent2 ) { 

        if( !anciennete ||  !nom || !prenom || !dateNaissance || !sectionNumber ||
            !classes_id || !nomParent1 || !contactParent1 || !dateInscription || !montantPaye   ) {  //|| !nomParent2 || !contactParent2
    
            res.status(400).json({ message: "veillez remplir toutes les données du formulaire "})
        }

    }else{

         //cas ou le parent 2 existe
        let { anciennete, decouverte, dateArrivee, nom, prenom, dateNaissance, sectionNumber,
            classes_id, dateInscription, montantPaye, nomParent1, contactParent1, nomParent2, contactParent2 } = req.body;

        if( !anciennete || decouverte || dateArrivee || !nom || !prenom || !dateNaissance || !sectionNumber ||
            !classes_id || !nomParent1 || !contactParent1 || !nomParent2 || !contactParent2 || !dateInscription || !montantPaye   ) {  //|| !nomParent2 || !contactParent2
    
            res.status(400).json({ message: "veillez remplir toutes les données du formulaire "})
        }
    }
    */
    

    //on l'utilisera pour insérer le userId dans utilisateurs_id
    const utilisateurs_id = req.auth.userId
 
 
    console.log("****** la valeur sectionNumber avant le if: ****** " + sectionNumber )

    //converstion de l'id de la section en chiffre 
    let sectionAnglophone = "anglophone"  
    let sectionFrancophone = "francophone"  
    if(sectionNumber.toLowerCase() === sectionAnglophone.toLowerCase()) {

        sectionNumber = 1  

    }else if( sectionNumber.toLowerCase() === sectionFrancophone.toLowerCase() ) { 

        sectionNumber = 2        

    }  
   
    console.log("****** la valeur sectionNumber : ****** " + sectionNumber )

    ///////////////////////////////////////////////////////////////:
    
    
    //requete de récupération de toutes les classes
    const sqlSelectAllClasses = "SELECT * FROM classes" 

    DB.query( sqlSelectAllClasses, (err, response0) => {

        let classeId 

        if(err){
            res.status(404).json({err})
            console.log("***erreur de sql sqlSelectAllClasses*** " +  err)  
        }else{
            
            const classe = response0.find( element3 => element3.nom === classes_id) //classesNom
            if(!classe) {
                            
                res.status(404).json({message: "veillez entrer correctement la classe"})
                console.log("***veillez entrer correctement la classe*** ")
            }else{

                //conversion du nom de la classe de la chaine à l'integer
                classeId = classe.id

            }
            //console.log("la valeur de classeId est : " + classeId)
        } 

    //})
 
        console.log("la valeur de classeId est : " + classeId)
        ///////////////////////////////////////////////////////////////:

        //requete récupérant toutes les élèves
        const sqlSelectAllEleves = "SELECT * FROM eleves" 

        DB.query( sqlSelectAllEleves, (err, response) => {

            if(err){
                res.status(404).json({err})
                console.log("***erreur de sql sqlSelectAllEleves*** " +  err)  
            }else{

                //requete de vérification si l'élève existe dans la base de données
                const eleve = response.find( element1 => element1.nom === nom && element1.prenom === prenom && element1.nomParent1 === nomParent1)
                
                console.log("l'eleve trouvé est")////////
                console.log(eleve)//////////

                if(eleve){

                    console.log(`*************l'élève ${nom} existe déjà****************`)
                    res.status(500).json({ message: `l'élève ${nom} existe déjà`})
                }else{

                    //requete de récupération des sections
                    const sqlSelectAllSections ="SELECT * FROM section"

                    DB.query( sqlSelectAllSections, (err, response1) => {  

                        if(err){ 
                            res.status(404).json({err})
                            console.log("***erreur de sql sqlSelectAllSections*** " +  err)  
                        }else{

                            //comparaison des section
                            const section = response1.find( element2 => element2.id === sectionNumber )

                            console.log("ma section est ")
                            console.log(section)

                            //vérification si la section(le numéro) envoyée correspond à une section(numéro) de la base de données
                            if(!section) { 
                                
                                res.status(404).json({message: "veillez entrer correctement la section"})
                                console.log("***veillez entrer correctement la section*** ")
                            }else{

                                let sqlCreateEleve
                                
                                //vérification si nomParent2, contactParent2 existe ou pas decouverteDateArrivee
                                if(!nomParent2 || !contactParent2 ){

                                    console.log("*** ma requete sqlCreateEleve avec des valeurs nulles   : *****")
                                   
                                    //requete de création de l'élève
                                    sqlCreateEleve = `INSERT INTO eleves ( anciennete, decouverteDateArrivee, nom, prenom, dateNaissance, section_id,
                                        classes_id, utilisateurs_id, nomParent1, contactParent1, dateInscription, montantPaye)
                                    VALUES (  "${anciennete}", "${decouverteDateArrivee}", "${nom}", "${prenom}", "${dateNaissance}", ${sectionNumber},
                                        ${classeId}, ${utilisateurs_id}, "${nomParent1}", ${contactParent1}, "${dateInscription}", ${montantPaye} );`
    


                                 }else{

                                    console.log("**** ma requete sqlCreateEleve sans  valeurs nulles  : ****")
                                   
                                    //requete de création de l'élève
                                    sqlCreateEleve = `INSERT INTO eleves ( anciennete, decouverteDateArrivee, nom, prenom, dateNaissance, section_id,
                                        classes_id, utilisateurs_id, nomParent1, contactParent1, dateInscription, montantPaye)
                                    VALUES (  "${anciennete}", "${decouverteDateArrivee}", "${nom}", "${prenom}", "${dateNaissance}", ${sectionNumber},
                                        ${classeId}, ${utilisateurs_id}, "${nomParent1}", ${contactParent1}, "${dateInscription}", ${montantPaye} );`
    

                                 }
                                /*
                                if(!nomParent2 || !contactParent2 ){

                                   if(decouverte === undefined) {


                                    console.log("ma requete sqlCreateEleve avec des valeurs nulles et sans decouverte  : ")
                                   
                                    //requete de création de l'élève
                                    sqlCreateEleve = `INSERT INTO eleves ( anciennete, dateArrivee, nom, prenom, dateNaissance, section_id,
                                        classes_id, utilisateurs_id, nomParent1, contactParent1, dateInscription, montantPaye)
                                    VALUES (  "${anciennete}", "${dateArrivee}", "${nom}", "${prenom}", "${dateNaissance}", ${sectionNumber},
                                        ${classeId}, ${utilisateurs_id}, "${nomParent1}", ${contactParent1}, "${dateInscription}", ${montantPaye} );`
    
                                   }else{

                                    console.log("ma requete sqlCreateEleve avec des valeurs nulles et sans dateArrivee : ")
                                   
                                    //requete de création de l'élève
                                    sqlCreateEleve = `INSERT INTO eleves ( anciennete, decouverte, nom, prenom, dateNaissance, section_id,
                                        classes_id, utilisateurs_id, nomParent1, contactParent1, dateInscription, montantPaye)
                                    VALUES (  "${anciennete}", "${decouverte}", "${nom}", "${prenom}", "${dateNaissance}", ${sectionNumber},
                                        ${classeId}, ${utilisateurs_id}, "${nomParent1}", ${contactParent1}, "${dateInscription}", ${montantPaye} );`
    
                                   } 

                               
                                }else  { 

                                    

                                        console.log("ma requete sqlCreateEleve sans valeurs nulles  : ")
                                    
                                        //requete de création de l'élève
                                        sqlCreateEleve = `INSERT INTO eleves ( anciennete, decouverte, dateArrivee, nom, prenom, dateNaissance, section_id,
                                            classes_id, utilisateurs_id, nomParent1, contactParent1, nomParent2, contactParent2 , dateInscription, montantPaye)
                                        VALUES (  "${anciennete}", "${decouverte}","${dateArrivee}", "${nom}", "${prenom}", "${dateNaissance}", ${sectionNumber},
                                            ${classeId}, ${utilisateurs_id}, "${nomParent1}", ${contactParent1}, "${nomParent2}", ${contactParent2}, "${dateInscription}", ${montantPaye} );`
                                    
                                    
                                
                                } 
                                */
                                
                            
                                console.log(sqlCreateEleve)
                                    
                                DB.query( sqlCreateEleve, (err, response3) => {


                                    console.log("******** test ********$")////// 

                                    console.log(response3)///////
                                    
                                    if(err){

                                        console.log("***erreur de sql sqlCreateEleve*** " +  err) 
                                        res.status(404).json({err})
                                         
                                    }else{
                                        res.status(200).json(response3) 
                                        console.log("***élève crée avec succès*** ")   
                                    } 
                                })
                            
                            
                            }

                        }

                    })


                }

            }

        })
    })    

};


//GET récupération de tous les élèves
exports.getEleves = (req, res, next) => {

    console.log("***bienvenue dans getEleves*** " )
    console.log("***elementId du token*** : " + req.auth.userId )

    //requete récupérant toutes les classes 
    const sqlSelectAllEleves ="SELECT * FROM eleves"

    DB.query(sqlSelectAllEleves, (err, response) => {
       if(err){
           res.status(404).json({err})
           console.log("***erreur de sql sqlSelectAllEleves*** " +  err)  
       }else{
           res.status(200).json(response)
           console.log(response)
       }
   })


};


//GET récupération d'un élève
exports.getOneEleve = (req, res, next) => {

    console.log("***bienvenue dans getOneEleve*** " )
    console.log("***elementId du token*** : " + req.auth.userId )

    let elementId = parseInt(req.params.id)

    if(!elementId){

        res.status(404).json({message: "absence de paramètre"})
    }

    //requete récupérant tous les élèves
    const sqlSelectAllEleves ="SELECT * FROM eleves"

    DB.query(sqlSelectAllEleves, (err, response) => {

        if(err){
            res.status(404).json({err})
            console.log("***erreur de sql sqlSelectAllEleves*** " +  err)  
        }else{

            console.log("ma response est : ")
            console.log(response)//////

            const eleve = response.find( element => element.id == elementId)

            console.log("mon eleve est : ")
            console.log(eleve)//////
            if(!eleve){
                res.status(404).json({message: "eleve non trouvé"})
                console.log("***eleve non trouvé*** " +  err)
            }else{

                res.status(200).json(eleve)
            }
        }





    })

};


//PUT modification de l'élève
exports.updateEleve = (req, res, next) => {

    console.log("***bienvenue dans updateEleve*** " )
    console.log("***elementId du token*** : " + req.auth.userId ) 
    
    //console.log("*** mon headers dans updateEleve*** " )
    //console.log(req.headers)



    //récupération des données de la requetes
    console.log("***** req.body ******") 
    console.log(req.body) 
    

    let { idEleve, anciennete, decouverteDateArrivee, nom, prenom, dateNaissance, dateInscription, montantPaye, sectionNumber,
        classes_id,  nomParent1, contactParent1, nomParent2, contactParent2 } = req.body
    
        /*
    let { idEleve, anciennete, nom, prenom, decouverteDateArrivee, dateNaissance, sectionNumber,
        classes_id, dateInscription, montantPaye, nomParent1, contactParent1, nomParent2, contactParent2 } = req.body

    */

    /*
    if( !anciennete || !nom || !prenom || !decouverteDateArrivee || !dateNaissance || !sectionNumber
    || !classes_id || !dateInscription || !montantPaye || !nomParent1 || !contactParent1 ){

        console.log("***veillez entrer correctement toutes les information du formulaire*** ")
        res.status(400).json({ message: "***veillez entrer correctement toutes les information du formulaire***"})
    }
    */
     
    //let elementId = parseInt(req.params.id) //idEleve 
    let elementId = idEleve

    //converstion de l'id de la section en chiffre 
    let sectionAnglophone = "anglophone"
    let sectionFrancophone = "francophone"
    if(sectionNumber.toLowerCase() === sectionAnglophone.toLowerCase()) {

        sectionNumber = 1

    }else if( sectionNumber.toLowerCase() === sectionFrancophone.toLowerCase() ) {

        sectionNumber = 2

    } 
   
    console.log("****** la valeur sectionNumber : ****** " + sectionNumber )
    
    let classeId 

    let sqlUpdateEleve 

    //requete de récupération de tous les élèves
    const sqlSelectAllEleves = "SELECT * FROM eleves" 
    //requete de récupération de toutes les classes
    const sqlSelectAllClasses = "SELECT * FROM classes" 

    /////////////////////////////

    if( !anciennete && !nom && !prenom && !decouverteDateArrivee && !dateNaissance 
        && !montantPaye && !nomParent1 && !contactParent1 ){

            DB.query( sqlSelectAllClasses, (err, response00) => {

                //let classeId 
        
                if(err){
                    console.log("***erreur de sql sqlSelectAllClasses*** " +  err)
                    res.status(404).json({err})
                      
                }else{ 
                    
                    const classe = response00.find( element3 => element3.nom === classes_id) //classesNom
                    if(!classe) {
                              
                        console.log("***veillez entrer correctement la classe*** ")
                        res.status(404).json({message: "veillez entrer correctement la classe"})
                        
                    }else{
        
                        //conversion du nom de la classe de la chaine à l'integer
                        classeId = classe.id
        
                    }
                    //console.log("la valeur de classeId est : " + classeId)
                } 
        
                console.log("la valeur de classeId est : " + classeId)
            
                //////////////////////////////////////////////////////////////////
        
                
                DB.query( sqlSelectAllEleves, (err, response0) => {
        
                    console.log("****** response0********")///////
                    console.log(response0)///////
            
                    ///////////////////////////////////
                    if(err){
            
                        console.log("***erreur de sql sqlSelectAllEleves *** " +  err)
                        res.status(404).json({message: "erreur de sql sqlSelectAllEleves" + err})
                        
                    }else{
            
                        //let sqlUpdateEleve 
            
                        /////////////////////

                        //requete de mis à jour de l'élève                                           
                        sqlUpdateEleve = `UPDATE eleves SET section_id=${sectionNumber}, classes_id=${classeId}, dateInscription="${dateInscription}"
                        WHERE id = ${elementId} ;` 

                        /////////////////////

                        /*
                        if(!nomParent2 || !contactParent2 ){
            
                            console.log("***  transfert de l'élève sans parent2*** " )
        
                            //requete de mis à jour de l'élève                                           //classes_id
                            sqlUpdateEleve = `UPDATE eleves SET section_id=${sectionNumber}, classes_id=${classeId}, dateInscription="${dateInscription}"
                            WHERE id = ${elementId} ;` 
            
                            
                        }else{  
            
            
                            console.log("***  le transfert de l'élève avec parent2*** " )
        
                            //requete de mis à jour de l'élève                                          //classes_id
                            sqlUpdateEleve = `UPDATE eleves SET section_id=${sectionNumber}, classes_id=${classeId}, dateInscription="${dateInscription}"
                            WHERE id = ${elementId} ;` 
            
                        
                        } 
                        
                        */

                        console.log("résultat de la requete sqlUpdateEleve")//
                        console.log(sqlUpdateEleve)//
            
                        DB.query(sqlUpdateEleve, (err, response2) => { 
            
                            if(err){
                                console.log("***erreur de sqlUpdateEleve*** " +  err)
                                res.status(404).json({ message: "erreur de sqlUpdateEleve" + err})
                                
                            }
                            // console.log(response1)
                            console.log(`l'élève ${nom} a été mise à jour avec succès`)
                            res.status(200).json({ message: "l'élève a été mise à jour avec succès"})
                            
                        })   
            
                    } 
                })
                     
            })
       
        }else{

            DB.query( sqlSelectAllEleves, (err, response0) => {

                console.log("****** response0********")///////
                console.log(response0)///////
        
                
                if(err){
        
                    console.log("***erreur de sql sqlSelectAllEleves *** " +  err)
                    res.status(404).json({message: "erreur de sql sqlSelectAllEleves" + err})
                    
                }else{
        
                    //let sqlUpdateEleve 
        
                    if(!nomParent2 || !contactParent2 ){
        
                        
                        //requete de mis à jour de l'élève
                        sqlUpdateEleve = `UPDATE eleves SET anciennete="${anciennete}", decouverteDateArrivee="${decouverteDateArrivee}", nom="${nom}", prenom="${prenom}", dateNaissance="${dateNaissance}", section_id=${sectionNumber},
                        classes_id=${classes_id}, dateInscription="${dateInscription}", montantPaye=${montantPaye}, nomParent1="${nomParent1}", contactParent1=${contactParent1}
                        WHERE id = ${elementId}   ;`   
                        
        
                        
        
                    }else{  
        
                        
                        //requete de mis à jour de l'élève
                        sqlUpdateEleve = `UPDATE eleves SET anciennete="${anciennete}", decouverteDateArrivee="${decouverteDateArrivee}", nom="${nom}", prenom="${prenom}", dateNaissance="${dateNaissance}", section_id=${sectionNumber},
                        classes_id=${classes_id},  nomParent1="${nomParent1}", contactParent1=${contactParent1}
                        nomParent2="${nomParent2}", contactParent2=${contactParent2}   WHERE id = ${elementId} ;`   
                        
        
                        
                    
                    }
                    
                    console.log("résultat de la requete sqlUpdateEleve")//
                    console.log(sqlUpdateEleve)//
        
                    DB.query(sqlUpdateEleve, (err, response2) => { 
        
                        if(err){
                            console.log("***erreur de sqlUpdateEleve*** " +  err)
                            res.status(404).json({ message: "erreur de sqlUpdateEleve" + err})
                            
                        }
                    // console.log(response1)
                        console.log(`l'élève ${nom} a été mise à jour avec succès`)
                        res.status(200).json({ message: "l'élève a été mise à jour avec succès"})
                        
                    })   
        
                }  

            })


        }
   
        
};


//DELETE supression de l'élève
exports.deleteEleve = (req, res, next) => { 

    console.log("***bienvenue dans deleteEleve*** " )
    console.log("***elementId du token*** : " + req.auth.userId ) 

    let elementId = parseInt(req.params.id)

    const  sqlSelectAllEleves = `SELECT * FROM eleves;` 
   //requete de supression
   const sqlDeleteEleve = `DELETE FROM eleves WHERE  id = ${elementId};`

    DB.query(sqlSelectAllEleves , (err, response) => {  
        if(err){
            res.status(404).json({err})
            console.log("***erreur de ssqlSelectAllEleves*** " +  err)  
        }else{
            const eleve = response.find( element => element.id == elementId)

            if(!eleve){
                res.status(404).json({message: "éleve non trouvé"})
                console.log("***élève non trouvé*** " +  err)
            }else{
                DB.query(sqlDeleteEleve , (err, response1) => {
                    if(err){
                        res.status(404).json({err})
                        console.log("***erreur de sqlDeleteEleve *** " +  err)  
                    }
                    //console.log(response1)
                    res.status(200).json({ message: "élève supprimé avec succès"})
                })
                
            } 
        }
    })


};