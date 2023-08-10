
import Axios from "./Caller.services";

let getComptacharges = (e) =>{

    return Axios.get("/comptaCharges")  //routes du back
}


let getOneComptacharges = (id) =>{
    return Axios.get("/comptaCharges/" +id)  //routes du back
}


let updateComptacharges = (comptaObject) => {
    return Axios.put("/comptaCharges/" +comptaObject.id,  comptaObject)  //on envoie user 
}




////////////////////////////

let deleteComptacharges = (id) => {
    return Axios.delete("/comptaCharges/" +id)  //on envoie user 
}

let createComptacharges = (compta) => {
    return Axios.post("/comptaCharges", compta)  //on envoie user 
}

export const comptaChargesServices = {
    getComptacharges, getOneComptacharges, updateComptacharges, deleteComptacharges, createComptacharges 
}