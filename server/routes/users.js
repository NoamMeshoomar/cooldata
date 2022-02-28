const express = require("express");

const router = express.Router();

const verifyToken = require("../middlewares/verifyToken");

const {
    register,
    login,
    authUser,
    refreshToken
} = require("../controllers/users");

router.post("/register", register);
router.post("/login", login);
router.get("/auth", verifyToken, authUser);
router.get("/refresh", refreshToken);

module.exports = router;