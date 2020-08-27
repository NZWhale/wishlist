import { createDiv, createInput } from "./htmlUtils"
import { enterPressForReg, enterPressForLogin } from "./authHtmlUtils"
import { login } from "./authModel"

export const renderLoginLayout = (parentElement, loginPageModelInstance) => {
    const authDiv = createDiv("authDiv", "authDiv")
    const loginArea = createInput("input", "enter login", "loginArea", "loginArea")
    const passwordArea = createInput("input", "enter password", "passwordArea", "passwordArea")
    const userNameArea = createInput("input", "enter username", "userNameArea", "userNameArea")
    const DoBArea = createInput("input", "enter your birthday", "DoBArea", "DoBArea")
    const loginButton = createInput("button", "Log In", "loginButton", "loginButton")
    loginButton.setAttribute("value", "LogIn")
    loginButton.addEventListener("click", function(e){
        const loginArea = document.getElementById("loginArea").value
        const passwordArea = document.getElementById("passwordArea").value
        if (e.keyCode == 13) {
            if (!loginArea) {
                alert("enter login")
            } else {
                if (!passwordArea) {
                    alert("enter password")
                } else {
                    login(loginArea, passwordArea, loginPageModelInstance)
                    // loginPageModelInstance.setLoginStatus(true)
                }
            }
        } else {
            login(loginArea, passwordArea, loginPageModelInstance)
            // loginPageModelInstance.setLoginStatus(true)
        }
    })
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