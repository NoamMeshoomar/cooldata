const Lists = require("../models/Lists");
const Boards = require("../models/Boards");

module.exports = {
    createList: async (req, res) => {
        const {id} = req.user;
        const {boardId} = req.params;
        const {name} = req.body;
        
        try {
            const board = await Boards.findOne({_id: boardId, userId: id});
            const list = await Lists.findOne({name});

            if(!board) {
                throw "List cannot be created in a not existing board.";
            }

            if(!name || typeof name !== "string" || !name.match(/[A-Za-z0-9]/g)) {
                throw "List name is required.";
            }

            if(name.length < 3 || name.length > 20) {
                throw "List name must be 3-20 characters.";
            }

            if(list) {
                throw "List with this name is already exist.";
            }

            const newList = new Lists({
                name,
                boardId
            });

            await newList.save();

            board.listsOrder.push(newList._id);

            await Boards.findByIdAndUpdate(boardId, {listsOrder: board.listsOrder});

            res.status(200).json({result: newList});
        } catch (err) {
            res.status(400).json({error: err});
        }
    },
    changeListOrder: async (req, res) => {
        const {boardId, listId} = req.params;
        const {toPlace} = req.body;

        try {
            const board = await Boards.findById(boardId);

            if(!board.listsOrder.includes(listId)) {
                return res.status(404).json({error: "List is not exist."});
            }

            if(board.listsOrder[toPlace] === listId) {
                throw "Cannot move list to the same place."
            }

            const listIndex = board.listsOrder.indexOf(listId);

            board.listsOrder.splice(listIndex, 1);
            board.listsOrder.splice(toPlace, 0, listId);

            await Boards.findByIdAndUpdate(boardId, {listsOrder: board.listsOrder});

            res.status(200).json({result: "Success!"});
        } catch (err) {
            res.status(400).json({error: err});
        }
    },
    removeList: async (req, res) => {
        const {boardId, listId} = req.params;
        const {id} = req.user;

        try {
            const board = await Boards.findOne({_id: boardId, userId: id}).lean();
    
            if(!board || !board.listsOrder.includes(listId)) {
                throw "Error occurred";
            }
            
            await Lists.findByIdAndDelete(listId);

            const listIndex = board.listsOrder.indexOf(listId);
            board.listsOrder.splice(listIndex, 1);

            await Boards.findByIdAndUpdate(boardId, {listsOrder: board.listsOrder});
            
            res.status(200).json({result: "Removed successfully!"});
        } catch (err) {
            res.status(400).json({error: err})
        }
    }
}