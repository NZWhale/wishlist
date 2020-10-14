import { fetchPostRequest, logHandler, regHandler } from "./authUtils"
import UserModel from "./UserModel"
import LoginPageModel from "./LoginPageModel"

export const createNewUser = (login, password, userName, DoB, userModelInstance, loginPageModelInstance) => {
    const newUser = {
        login: login,
        password: password,
        userName: userName,
        DoB: DoB
    }
    const registrationResponsePromise = fetchPostRequest("POST", regHandler, newUser)
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
    loginResponsePromise.then((response) => {
        if (!response.status) {
            userModelInstance.setUserName(response.userName)
            userModelInstance.setDayOfBirthday(response.DoB)
            loginPageModelInstance.setLoginStatus(true)
            return response
        }
    })
}


