import { createNewWish } from "./model"
import { renderWishes } from "./view"

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

export const createWishElement = (wish, index) => {
    const wishDiv = document.createElement("div")
    const wishTitle = document.createElement("div")
    const wishBody = document.createElement("div")
    const wishUrl = document.createElement("div")
    wishDiv.setAttribute("id", "singleWish")
    wishDiv.setAttribute("index", `${index}`)
    wishTitle.innerHTML = wish.title
    wishBody.innerHTML = wish.body
    wishUrl.innerHTML = wish.url
    wishDiv.append(wishTitle)
    wishDiv.append(wishBody)
    wishDiv.append(wishUrl)
    return wishDiv
}

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
