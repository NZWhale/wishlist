import { createDiv, createInput } from "./htmlUtils"
import { clearRegTextArea } from "./authHtmlUtils"
import { login, createNewUser } from "./authModel"

export const renderLoginLayout = (parentElement, loginPageModelInstance, userModelInstance) => {
    parentElement.innerHTML = ""
    const authDiv = createDiv("authDiv", "authDiv")
    const loginArea = createInput("input", "enter login", "loginArea", "loginArea")
    const passwordArea = createInput("password", "enter password", "passwordArea", "passwordArea")
    const userNameArea = createInput("input", "enter username", "userNameArea", "userNameArea")
    const DoBArea = createInput("date", "enter your birthday", "DoBArea", "DoBArea")
    const loginButton = createInput("button", "Log In", "loginButton", "loginButton")
    loginButton.setAttribute("value", "LogIn")
    loginButton.addEventListener("click", function (e) {
        const loginArea = document.getElementById("loginArea").value
        const passwordArea = document.getElementById("passwordArea").value
        if (e.keyCode === 13) {
            if (!loginArea) {
                alert("enter login")
            } else {
                if (!passwordArea) {
                    alert("enter password")
                } else {
                    login(loginArea, passwordArea, loginPageModelInstance, userModelInstance)
                }
            }
        } else {
            login(loginArea, passwordArea, loginPageModelInstance, userModelInstance)
        }
    })
    const regButton = createInput("button", "Registration", "regButton", "regButton")
    regButton.setAttribute("value", "Registation")
    regButton.addEventListener("click", function (e) {
        authDiv.innerHTML = ""
        const compliteRegButton = createInput("button", "complite registration", "compliteRegButton", "compliteRegButton")
        const backButton = createInput("button", "back", "backButton", "backButton")
        backButton.setAttribute("value", "back")
        compliteRegButton.setAttribute("value", "DONE")
        compliteRegButton.addEventListener("click", function () {
            const loginArea = document.getElementById("loginArea").value
            const passwordArea = document.getElementById("passwordArea").value
            const userNameArea = document.getElementById("userNameArea").value
            const DoBArea = document.getElementById("DoBArea").value
            if (e.keyCode === 13) {
                if (!loginArea) {
                    alert("enter login")
                } else {
                    if (!passwordArea) {
                        alert("enter password")
                    } else {
                        if (!userNameArea) {
                            alert("enter username")
                        } else {
                            if (!DoBArea) {
                                alert("enter your birthday")
                            } else {
                                createNewUser(loginArea, passwordArea, userNameArea, DoBArea, userModelInstance, loginPageModelInstance)
                                userModelInstance.setDayOfBirthday(DoBArea)
                                userModelInstance.setUserName(userNameArea)
                                // clearRegTextArea()
                            }
                        }
                    }
                }
            } else {
                createNewUser(loginArea, passwordArea, userNameArea, DoBArea, userModelInstance, loginPageModelInstance)
                userModelInstance.setDayOfBirthday(DoBArea)
                userModelInstance.setUserName(userNameArea)
                // clearRegTextArea()
            }
        })
        authDiv.append(loginArea, passwordArea, userNameArea, DoBArea, compliteRegButton, backButton)
        parentElement.append(authDiv)
    })
    authDiv.append(loginArea, passwordArea, loginButton, regButton)
    parentElement.append(authDiv)
}