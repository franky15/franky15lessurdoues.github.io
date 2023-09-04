/*utilisation de la caractéristique de axios : qui permet de mettre une url qui sera utilisée
dans tout le projet cela évite les problèmes au cas ou l'url du backend changerait
*/

import axios from "axios" //on a installé axios avec npm
import { accountServices } from "./Account.services"

const Axios = axios.create({ // creation ou itération de l'objet baseUrsl qu'on utilisera partout
    baseURL: "http://localhost:3000" //"https://ecolelessurdoues.fr"//
})

/**intercepteur pour le token  c'est ici qu'on va insérer le token dans la requete 
 * (le header) pour envoyer au backend car le backend a besoin du token 
 * en provenance du frontend pour l'authentification
*/
Axios.interceptors.request.use( request => {
    //si je suis connecté alors injecte le token dans le headers de la requete
    if( accountServices.isLogged() ) {
        request.headers.Authorization = "Bearer "+accountServices.getToken() //"Bearer " ne pas oublier l'espace
    }

    return request
})

//gestion du logout(ici il n y a plus de token dans le state ou  le localstorage)
Axios.interceptors.response.use( response => {
    return response
}, error => {     //on arrive à l'erreur car il n y a pas le token dans response
    if(error.response.status === 401){    //si le status de response est 401 alors...
        accountServices.logout() //netoyage du token
        window.location = "/auth/login"   //ici il faut rediriger vers une page qui n'a pas besoin du state car on le vide ici 
    }else{
        return Promise.reject(error)  
    }
})
export default Axios