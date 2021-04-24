// Класс  main-nav__toggle- -closed по умолчанию,- мобильное меню закрыто, для его
// открытия нужно нажать на кнопку бургера, для закрытия тоже нажать на крестик
// Переменные для открытия и закрытия верхнего меню в мобилке

var mainNavToggle = document.querySelector(".main-nav__toggle");
var listToggle = document.querySelector(".main-nav__list");
var logoToggle = document.querySelector(".page-header__logo");

// действия по умолчанию -Если есть JS, то лишние классы ниже убираются,
// добавляется -конкретно класс закрытого меню - и у нас грузится страница, со спрятанным меню

mainNavToggle.classList.remove("main-nav__toggle--nojs");
mainNavToggle.classList.remove("main-nav__toggle--closed");
listToggle.classList.add("site-list--closed");
logoToggle.classList.remove("page-header__logo--mobile");

// Открываем и закрываем меню в мобильной версии

mainNavToggle.addEventListener("click", function(evt) {
  evt.preventDefault();
  mainNavToggle.classList.toggle("main-nav__toggle--closed");
  listToggle.classList.toggle("site-list--closed");
  logoToggle.classList.toggle("page-header__logo--mobile");
});

// кнопка наверх в мобилке при скроле окна на 800px появляется, а если меньше - исчезает, таблетке и десктопе не исчезает
var button = document.querySelector(".button-up");

window.addEventListener("scroll", function(){
  if (window.pageYOffset > 800) {
    button.classList.add( 'button-up--visible' );
    // button.classList.remove('button-up--hiden');
  } else if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    // button.classList.add('button-up--hiden');
    button.classList.remove( 'button-up--visible' );
  }
});

// Ищем поля, чб фокус устанавливался автоматически

var form = document.querySelector("#feedback-form");
var feedbackName = document.querySelector("#name");
var feedbackSurname = document.querySelector("#surname");
var feedbackTel = document.querySelector("#tel");
var feedbackEmail = document.querySelector("#email");
var feedbackField = document.querySelector("#feedback");

// Записываем в локальное хранилище данные

var storageName = localStorage.getItem("name");
var storageSurname = localStorage.getItem("surname");
var storageTel = localStorage.getItem("tel");
var storageEmail = localStorage.getItem("email");

if (feedbackName) {
  feedbackName.focus();
}
// Получается, что атрибут input.getAttribute('value') хранит оригинальное (исходное) значение даже после того, как пользователь заполнил поле и свойство изменилось.

// Например, можно взять изначальное значение из атрибута и сравнить со свойством, чтобы узнать, изменилось ли значение. А при необходимости и перезаписать свойство атрибутом, отменив изменения.




// Слайдер с отзывами
var sliderBtnttonNext = document.querySelector(".reviews__next");
var sliderBtnttonPrev = document.querySelector(".reviews__prev");
var sliderInputs = document.querySelectorAll(".reviews__input");
// псевдомассив sliderInputs  и его длинна sliderInputs.length
var numbersSliderInputs = sliderInputs.length;

sliderBtnttonNext.addEventListener("click", setNextSlide);
sliderBtnttonPrev.addEventListener("click", setPrevSlide);

function setNextSlide() {
  var currentSlide = getCurrentSlide();
  // Это надо коммент!!!!
  var nextSlide;
  if (currentSlide + 1 === numbersSliderInputs) {
    nextSlide = 0;
  } else {
    nextSlide = currentSlide + 1;
  }
  sliderInputs[nextSlide].checked = true;
}

function setPrevSlide() {
  var currentSlide = getCurrentSlide();
  // индекс следующего слайда, который будем показывать
  var nextSlide;
  if (currentSlide === 0) {
    // если первый слайд нашли индекс 0, то переходим на последний (3) numbersSliderInputs -все количестов -1 = 2 - индекс последнего слайда
    nextSlide = numbersSliderInputs - 1;
  } else {
    // если это не последний слайд, например 2, то переходим на первый
    nextSlide = currentSlide - 1;
  }
  sliderInputs[nextSlide].checked = true;
}
// Как получаем .checked???????????????мы же на input click, а не на button
function getCurrentSlide() {
  for (var i = 0; i < numbersSliderInputs; i++) {
    if (sliderInputs[i].checked) {
      return i;
    } 
  }
}