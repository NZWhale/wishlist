import { createDiv, createInput, createWishElement, enterPress, } from "./htmlUtils"

export const renderLayout = (parentElement) => {
    const userDiv = createDiv("userDiv", "userDiv")
    const wishesDiv = createDiv("wishesDiv", "wishesDiv")
    const utilsDiv = createDiv("utilsDiv", "utilsDiv")
    const addButton = createInput("button", "addButton", "addButton")
    addButton.setAttribute("value", "add")
    const deleteButton = createInput("button", "deleteButton", "deleteButton")
    deleteButton.setAttribute("value", "delete")
    const titleArea = createInput("input", "enter wish title", "titleArea", "titleArea")
    titleArea.addEventListener("keypress", enterPress)
    const bodyArea = createInput("input", "enter wish body","bodyArea", "bodyArea")
    bodyArea.addEventListener("keypress", enterPress)
    const urlArea = createInput("input", "enter wish url","urlArea", "urlArea")
    urlArea.addEventListener("keypress", enterPress)
    parentElement.append(userDiv)
    userDiv.append(utilsDiv)
    userDiv.append(wishesDiv)
    utilsDiv.append(titleArea)
    utilsDiv.append(bodyArea)
    utilsDiv.append(urlArea)
    utilsDiv.append(addButton)
    utilsDiv.append(deleteButton)
}

export const renderWishes = (wishList) => {
    const wishesDiv = document.getElementById("wishesDiv")
    wishesDiv.innerHTML = ""
    if (wishList) {
        wishList.forEach((wish, index) => {
            const singleWish = createWishElement(wish, index)
            wishesDiv.append(singleWish)
        });
    }
}