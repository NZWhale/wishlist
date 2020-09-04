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

    setDayOfBirthday(dayOfBirthday){
        this._dayOfBirthday = dayOfBirthday
    }

    getDayOfBirthday(){
        return this._dayOfBirthday
    }
}