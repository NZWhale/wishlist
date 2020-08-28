import UserModel from "./UserModel.js"
import assert from "assert"

const wishLish = [
  '{{repeat(5, 7)}}',
  {
    _id: '{{objectId()}}',
    index: '{{index()}}',
    guid: '{{guid()}}',
    isActive: '{{bool()}}',
    balance: '{{floating(1000, 4000, 2, "$0,0.00")}}',
    picture: 'http://placehold.it/32x32',
    age: '{{integer(20, 40)}}',
    eyeColor: '{{random("blue", "brown", "green")}}',
    name: '{{firstName()}} {{surname()}}',
    gender: '{{gender()}}',
    company: '{{company().toUpperCase()}}',
    email: '{{email()}}',
    phone: '+1 {{phone()}}',
    address: '{{integer(100, 999)}} {{street()}}, {{city()}}, {{state()}}, {{integer(100, 10000)}}',
    about: '{{lorem(1, "paragraphs")}}',
    registered: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}',
    latitude: '{{floating(-90.000001, 90)}}',
    longitude: '{{floating(-180.000001, 180)}}',
    tags: [
      '{{repeat(7)}}',
      '{{lorem(1, "words")}}'
    ],
    friends: [
      '{{repeat(3)}}',
      {
        id: '{{index()}}',
        name: '{{firstName()}} {{surname()}}'
      }
    ],
    greeting: function (tags) {
      return 'Hello, ' + this.name + '! You have ' + tags.integer(1, 10) + ' unread messages.';
    },
    favoriteFruit: function (tags) {
      var fruits = ['apple', 'banana', 'strawberry'];
      return fruits[tags.integer(0, fruits.length - 1)];
    }
  }
]
const DoB = "01.01.1990"
const userName = "admin"

const userModel = new UserModel()
userModel.setDayOfBirthday(DoB)
userModel.setUserName(userName)
userModel.setToWishList(wishLish)

const compare = (firstArray, secondArray) => {
  let element
  for (let i = 0; i < firstArray.length; i++) {
    element = firstArray[i]
    for (let i = 0; i < secondArray; i++) {
      if (!(element === secondArray[i])) {
        return false
      }
    }
  }
}

assert(userModel.userName === userName, "userName doesn't match")
assert(userModel.dayOfBirthday === DoB, "DoB doesn't match")
assert(compare(userModel.wishList, wishLish) !== false, "WishLists don't match")
