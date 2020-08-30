import EventEmitter from "./EventEmitter"

export default class LoginPageModel extends EventEmitter {
    constructor() {
        super()
        this._userIsLoggedIn = false
    }
    
    setLoginStatus(userIsLoggedIn) {
        this._userIsLoggedIn = userIsLoggedIn
        this.executeHandlers()
    }

    getLoginStatus() {
        return this._userIsLoggedIn
    }
}

