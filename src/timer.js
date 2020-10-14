"use strict";
exports.__esModule = true;
exports.initializeClock = exports.createTimerElements = void 0;
var htmlUtils_1 = require("./htmlUtils");
exports.createTimerElements = function () {
    var clockDiv = htmlUtils_1.createDiv("clock", "clock");
    var daysDiv = htmlUtils_1.createDiv("daysDiv", "daysDiv");
    var hoursDiv = htmlUtils_1.createDiv("hoursDiv", "hoursDiv");
    var minutesDiv = htmlUtils_1.createDiv("minutesDiv", "minutesDiv");
    var secondsDiv = htmlUtils_1.createDiv("secondsDiv", "secondsDiv");
    var daysCount = htmlUtils_1.createElement("span", "daysCount", "daysCount");
    var hoursCount = htmlUtils_1.createElement("span", "hoursCount", "hoursCount");
    var minutesCount = htmlUtils_1.createElement("span", "minutesCount", "minutesCount");
    var secondsCount = htmlUtils_1.createElement("span", "secondsCount", "secondsCount");
    var daysCountText = htmlUtils_1.createElement("span", "daysCountText", "daysCountText");
    var hoursCountText = htmlUtils_1.createElement("span", "hoursCountText", "hoursCountText");
    var minutesCountText = htmlUtils_1.createElement("span", "minutesCountText", "minutesCountText");
    var secondsCountText = htmlUtils_1.createElement("span", "secondsCountText", "secondsCountText");
    daysCountText.innerText = "D";
    hoursCountText.innerText = "H";
    minutesCountText.innerText = "M";
    secondsCountText.innerText = "S";
    daysDiv.append(daysCount, daysCountText);
    hoursDiv.append(hoursCount, hoursCountText);
    minutesDiv.append(minutesCount, minutesCountText);
    secondsDiv.append(secondsCount, secondsCountText);
    clockDiv.append(daysDiv, hoursDiv, minutesDiv, secondsDiv);
    return clockDiv;
};
var getTimeRemaining = function (dateOfBirthday) {
    var birthDate = new Date(dateOfBirthday);
    var month = birthDate.getMonth();
    var day = birthDate.getDate();
    var nextBirthDate = new Date(new Date().getFullYear() + 1, month, day).toString();
    var currentTime = new Date().toString();
    var timeToBirthday = Date.parse(nextBirthDate) - Date.parse(currentTime);
    var seconds = Math.floor((timeToBirthday / 1000) % 60);
    var minutes = Math.floor((timeToBirthday / 1000 / 60) % 60);
    var hours = Math.floor((timeToBirthday / (1000 * 60 * 60)) % 24);
    var days = Math.floor(timeToBirthday / (1000 * 60 * 60 * 24));
    return {
        'total': timeToBirthday,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
};
exports.initializeClock = function (renderElement, endtime) {
    var clock = renderElement;
    var daysSpan = document.getElementById('daysCount');
    var hoursSpan = document.getElementById('hoursCount');
    var minutesSpan = document.getElementById('minutesCount');
    var secondsSpan = document.getElementById('secondsCount');
    function updateClock() {
        var timer = getTimeRemaining(endtime);
        daysSpan.innerHTML = timer.days;
        hoursSpan.innerHTML = ('0' + timer.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + timer.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + timer.seconds).slice(-2);
        if (timer.total <= 0) {
            clearInterval(timeinterval);
        }
    }
    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
};
