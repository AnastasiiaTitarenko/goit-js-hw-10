`use strict`;
// Library
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

 
let userSelectedDate = null;
let currentDate = new Date();

const startBtn = document.querySelector(`[data-start]`);
startBtn.disabled = true;

const elements = {
    days: document.querySelector(`[data-days]`),
    hours: document.querySelector(`[data-hours]`),
    minutes: document.querySelector(`[data-minutes]`),
    seconds: document.querySelector(`[data-seconds]`)
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
              position: "topRight",
          });
          startBtn.disabled = true;
      }
      else {
          startBtn.disabled = false;
         
      }
    },
};

flatpickr('#datetime-picker', options);
iziToast.error({ title: "Alert", message: "Please choose a date in the future" });


startBtn.addEventListener("click", () => {
    let timerElement = document.querySelector(".timer");
    if (userSelectedDate === null) {
        return;
    }
    let timerInterval = setInterval(() => {
    let currentDay = new Date().getTime();
    let timerDistance = userSelectedDate - currentDay;
        
    if (timerDistance <= 0) {
        clearInterval(timerInterval);
        timerElement.innerText = "00:00:00:00";
    }
    else {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
        let days = Math.floor(timerDistance / day);
        let hours = Math.floor((timerDistance % (day)) / (hour));
        let minutes = Math.floor(((timerDistance % (day)) % hour) / (minute));
        let seconds = Math.floor((((timerDistance % (day)) % hour) % minute) / (second));

        elements.days.textContent = days.toString().padStart(2, "0");
        elements.hours.textContent = hours.toString().padStart(2, "0");
        elements.minutes.textContent = minutes.toString().padStart(2, "0");
        elements.seconds.textContent = seconds.toString().padStart(2, "0");

        // timerElement.textContent = `${ days.toString().padStart(2, "0") }:${ hours.toString().padStart(2, "0") }:${ minutes.toString().padStart(2, "0") }:${ seconds.toString().padStart(2, "0") }`;
    }
    }, 1000);
});





