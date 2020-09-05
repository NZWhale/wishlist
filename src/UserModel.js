import EventEmitter from "./EventEmitter";

export default class UserModel extends EventEmitter {
    setUserName(userName){
        this._userName = userName
        this.executeHandlers()
    }

    getUserName(){
        return this._userName
    }

    setToWishList(wishList){
        this._wishList = wishList
        this.executeHandlers()
    }

    getFromWishList(){
        return this._wishList
    }

    setDayOfBirthday(DoB){
        // use lowerCamelCase. UpperCamelCase is for classes only
        this._dayOfBirthday = DoB
        this.executeHandlers()
    }

    getDayOfBirthday(){
        return this._dayOfBirthday
    }
}