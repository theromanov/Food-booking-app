"use strict";

import { getResource } from "../services/services";

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
}

export default cards;
