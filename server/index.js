const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
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

app.get("/", (req, res) => res.send("Hello World"));

app.use(`${baseURL}/users`, usersRoute);
app.use(`${baseURL}/boards`, boardsRoute);
app.use(`${baseURL}/lists`, listsRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));