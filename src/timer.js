"use strict";
exports.__esModule = true;
exports.initializeClock = exports.createTimerElementsForFriends = exports.createTimerElements = void 0;
var htmlUtils_1 = require("./htmlUtils");
exports.createTimerElements = function () {
    var clockDiv = htmlUtils_1.createDiv("clock", "clock");
    var daysDiv = htmlUtils_1.createDiv("daysDiv", "daysDiv");
    var daysCount = htmlUtils_1.createElement("span", "daysCount", "daysCount");
    var daysCountText = htmlUtils_1.createElement("span", "daysCountText", "daysCountText");
    daysCountText.innerText = " Days ";
    daysDiv.append(daysCount, daysCountText);
    clockDiv.append(daysDiv);
    return clockDiv;
};
exports.createTimerElementsForFriends = function (username) {
    var clockDiv = htmlUtils_1.createDiv("clock" + username, "clock");
    var daysDiv = htmlUtils_1.createDiv("daysDiv", "daysDiv");
    var daysCount = htmlUtils_1.createElement("span", "daysCount", "daysCount");
    var daysCountText = htmlUtils_1.createElement("span", "daysCountText", "daysCountText");
    daysCountText.innerText = " Days ";
    daysDiv.append(daysCount, daysCountText);
    clockDiv.append(daysDiv);
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
    if (days > 365) {
        days = days - 365;
    }
    if (days == 365) {
        days = 0;
    }
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
    var daysSpan = renderElement.querySelector('.daysCount');
    function updateClock() {
        var timer = getTimeRemaining(endtime);
        daysSpan.innerHTML = timer.days;
        if (timer.total <= 0) {
            clearInterval(timeinterval);
        }
    }
    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
};
