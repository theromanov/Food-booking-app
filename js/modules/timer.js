"use strict";

function timer(id, deadline) {
  // Timer

  function getTimeRemaining(deadline) {
    let days, hours, minutes, seconds;
    const t = Date.parse(deadline) - new Date();

    if (t <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      ((days = Math.floor(t / (1000 * 60 * 60 * 24))),
        (hours = Math.floor((t / (1000 * 60 * 60)) % 24)),
        (minutes = Math.floor((t / (1000 * 60 * 60)) % 60)),
        (seconds = Math.floor((t / 1000) % 60)));
    }

    return { total: t, days, hours, minutes, seconds };
  }

  function addsZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, deadline) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timerInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(deadline);

      days.textContent = addsZero(t.days);
      hours.textContent = addsZero(t.hours);
      minutes.textContent = addsZero(t.minutes);
      seconds.textContent = addsZero(t.seconds);
    }
  }

  setClock(id, deadline);
}

export default timer;
