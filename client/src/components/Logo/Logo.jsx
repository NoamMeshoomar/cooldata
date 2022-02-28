import React from "react";

import LogoSVG from "../../assets/logo.svg";

import "./Logo.css";

const Logo = ({showText, fontSize, imageSize}) => {
    return (
        <div className="Logo">
            <img width={imageSize} src={LogoSVG} alt="" />
            {showText && <h1 style={{fontSize, marginLeft: 5}}>Cool<span>Data</span></h1>}
        </div>
    )
}

export default Logo;