export const loginSuccessful = (data) => {
    return {
        type: "LOGIN_SUCCESSFUL",
        payload: data
    }
}

export const logout = () => {
    return {
        type: "LOGOUT"
    }
}