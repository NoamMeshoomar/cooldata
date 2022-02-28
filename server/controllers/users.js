const sha256 = require("js-sha256");
const jwt = require("jsonwebtoken");
const randtoken = require("rand-token");

const Users = require("../models/Users");

const refreshTokens = {}

module.exports = {
    register: async (req, res) => {
        const {username, email, password} = req.body;

        try {
            const userExist = await Users.findOne({$or: [{username}, {email}]});
    
            if(userExist) {
                throw "Username or email is already exist.";
            }

            if(!username || typeof username !== "string" || !username.match(/[A-Za-z0-9]/g)) {
                throw "Enter a valid username.";
            }

            if(username.length < 3 || username.length > 10) {
                throw "Username must be 3-10 characters."
            }

            if(!email || typeof email !== "string" || !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
                throw "Enter a valid Email.";
            }

            if(!password || typeof password !== "string") {
                throw "Enter a valid password.";
            }

            const newUser = new Users({
                username,
                email,
                password: sha256(password)
            });

            await newUser.save();

            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: "1h"});
            const refreshToken = randtoken.uid(256);
            refreshTokens[refreshToken] = newUser._id;

            res.status(200).json({
                result: {
                    user: {
                        id: newUser._id,
                        username,
                        email
                    },
                    token,
                    refreshToken
                }
            });
        } catch (err) {
            res.status(400).json({error: err});
        }
    },
    login: async (req, res) => {
        const {user, password} = req.body;

        try {
            const userExist = await Users.findOne({
                $or: [
                    {username: {$regex: new RegExp(`^${user}$`, "i")}, password: sha256(password)}, 
                    {email: {$regex: new RegExp(`^${user}$`, "i")}, password: sha256(password)}
                ]
            });

            if(!userExist) {
                throw "Username or password are incorrect.";
            }

            const token = jwt.sign({id: userExist._id}, process.env.JWT_SECRET, {expiresIn: "1h"});
            const refreshToken = randtoken.uid(256);
            refreshTokens[refreshToken] = userExist._id;

            res.status(200).json({
                result: {
                    user: {
                        id: userExist._id,
                        username: userExist.username,
                        email: userExist.email
                    },
                    token,
                    refreshToken
                }
            });
        } catch (err) {
            res.status(400).json({error: err});
        }
    },
    authUser: async (req, res) => {
        const {id} = req.user;
        const user = await Users.findById(id);
        res.status(200).json({
            result: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }
            }
        });
    },
    refreshToken: (req, res) => {
        const refreshToken = req.headers.refreshToken;

        if(refreshToken && refreshTokens[refreshToken]) {
            const token = jwt.sign({id: userExist._id}, process.env.JWT_SECRET, {expiresIn: "1h"});

            res.status(200).json({
                token
            });
        }
    }
}