const INITIAL_STATE = {
    boards: [],
    activeBoard: null
}

const boardsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "ADD_BOARD":
            return {...state, boards: [...state.boards, action.payload]}
        case "REMOVE_BOARD":
            return {...state, boards: [...state.boards.filter(board => board._id !== action.payload)]}
        case "SET_BOARDS":
            return {...state, boards: action.payload}
        case "SET_ACTIVE_BOARD":
            return {...state, activeBoard: action.payload}
        case "CLEAR_BOARDS":
            return {...INITIAL_STATE}
        default:
            return state;
    }
}

export default boardsReducer;