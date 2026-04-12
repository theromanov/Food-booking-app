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
