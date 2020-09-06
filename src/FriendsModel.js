import EventEmitter from "./EventEmitter";

export default class FriendsModel extends EventEmitter {
    setFriendsList(usersList) {
        this._usersList = usersList
        this.executeHandlers()
    }

    getFriendsList() {
        return this._usersList
    }
}