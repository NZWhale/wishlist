export default class UserModel {
    constructor(userName, dayOfBirthday, wishList) {
        this._userName = userName
        this._dayOfBirthday = dayOfBirthday
        this._wishList = wishList
    }

    setUserName(userName){
        this._userName = userName
    }

    getUserName(){
        return this._userName
    }

    setToWishList(wishList){
        this._wishList = wishList
    }

    getFromWishList(){
        return this._wishList
    }

    setDayOfBirthday(DoB){
        this._dayOfBirthday = DoB
    }
    getDayOfBirthday(){
        return this._dayOfBirthday
    }
}