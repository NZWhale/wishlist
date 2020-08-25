import { createDiv, createInput, createWishElement, enterPressForWishes, } from "./htmlUtils"

export const renderLayout = (parentElement) => {
    const userDiv = createDiv("userDiv", "userDiv")
    const wishesDiv = createDiv("wishesDiv", "wishesDiv")
    const utilsDiv = createDiv("utilsDiv", "utilsDiv")
    const buttonDiv = createDiv("buttonDiv", "buttonDiv")
    const addButton = createInput("button", "addButton", "addButton")
    addButton.setAttribute("value", "add")
    const titleArea = createInput("input", "enter wish title", "titleArea", "titleArea")
    titleArea.addEventListener("keypress", enterPressForWishes)
    const bodyArea = createInput("input", "enter wish body", "bodyArea", "bodyArea")
    bodyArea.addEventListener("keypress", enterPressForWishes)
    const urlArea = createInput("input", "enter wish url", "urlArea", "urlArea")
    urlArea.addEventListener("keypress", enterPressForWishes)
    parentElement.append(userDiv)
    userDiv.append(utilsDiv)
    userDiv.append(wishesDiv)
    utilsDiv.append(titleArea)
    utilsDiv.append(bodyArea)
    utilsDiv.append(urlArea)
    utilsDiv.append(buttonDiv)
    buttonDiv.append(addButton)
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