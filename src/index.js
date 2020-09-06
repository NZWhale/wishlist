import {renderLayout, renderWishes} from "./wishesView"
import {backendCheckLoginURL, fetchPostRequest} from "./authUtils"
import {renderLoginLayout} from "./authView"

import LoginPageModel from "./LoginPageModel"
import UserModel from "./UserModel"
import {backendWishesURL, fetchGetRequest} from "./utils"


window.addEventListener('load', async function () {
    const rootElement = document.getElementById("root")
    const loginPageModelInstance = new LoginPageModel()
    const userModelInstance = new UserModel()
    // TODO: better to call it performGetRequest

    loginPageModelInstance.addChangeEventListener(render)
    userModelInstance.addChangeEventListener(render)

    const resp = await fetchPostRequest("POST", backendCheckLoginURL)
    if (resp.userName) {
        userModelInstance.setUserName(resp.userName)
        userModelInstance.setDayOfBirthday(resp.DoB)
        loginPageModelInstance.setLoginStatus(true)
        const wishList = await fetchGetRequest(backendWishesURL)
        if (wishList) {
            userModelInstance.setToWishList(wishList)
        }
    } else {
        loginPageModelInstance.setLoginStatus(false)
    }

    function render() {
        // TODO: don't forget about negative scenarios
        const userName = userModelInstance.getUserName()
        if (userName) {
            const wishList = userModelInstance.getFromWishList()
            if (!wishList) {
                return
            }
            renderLayout(rootElement, userName, wishList, loginPageModelInstance)
            renderWishes(wishList, userName)
        } else {
            renderLoginLayout(rootElement, loginPageModelInstance, userModelInstance)
        }
    }
})