const express = require("express");

const router = express.Router();

const verifyToken = require("../middlewares/verifyToken");

const {
    createBoard,
    getBoard,
    getBoards,
    removeBoard
} = require("../controllers/boards");

router.post("/create", verifyToken, createBoard);
router.get("/boards", verifyToken, getBoards);
router.get("/:boardId", verifyToken, getBoard);
router.delete("/:boardId", verifyToken, removeBoard);

module.exports = router;