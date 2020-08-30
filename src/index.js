import { renderLayout, renderWishes } from "./wishesView"
import { backendWishesURL, fetchGetRequest } from "./utils"
import { renderLoginLayout } from "./authView"

import LoginPageModel from "./LoginPageModel"
import UserModel from "./UserModel"


window.addEventListener('load', async function () {
    const rootElement = document.getElementById("root")
    const loginPageModelInstance = new LoginPageModel()
    const userModelInstance = new UserModel()
    // TODO: better to call it performGetRequest
    const wishList = await fetchGetRequest(backendWishesURL)
    renderLoginLayout(rootElement, loginPageModelInstance, userModelInstance)
    loginPageModelInstance.addChangeEventListener(() => {
        // TODO: don't forget about negative scenarios
        const userName = userModelInstance.getUserName()
        // TODO: rename to renderWishesLayout
        renderLayout(rootElement, userName, wishList, loginPageModelInstance);
        // TODO: should be in renderWishesLayout
        renderWishes(wishList, userName)
    })
    
    window.wishList = wishList
    // window.loginPageModelInstance = loginPageModelInstance
    window.userModelInstance = userModelInstance
})