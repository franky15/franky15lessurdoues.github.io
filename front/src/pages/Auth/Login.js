import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

//import { accountServices } from '@/_services/Account.services';  
import { accountServices } from '../../_services/Account.services';


import ecole from '../../images/imageEcole.jpg'

const Login = () => {


    let navigate = useNavigate();  //pour utiliser useNavigate

    const [ loginObject, setLoginObject ] = useState({

        email: "mail@yahoo.com",
        password: "password"

    })

    let onchange = (e) => {

        console.log(e.target.name)
        console.log(e.target.value)
        console.log(loginObject)

        setLoginObject({

            ...loginObject,
            [e.target.name]: e.target.value
        })
    }

    let onsubmit = (e) => {

        e.preventDefault()
        accountServices.login( loginObject)
            .then( (res) => {

                console.log("_______le token est")
                console.log(res)

                accountServices.saveToken(res.data.token) //récupération du token  dans la reponse et son enregistrement dans le localstorage
                navigate("/admin")
            })
            .catch((error) => console.log(error))
    }

    return (
        <div className='loginContainer'>
            
            <div className='loginbloc1'>
                <p className='loginbloc1__titre'>Bienvenue dans votre espace</p>
                <p className='loginbloc1__description'>Veillez saisir votre e-mail et mot de passe
                    pour accéder à votre espace.
                </p>

                <form onSubmit={onsubmit}>
                    <div className='groupe'>
                        <label className='email'>E-mail</label>
                        <input type='email' name='email' value={loginObject.email} onChange={onchange}/>
                    </div>

                    <div className='groupe'>
                    <label className='password'>Mot de passe</label>
                        <input type='password' name='password' value={loginObject.password} onChange={onchange}/>
                    </div>
                    <div className='groupe'>
                        <button className='coonnexionbtn'>Connexion</button>
                    </div>
                </form>
            </div>
            
            <div className='loginbloc2'>
                <div className='loginbloc2__Picture'>
                    <img src={ecole} alt='ecole' className='ecolePicture'/>
                </div>
                <p className='loginbloc2__description'>Gérez votre école à distance</p>
            </div>

        </div>
    );
};

export default Login;

