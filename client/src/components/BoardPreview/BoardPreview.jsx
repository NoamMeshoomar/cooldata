import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { removeBoard } from "../../actions/boardsActions";

import axios from "../../helpers/axios";

import "./BoardPreview.css";

const BoardPreview = ({board}) => {
    const [isHover, setIsHover] = useState(false);
    const [onX, setOnX] = useState(false);

    const dispatch = useDispatch();

    const handleRemoveBoard = () => {
        axios.delete(`/boards/${board._id}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        .then(() => dispatch(removeBoard(board._id)));
    }

    return(
        <Link 
            to={`/board/${board._id}`} 
            className="BoardPreview" 
            onMouseOver={() => setIsHover(true)} 
            onMouseLeave={() => setIsHover(false)}
            onClick={(e) => {
                if(onX) {
                    e.preventDefault();
                }
            }}
        >
            <span 
                className="close-btn" 
                style={isHover ? {display: "block"} : {}} 
                onClick={handleRemoveBoard}
                onMouseOver={() => setOnX(true)}
                onMouseLeave={() => setOnX(false)}
            >✖</span>
            <h3>{board.name}</h3>
        </Link>
    )
}

export default BoardPreview;