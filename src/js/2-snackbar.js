`use strict`;
// Library
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const delay = parseInt(document.querySelector('input[name="delay"]').value);
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (document.querySelector('input[name="state"]:checked').value === 'fulfilled') {
            resolve(delay);
            } else {
            reject(delay);
            }     
    }, delay);
  });
promise.then((delay) => {
    iziToast.success({
        title: "Success",
        message: `Fulfilled promise in ${delay}ms`,
        position: "topRight",
    });
}).catch((error) => {
    iziToast.error({
        title: "Error",
        message: `Rejected promise in ${delay}ms`,
        position: "topRight",
    });
});
});

