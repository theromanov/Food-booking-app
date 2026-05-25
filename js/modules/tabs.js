"use strict";

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

export default tabs;
