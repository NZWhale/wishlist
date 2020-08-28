export default class UserModel {
    constructor(userName, dayOfBirthday, wishList) {
        this.userName = userName
        this.dayOfBirthday = dayOfBirthday
        this.wishList = wishList
    }

    setUserName(userName){
        this.userName = userName
    }

    getUserName(){
        return this.userName
    }

    setToWishList(wishList){
        this.wishList = wishList
    }

    getFromWishList(){
        return this.wishList
    }

    setDayOfBirthday(DoB){
        this.dayOfBirthday = DoB
    }
    getDayOfBirthday(){
        return this.dayOfBirthday
    }
}