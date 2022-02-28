import React from "react";

import LoadingSpinPNG from "../../assets/loading-spin.png";

import "./LoadingSpin.css";

const LoadingSpin = ({imageSize}) => {
    return(
        <div className="LoadingSpin">
            <img src={LoadingSpinPNG} width={imageSize} alt="loading-spin" />
        </div>
    )
}

export default LoadingSpin;