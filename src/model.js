import {fetchPostRequest, backendWishesURL} from "./utils"

export const createNewUser = (arrayOfUsers, userName, login, password) => {
    const user = {
        userName: userName,
        login: login,
        password: password,
        isAdmin: false,
        wishList: []
    }
    if (arrayOfUsers) arrayOfUsers.push(user)
}


export const createNewWish = (title, body, url, wishList) => {
    const wish = {
        title: title,
        body: body,
        url: url
    }
    if (wishList) wishList.push(wish)
    fetchPostRequest("POST", backendWishesURL, wishList)
}

export const deleteWish = (wishList, index) => wishList.splice(index, 1)

export const editWishTitle = (wishList, index, title) => wishList[index].title = title

export const editWishBody = (wishList, index, body) => wishList[index].body = body

export const editWishUrl = (wishList, index, url) => wishList[index].url = url