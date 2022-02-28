const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers.token;
    if(!token) {
        res.status(400).json({error: "There is a problem. Try to sign in at first."})
    } else {
        try {
            const {payload} = jwt.verify(token, process.env.JWT_SECRET, {complete: true});
            req.user = payload;
            next();
        } catch (err) {
            res.status(401).json({error: "Unauthorized. Try to sign in again!"})
        }
    }
}

module.exports = verifyToken;