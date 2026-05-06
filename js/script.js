"use strict";

// Tabs

const tabContent = document.querySelectorAll(".tabcontent"),
  tabItem = document.querySelectorAll(".tabheader__item"),
  tabParent = document.querySelector(".tabheader__items");

function hideTabs() {
  tabContent.forEach((item, i) => {
    item.style.display = "none";
    tabContent[i].classList.remove("myOwnAnimation");
  });
  tabItem.forEach((item) => {
    item.classList.remove("tabheader__item_active");
  });
}

hideTabs();

function showTabs(i = 0) {
  tabItem[i].classList.add("tabheader__item_active");
  tabContent[i].classList.add("myOwnAnimation");
  tabContent[i].style.display = "block";
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

// Modal

const modalWindow = document.querySelector(".modal"),
  modalTriggerBtn = document.querySelectorAll("[data-modal]");

function showModal() {
  modalWindow.style.display = "block";
  document.documentElement.style.overflow = "hidden";
  window.removeEventListener("scroll", showModalScroll);
}

function closeModal() {
  modalWindow.style.display = "none";
  document.documentElement.style.overflow = "";
}

function showModalScroll() {
  if (
    window.pageYOffset + document.documentElement.clientHeight >=
    document.documentElement.scrollHeight - 5
  ) {
    showModal();
    window.removeEventListener("scroll", showModalScroll);
    clearTimeout(modalTimeoutId);
  }
}

modalTriggerBtn.forEach((item) => {
  item.addEventListener("click", showModal);
});

modalWindow.addEventListener("click", (e) => {
  if (e.target == modalWindow || e.target.hasAttribute("data-close")) {
    closeModal();
  }
});

window.addEventListener("keydown", (e) => {
  if (e.code == "Escape") {
    closeModal();
  }
});

const modalTimeoutId = setTimeout(showModal, 50000);

window.addEventListener("scroll", showModalScroll);

// Cards

class MenuItem {
  constructor(src, alt, title, descr, price, parentSelector, ...classes) {
    this.src = src;
    this.alt = alt;
    this.title = title;
    this.descr = descr;
    this.price = price;
    this.classes = classes;
    this.parent = document.querySelector(parentSelector);
    this.currency = 45;
    this.changeToUAH();
  }

  changeToUAH() {
    this.price = this.price * this.currency;
  }

  renderMenuItem() {
    const menuItem = document.createElement("div");

    if (this.classes.length === 0) {
      this.menuItem = "menu__item";
      menuItem.classList.add(this.menuItem);
    } else {
      this.classes.forEach((className) => menuItem.classList.add(className));
    }

    menuItem.innerHTML = `

        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">
            ${this.descr}
        </div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Price:</div>
            <div class="menu__item-total"><span>${this.price}</span> UAH/day</div>
        </div>`;
    this.parent.append(menuItem);

    // this.parent.innerHTML += `
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
    // "menu__item",
    // "big",
  ).renderMenuItem();
}

// Forms

const forms = document.querySelectorAll("form");

const messages = {
  loading: "img/form/spinner.svg",
  success: "The data has been succesfully sent!",
  failure: "Something went wrong...",
};

forms.forEach((item) => sendData(item));

function sendData(form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const statusMessage = document.createElement("img");
    statusMessage.classList.add("loadingicon");
    statusMessage.src = messages["loading"];
    // form.append(statusMessage);
    form.insertAdjacentElement("afterend", statusMessage);

    const formData = new FormData(form);

    const obj = {};

    formData.forEach((value, key) => {
      obj[key] = value;
    });

    fetch("server.php", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Вібулася помилка:  ${res.status}`);
        } else {
          return res.text();
        }
      })
      .then((data) => {
        ((console.log(data), showNotificationModal(messages["success"])),
          statusMessage.remove());
      })
      .catch((error) => {
        console.log("Помилка при відправці: ", error);
        showNotificationModal(messages["failure"]);
        statusMessage.remove();
      })
      .finally(() => form.reset());
  });
}

function showNotificationModal(message) {
  const modalDialog = document.querySelector(".modal__dialog");

  modalDialog.classList.add("hide");

  showModal();

  const notificationModal = document.createElement("div");
  notificationModal.classList.add("modal__dialog");
  notificationModal.innerHTML = `
    <div class="modal__content">
            <div data-close class="modal__close">&times;</div>
            <div class="modal__title">${message}</div>
    </div>
    `;
  document.querySelector(".modal").append(notificationModal);

  setTimeout(() => {
    notificationModal.remove();
    closeModal();
    modalDialog.classList.remove("hide");
  }, 3000);
}
