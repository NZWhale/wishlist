import { createNewUser, userValidationCheck } from "./authModel"

const clearRegTextArea = () => {
    let loginArea = document.getElementById("loginArea").value
    let passwordArea = document.getElementById("passwordArea").value
    let userNameArea = document.getElementById("userNameArea").value
    let DoBArea = document.getElementById("DoBArea").value
    if (loginArea) {
        loginArea = ""
    }
    if (passwordArea) {
        passwordArea = ""
    }
    if (userNameArea) {
        userNameArea = ""
    }
    if (DoBArea) {
        DoBArea = ""
    }
}

const clearLogTextArea = () => {
    let loginArea = document.getElementById("loginArea").value
    let passwordArea = document.getElementById("passwordArea").value
    if (loginArea) {
        loginArea = ""
    }
    if (passwordArea) {
        passwordArea = ""
    }
}

export const enterPressForLogin = (e) => {
    const loginArea = document.getElementById("loginArea").value
    const passwordArea = document.getElementById("passwordArea").value
    if (e.keyCode == 13) {
        if (!loginArea) {
            alert("enter login")
        } else {
            if (!passwordArea) {
                alert("enter password")
            } else {
                userValidationCheck(loginArea, passwordArea)
                clearLogTextArea()
            }
        }
    } else {
        userValidationCheck(loginArea, passwordArea)
        clearLogTextArea()
    }
}

export const enterPressForReg = (e) => {
    const loginArea = document.getElementById("loginArea").value
    const passwordArea = document.getElementById("passwordArea").value
    const userNameArea = document.getElementById("userNameArea").value
    const DoBArea = document.getElementById("DoBArea").value
    if (e.keyCode == 13) {
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
                        createNewUser(loginArea, passwordArea, userNameArea, DoBArea)
                        clearRegTextArea()
                    }
                }
            }
        }
    } else {
        createNewUser(loginArea, passwordArea, userNameArea, DoBArea)
        clearRegTextArea()
    }
}
