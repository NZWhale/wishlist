import {createDiv, createInput, clearTextArea} from "./htmlUtils"
import {createNewWish, deleteWish, editWishBody, editWishTitle, editWishUrl} from "./model";
import {backendWishesURL, fetchPostRequest} from "./utils";

// rename to renderWishesView
export const renderWishesView = (parentElement, userName, wishList, friendsList) => {
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
        handleWishSubmit()
    })
    const titleArea = createInput("input", "enter wish title", "titleArea", "titleArea")
    titleArea.addEventListener("keypress", function (e) {
        if (e.keyCode !== 13) {
            return
        }
        handleWishSubmit()
    })
    const bodyArea = createInput("input", "enter wish body", "bodyArea", "bodyArea")
    bodyArea.addEventListener("keypress", function (e) {
        if (e.keyCode !== 13) {
            return
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
    userDiv.append(userNameDiv)
    userDiv.append(utilsDiv)
    userDiv.append(wishesDiv)
    utilsDiv.append(titleArea)
    utilsDiv.append(bodyArea)
    utilsDiv.append(urlArea)
    utilsDiv.append(buttonDiv)
    buttonDiv.append(addButton)
    // should be triggered by model's change handler
    renderWishesList(wishList, userName, wishesDiv)
    renderNotLoggedInWishes(wishList, userName, friendsList, otherUsersDiv)

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
            return
        }
        if (!urlArea) {
            alert("enter url")
            return
        }
        // this is model's responsibility
        createNewWish(titleArea, bodyArea, urlArea, userName, wishList)
        renderWishesList(wishList, userName, wishesDiv)
        renderNotLoggedInWishes(wishList, userName, userList, otherUsersDiv)
        clearTextArea()
    }
}

export const renderWishesList = (wishList, userName, divForRender) => {
    divForRender.innerHTML = ""
    if (wishList) {
        wishList.forEach((wish, index) => {
            const singleWish = createWishElement(wish, index, userName, wishesDiv)
            if (wish.userName === userName) {
                wishesDiv.append(singleWish)
            }
        })
    }
}

const renderNotLoggedInWishes = (wishList, userName, userList, divForRender) => {
    divForRender.innerHTML = ""
    userList.forEach(user => {
        const notLoggedInUserDiv = createDiv("notLoggedInUserDiv", "notLoggedInUserDiv")
        if (user.userName !== userName) {
            notLoggedInUserDiv.innerText = user.userName
            wishList.forEach((wish, index) => {
                if (wish.userName === user.userName) {
                    const singleWish = createWishElementForNotLoggedInUser(wish, index)
                    notLoggedInUserDiv.append(singleWish)
                }
                divForRender.append(notLoggedInUserDiv)
            })
        }
    })
}

const createWishElementForNotLoggedInUser = (wish, index) => {
    const wishDiv = document.createElement("div")
    const wishTitle = document.createElement("div")
    const wishBody = document.createElement("div")
    const wishUrl = document.createElement("div")
    wishDiv.setAttribute("id", "singleWish")
    wishDiv.setAttribute("class", "singleWish")
    wishDiv.setAttribute("index", `${index}`)
    wishTitle.innerHTML = wish.title
    wishBody.innerHTML = wish.body
    wishUrl.innerHTML = wish.url
    wishDiv.append(wishTitle)
    wishDiv.append(wishBody)
    wishDiv.append(wishUrl)
    return wishDiv
}

const createWishElement = (wish, index, userName, divForRender) => {
    const wishDiv = document.createElement("div")
    const wishTitle = createDiv("wishTitle", "wishTitle")
    const wishBody = createDiv("wishBody", "wishBody")
    const wishUrl = document.createElement("a")
    wishUrl.setAttribute("class", "wishUrl")
    const deleteButton = createDiv("deleteButton", "emojiButton")
    deleteButton.innerHTML = "❌"
    const editButton = createDiv("editButton", "emojiButton")
    editButton.innerHTML = "✏️"
    wishDiv.setAttribute("id", "singleWish")
    wishDiv.setAttribute("class", "singleWish")
    wishDiv.setAttribute("index", `${index}`)
    wishTitle.innerHTML = wish.title
    wishBody.innerHTML = wish.body
    wishUrl.innerHTML = wish.url
    wishUrl.setAttribute("href", wish.url)
    // keep the order!
    deleteButton.addEventListener("click", function () {
        const wishIndex = wishDiv.getAttribute("index")
        deleteWish(wishList, wishIndex)
        divForRender.innerHTML = ""
        renderWishesList(wishList, userName, wishDiv)
        // better to call it performPostRequest
        fetchPostRequest("POST", backendWishesURL, wishList)
    })
    editButton.addEventListener("click", function () {
        const wishIndex = wishDiv.getAttribute("index")
        const editedTitle = prompt("enter title")
        const editedBody = prompt("enter body")
        const editedUrl = prompt("enter url")
        editWishTitle(wishList, wishIndex, editedTitle)
        editWishBody(wishList, wishIndex, editedBody)
        editWishUrl(wishList, wishIndex, editedUrl)
        divForRender.innerHTML = ""
        renderWishesList(wishList, userName, wishDiv)
        fetchPostRequest("POST", backendWishesURL, wishList)
    })
    wishDiv.append(wishTitle)
    wishDiv.append(wishBody)
    wishDiv.append(wishUrl)

    const buttonsDiv = createDiv("buttonsDiv", "buttonsDiv")
    buttonsDiv.append(deleteButton)
    buttonsDiv.append(editButton)

    wishDiv.append(buttonsDiv)
    return wishDiv
}
