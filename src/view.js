import { createDiv, createInput, createWishElement, clearTextArea } from "./htmlUtils"
import { createNewWish } from "./model"

export const renderLayout = (parentElement, userName, wishList) => {
    parentElement.innerHTML = ""
    const userDiv = createDiv("userDiv", "userDiv")
    const otherUsersDiv = createDiv("otherUsersDiv", "otherUsersDiv")
    const userNameDiv = createDiv("userNameDiv", "userNameDiv")
    userNameDiv.innerHTML = userName
    const wishesDiv = createDiv("wishesDiv", "wishesDiv")
    const utilsDiv = createDiv("utilsDiv", "utilsDiv")
    const buttonDiv = createDiv("buttonDiv", "buttonDiv")
    const addButton = createInput("button", "addButton", "addButton")
    addButton.setAttribute("value", "add")
    addButton.addEventListener("click", function (e) {
        if (e.keyCode == 13) {
            const titleArea = document.getElementById("titleArea").value
            const bodyArea = document.getElementById("bodyArea").value
            const urlArea = document.getElementById("urlArea").value
            if (!titleArea) {
                alert("enter title")
            } else {
                if (!bodyArea) {
                    alert("enter body")
                } else {
                    if (!urlArea) {
                        alert("enter url")
                    } else {
                        createNewWish(titleArea, bodyArea, urlArea, userName, wishList)
                        renderWishes(wishList)
                        clearTextArea()
                    }
                }
            }
        }
    })
    const titleArea = createInput("input", "enter wish title", "titleArea", "titleArea")
    titleArea.addEventListener("keypress", function (e) {
        if (e.keyCode == 13) {
            const titleArea = document.getElementById("titleArea").value
            const bodyArea = document.getElementById("bodyArea").value
            const urlArea = document.getElementById("urlArea").value
            if (!titleArea) {
                alert("enter title")
            } else {
                if (!bodyArea) {
                    alert("enter body")
                } else {
                    if (!urlArea) {
                        alert("enter url")
                    } else {
                        createNewWish(titleArea, bodyArea, urlArea, userName, wishList)
                        renderWishes(wishList)
                        clearTextArea()
                    }
                }
            }
        }
    })
    const bodyArea = createInput("input", "enter wish body", "bodyArea", "bodyArea")
    bodyArea.addEventListener("keypress", function (e) {
        if (e.keyCode == 13) {
            const titleArea = document.getElementById("titleArea").value
            const bodyArea = document.getElementById("bodyArea").value
            const urlArea = document.getElementById("urlArea").value
            if (!titleArea) {
                alert("enter title")
            } else {
                if (!bodyArea) {
                    alert("enter body")
                } else {
                    if (!urlArea) {
                        alert("enter url")
                    } else {
                        createNewWish(titleArea, bodyArea, urlArea, userName, wishList)
                        renderWishes(wishList)
                        clearTextArea()
                    }
                }
            }
        }
    })
    const urlArea = createInput("input", "enter wish url", "urlArea", "urlArea")
    urlArea.addEventListener("keypress", function (e) {
        if (e.keyCode == 13) {
            const titleArea = document.getElementById("titleArea").value
            const bodyArea = document.getElementById("bodyArea").value
            const urlArea = document.getElementById("urlArea").value
            if (!titleArea) {
                alert("enter title")
            } else {
                if (!bodyArea) {
                    alert("enter body")
                } else {
                    if (!urlArea) {
                        alert("enter url")
                    } else {
                        createNewWish(titleArea, bodyArea, urlArea, userName, wishList)
                        renderWishes(wishList, userName)
                        clearTextArea()
                    }
                }
            }
        }
    })
    parentElement.append(userDiv)
    parentElement.append(otherUsersDiv)
    userDiv.append(utilsDiv)
    userDiv.append(wishesDiv)
    userDiv.append(userNameDiv)
    utilsDiv.append(titleArea)
    utilsDiv.append(bodyArea)
    utilsDiv.append(urlArea)
    utilsDiv.append(buttonDiv)
    buttonDiv.append(addButton)
}

export const renderWishes = (wishList, userName) => {
    const wishesDiv = document.getElementById("wishesDiv")
    const otherUsersDiv = document.getElementById("otherUsersDiv")
    wishesDiv.innerHTML = ""
    otherUsersDiv.innerHTML = ""
    if (wishList) {
        wishList.forEach((wish, index) => {
            const singleWish = createWishElement(wish, index)
            if (wish.userName === userName) {
                wishesDiv.append(singleWish)
            } else {
                otherUsersDiv.append(singleWish)
            }
        });
    }
}