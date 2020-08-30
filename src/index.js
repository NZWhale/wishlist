import { renderLayout, renderWishes } from "./view"
import { backendWishesURL, fetchGetRequest } from "./utils"
import { renderLoginLayout } from "./authView"

import LoginPageModel from "./LoginPageModel"
import UserModel from "./UserModel"


window.addEventListener('load', async function () {
    const rootElement = document.getElementById("root")
    const loginPageModelInstance = new LoginPageModel()
    const userModelInstance = new UserModel()
    const wishList = await fetchGetRequest(backendWishesURL)
    renderLoginLayout(rootElement, loginPageModelInstance, userModelInstance)
    loginPageModelInstance.addChangeEventListener(() => {
        const userName = userModelInstance.getUserName()
        renderLayout(rootElement, userName, wishList, loginPageModelInstance);
        renderWishes(wishList, userName)
    })
    
    window.wishList = wishList
    // window.loginPageModelInstance = loginPageModelInstance
    window.userModelInstance = userModelInstance
})