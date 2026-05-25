"use strict";

import { showModal } from "./modal";
import { closeModal } from "./modal";
import { postData } from "../services/services";

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

    showModal(".modal", modalTimeoutId);

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
      closeModal(".modal");
      modalDialog.classList.remove("hide");
    }, 3000);
  }
}

export default forms;
