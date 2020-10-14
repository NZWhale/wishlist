import { renderWishesView } from "./wishesView"
import { backendCheckLoginURL, fetchPostRequest } from "./authUtils"
import { renderLoginLayout } from "./authView"

import LoginPageModel from "./LoginPageModel"
import UserModel from "./UserModel"
import { backendUserListURL, backendWishesURL, fetchGetRequest } from "./utils"
import FriendsModel from "./FriendsModel";


window.addEventListener('load', async function () {
    const rootElement = document.getElementById("root")
    const loginPageModelInstance = new LoginPageModel()
    const userModelInstance = new UserModel()
    const friendsModelInstance = new FriendsModel()
    window.loginPageModelInstance = loginPageModelInstance
    // TODO: better to call it performGetRequest

    loginPageModelInstance.addChangeEventListener(render)
    userModelInstance.addChangeEventListener(render)
    friendsModelInstance.addChangeEventListener(render)

    loginPageModelInstance.addChangeEventListener(async () => {
        if (loginPageModelInstance.getLoginStatus() === false) {
            return
        }
        const wishList = await fetchGetRequest(backendWishesURL)
        window.wishList = wishList
        if (wishList) {
            userModelInstance.setToWishList(wishList)
        }
        const allUsersList = await fetchGetRequest(backendUserListURL)

        if (allUsersList) {
            friendsModelInstance.setFriendsList(allUsersList)
        }
    })

    const resp = await fetchPostRequest("POST", backendCheckLoginURL)
    if (resp.userName) {
        userModelInstance.setUserName(resp.userName)
        userModelInstance.setDayOfBirthday(resp.DoB)
        loginPageModelInstance.setLoginStatus(true)
    } else {
        loginPageModelInstance.setLoginStatus(false)
    }


    function render() {
        // TODO: don't forget about negative scenarios
        const loginStatus = loginPageModelInstance.getLoginStatus()
        if (loginStatus === true) {
            const userName = userModelInstance.getUserName()
            const userDayOfBirthday = userModelInstance.getDayOfBirthday()
            const wishList = userModelInstance.getFromWishList()
            if (!wishList) {
                return
            }
            const friendsList = friendsModelInstance.getFriendsList()
            if (!friendsList) {
                return
            }
            renderWishesView(rootElement, userName, userDayOfBirthday, wishList, friendsList, loginPageModelInstance)
        } else {
            renderLoginLayout(rootElement, loginPageModelInstance, userModelInstance)
        }
    }
})