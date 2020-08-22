import { renderLayout, renderWishes } from "./view"
import { backendURL, fetchGetRequest } from "./utils"

window.addEventListener('load', async function () {
    const rootElement = document.getElementById("root")
    // const inputArea = document.getElementById("inputArea")
    const wishList = await fetchGetRequest(backendURL)
    window.wishList = wishList
    renderLayout(rootElement)
    renderWishes(wishList)
})