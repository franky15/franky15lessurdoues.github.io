
import Axios from "./Caller.services";

let getAllClasses = () =>{
    return Axios.get("/classesRoutes")  //routes du back
}

//en cmmentaire car les pages n'existe plus elles ont été supprimées

let getOneClasse = (id) =>{
    return Axios.get("/classesRoutes/" +id)  //routes du back
}

let updateClasse = (classeObject) => {
    return Axios.put("/classesRoutes/" +classeObject.id,  classeObject)  //on envoie user 
}

let deleteClasse = (id) => {
    return Axios.delete("/classesRoutes/" +id)  //on envoie user 
}

let addClasse = (classe) => {
    return Axios.post("/classesRoutes", classe)  //on envoie user 
}

export const classesServices = {
    getAllClasses, getOneClasse, updateClasse, deleteClasse, addClasse,
}