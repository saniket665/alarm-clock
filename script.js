let alarms = [];
let weeks = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let ct = document.querySelector(".current-time");
let alarmTime = document.querySelector(".alarm-time");
let alarmDay = document.querySelector(".alarm-day");
let alarmBtn = document.querySelector(".alarm-btn");
let alarmCont = document.querySelector(".alarm-cont");
let alarmTitle = document.querySelector(".alarm-title");
let idx = 0;

function getCurrentTime() {
    let date = new Date();
    let hrs = date.getHours();
    hrs = hrs > 9 ? hrs : `0${hrs}`;
    let mins = date.getMinutes();
    mins = mins > 9 ? mins : `0${mins}`;
    let secs = date.getSeconds();
    secs = secs > 9 ? secs : `0${secs}`;
    ct.innerHTML = `<h4>${hrs}:${mins}:${secs}</h4>`
    setInterval(getCurrentTime, 1000);
}
getCurrentTime();

alarmBtn.addEventListener("click", () => {
    let time = alarmTime.value.split(":");
    let hr = time[0];
    let min = time[1];
    let day = alarmDay.value;
    alarmTime.value = "";
    alarmDay.value = "0"
    createAlarm(hr, min, day);
})

function createAlarm(hr, min, day) {
    let currYear = new Date().getFullYear();
    let currMonth = new Date().getMonth();
    let currDate = new Date().getDate();
    let currday = new Date().getDay();
    let currHr = new Date().getHours();
    let currMin = new Date().getMinutes();
    let alarmDate;
    let newDate = currDate - currday + parseInt(day);
    alarmDate = new Date(currYear, currMonth, newDate, hr, min);
    if(newDate < currDate || newDate === currDate && (hr < currHr || (hr === currHr && min < currMin))) {
        alarmDate = new Date(currYear, currMonth, newDate + 7, hr, min);
    }
    alarms.push(alarmDate);
    if(alarms.length > 0) {
        alarmTitle.innerHTML = "All Alarms";
    }
    setNewAlarm(alarmDate);
}

function setNewAlarm(alarmDate) {
    let alarmHr = alarmDate.getHours();
    alarmHr = alarmHr > 9 ? alarmHr : `0${alarmHr}`
    let alarmMin = alarmDate.getMinutes();
    alarmMin = alarmMin > 9 ? alarmMin : `0${alarmMin}`
    let alarmDay = alarmDate.getDay();
    let alarmDate2 = alarmDate.getDate();
    let alarmMonth = alarmDate.getMonth();
    let div = document.createElement("div");
    div.setAttribute("class", "alarm");
    div.setAttribute("key", idx);
    div.innerHTML = `<p>${alarmHr}:${alarmMin}</p>
    <span>${weeks[alarmDay].slice(0, 3)}, ${alarmDate2} ${months[alarmMonth]}</span>
    <div class="delete-icon"><i class="fa-solid fa-trash"></i></div>`
    let deleteIcon = div.querySelector(".delete-icon");
    addClickEvent(deleteIcon);
    alarmCont.appendChild(div);
    idx++;
}
function addClickEvent(deleteIcon) {
    deleteIcon.addEventListener("click", (e) => {
        if(alarms.length === 1) {
            alarmTitle.innerHTML = "";
        }
        let div = deleteIcon.parentElement;
        let idx = div.getAttribute("key");
        alarms.splice(idx, 1);
        deleteIcon.parentElement.remove();
    })
}


