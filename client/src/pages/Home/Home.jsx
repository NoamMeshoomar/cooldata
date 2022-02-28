import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../../actions/userActions";
import { setBoards, addBoard } from "../../actions/boardsActions";

import LoadingSpin from "../../components/LoadingSpin/LoadingSpin";
import BoardPreview from "../../components/BoardPreview/BoardPreview";
import Modal from "../../components/Modal/Modal";

import axios from "../../helpers/axios";

import "./Home.css";

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [formLoading, setFormLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [boardName, setBoardName] = useState("");
    const [error, setError] = useState("");

    const {user, isLogged} = useSelector(state => state.user);
    const {boards} = useSelector(state => state.boards);

    const navigator = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if(isLogged) {
            axios.get("/boards/boards", {
                headers: {
                    token
                }
            })
            .then(res => {
                dispatch(setBoards(res.data.result));
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                dispatch(logout());
            });
        } else {
            navigator("/login");
        }
    }, [isLogged, navigator]);

    const handleAddBoard = async (e) => {
        e.preventDefault();
        setFormLoading(true);

        if(boardName.length < 3 || boardName.length > 20) {
            setFormLoading(false);
            setError("Board name must be 3-20 characters.");
            return;
        }

        try {
            const response = await axios.post("/boards/create", {
                name: boardName
            }, {
                headers: {
                    token: localStorage.getItem("token")
                }
            });

            dispatch(addBoard(response.data.result));
            setOpenModal(false);
            setFormLoading(false);
            setBoardName("");
        } catch (err) {
            setError(err.response.data.error);
            setFormLoading(false);
        }
    }

    const handleCloseModal = () => {
        setError("");
        setBoardName("");
        setOpenModal(false);
    }

    return(
        <div className="Home">
            <h1 className="title">Welcome <span>{user?.username}</span>!</h1>
            {loading ? <LoadingSpin imageSize={84} /> : <div className="boards">
                {boards.map(board => {
                    return <BoardPreview key={board._id} board={board} />
                })}
                <button className="add-board" onClick={() => setOpenModal(true)}><span>+</span> Add a board</button>
            </div>}
            {openModal && <Modal closeFunction={handleCloseModal}>
                <form className="add-board-form" onSubmit={handleAddBoard}>
                    <h3>Enter your board name!</h3>
                    <input type="text" value={boardName} placeholder="Board name" onChange={(e) => setBoardName(e.target.value)} />
                    <button type="submit" style={formLoading ? {opacity: .5} : {}} disabled={formLoading ? true : false}>Add board</button>
                </form>
                <p className="error" style={{textAlign: "center"}}>{error}</p>
            </Modal>}
        </div>
    )
}

export default Home;