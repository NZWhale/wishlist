import { createDiv, createInput } from "../src/htmlUtils"
import { createNewUser } from "./authModel"
import { enterPressForReg, enterPressForLogin } from "./authHtmlUtils"
import { backendURL } from "./authUtils"

export const renderLoginLayout = (parentElement) => {
    const authDiv = createDiv("authDiv", "authDiv")
    const loginArea = createInput("input", "enter login", "loginArea", "loginArea")
    const passwordArea = createInput("input", "enter password", "passwordArea", "passwordArea")
    const userNameArea = createInput("input", "enter username", "userNameArea", "userNameArea")
    const DoBArea = createInput("input", "enter your birthday", "DoBArea", "DoBArea")
    const loginButton = createInput("button", "Log In", "loginButton", "loginButton")
    loginButton.setAttribute("value", "LogIn")
    loginButton.addEventListener("click", enterPressForLogin)
    const regButton = createInput("button", "Registration", "regButton", "regButton")
    regButton.setAttribute("value", "Registation")
    regButton.addEventListener("click", function(e) {
        authDiv.innerHTML = ""
        const compliteRegButton = createInput("button", "complite registration", "compliteRegButton", "compliteRegButton")
        const backButton = createInput("button", "back", "backButton", "backButton")
        backButton.setAttribute("value", "back")
        compliteRegButton.setAttribute("value", "DONE")
        compliteRegButton.addEventListener("click", enterPressForReg)
        authDiv.append(loginArea, passwordArea, userNameArea, DoBArea, compliteRegButton, backButton)
        parentElement.append(authDiv)
    })
    authDiv.append(loginArea, passwordArea, loginButton, regButton)
    parentElement.append(authDiv)

}