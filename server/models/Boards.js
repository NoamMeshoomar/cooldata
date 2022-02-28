const mongoose = require("mongoose");

const boardsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    userId: {type: mongoose.Types.ObjectId, ref: "users", required: true},
    listsOrder: {type: [String], default: []}
}, {timestamps: true});

module.exports = mongoose.model("boards", boardsSchema);