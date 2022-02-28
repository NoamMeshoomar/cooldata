import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setActiveBoard } from "../../actions/boardsActions";

import axios from "../../helpers/axios";

import "./Board.css";

const Board = () => {
    const {id} = useParams();

    const {activeBoard} = useSelector(state => state.boards);

    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`/boards/${id}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        .then(res => {
            dispatch(setActiveBoard(res.data.result));
        })
        .catch(err => console.error(err.response));

        return () => dispatch(setActiveBoard(null));
    }, []);

    return(
        <div className="Board">
            <h1 className="board-name">{activeBoard?.name}</h1>
        </div>
    )
}

export default Board;