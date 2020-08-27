import LoginPageModel from "./LoginPageModel.js";
import assert from "assert"

const testLoginPageModelHandlers = () => {
    let handlerWasCalled = false;

    const loginPageModel = new LoginPageModel();
    loginPageModel.addChangeEventListener(() => {
        handlerWasCalled = true;
    })

    assert(loginPageModel.userIsLoggedIn === false, "Wrong default userIsLoggedIn value");

    loginPageModel.setLoginStatus(true);

    assert(loginPageModel.userIsLoggedIn === true, "userIsLoggedIn was not changed");
    assert(handlerWasCalled === true, "Handler was not called");
}

testLoginPageModelHandlers();