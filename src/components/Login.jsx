


import '../components/styles/Login.css';

import useForm from '../components/hooks/useForm';

import {AppContext} from "../components/AppContext.jsx";
import {useContext} from "react";

import {useNavigate} from "react-router-dom";
import {useLocation} from "react-router"

import useLogin from "../components/hooks/useLogin.js"




const Login = () => {
    
    const {handleLogin} = useLogin();
    const {login, setLogin, setShowNavbar} = useContext(AppContext);


    const user = useForm();
    const pass = useForm();
    const navigate = useNavigate();
    const location = useLocation();



    const onButtonLogin = () => {
        handleLogin(user.inputValue, pass.inputValue);
        navigate('/');
        setShowNavbar(true);

    }








    
    return (
        <div className="login">
            <div className="login-container">
                <div className="login-form">
                    <h2>Login</h2>
                        <input 
                            type="text" 
                            placeholder="Nombre de Usuario"
                            onChange={(e) => user.handleChangeInput(e)}
                            value={user.inputValue}
                            required 
                            />
                        <input 
                            type="password" 
                            placeholder="Contraseña" 
                            onChange={(e) => pass.handleChangeInput(e)}
                            value={pass.inputValue}
                            required 
                            />
                        <button onClick={onButtonLogin}>Login</button>
                </div>
            </div>
    
        </div>
    )
}

export default Login










