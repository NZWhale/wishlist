import { renderLayout, renderWishes } from "./view"
import { backendURL, fetchGetRequest } from "./utils"
import { renderLoginLayout } from "./authView"

import LoginPageModel from "./LoginPageModel"


window.addEventListener('load', async function () {
    const rootElement = document.getElementById("root")
    const loginPageModelInstance = new LoginPageModel();
    const wishList = await fetchGetRequest(backendURL)
    renderLoginLayout(rootElement, loginPageModelInstance)
    loginPageModelInstance.addChangeEventListener(() => {
        renderLayout(rootElement, loginPageModelInstance, wishList);
        renderWishes(wishList)
    })

    window.wishList = wishList
    window.loginPageModelInstance = loginPageModelInstance
})