import { renderLayout, renderWishes } from "./view"
import { backendURL, fetchGetRequest } from "./utils"
import { renderLoginLayout } from "../auth/authView"

window.addEventListener('load', function () {
    const rootElement = document.getElementById("root")
    // const inputArea = document.getElementById("inputArea")
    // const wishList = await fetchGetRequest(backendURL)
    // window.wishList = wishList
    renderLoginLayout(rootElement)
    // renderLayout(rootElement)
    // renderWishes(wishList)
})