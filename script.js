const startingMinutes = 10;
let time = startingMinutes * 60;
var alarmSound = new Audio();
alarmSound.src = 'alarm.mp3';
var alarmTimer;

const timeElement = document.getElementById('time');

setInterval(timer, 1000);

function timer() {
    timeElement.innerHTML = `${new Date().toLocaleTimeString()}`;
}

function setAlarm(button) {
    var ms = document.getElementById('alarmTime').valueAsNumber;
    if(isNaN(ms)) {
        alert('Invalid Date')
        return;
    }
    var alarm = new Date(ms);
    var alarmTime = new Date(alarm.getUTCFullYear(), 
                             alarm.getUTCMonth(), 
                             alarm.getUTCDate(), 
                             alarm.getUTCHours(), 
                             alarm.getUTCMinutes(), 
                             alarm.getUTCSeconds())
    var differenceInMs = alarmTime.getTime() - (new Date()).getTime();

    if (differenceInMs < 0) {
        alert('Specified time is already passed.');
        return;
    }

    alarmTimer = setTimeout(initAlarm, differenceInMs);

    button.innerText = 'Cancel Alarm';
    button.setAttribute('onclick', 'cancelAlarm(this);')
}

function cancelAlarm(button) {
    button.innerText = 'Set Alarm';
    button.setAttribute('onclick', 'setAlarm(this);');
    clearTimeout(alarmTimer);
}

function initAlarm() {
    alarmSound.play();
    document.getElementById('alarmOptions').style.display = '';
    document.getElementById('alarmText').style.display = '';

}

function stopAlarm() {
    alarmSound.pause();
    alarmSound.currentTime = 0;
    document.getElementById('alarmOptions').style.display = 'none';
    document.getElementById('alarmText').style.display = 'none';
    cancelAlarm(document.getElementById('alarmButton'));
}

function snooze() {
    stopAlarm();
    setTimeout(initAlarm, 300000);
}
