"use strict";

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

export default slides;
