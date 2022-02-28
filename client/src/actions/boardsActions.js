export const addBoard = (payload) => {
    return {
        type: "ADD_BOARD",
        payload
    }
}

export const removeBoard = (payload) => {
    return {
        type: "REMOVE_BOARD",
        payload
    }
}

export const setBoards = (payload) => {
    return {
        type: "SET_BOARDS",
        payload
    }
}

export const setActiveBoard = (payload) => {
    return {
        type: "SET_ACTIVE_BOARD",
        payload
    }
}

export const clearBoards = () => {
    return {
        type: "CLEAR_BOARDS"
    }
}