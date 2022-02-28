import React from "react";

import "./Modal.css";

const Modal = ({children, closeFunction}) => {
    return(
        <div className="Modal">
            <div className="modal-container">
                <span className="close-btn" onClick={closeFunction}>✖</span>
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal;