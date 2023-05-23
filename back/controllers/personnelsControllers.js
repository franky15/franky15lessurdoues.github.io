//import des modules nécessaires
const DB = require("../mysql.config")
const { response } = require("../app");

//POST creation du personnel
exports.createPersonnel = (req, res, next) => {
    console.log("***bienvenue dans createPersonnel*** " )
    console.log("***userId du token*** : " + req.auth.userId ) 

    //récupération des données de la requete
    const { nom, prenom, poste, salaire, telephone, email } = req.body

    //on l'utilisera pour insérer le userId dans utilisateurs_id
    const utilisateurs_id = req.auth.userId

    //vérification des donnée de la requete
    if( !nom || !prenom || !poste || !salaire, !telephone, !email) {
        res.status(400).json({ message: "veillez remplir toutes les données du formulaire "})
    }
    console.log(req.body)
    //requete récupérant tous le personnel 
    const sqlSelectAllPerso ="SELECT * FROM personnels"

    DB.query(sqlSelectAllPerso, (err, response) => {
        if(err){
            res.status(404).json({err})
            console.log("***erreur de sql*** " +  err)  
        }else{
            //requete de vérification si l'utilisateur existe dans la base de données
            const personnel = response.find( element => element.email === email)
            
            if(personnel){
                console.log(`*************le personnel ${nom} existe déjà****************`)
                res.status(500).json({ message: `le personnel ${nom} existe déjà`})
            }else{
                //requete de creation de l'utilisateur
                let sqlCreatePerso = `INSERT INTO personnels ( nom, prenom, utilisateurs_id, poste, salaire, telephone, email )
                    VALUES ( "${nom}", "${prenom}", ${utilisateurs_id}, "${poste}",  ${salaire} , ${telephone},  "${email}");`

                DB.query( sqlCreatePerso, (err, response1) => {
                    if(err){
                        res.status(404).json({err})
                        console.log("***erreur de sql*** " +  err)  
                    }else{
                        res.status(200).json(response1)
                        console.log("***Personnel crée avec succès*** ")  
                    }
                })
            }
        }
    })


};

//GET récupération de tous le personnel
exports.getPersonnels = (req, res, next) => {

    console.log("***bienvenue dans getPersonnels*** " )
    console.log("***elementId du token*** : " + req.auth.userId ) 

    

    //requete récupérant tous le personnel 
    const sqlSelectAllPerso ="SELECT * FROM personnels"

    DB.query(sqlSelectAllPerso, (err, response) => {
        if(err){
            res.status(404).json({err})
            console.log("***erreur de sql*** " +  err)  
        }else{
            res.status(200).json(response)
            console.log(response)
        }
    })


};

//GET récupération d'un personnel
exports.getOnePersonnel = (req, res, next) =>{
    console.log("***bienvenue dans getOnePersonnels*** " )
    console.log("***elementId du token*** : " + req.auth.userId )

    //const utilisateurs_id = req.auth.userId
    //const utilisateursEmail = req.auth.email

    //requete récupérant tous le personnel 
    const sqlSelectAllPerso ="SELECT * FROM personnels"

    console.log(req.body)

    let elementId = parseInt(req.params.id) //convertion de la chaine en integer car front envoie chaine  et retourne false
    //vérification si le champ id est présent et cohérent
    if(!elementId){
        res.status(404).json({message: "absence de paramètre"})
    }

    DB.query(sqlSelectAllPerso, (err, response) => {
        if(err){
            res.status(404).json({err})
            console.log("***erreur de sql*** " +  err)  
        }else{
            const personnel = response.find( element => element.id == elementId)

            if(!personnel){
                res.status(404).json({message: "personnel non trouvé"})
                console.log("***personnel non trouvé*** " +  err)
            }else{
                res.status(200).json(personnel)
            }
        }
    })
}

//modification du personnel
exports.updatePersonnel = (req, res, next) =>{

    console.log("***bienvenue dans updatePersonnel*** " )
    console.log("***elementId du token*** : " + req.auth.userId ) 

    //récupération des données de la requete
    const { nom, prenom, poste, telephone } = req.body 
    
    //const utilisateurs_id = req.auth.userId
    //const utilisateursEmail = req.auth.email

    let userId = parseInt(req.params.id) //convertion de la chaine en integer car front envoie chaine  et retourne false

    //récupération du personnel
    const sqlSelectAllPerso = `SELECT * FROM personnels;`

    //requete de mis à jour du cocktail
    const sqlUpdatePersonnel = `UPDATE personnels SET nom = "${nom}", prenom = "${prenom}"  WHERE id = ${userId} ;` 

    DB.query(sqlSelectAllPerso, (err, response) => {
        
        console.log(response)///// 

        if(err){
            res.status(404).json({err})
            console.log("***erreur de sql 1*** " +  err)  
        }else{
            const personnel = response.find( element => element.id == userId)
           
           // console.log(personnel)

            if(!personnel){
                res.status(404).json({message: "personnel non trouvé"}) 
                console.log("***personnel non trouvé*** " +  err)
            }else{
                DB.query(sqlUpdatePersonnel, (err, response1) => {
                    if(err){
                        res.status(404).json({err})
                        console.log("***erreur de sql 2*** " +  err)  
                    }
                   // console.log(response1)
                    res.status(200).json({ message: "personnel mis à jour avec succès"})
                })
                
            }
        }
    })
}


//DELETE supression du personnel
exports.deletePersonnel = (req, res, next) => {
    console.log("***bienvenue dans updatePersonnel*** " )
    console.log("***elementId du token*** : " + req.auth.userId ) 

    //const utilisateurs_id = req.auth.userId
    //const utilisateursEmail = req.auth.email

    let elementId = parseInt(req.params.id) //convertion de la chaine en integer car front envoie chaine  et retourne false

    //récupération du personnel
    const sqlSelectAllPerso = "SELECT * FROM personnels"

   //requete de supression
   const sqlDeletePersonnel = `DELETE FROM personnels WHERE  id = ${elementId};`

    DB.query(sqlSelectAllPerso, (err, response) => {
        if(err){
            res.status(404).json({err})
            console.log("***erreur de sql*** " +  err)  
        }else{
            const personnel = response.find( element => element.id == elementId)

            if(!personnel){
                res.status(404).json({message: "personnel non trouvé"})
                console.log("***personnel non trouvé*** " +  err)
            }else{
                DB.query(sqlDeletePersonnel, (err, response1) => {
                    if(err){
                        res.status(404).json({err})
                        console.log("***erreur de sql*** " +  err)  
                    }
                    console.log(response1)
                    res.status(200).json({ message: "personnel supprimé avec succès"})
                })
                
            }
        }
    })

}
