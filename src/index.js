import { renderWishesView, renderWishes } from "./wishesView"
import { backendWishesURL, fetchGetRequest, backendUserListURL } from "./utils"
import { renderLoginLayout } from "./authView"

import LoginPageModel from "./LoginPageModel"
import UserModel from "./UserModel"


window.addEventListener('load', async function () {
    const rootElement = document.getElementById("root")
    const loginPageModelInstance = new LoginPageModel()
    const userModelInstance = new UserModel()
    // TODO: better to call it performGetRequest
    const wishList = await fetchGetRequest(backendWishesURL)
    const userList = await fetchGetRequest(backendUserListURL)
    renderLoginLayout(rootElement, loginPageModelInstance, userModelInstance)
    loginPageModelInstance.addChangeEventListener(() => {
        // TODO: don't forget about negative scenarios
        const userName = userModelInstance.getUserName()
        // TODO: rename to renderWishesLayout
        renderWishesView(rootElement, userName, wishList, loginPageModelInstance, userList)
        // TODO: should be in renderWishesLayout
        // renderWishes(wishList, userName)
    })
    
    window.wishList = wishList
    window.userList = userList
    // window.loginPageModelInstance = loginPageModelInstance
    window.userModelInstance = userModelInstance
})