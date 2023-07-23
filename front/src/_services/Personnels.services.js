
import Axios from "./Caller.services";

let getPersonnels = (e) =>{
    return Axios.get("/personnels")  //routes du back
}


let getOnePersonnel = (id) =>{
    return Axios.get("/personnels/" +id)  //routes du back
}


let updatePersonnel = (personnelObject) => {
    return Axios.put("/personnels/" +personnelObject.id,  personnelObject)  //on envoie user 
}


/*
/////////////////////////////:
let updateEleve = (eleveObject) => {
    return Axios.put("/eleves/" +eleveObject.idEleve,  eleveObject)  //on envoie user 
}
*/

////////////////////////////

let deletePersonnel = (id) => {
    return Axios.delete("/personnels/" +id)  //on envoie user 
}

let createPersonnel = (personnel) => {
    return Axios.post("/personnels", personnel)  //on envoie user 
}

export const personnelServices = {
    getPersonnels, getOnePersonnel, updatePersonnel, deletePersonnel, createPersonnel 
}