
import Axios from "./Caller.services";

let getEleves = (e) =>{
    return Axios.get("/eleves")  //routes du back
}


let getOneEleve = (id) =>{
    return Axios.get("/eleves/" +id)  //routes du back
}


let updateEleve = (eleveObject) => {
    return Axios.put("/eleves/" +eleveObject.id,  eleveObject)  //on envoie user 
}


/*
/////////////////////////////:
let updateEleve = (eleveObject) => {
    return Axios.put("/eleves/" +eleveObject.idEleve,  eleveObject)  //on envoie user 
}
*/

////////////////////////////

let deleteEleve = (id) => {
    return Axios.delete("/eleves/" +id)  //on envoie user 
}

let createEleve = (eleve) => {
    return Axios.post("/eleves", eleve)  //on envoie user 
}

export const elevesServices = {
    getEleves, getOneEleve, updateEleve, deleteEleve , createEleve 
}