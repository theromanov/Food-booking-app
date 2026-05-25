"use strict";

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

export default calc;
