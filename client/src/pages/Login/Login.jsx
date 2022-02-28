import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { loginSuccessful } from "../../actions/userActions";

import axios from "../../helpers/axios";

import Logo from "../../components/Logo/Logo";
import Loading from "../../components/LoadingScreen/LoadingScreen";

import "./Login.css";

const Login = () => {
    const [userInput, setUserInput] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigator = useNavigate();
    
    const handleLogin = async (e) => {
        e.preventDefault();
        
        if(!userInput || !password) {
            return setError("Please fill the fields.");
        }

        setLoading(true);

        try {
            const response = await axios.post("/users/login", {
                user: userInput,
                password
            });
            const {user, token, refreshToken} = response.data.result;
            localStorage.setItem("token", token);
            localStorage.setItem("refreshToken", refreshToken);
            dispatch(loginSuccessful(user));
            setLoading(false);
            navigator("/");
        } catch (err) {
            setError(err.response.data.error);
            setLoading(false);
        }
    }

    const setImmediateLogin = () => {
        setUserInput("test");
        setPassword("1qaz2wsx");
    }

    return(
        <>
            {loading && <Loading />}
            <div className="Login">
                <Logo showText={true} fontSize={32} imageSize={38} />
                <form onSubmit={handleLogin}>
                    <input type="text" value={userInput} placeholder="Email / Username" onChange={(e) => setUserInput(e.target.value)} />
                    <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">SIGN IN</button>
                    <button onClick={setImmediateLogin}>SIGN IN IMMEDIATE</button>
                    <p className="error">{error}</p>
                    <div className="links">
                        <Link to="/reset">Forget your password?</Link>
                        <Link to="/register">Need an account?</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;