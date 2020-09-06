export default class EventEmitter {
    constructor () {
        this._handlers = []
    }

    addChangeEventListener(handler) {
        this._handlers.push(handler)
    }

    executeHandlers() {
        this._handlers.forEach((handler) => {
            handler()
        })
    }
}