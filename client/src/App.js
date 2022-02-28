import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { loginSuccessful } from "./actions/userActions";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Board from "./pages/Board/Board";
import Home from "./pages/Home/Home";

import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import NavBar from "./components/NavBar/NavBar";

import axios from "./helpers/axios";

import './App.css';

const App = () => {
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const navigator = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("token") || "";

        if(token || token === "") {
            axios.get("/users/auth", {
                headers: {
                    token
                }
            })
            .then(res => {
                dispatch(loginSuccessful(res.data.result.user));
                navigator("/");
                setLoading(false);
            })
            .catch(() => {
                navigator("/login");
                setLoading(false);
            });
        }
    }, []);

    return (
        <div className="App">
            {loading ? <LoadingScreen /> : <>
                {location.pathname !== "/login" && location.pathname !== "/register" && <NavBar />}
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/board/:id" element={<Board />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </>}
        </div>
    );
}

export default App;