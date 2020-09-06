import { createDiv, createInput, clearTextArea } from "./htmlUtils"
import { createNewWish } from "./model"

// rename to renderWishesView
export const renderLayout = (parentElement, userName, wishList) => {
    parentElement.innerHTML = ""
    const userDiv = createDiv("userDiv", "userDiv")
    const otherUsersDiv = createDiv("otherUsersDiv", "otherUsersDiv")
    const userNameDiv = createDiv("userNameDiv", "userNameDiv")
    userNameDiv.innerHTML = userName
    const wishesDiv = createDiv("wishesDiv", "wishesDiv")
    const utilsDiv = createDiv("utilsDiv", "utilsDiv")
    const buttonDiv = createDiv("buttonDiv", "buttonDiv")
    // create separate function for creating buttons
    const addButton = createInput("button", "addButton", "addButton")
    addButton.setAttribute("value", "add")
    addButton.addEventListener("click", function (e) {
        handleWishSubmit();
    })
    const titleArea = createInput("input", "enter wish title", "titleArea", "titleArea")
    titleArea.addEventListener("keypress", function (e) {
        if (e.keyCode !== 13) {
            return;
        }
        handleWishSubmit()
    })
    const bodyArea = createInput("input", "enter wish body", "bodyArea", "bodyArea")
    bodyArea.addEventListener("keypress", function (e) {
        if (e.keyCode !== 13) {
            return;
        }
        handleWishSubmit()
    })
    const urlArea = createInput("input", "enter wish url", "urlArea", "urlArea")
    urlArea.addEventListener("keypress", function (e) {
        if (e.keyCode !== 13) {
           return
        }
        handleWishSubmit()
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

    function handleWishSubmit() {
        const titleArea = document.getElementById("titleArea").value
        const bodyArea = document.getElementById("bodyArea").value
        const urlArea = document.getElementById("urlArea").value
        if (!titleArea) {
            alert("enter title")
            return
        }
        if (!bodyArea) {
            alert("enter body")
            return;
        }
        if (!urlArea) {
            alert("enter url")
            return;
        }
        // this is model's responsibility
        createNewWish(titleArea, bodyArea, urlArea, userName, wishList)

        // should be triggered by model's change handler
        renderWishes(wishList, userName)

        clearTextArea()
    }
}

export const renderWishes = (wishList, userName) => {
    // don't relay on something exists in DOM tree
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

const createWishElement = (wish, index) => {
    const wishDiv = document.createElement("div")
    const wishTitle = document.createElement("div")
    const wishBody = document.createElement("div")
    const wishUrl = document.createElement("div")
    const deleteButton = createInput("button", "delete", "deleteButton", "deleteButton")
    // why not create a function for creating images (e.g. createImgElement)
    const deleteButtonImg = document.createElement("img")
    const editButton = createInput("button", "edit", "editButton", "editButton")
    const editButtonImg = document.createElement("img")
    deleteButton.appendChild(deleteButtonImg)
    wishDiv.setAttribute("id", "singleWish")
    wishDiv.setAttribute("class", "singleWish")
    wishDiv.setAttribute("index", `${index}`)
    wishTitle.innerHTML = wish.title
    wishBody.innerHTML = wish.body
    wishUrl.innerHTML = wish.url
    // keep the order!
    deleteButton.addEventListener("click", function () {
        const wishIndex = wishDiv.getAttribute("index")
        deleteWish(wishList, wishIndex)
        renderWishes(wishList)
        // better to call it performPostRequest
        fetchPostRequest("POST", backendWishesURL, wishList)
    })
    deleteButtonImg.setAttribute("src", "./src/deleteButton.jpg")
    deleteButtonImg.setAttribute("class", "deleteButtonImg")
    editButton.addEventListener("click", function () {
        const wishIndex = wishDiv.getAttribute("index")
        const editedTitle = prompt("enter title")
        const editedBody = prompt("enter body")
        const editedUrl = prompt("enter url")
        editWishTitle(wishList, wishIndex, editedTitle)
        editWishBody(wishList, wishIndex, editedBody)
        editWishUrl(wishList, wishIndex, editedUrl)
        renderWishes(wishList)
        fetchPostRequest("POST", backendWishesURL, wishList)
    })
    editButtonImg.setAttribute("src", "./src/editButton.jpg")
    editButtonImg.setAttribute("class", "editButton")
    deleteButton.append(deleteButtonImg)
    editButton.append(editButtonImg)
    wishDiv.append(wishTitle)
    wishDiv.append(wishBody)
    wishDiv.append(wishUrl)
    wishDiv.append(deleteButton)
    wishDiv.append(editButton)
    return wishDiv
}
