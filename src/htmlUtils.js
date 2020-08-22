import { createNewWish, deleteWish } from "./model"
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
    const checkBox = createCheckbox(index)
    const deleteButton = document.createElement("button")
    const deleteButtonImg = document.createElement("img")
    deleteButton.appendChild(deleteButtonImg)
    wishDiv.setAttribute("id", "singleWish")
    wishDiv.setAttribute("index", `${index}`)
    wishTitle.innerHTML = wish.title
    wishBody.innerHTML = wish.body
    wishUrl.innerHTML = wish.url
    deleteButton.setAttribute("class", "deleteButton")
    deleteButton.addEventListener("click", function () {
        const wishIndex = wishDiv.getAttribute("index")
        deleteWish(wishList, wishIndex)
        renderWishes(wishList)
        fetchPostRequest("POST", backendURL, wishList)
    })
    deleteButtonImg.setAttribute("src", "src/deleteButton.jpg")
    deleteButtonImg.setAttribute("class", "deleteButtonImg")
    wishDiv.append(wishTitle)
    wishDiv.append(wishBody)
    wishDiv.append(wishUrl)
    wishDiv.append(checkBox)
    wishDiv.append(deleteButton)
    return wishDiv
}

// export const deleteWishElement = (wishList, index) => {
//     const checkedCheckBox = document.getElementsByClassName("checkbox")
//     checkedCheckBox.forEach(checkbox => {
//         if(checkbox.checked){
//              return checkbox.index
//         }
//     });
//     deleteWish(wishList, checkboxIndex)
//     renderWishes(wishList)
// }

export const clearTextArea = () => {
    document.getElementById("titleArea").value = ""
    document.getElementById("bodyArea").value = ""
    document.getElementById("urlArea").value = ""
}

export const enterPress = (e) => {
    if (e.keyCode == 13) {
        const titleArea = document.getElementById("titleArea").value
        const bodyArea = document.getElementById("bodyArea").value
        const urlArea = document.getElementById("urlArea").value
        if (titleArea) {
            if (bodyArea) {
                if (urlArea) {
                    createNewWish(titleArea, bodyArea, urlArea, wishList)
                    renderWishes(wishList)
                    clearTextArea()
                } else {
                    alert("enter url")
                }
            } else {
                alert("enter body")
            }
        } else {
            alert("enter title")
        }
    }
}
