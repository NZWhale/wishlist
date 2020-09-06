import { fetchPostRequest, logHandler, regHandler } from "./authUtils"

export const createNewUser = (login, password, userName, DoB, userModelInstance, loginPageModelInstance) => {
    const newUser = {
        login: login,
        password: password,
        userName: userName,
        DoB: DoB
    }
    const registrationResponsePromise = fetchPostRequest("POST", regHandler, newUser)
    // const cookieResponsePromise = fetchPostRequest("POST", cookieHandler, userData)
    registrationResponsePromise.then((response) => {
        if (!response.status) {
            userModelInstance.setUserName(response.userName)
            userModelInstance.setDayOfBirthday(response.DoB)
            loginPageModelInstance.setLoginStatus(true)
            return response
        }
    })
}

export function login(login, password, loginPageModelInstance, userModelInstance) {
    const userData = {
        login: login,
        password: password
    }
    const loginResponsePromise = fetchPostRequest("POST", logHandler, userData)
    // const cookieResponsePromise = fetchPostRequest("POST", cookieHandler, userData)
    loginResponsePromise.then((response) => {
        if (!response.status) {
            userModelInstance.setUserName(response.userName)
            userModelInstance.setDayOfBirthday(response.DoB)
            loginPageModelInstance.setLoginStatus(true)
            return response
        }
    })
}


