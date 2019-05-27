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
