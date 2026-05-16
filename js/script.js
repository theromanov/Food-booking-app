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

// Axios method

// axios.get("http://localhost:3000/menu").then((res) => {
//   res.data.forEach(({ img, altimg, title, descr, price }) => {
//     new MenuItem(
//       img,
//       altimg,
//       title,
//       descr,
//       price,
//       ".menu .container",
//     ).renderMenuItem();
//   });
// });

// async/await

const getResource = async (url) => {
  const data = await fetch(url);

  if (!data.ok) {
    throw new Error(`Відбулася помилка: ${data.status}`);
  }

  return await data.json();
};

getResource("http://localhost:3000/menu").then((res) => {
  res.forEach(({ img, altimg, title, descr, price }) => {
    new MenuItem(
      img,
      altimg,
      title,
      descr,
      price,
      ".menu .container",
    ).renderMenuItem();
  });
});

// alternative

// function createCard(data) {
//   data.forEach(({ img, altimg, title, descr, price }) => {
//     const menuCard = document.createElement("div");
//     menuCard.classList.add("menu__item");

//     const newPrice = price * 45;

//     menuCard.innerHTML = `
//         <div class="menu__item">
//             <img src="${img}" alt="${altimg}">
//             <h3 class="menu__item-subtitle">${title}</h3>
//             <div class="menu__item-descr">
//                 ${descr}
//             </div>
//             <div class="menu__item-divider"></div>
//             <div class="menu__item-price">
//                 <div class="menu__item-cost">Price:</div>
//                 <div class="menu__item-total"><span>${newPrice}</span> UAH/day</div>
//             </div>
//         </div>
//       `;

//     document.querySelector(".menu .container").append(menuCard);
//   });
// }

// getResource("http://localhost:3000/menu").then((data) => {
//   createCard(data);
// });

// Forms

const forms = document.querySelectorAll("form");

const messages = {
  loading: "img/form/spinner.svg",
  success: "The data has been succesfully sent!",
  failure: "Something went wrong...",
};

forms.forEach((item) => bindPostData(item));

const postData = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: data,
  });

  if (!response.ok) {
    throw new Error(`Відбулася помилка: ${response.status}`);
  } else {
    return await response.json();
  }
};

function bindPostData(form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const statusMessage = document.createElement("img");
    statusMessage.classList.add("loadingicon");
    statusMessage.src = messages["loading"];
    form.insertAdjacentElement("afterend", statusMessage);

    const formData = new FormData(form);

    const json = JSON.stringify(Object.fromEntries(formData.entries()));

    postData("http://localhost:3000/requests", json)
      .then((data) => {
        (showNotificationModal(messages["success"]), statusMessage.remove());
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

// Slides

const slides = document.querySelectorAll(".offer__slide"),
  slider = document.querySelector(".offer__slider"),
  prevBtn = document.querySelector(".offer__slider-prev"),
  nextBtn = document.querySelector(".offer__slider-next"),
  current = document.querySelector("#current"),
  total = document.querySelector("#total"),
  slidesWrapper = document.querySelector(".offer__slider-wrapper"),
  slidesField = document.querySelector(".offer__slider-inner"),
  width = window.getComputedStyle(slidesWrapper).width;

let sliderIndex = 1;
let offset = 0;

if (slides.length < 10) {
  total.textContent = `0${slides.length}`;
} else {
  total.textContent = slides.length;
}

function checkSliderIndex(n) {
  if (n < 10) {
    current.textContent = `0${n}`;
  } else {
    current.textContent = n;
  }
}

function updateDots() {
  dots.forEach((dot) => {
    dot.style.opacity = 0.5;
  });

  dots[sliderIndex - 1].style.opacity = 1;
}

function updateSlider() {
  slidesField.style.transform = `translateX(-${offset}px)`;
  checkSliderIndex(sliderIndex);
}

checkSliderIndex(sliderIndex);

slidesWrapper.style.overflow = "hidden";

slidesField.style.display = "flex";
slidesField.style.width = 100 * slides.length + "%";
slidesField.style.transition = ".5s all";

slides.forEach((slide) => {
  slide.style.width = width;
});

// Breadcrumbs / Navigation

slider.style.position = "relative";

const indicators = document.createElement("ul"),
  dots = [];

indicators.classList.add("carousel-indicators");
indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
`;

slider.append(indicators);

for (let i = 0; i < slides.length; i++) {
  const dot = document.createElement("li");
  dot.setAttribute("data-slide-to", i + 1);

  dot.style.cssText = `
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    transition: opacity .6s ease;
    `;

  if (i == 0) {
    dot.style.opacity = 1;
  }

  indicators.append(dot);
  dots.push(dot);
}

function getNumericValue(str) {
  return +str.replace(/\D/g, "");
}

nextBtn.addEventListener("click", () => {
  if (offset == getNumericValue(width) * (slides.length - 1)) {
    offset = 0;
  } else {
    offset += getNumericValue(width);
  }

  if (sliderIndex == slides.length) {
    sliderIndex = 1;
  } else {
    sliderIndex++;
  }

  updateSlider();
  updateDots();
});

prevBtn.addEventListener("click", () => {
  if (offset == 0) {
    offset = getNumericValue(width) * (slides.length - 1);
  } else {
    offset -= getNumericValue(width);
  }

  if (sliderIndex == 1) {
    sliderIndex = slides.length;
  } else {
    sliderIndex--;
  }

  updateSlider();
  updateDots();
});

dots.forEach((dot) => {
  dot.addEventListener("click", (e) => {
    const slideTo = e.target.getAttribute("data-slide-to");

    sliderIndex = slideTo;

    offset = getNumericValue(width) * (slideTo - 1);

    updateSlider();
    updateDots();
  });
});

// showSlides(sliderIndex);

// if (slides.length < 10) {
//   total.textContent = `0${slides.length}`;
// } else {
//   total.textContent = slides.length;
// }

// function showSlides(n) {
//   if (n > slides.length) {
//     sliderIndex = 1;
//   }

//   if (n < 1) {
//     sliderIndex = slides.length;
//   }

//   slides.forEach((item) => (item.style.display = "none"));

//   slides[sliderIndex - 1].style.display = "block";

//   if (sliderIndex < 10) {
//     current.textContent = `0${sliderIndex}`;
//   } else {
//     current.textContent = sliderIndex;
//   }
// }

// prevBtn.addEventListener("click", () => {
//   showSlides((sliderIndex -= 1));
// });

// nextBtn.addEventListener("click", () => {
//   showSlides((sliderIndex += 1));
// });

// Calc

const result = document.querySelector(".calculating__result span");

let gender, height, weight, age, levelActivity;

if (localStorage.getItem("gender")) {
  gender = localStorage.getItem("gender");
} else {
  gender = "female";
  localStorage.setItem("gender", "female");
}

if (localStorage.getItem("levelActivity")) {
  levelActivity = localStorage.getItem("levelActivity");
} else {
  levelActivity = 1.375;
  localStorage.setItem("levelActivity", 1.375);
}

function initLocalSettings(selector, activeClass) {
  const elements = document.querySelectorAll(selector);

  elements.forEach((elem) => {
    elem.classList.remove(activeClass);
    if (elem.getAttribute("id") === localStorage.getItem("gender")) {
      elem.classList.add(activeClass);
    }

    if (
      elem.getAttribute("data-activity") ===
      localStorage.getItem("levelActivity")
    ) {
      elem.classList.add(activeClass);
    }
  });
}

initLocalSettings("#gender div", "calculating__choose-item_active");
initLocalSettings(
  ".calculating__choose_big div",
  "calculating__choose-item_active",
);

function calcTotal() {
  if (!gender || !height || !weight || !age || !levelActivity) {
    result.textContent = "enter your data";
    return;
  }

  if (gender === "female") {
    result.textContent = Math.round(
      (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * levelActivity,
    );
  } else {
    result.textContent = Math.round(
      (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * levelActivity,
    );
  }
}

calcTotal();

function getStaticInformation(selector, activeClass) {
  const elements = document.querySelectorAll(selector);

  // трюк делегування подій
  elements.forEach((elem) =>
    elem.addEventListener("click", (e) => {
      if (e.target.getAttribute("data-activity")) {
        levelActivity = +e.target.getAttribute("data-activity");
        localStorage.setItem(
          "levelActivity",
          +e.target.getAttribute("data-activity"),
        );
      } else {
        gender = e.target.getAttribute("id");
        localStorage.setItem("gender", e.target.getAttribute("id"));
      }

      elements.forEach((elem) => {
        elem.classList.remove(activeClass);
      });

      e.target.classList.add(activeClass);

      calcTotal();
    }),
  );
}

getStaticInformation("#gender div", "calculating__choose-item_active");
getStaticInformation(
  ".calculating__choose_big div",
  "calculating__choose-item_active",
);

function getDynamicInformation(selector) {
  const input = document.querySelector(selector);

  input.addEventListener("input", () => {
    if (input.value.match(/\D/g)) {
      input.style.border = "1px solid red";
    } else {
      input.style.border = "none";
    }

    switch (input.getAttribute("id")) {
      case "height":
        height = +input.value;
        break;
      case "weight":
        weight = +input.value;
        break;
      case "age":
        age = +input.value;
        break;
    }

    calcTotal();
  });
}

getDynamicInformation("#height");
getDynamicInformation("#weight");
getDynamicInformation("#age");
