"use strict";

// Tabs

const tabContent = document.querySelectorAll(".tabcontent"),
  tabItem = document.querySelectorAll(".tabheader__item"),
  tabParent = document.querySelector(".tabheader__items");

function hideTabs() {
  tabContent.forEach((item, i) => {
    item.style.display = "none";
  });
  tabItem.forEach((item) => {
    item.classList.remove("tabheader__item_active");
  });
}

hideTabs();

function showTabs(i = 0) {
  tabContent[i].style.display = "block";
  tabItem[i].classList.add("tabheader__item_active");
}

showTabs();

// tabItem.forEach((item, i) => {
//   item.addEventListener("click", () => {
//     hideTabs();
//     showTabs(i);
//   });
// });

tabParent.addEventListener("click", (event) => {
  const target = event.target;

  if (target && target.classList.contains("tabheader__item")) {
    tabItem.forEach((item, i) => {
      if (target == item) {
        hideTabs();
        showTabs(i);
      }
    });
  }
});

// Timer

const deadline = "2026-05-20";

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

setClock(".timer", deadline);

// Cards

class MenuItem {
  constructor(src, alt, title, descr, price, parentSelector) {
    this.src = src;
    this.alt = alt;
    this.title = title;
    this.parent = document.querySelector(parentSelector);
    this.descr = descr;
    this.price = price;
    this.currency = 45;
    this.changeToUAH();
  }

  changeToUAH() {
    this.price = this.price * this.currency;
  }

  renderMenuItem() {
    // const menuItem = document.createElement("div");
    // menuItem.innerHTML = `
    // <div class="menu__item">
    //     <img src=${this.src} alt=${this.alt}>
    //     <h3 class="menu__item-subtitle">${this.title}</h3>
    //     <div class="menu__item-descr">
    //         ${this.descr}
    //     </div>
    //     <div class="menu__item-divider"></div>
    //     <div class="menu__item-price">
    //         <div class="menu__item-cost">Price:</div>
    //         <div class="menu__item-total"><span>${this.price}</span> UAH/day</div>
    //     </div>
    // </div>
    //       `;
    // this.parent.append(menuItem);

    this.parent.innerHTML += `
    <div class="menu__item">
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">
            ${this.descr}
        </div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Price:</div>
            <div class="menu__item-total"><span>${this.price}</span> UAH/day</div>
        </div>
    </div>
          `;
  }
}

for (let i = 0; i < 3; i++) {
  new MenuItem(
    "img/tabs/vegy.jpg",
    "vegy",
    "Fitness menu",
    "Fresh vegetables and fruits for active and healthy people.",
    20,
    ".menu .container",
  ).renderMenuItem();
}
