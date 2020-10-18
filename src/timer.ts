import { createElement, createDiv } from './htmlUtils'


export const createTimerElements = (): HTMLElement => {
    const clockDiv: HTMLElement = createDiv("clock", "clock")
    const daysDiv: HTMLElement = createDiv("daysDiv", "daysDiv")
    const hoursDiv: HTMLElement = createDiv("hoursDiv", "hoursDiv")
    const minutesDiv: HTMLElement = createDiv("minutesDiv", "minutesDiv")
    const secondsDiv: HTMLElement = createDiv("secondsDiv", "secondsDiv")
    const daysCount: HTMLElement = createElement("span", "daysCount", "daysCount")
    const hoursCount: HTMLElement = createElement("span", "hoursCount", "hoursCount")
    const minutesCount: HTMLElement = createElement("span", "minutesCount", "minutesCount")
    const secondsCount: HTMLElement = createElement("span", "secondsCount", "secondsCount")
    const daysCountText: HTMLElement = createElement("span", "daysCountText", "daysCountText")
    const hoursCountText: HTMLElement = createElement("span", "hoursCountText", "hoursCountText")
    const minutesCountText: HTMLElement = createElement("span", "minutesCountText", "minutesCountText")
    const secondsCountText: HTMLElement = createElement("span", "secondsCountText", "secondsCountText")
    daysCountText.innerText = " Days "
    hoursCountText.innerText = ":"
    minutesCountText.innerText = ":"
    secondsCountText.innerText = ""
    daysDiv.append(daysCount, daysCountText)
    hoursDiv.append(hoursCount, hoursCountText)
    minutesDiv.append(minutesCount, minutesCountText)
    secondsDiv.append(secondsCount, secondsCountText)
    clockDiv.append(daysDiv, hoursDiv, minutesDiv, secondsDiv)
    return clockDiv
}

export const createTimerElementsForFriends = (username): HTMLElement => {
    const clockDiv: HTMLElement = createDiv(`clock${username}`, `clock${username}`)
    const daysDiv: HTMLElement = createDiv("daysDiv", "daysDiv")
    const hoursDiv: HTMLElement = createDiv("hoursDiv", "hoursDiv")
    const minutesDiv: HTMLElement = createDiv("minutesDiv", "minutesDiv")
    const secondsDiv: HTMLElement = createDiv("secondsDiv", "secondsDiv")
    const daysCount: HTMLElement = createElement("span", "daysCount", "daysCount")
    const hoursCount: HTMLElement = createElement("span", "hoursCount", "hoursCount")
    const minutesCount: HTMLElement = createElement("span", "minutesCount", "minutesCount")
    const secondsCount: HTMLElement = createElement("span", "secondsCount", "secondsCount")
    const daysCountText: HTMLElement = createElement("span", "daysCountText", "daysCountText")
    const hoursCountText: HTMLElement = createElement("span", "hoursCountText", "hoursCountText")
    const minutesCountText: HTMLElement = createElement("span", "minutesCountText", "minutesCountText")
    const secondsCountText: HTMLElement = createElement("span", "secondsCountText", "secondsCountText")
    daysCountText.innerText = " Days "
    hoursCountText.innerText = ":"
    minutesCountText.innerText = ":"
    secondsCountText.innerText = ""
    daysDiv.append(daysCount, daysCountText)
    hoursDiv.append(hoursCount, hoursCountText)
    minutesDiv.append(minutesCount, minutesCountText)
    secondsDiv.append(secondsCount, secondsCountText)
    clockDiv.append(daysDiv, hoursDiv, minutesDiv, secondsDiv)
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
    const hoursSpan: HTMLElement = renderElement.querySelector('.hoursCount')
    const minutesSpan: HTMLElement = renderElement.querySelector('.minutesCount')
    const secondsSpan: HTMLElement = renderElement.querySelector('.secondsCount')

    function updateClock() {
        const timer: any = getTimeRemaining(endtime)

        daysSpan.innerHTML = timer.days
        hoursSpan.innerHTML = ('0' + timer.hours).slice(-2)
        minutesSpan.innerHTML = ('0' + timer.minutes).slice(-2)
        secondsSpan.innerHTML = ('0' + timer.seconds).slice(-2)

        if (timer.total <= 0) {
            clearInterval(timeinterval)
        }
    }

    updateClock()
    const timeinterval = setInterval(updateClock, 1000)
}
