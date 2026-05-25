"use strict";

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

export default modal;
export { showModal };
export { closeModal };
