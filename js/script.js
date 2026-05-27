"use strict";
require("es6-promise").polyfill();
import "nodelist-foreach-polyfill";

import calc from "./modules/calc";
import cards from "./modules/cards";
import forms from "./modules/forms";
import modal, { showModal } from "./modules/modal";
import slides from "./modules/slides";
import tabs from "./modules/tabs";
import timer from "./modules/timer";
import time from "./modules/timer";

const modalTimeoutId = setTimeout(() => {
  showModal(".modal", modalTimeoutId);
}, 50000);

calc();
cards();
forms("form", modalTimeoutId);
modal("[data-modal]", ".modal", modalTimeoutId);
slides({
  container: ".offer__slider",
  slide: ".offer__slide",
  nextArr: ".offer__slider-next",
  prevArr: ".offer__slider-prev",
  totalCounter: "#total",
  currentCounter: "#current",
  wrapper: ".offer__slider-wrapper",
  field: ".offer__slider-inner",
});
tabs(
  ".tabheader__item",
  ".tabcontent",
  ".tabheader__items",
  "tabheader__item_active",
);
timer(".timer", "2026-07-27");
