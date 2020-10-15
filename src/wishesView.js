import { createDiv, createElement, createInput, clearTextArea, deleteCookie, createButton } from "./htmlUtils"
import { createNewWish, deleteWish, editWishBody, editWishTitle, editWishUrl } from "./model";
import { backendWishesURL, fetchPostRequest } from "./utils";
import { initializeClock, createTimerElements, createTimerElementsForFriends } from "./timer"

export const renderWishesView = (parentElement, userName, userDayOfBirthday, wishList, friendsList, loginPageModelInstans) => {
    parentElement.innerHTML = ""
    const utilsAndWishesDiv = createDiv("utilsAndWishesDiv", "utilsAndWishesDiv")
    const userDiv = createDiv("userDiv", "userDiv")
    const otherUsersDiv = createDiv("otherUsersDiv", "otherUsersDiv")
    const userNameDiv = createButton("userNameDiv", "userNameDiv")
    userNameDiv.onclick = function () {
        this.classList.toggle('is-open');

        const content = this.nextElementSibling
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    }
    userNameDiv.innerHTML = userName
    const wishesDiv = createDiv("wishesDiv", "wishesDiv")
    const utilsDiv = createDiv("utilsDiv", "utilsDiv")
    const innerImgDiv = createDiv("innerImgDiv", "innerImgDiv")
    const buttonDiv = createDiv("buttonDiv", "buttonDiv")
    // create separate function for creating buttons
    const exitButton = createInput("button", "exit", "exitButton", "exitButton")
    exitButton.setAttribute("value", "exit")
    exitButton.addEventListener("click", function () {
        deleteCookie("auth-token")
        loginPageModelInstans.setLoginStatus(false)
    })
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
    const timerElements = createTimerElements()
    parentElement.append(userDiv)
    parentElement.append(otherUsersDiv)
    userDiv.append(userNameDiv)
    userDiv.append(utilsDiv)
    utilsDiv.append(titleArea)
    utilsDiv.append(bodyArea)
    utilsDiv.append(urlArea)
    utilsDiv.append(innerImgDiv)
    utilsDiv.append(buttonDiv)
    utilsDiv.append(wishesDiv)
    userNameDiv.append(exitButton)
    userNameDiv.append(timerElements)
    buttonDiv.append(addButton)
    // should be triggered by model's change handler
    renderWishesList(wishList, userName, wishesDiv)
    // const endtime = "September 28 2021 00:00:00 GMT+0300"
    initializeClock(timerElements, userDayOfBirthday)
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
        renderNotLoggedInWishes(wishList, userName, friendsList, otherUsersDiv)
        clearTextArea()
    }
}

export const renderWishesList = (wishList, userName, divForRender) => {
    divForRender.innerHTML = ""
    if (wishList) {
        wishList.forEach((wish, index) => {
            const singleWish = createWishElement(wish, index, userName, wishesDiv, wishList)
            if (wish.userName === userName) {
                wishesDiv.append(singleWish)
            }
        })
    }
}

const renderNotLoggedInWishes = (wishList, userName, friendsList, divForRender) => {
    divForRender.innerHTML = ""
    friendsList.forEach(user => {
        const notLoggedInUserDiv = createDiv("notLoggedInUserDiv", "notLoggedInUserDiv")
        const otherUserDiv = createDiv("otherUsersWishDiv", "otherUsersWishDiv")
        const accordionButton = createButton("accordion", "accordion")
        if (user.userName !== userName) {
            const timerElements = createTimerElementsForFriends(user.userName)
            const userDayOfBirthday = user.DoB
            accordionButton.innerText = user.userName
            notLoggedInUserDiv.append(accordionButton)
            wishList.forEach((wish, index) => {
                if (wish.userName === user.userName) {
                    const singleWish = createWishElementForNotLoggedInUser(wish, index)
                    otherUserDiv.append(singleWish)
                }
                accordionButton.onclick = function () {
                    this.classList.toggle('is-open');
                    
                    const content = this.nextElementSibling
                    if (content.style.maxHeight) {
                        content.style.maxHeight = null;
                    } else {
                        content.style.maxHeight = content.scrollHeight + "px";
                    }
                }
                notLoggedInUserDiv.append(accordionButton)
                notLoggedInUserDiv.append(otherUserDiv)
                divForRender.append(notLoggedInUserDiv)
                accordionButton.append(timerElements)
                initializeClock(timerElements, userDayOfBirthday)
            })
        }
    })
}

const createWishElementForNotLoggedInUser = (wish, index) => {
    const wishDiv = document.createElement("div")
    const wishTitle = createDiv("wishTitle", "wishTitle")
    const wishBody = createDiv("wishBody", "wishBody")
    const wishUrl = document.createElement("a")
    wishUrl.setAttribute("class", "wishUrl")
    wishUrl.setAttribute("href", wish.url)
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

const createWishElement = (wish, index, userName, divForRender, wishlist) => {
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


