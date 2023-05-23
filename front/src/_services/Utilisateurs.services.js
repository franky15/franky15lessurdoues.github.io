
import Axios from "./Caller.services";

let getAllUsers = () =>{
    return Axios.get("/usersRoutes")  //routes du back
}

let getUser = (id) =>{
    return Axios.get("/usersRoutes/" +id)  //routes du back
}

let updateUser = (user) => {
    return Axios.put("/usersRoutes/" + user[0].id,  user)  //on envoie user 
}

let deleteUser = (id) => {
    return Axios.delete("/usersRoutes/" +id)  //on envoie user 
}

let addUser = (user) => {
    return Axios.post("/auth/signup", user)  //on envoie user 
}

export const userServices = {
    getAllUsers, getUser, updateUser, deleteUser, addUser
}