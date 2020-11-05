import { createElement, createDiv } from './htmlUtils'


export const createTimerElements = (): HTMLElement => {
    const clockDiv: HTMLElement = createDiv("clock", "clock")
    const daysDiv: HTMLElement = createDiv("daysDiv", "daysDiv")
    const daysCount: HTMLElement = createElement("span", "daysCount", "daysCount")
    const daysCountText: HTMLElement = createElement("span", "daysCountText", "daysCountText")
    daysCountText.innerText = " Days "
    daysDiv.append(daysCount, daysCountText)
    clockDiv.append(daysDiv)
    return clockDiv
}

export const createTimerElementsForFriends = (username): HTMLElement => {
    const clockDiv: HTMLElement = createDiv(`clock${username}`, `clock`)
    const daysDiv: HTMLElement = createDiv("daysDiv", "daysDiv")
    const daysCount: HTMLElement = createElement("span", "daysCount", "daysCount")
    const daysCountText: HTMLElement = createElement("span", "daysCountText", "daysCountText")
    daysCountText.innerText = " Days "
    daysDiv.append(daysCount, daysCountText)
    clockDiv.append(daysDiv)
    return clockDiv
}

const getTimeRemaining = (dateOfBirthday): object => {
    let birthDate = new Date(dateOfBirthday)
    let month = birthDate.getMonth()
    let day = birthDate.getDate()
    let nextBirthDate: string = new Date(new Date().getFullYear() + 1, month, day).toString()
    const currentTime: string = new Date().toString()
    const timeToBirthday = Date.parse(nextBirthDate) - Date.parse(currentTime)
    const seconds: number = Math.floor((timeToBirthday / 1000) % 60)
    const minutes: number = Math.floor((timeToBirthday / 1000 / 60) % 60)
    const hours: number = Math.floor((timeToBirthday / (1000 * 60 * 60)) % 24)
    let days: number = Math.floor(timeToBirthday / (1000 * 60 * 60 * 24))

    if (days > 365) {
        days = days - 365
    }
    if (days == 365) {
        days = 0
    }

    return {
        'total': timeToBirthday,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    }
}

export const initializeClock = (renderElement: HTMLElement, endtime: number): void => {
    const clock: HTMLElement = renderElement
    const daysSpan: HTMLElement = renderElement.querySelector('.daysCount')

    function updateClock() {
        const timer: any = getTimeRemaining(endtime)

        daysSpan.innerHTML = timer.days

        if (timer.total <= 0) {
            clearInterval(timeinterval)
        }
    }

    updateClock()
    const timeinterval = setInterval(updateClock, 1000)
}
