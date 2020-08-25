import { createNewWish, deleteWish, editWishTitle, editWishBody, editWishUrl } from "./model"
import { renderWishes } from "./view"
import {backendURL, fetchPostRequest} from "./utils"

export const createDiv = (idName, className) => {
    const div = document.createElement("div")
    div.setAttribute("id", `${idName}`)
    div.setAttribute("class", `${className}`)
    return div
}

export const createInput = (type, placeholder, idName, className) => {
    const button = document.createElement("input")
    button.setAttribute("type", `${type}`)
    button.setAttribute("id", `${idName}`)
    button.setAttribute("class", `${className}`)
    button.setAttribute("placeholder", `${placeholder}`)
    return button
}

export const createCheckbox = (index) => {
    const checkBox = document.createElement("input")
    checkBox.setAttribute("type", "checkbox")
    checkBox.setAttribute("id", "checkbox")
    checkBox.setAttribute("class", "checkbox")
    checkBox.setAttribute("index", `${index}`)
    return checkBox
}

export const createWishElement = (wish, index) => {
    const wishDiv = document.createElement("div")
    const wishTitle = document.createElement("div")
    const wishBody = document.createElement("div")
    const wishUrl = document.createElement("div")
    const deleteButton = createInput("button", "delete", "deleteButton", "deleteButton")
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
    deleteButton.addEventListener("click", function () {
        const wishIndex = wishDiv.getAttribute("index")
        deleteWish(wishList, wishIndex)
        renderWishes(wishList)
        fetchPostRequest("POST", backendURL, wishList)
    })
    deleteButtonImg.setAttribute("src", "./src/deleteButton.jpg")
    deleteButtonImg.setAttribute("class", "deleteButtonImg")
    editButton.addEventListener("click", function(){
        const wishIndex = wishDiv.getAttribute("index")
        const editedTitle = prompt("enter title")
        const editedBody = prompt("enter body")
        const editedUrl = prompt("enter url")
        editWishTitle(wishList, wishIndex, editedTitle)
        editWishBody(wishList, wishIndex, editedBody)
        editWishUrl(wishList, wishIndex, editedUrl)
        renderWishes(wishList)
        fetchPostRequest("POST", backendURL, wishList)
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

export const clearTextArea = () => {
    document.getElementById("titleArea").value = ""
    document.getElementById("bodyArea").value = ""
    document.getElementById("urlArea").value = ""
}

export const enterPressForWishes = (e) => {
    if (e.keyCode == 13) {
        const titleArea = document.getElementById("titleArea").value
        const bodyArea = document.getElementById("bodyArea").value
        const urlArea = document.getElementById("urlArea").value
        if (!titleArea) {
            alert("enter title")
        } else {
            if(!bodyArea){
                alert("enter body")
            } else {
                if(!urlArea){
                    alert("enter url")
                } else {
                    createNewWish(titleArea, bodyArea, urlArea, wishList)
                    renderWishes(wishList)
                    clearTextArea()
                }
            }
        }
    }
}
