import { renderLayout, renderWishes } from "./view"
import { backendWishesURL, fetchGetRequest } from "./utils"
import { renderLoginLayout } from "./authView"

import LoginPageModel from "./LoginPageModel"


window.addEventListener('load', async function () {
    const rootElement = document.getElementById("root")
    const loginPageModelInstance = new LoginPageModel();
    const wishList = await fetchGetRequest(backendWishesURL)
    renderLoginLayout(rootElement, loginPageModelInstance)
    loginPageModelInstance.addChangeEventListener(() => {
        renderLayout(rootElement, loginPageModelInstance, wishList);
        renderWishes(wishList)
    })

    window.wishList = wishList
    window.loginPageModelInstance = loginPageModelInstance
})