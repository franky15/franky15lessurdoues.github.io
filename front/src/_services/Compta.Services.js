
import Axios from "./Caller.services";

let getComptas = (e) =>{

    return Axios.get("/comptas")  //routes du back
}


let getOneCompta = (id) =>{
    return Axios.get("/comptas/" +id)  //routes du back
}


let updateCompta = (comptaObject) => {
    return Axios.put("/comptas/" +comptaObject.id,  comptaObject)  //on envoie user 
}




////////////////////////////

let deleteCompta = (id) => {
    return Axios.delete("/comptas/" +id)  //on envoie user 
}

let createCompta = (compta) => {
    return Axios.post("/comptas", compta)  //on envoie user 
}

export const comptaServices = {
    getComptas, getOneCompta, updateCompta, deleteCompta, createCompta 
}