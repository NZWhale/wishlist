export default class UserModel {
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
        // use lowerCamelCase. UpperCamelCase is for classes only
        this._dayOfBirthday = DoB
    }

    getDayOfBirthday(){
        return this._dayOfBirthday
    }
}