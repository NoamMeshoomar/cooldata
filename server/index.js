const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const usersRoute = require("./routes/users");
const boardsRoute = require("./routes/boards");
const listsRoute = require("./routes/lists");

mongoose.connect("mongodb+srv://admin:Arvnaunr7823@rowdata.tggxw.mongodb.net/RowData?retryWrites=true&w=majority", () => {
    console.log("Connected to MongoDB");
});

const baseURL = "/api";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
    const response = await axios.get("https://www.instagram.com/oauth/authorize/?client_id=1299311833980376&redirect_uri=https://cooldata-git-main-noammeshoomar-gmailcom.vercel.app/redirect&scope=user_profile,user_media&response_type=token", () => {

    }, {});
    console.log(response);
    res.status(200).send(response);
});

app.use(`${baseURL}/users`, usersRoute);
app.use(`${baseURL}/boards`, boardsRoute);
app.use(`${baseURL}/lists`, listsRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));