const express = require("express");

const router = express.Router();

const verifyToken = require("../middlewares/verifyToken");

const {
    createList,
    changeListOrder,
    removeList
} = require("../controllers/lists");

router.post("/:boardId", verifyToken, createList);
router.put("/order/:boardId/:listId", verifyToken, changeListOrder);
router.delete("/:boardId/:listId", verifyToken, removeList);

module.exports = router;