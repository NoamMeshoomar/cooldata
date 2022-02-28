import React from "react";

import Logo from "../Logo/Logo";

import "./LoadingScreen.css";

const LoadingScreen = () => {
    return(
        <div className="LoadingScreen">
            <Logo showText={false} imageSize={100} />
        </div>
    )
}

export default LoadingScreen;