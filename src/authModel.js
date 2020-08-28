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

export function login(login, password) {
    const userData = {
        login: login,
        password: password
    }
    const loginResponsePromise = fetchPostRequest("POST", logHandler, userData)
    // const cookieResponsePromise = fetchPostRequest("POST", cookieHandler, userData)
    loginResponsePromise.then((response) => {
        if (response.status === 200) loginPageModelInstance.setLoginStatus(true)
        return response.status
    })
}


