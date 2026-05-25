/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js"
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


function calc() {
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);


/***/ },

/***/ "./js/modules/cards.js"
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");




function cards() {
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

  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)("http://localhost:3000/menu").then((res) => {
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);


/***/ },

/***/ "./js/modules/forms.js"
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");






function forms(formSelector, modalTimeoutId) {
  // Forms

  const forms = document.querySelectorAll(formSelector);

  const messages = {
    loading: "img/form/spinner.svg",
    success: "The data has been succesfully sent!",
    failure: "Something went wrong...",
  };

  forms.forEach((item) => bindPostData(item));

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.classList.add("loadingicon");
      statusMessage.src = messages["loading"];
      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)("http://localhost:3000/requests", json)
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

    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showModal)(".modal", modalTimeoutId);

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
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(".modal");
      modalDialog.classList.remove("hide");
    }, 3000);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);


/***/ },

/***/ "./js/modules/modal.js"
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   showModal: () => (/* binding */ showModal)
/* harmony export */ });


function showModal(modalSelector, modalTimeoutId) {
  const modalWindow = document.querySelector(modalSelector);
  modalWindow.style.display = "block";
  document.documentElement.style.overflow = "hidden";

  console.log(modalTimeoutId);
  if (modalTimeoutId) {
    clearInterval(modalTimeoutId);
  }
}

function closeModal(modalSelector) {
  const modalWindow = document.querySelector(modalSelector);
  modalWindow.style.display = "none";
  document.documentElement.style.overflow = "";
}

function modal(triggerSelector, modalSelector, modalTimeoutId) {
  // Modal

  const modalWindow = document.querySelector(modalSelector),
    modalTriggerBtn = document.querySelectorAll(triggerSelector);

  function showModalScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 5
    ) {
      showModal(modalSelector, modalTimeoutId);
      window.removeEventListener("scroll", showModalScroll);
      clearTimeout(modalTimeoutId);
    }
  }

  modalTriggerBtn.forEach((item) => {
    item.addEventListener("click", () => {
      showModal(modalSelector, modalTimeoutId);
    });
  });

  modalWindow.addEventListener("click", (e) => {
    if (e.target == modalWindow || e.target.hasAttribute("data-close")) {
      closeModal(modalSelector);
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.code == "Escape") {
      closeModal(modalSelector);
    }
  });

  window.addEventListener("scroll", showModalScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);




/***/ },

/***/ "./js/modules/slides.js"
/*!******************************!*\
  !*** ./js/modules/slides.js ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


function slides({
  container,
  slide,
  nextArr,
  prevArr,
  totalCounter,
  currentCounter,
  wrapper,
  field,
}) {
  // Slides

  const slides = document.querySelectorAll(slide),
    slider = document.querySelector(container),
    prevBtn = document.querySelector(prevArr),
    nextBtn = document.querySelector(nextArr),
    current = document.querySelector(currentCounter),
    total = document.querySelector(totalCounter),
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slides);


/***/ },

/***/ "./js/modules/tabs.js"
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


function tabs(
  tabsSelector,
  tabsContentSelector,
  tabsParentSelector,
  activeClass,
) {
  // Tabs

  const tabContent = document.querySelectorAll(tabsContentSelector),
    tabItem = document.querySelectorAll(tabsSelector),
    tabParent = document.querySelector(tabsParentSelector);

  function hideTabs() {
    tabContent.forEach((item, i) => {
      item.style.display = "none";
      tabContent[i].classList.remove("myOwnAnimation");
    });
    tabItem.forEach((item) => {
      item.classList.remove(activeClass);
    });
  }

  hideTabs();

  function showTabs(i = 0) {
    tabItem[i].classList.add(activeClass);
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

    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabItem.forEach((item, i) => {
        if (target == item) {
          hideTabs();
          showTabs(i);
        }
      });
    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);


/***/ },

/***/ "./js/modules/timer.js"
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ },

/***/ "./js/services/services.js"
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResource: () => (/* binding */ getResource),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });


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

const getResource = async (url) => {
  const data = await fetch(url);

  if (!data.ok) {
    throw new Error(`Відбулася помилка: ${data.status}`);
  }

  return await data.json();
};





/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slides__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slides */ "./js/modules/slides.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");











const modalTimeoutId = setTimeout(() => {
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.showModal)(".modal", modalTimeoutId);
}, 50000);

(0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__["default"])();
(0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
(0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])("form", modalTimeoutId);
(0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])("[data-modal]", ".modal", modalTimeoutId);
(0,_modules_slides__WEBPACK_IMPORTED_MODULE_4__["default"])({
  container: ".offer__slider",
  slide: ".offer__slide",
  nextArr: ".offer__slider-next",
  prevArr: ".offer__slider-prev",
  totalCounter: "#total",
  currentCounter: "#current",
  wrapper: ".offer__slider-wrapper",
  field: ".offer__slider-inner",
});
(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])(
  ".tabheader__item",
  ".tabcontent",
  ".tabheader__items",
  "tabheader__item_active",
);
(0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])(".timer", "2026-07-27");

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map