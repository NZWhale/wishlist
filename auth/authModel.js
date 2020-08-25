import { fetchPostRequest, logHandler, regHandler } from "./authUtils"

export const createNewUser = (login, password, userName, DoB) => {
    const newUser = {
        login: login,
        password: password,
        userName: userName,
        DoB: DoB
    }
    fetchPostRequest("POST", regHandler, newUser)
}

export function userValidationCheck(login, password) {
    const userData = {
        login: login,
        password: password
    }
    fetchPostRequest("POST", logHandler, userData)
}