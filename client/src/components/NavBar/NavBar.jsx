import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import { logout } from "../../actions/userActions";
import { clearBoards } from "../../actions/boardsActions";

import Logo from "../Logo/Logo";

import "./NavBar.css";

const NavBar = () => {
    const [showMenu, setShowMenu] = useState(false);

    const dispatch = useDispatch();
    const navigator = useNavigate();

    const handleLogout = () => {
        dispatch(clearBoards());
        dispatch(logout());
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        navigator("/login");
    }

    return(
        <div className="NavBar">
            <div className="burger" onClick={() => setShowMenu(prev => !prev)}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
            <div className={showMenu ? "menu active" : "menu"}>
                <ul className="nav-links">
                    <button className="logout" onClick={handleLogout}><FontAwesomeIcon style={{marginRight: 10}} icon={faArrowRightFromBracket} />LOGOUT</button>
                </ul>
            </div>
            <Link to="/" style={{textDecoration: "none"}}>
                <Logo showText={true} imageSize={30} fontSize={30} />
            </Link>
        </div>
    )
}

export default NavBar;