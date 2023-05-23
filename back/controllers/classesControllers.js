//import des modules nécessaires
const DB = require("../mysql.config")
const { response } = require("../app");
 
//POST creation du personnel
exports.createClasse = (req, res, next) => { 

    console.log("***bienvenue dans createClasse*** " )
    console.log("***elementId du token*** : " + req.auth.userId ) 

    let { nom, effectif, enseignant, sectionNumber } = req.body; 

    //on l'utilisera pour insérer le userId dans utilisateurs_id
    const utilisateurs_id = req.auth.userId

    //vérification des donnée de la requete
    /*if( !nom || !effectif || !enseignant || !sectionNumber ) {
        res.status(400).json({ message: "veillez remplir toutes les données du formulaire "})
    }*/

    if( !nom || !enseignant || !sectionNumber ) {
        res.status(400).json({ message: "veillez remplir toutes les données du formulaire "})
    }

    console.log("req.body")/////
    console.log(req.body)//////

//////////////////////////////////////////////
    let sectionAnglophone = "anglophone"
    let sectionFrancophone = "francophone"
    if(sectionNumber.toLowerCase() === sectionAnglophone.toLowerCase()) {

        sectionNumber = 1

    }else if( sectionNumber.toLowerCase() === sectionFrancophone.toLowerCase() ) {

        sectionNumber = 2

    } 
   
    console.log("****** la valeur sectionNumber : ****** " + sectionNumber )
//////////////////////////////////////////////

    //requete récupérant toutes les classes 
    const sqlSelectAllClasses = "SELECT * FROM classes" 

    DB.query(sqlSelectAllClasses, (err, response) => {
        if(err){
            res.status(404).json({err})
            console.log("***erreur de sql sqlSelectAllClasses*** " +  err)  
        }else{
            
            //requete de vérification si la classe existe dans la base de données
            const classe = response.find( element1 => element1.nom === nom)

            console.log("ma classe trouvée est")///////
            console.log(classe) //////
            console.log("req.body.nom : " + nom) //////

            if(classe){
                console.log(`*************la classe ${nom} existe déjà****************`)
                res.status(500).json({ message: `la classe ${nom} existe déjà`})
            }else{

                //requete de récupération des sections
                const sqlSelectAllSections ="SELECT * FROM section"

                DB.query( sqlSelectAllSections, (err, response1) => {  

                    if(err){
                        res.status(404).json({err})
                        console.log("***erreur de sql sqlSelectAllSections*** " +  err)  
                    }else{

                        //comparaison des section
                        //const section = response1.find( element2 => element2.id === parseInt(sectionNumber) )
                        const section = response1.find( element2 => element2.id === sectionNumber )

                        console.log("ma section est ")
                        console.log(section)

                        //vérification si la section(le numéro) envoyée correspond à une section(numéro) de la base de données
                        if(!section) {
                            
                            res.status(404).json({message: "veillez entrer correctement la section"})
                            console.log("***veillez entrer correctement la section*** ")
                        }else{

                            //requete de creation de la classe
                          /*  let sqlCreateClasse = `INSERT INTO classes ( nom, effectif, enseignant, section_id, utilisateurs_id )
                            VALUES ( "${nom}", ${effectif}, "${enseignant}", ${parseInt(sectionNumber)},  ${utilisateurs_id} );`
                            */

                            let sqlCreateClasse = `INSERT INTO classes ( nom, enseignant, section_id, utilisateurs_id )
                            VALUES ( "${nom}", "${enseignant}", ${sectionNumber},  ${utilisateurs_id} );`

                            DB.query( sqlCreateClasse, (err, response2) => {
                                if(err){
                                    res.status(404).json({err})
                                    console.log("***erreur de sql sqlCreateClasse*** " +  err)  
                                }else{
                                    res.status(200).json(response2)
                                    console.log("***section crée avec succès*** ")
                                } 
                            })
                        }
                    }
                })

                
            }
        }
    })
};

//GET récupération de toutes les classes
exports.getClasses = (req, res, next) => {

    console.log("***bienvenue dans getClasses*** " )
    console.log("***elementId du token*** : " + req.auth.userId )

     //requete récupérant toutes les classes 
     const sqlSelectAllClasses ="SELECT * FROM classes"

     DB.query(sqlSelectAllClasses, (err, response) => {
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
exports.getOneClasse = (req, res, next) =>{
    console.log("***bienvenue dans getOneClasse*** " )
    console.log("***elementId du token*** : " + req.auth.userId )

    //requete récupérant toutes les classes 
    const sqlSelectAllClasses ="SELECT * FROM classes"

    /*const  sqlSelectAllClasses = `SELECT *
    FROM classes
    JOIN utilisateurs ON classes.utilisateurs_id = utilisateurs.id;`*/


    let elementId = parseInt(req.params.id) //convertion de la chaine en integer car front envoie chaine  et retourne false
    //vérification si le champ id est présent et cohérent
    if(!elementId){
        res.status(404).json({message: "absence de paramètre"})
    }

    DB.query(sqlSelectAllClasses, (err, response) => {
        if(err){
            res.status(404).json({err})
            console.log("***erreur de sql*** " +  err)  
        }else{

            console.log("ma response est : ")
            console.log(response)//////

            const classe = response.find( element => element.id == elementId)

            console.log("ma classe est : ")
            console.log(classe)//////
            if(!classe){
                res.status(404).json({message: "classe non trouvé"})
                console.log("***classe non trouvé*** " +  err)
            }else{

                res.status(200).json(classe)
            }
        }
    })
};


//modification de la classe
exports.updateClasse = (req, res, next) =>{

    console.log("***bienvenue dans updateClasse*** " )
    console.log("***elementId du token*** : " + req.auth.userId ) 

    //récupération des données de la requete
    const { nom, enseignant, sectionNumber } = req.body;

    //vérification des donnée de la requete
    if( !nom || !enseignant || !sectionNumber ) {
        res.status(400).json({ message: "veillez remplir toutes les données du formulaire "})
    }

    let elementId = parseInt(req.params.id) //convertion de la chaine en integer car front envoie chaine  et retourne false

    //récupération des classes
    const  sqlSelectAllClasses = `SELECT * FROM classes JOIN section ON classes.section_id = section.id;`
    
    DB.query(sqlSelectAllClasses, (err, response) => {
        
        console.log(" ma response est : " )///// 
        console.log(response)///// 

        if(err){
            res.status(404).json({err})
            console.log("***erreur de sqlSelectAllClasses*** " +  err)  
        }else{
            const classe = response.find( element => element.id == elementId) //attention
           
            console.log("testtttttttttt")
            console.log(classe)

            if(!classe){
                res.status(404).json({message: "classe non trouvée"}) 
                console.log("***classe non trouvée*** " )
            }else{

                //requete de récupération des sections
                const sqlSelectAllSections ="SELECT * FROM section"

                DB.query( sqlSelectAllSections, (err, response1) => {  

                    if(err){
                        res.status(404).json({err})
                        console.log("***erreur de  sqlSelectAllSections*** " +  err)  
                    }else{

                        //comparaison des section
                        const section = response1.find( element2 => element2.id === parseInt(sectionNumber) )
                            
                        console.log("ma section est ")
                        console.log(section)
                        
                        if(!section){
                            res.status(404).json({message: "veillez entrer correctement la section"})
                            console.log("***veillez entrer correctement la section*** ")
                        }else{
                            //requete de mis à jour du cocktail
                            const sqlUpdateClasse = `UPDATE classes SET nom = "${nom}", enseignant = "${enseignant}", section_id = ${parseInt(sectionNumber)}  WHERE id = ${elementId} ;` 
                                                
                            DB.query(sqlUpdateClasse, (err, response2) => {
                                if(err){
                                    res.status(404).json({err})
                                    console.log("***erreur de sqlUpdateClasse*** " +  err)  
                                }
                            // console.log(response1)
                                res.status(200).json({ message: "classe mise à jour avec succès"})
                            })
                        }

                    }
                })
               
                
            }
        }
    })
}

//DELETE supression de la classe
exports.deleteClasse = (req, res, next) => { 
    console.log("***bienvenue dans deleteClasse*** " )
    console.log("***elementId du token*** : " + req.auth.userId ) 


    let elementId = parseInt(req.params.id) //convertion de la chaine en integer car front envoie chaine  et retourne false

    //récupération des classes
    //const  sqlSelectAllClasses = `SELECT * FROM classes JOIN section ON classes.section_id = section.id;`

    const  sqlSelectAllClasses = `SELECT * FROM classes;` //JOIN section ON classes.section_id = section.id;`
   //requete de supression
   const sqlDeleteClasse = `DELETE FROM classes WHERE  id = ${elementId};`

    DB.query(sqlSelectAllClasses, (err, response) => {
        if(err){
            res.status(404).json({err})
            console.log("***erreur de sqlSelectAllClasses*** " +  err)  
        }else{
            const classe = response.find( element => element.id == elementId)

            if(!classe){
                res.status(404).json({message: "classe non trouvée"})
                console.log("***classe non trouvée*** " +  err)
            }else{
                DB.query(sqlDeleteClasse, (err, response1) => {
                    if(err){
                        res.status(404).json({err})
                        console.log("***erreur de sqlDeleteClasse*** " +  err)  
                    }
                    //console.log(response1)
                    res.status(200).json({ message: "Classe supprimée avec succès"})
                })
                
            }
        }
    })

};