const mongoose = require("mongoose");

const listsSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    boardId: {type: mongoose.Types.ObjectId, ref: "boards", required: true}
});

module.exports = mongoose.model("lists", listsSchema);