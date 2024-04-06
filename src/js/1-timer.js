`use strict`;
// Library
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

 

let userSelectedDate;
const startBtn = document.querySelector(`.data-start`);

const elements = {
    days: document.querySelector(`.data-days`),
    hours: document.querySelector(`.data-hours`),
    minutes: document.querySelector(`.data-minutes`),
    seconds: document.querySelector(`data-seconds`)
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      userSelectedDate = selectedDates[0];
      if (userSelectedDate <= currentDate) {
          iziToast.error({
              title: "Error",
              message: "Please choose a date in the future",
          });
          startBtn.disabled = true;
      }
      else {
          startBtn.disabled = false;
      }
    },
};
  
  let currentDate = new Date();

flatpickr('#datetime-picker', options);
iziToast.error({ title: "Alert", message: "Please choose a date in the future" });

startBtn.addEventListener ("click", () => {
    let timerInterval = setInterval(() => {
        let currentDay = new Date().getTime();
    let timerDistance = userSelectedDate - currentDay;
    if (timerDistance <= 0) {
        clearInterval(timerInterval);
        document.getElementById("timer").innerText = "00:00:00:00";
    }
    else {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
        let days = Math.floor(timerDistance / day);
        let hours = Math.floor((timerDistance % day) / hour);
        let minutes = Math.floor(((timerDistance % day) % hour) / minute);
        let seconds = Math.floor((((timerDistance % day) % hour) % minute) / second);

        document.getElementById("timer").innerText = `${ days.toString().padStart(2, "0") }:${ hours.toString().padStart(2, "0") }:${ minutes.toString().padStart(2, "0") }:${ seconds.toString().padStart(2, "0") }`;
    }
    }, 1000);
});





