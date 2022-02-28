import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { loginSuccessful } from "../../actions/userActions";

import axios from "../../helpers/axios";

import Logo from "../../components/Logo/Logo";
import Loading from "../../components/LoadingScreen/LoadingScreen";

import "./Register.css";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigator = useNavigate();

    const dispatch = useDispatch();

    const handleRegister = async (e) => {
        e.preventDefault();

        if(!username || !email || !password) {
            return setError("Please fill the fields.");
        }

        setLoading(true);

        try {
            const response = await axios.post("/users/register", {
                username,
                email,
                password
            });
            const {user, token, refreshToken} = response.data.result;

            localStorage.setItem("token", token);
            localStorage.setItem("refreshToken", refreshToken);
            dispatch(loginSuccessful(user));
            setLoading(false);
            navigator("/");
        } catch (err) {
            setLoading(false);
            setError(err.response.data.error);
        }
    }

    return(
        <>
            {loading && <Loading />}
            <div className="Register">
                <Logo showText={true} fontSize={32} imageSize={38} />
                <form onSubmit={handleRegister}>
                    <input type="text" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                    <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">SIGN UP</button>
                    {error && <p className="error">{error}</p>}
                    <div className="links">
                        <Link to="/login">Have an account?</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register;