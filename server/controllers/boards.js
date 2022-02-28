const Boards = require("../models/Boards");
const Lists = require("../models/Lists");

module.exports = {
    createBoard: async (req, res) => {
        const {name} = req.body;
        const {id} = req.user;

        try {
            if(!name || typeof name !== "string" || !name.match(/[A-Za-z0-9]/g)) {
                throw "Board name is required.";
            }

            if(name.length < 3 || name.length > 20) {
                throw "Board name must be 3-20 characters.";
            }

            const newBoard = new Boards({
                name,
                userId: id
            });

            await newBoard.save();

            res.status(200).json({result: newBoard});
        } catch (err) {
            res.status(400).json({error: err});
        }
    },
    getBoards: async (req, res) => {
        const {id} = req.user;
        const boards = await Boards.find({userId: id}, "name createdAt updatedAt");

        res.status(200).json({result: boards});
    },
    getBoard: async (req, res) => {
        const {boardId} = req.params;
        const {id} = req.user;

        try {
            const board = await Boards.findById({_id: boardId, userId: id}, "-userId").lean();
            const lists = [];
            
            if(!board) {
                throw "Board is not exist.";
            }

            for(let i = 0; i < board.listsOrder.length; i++) {
                const list = await Lists.findById(board.listsOrder[i]);
                lists.push(list);
            }
            
            delete board.listsOrder;
            board.lists = lists;

            res.status(200).json({
                result: board
            });
        } catch (err) {
            res.status(404).json({error: err});
        }
    },
    removeBoard: async (req, res) => {
        const {boardId} = req.params;
        const {id} = req.user;

        try {
            const board = await Boards.findOneAndDelete({_id: boardId, userId: id});

            for(let i = 0; i < board.listsOrder.length; i++) {
                await Lists.findByIdAndDelete(board.listsOrder[i]);
            }

            res.status(200).json({result: "Removed successfully"});
        } catch (err) {
            res.status(400).json({error: err});
        }
    }
}