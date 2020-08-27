export default class LoginPageModel {
    constructor() {
        this._userIsLoggedIn = false;
        this.handlers = []
    }
    
    setLoginStatus(userIsLoggedIn) {
        this._userIsLoggedIn = userIsLoggedIn
        this.executeHandlers();
    }

    getLoginStatus() {
        return this._userIsLoggedIn
    }

    addChangeEventListener(handler) {
        this.handlers.push(handler)
    }

    executeHandlers() {
        this.handlers.forEach((handler) => {
            handler();
        })
    }
}