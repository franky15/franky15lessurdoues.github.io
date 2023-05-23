
import Axios from "./Caller.services";

let getAllClasses = (e) =>{
    return Axios.get("/classesRoutes")  //routes du back
}

let getOneClasse = (id) =>{
    return Axios.get("/classesRoutes/" +id)  //routes du back
}

let updateClasse = (classe) => {
    return Axios.put("/usersRoutes/" + classe[0].id,  classe)  //on envoie user 
}

let deleteClasse = (id) => {
    return Axios.delete("/classesRoutes/" +id)  //on envoie user 
}

let addClasse = (classe) => {
    return Axios.post("/classesRoutes", classe)  //on envoie user 
}

export const classesServices = {
    getAllClasses, getOneClasse, updateClasse, deleteClasse, addClasse
}