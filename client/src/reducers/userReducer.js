const INITIAL_STATE = {
    isLogged: false,
    user: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "LOGIN_SUCCESSFUL":
            return {...state, isLogged: true, user: action.payload}
        case "LOGOUT":
            return {...state, isLogged: false, user: null}
        default:
            return state;
    }
}

export default userReducer;