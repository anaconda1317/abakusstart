document.addEventListener('DOMContentLoaded', function(){
  var link = document.querySelector(".banner__action-сall");
  var popup = document.querySelector(".modal__window");
  var cards = document.querySelector('.card-list-container');
 
  if(popup){
    var modalButton =popup.querySelector(".modal__button");
    var close = popup.querySelector(".modal-close");
  
    var mainForm = popup.querySelector("form");
    var name = popup.querySelector("[name=name]");
    var tel = popup.querySelector("[name=phone]");
    
    var isStorageSupport = true;
    var storage = ""; 
    if(link){
      link.addEventListener("click", function (evt) {
        evt.preventDefault();
        popup.classList.add("modal-show");
        // форма открылась -сразу автофокус ставим
        if (name) {
          name.focus();
        }
      });
    }
    if(document.querySelector('.modal-open')){ 
        openModal(document.querySelector('.modal-open'))
    }
    function openModal(element) {
      
      
      element.addEventListener("click", function (evt) { 
        if(evt.currentTarget.classList.contains('modal-open')) {
          var hiddenInput = document.querySelector('.hidden__input-current__name')
          hiddenInput.setAttribute('value', evt.currentTarget.dataset.name);
        }
        evt.preventDefault();
        popup.classList.add("modal-show");
        // форма открылась -сразу автофокус ставим
        if (name) {
          name.focus();
        }
      });
    }
    if(cards){
      var btnOrders = cards.querySelectorAll('.modal-open');
     
      btnOrders.forEach(function(element ){ 
        openModal(element);
      } );
    }
    // скрипт при заполнениии формы кнопка меняет цвет
     
    function validateForm(context) {
        if(context.querySelector('input[type=text]').value !== ''
            && context.querySelector('input[type=tel]').value !== ''
            && context.querySelector('input[type=checkbox]').checked
        ){
            context.querySelector('button[type=submit]').classList.add('modal__button-undisabled');
            context.querySelector('button[type=submit]').removeAttribute('disabled');
        }else{
            context.querySelector('button[type=submit]').classList.remove('modal__button-undisabled');
            context.querySelector('button[type=submit]').setAttribute('disabled', 'disabled');
        }
    }
    mainForm.addEventListener('input', function (e){
        validateForm(this);
    })
         
    close.addEventListener("click", function (evt) {
      evt.preventDefault();
      name.value = '';
      tel.value = '';
      popup.classList.remove("modal-show");
      popup.classList.remove("modal-error");
    });
  
    mainForm.addEventListener("submit", function (evt) {
      if (typeof(name.value) === "undefined" || typeof(tel.value) === "undefined") {
        evt.preventDefault();
        popup.classList.remove("modal-error");
        popup.offsetWidth = popup.offsetWidth;
        popup.classList.add("modal-error");
      }
    });
  
    window.addEventListener("keydown", function (evt) {
      if (evt.keyCode === 27) {
        evt.preventDefault();
        if (popup.classList.contains("modal-show")) {
          popup.classList.remove("modal-show");
          popup.classList.remove("modal-error");
        }
      }
    });
  }

  // sub-menu for uslugi in main menu  дополнит функции - закрытие sub-menu по клику пустого поля и  Esc
  function removeClassOpenMenu() {
    var menuItems = document.querySelectorAll(".site-list__item");
    menuItems.forEach(function (element) {
      element.classList.remove("__show_dropdown_sub");
    });
  }
  function closeSubMenu() {
    window.addEventListener("click", function (event) {
      if (!event.target.closest(".__show_dropdown_sub")) {
        removeClassOpenMenu();
      }
    });
  }
  
  // sub-menu for uslugi in main menu  - открытие на имобилке и таблетке

  if(window.innerWidth <= 768){
    var menuItems = document.querySelectorAll(".site-list__item")
    menuItems.forEach(function(el){
        el.addEventListener('click', function(e){
            if(el.querySelector('.sub-menu__ikon-wrapper') || el.querySelector('sub-menu__ikon')){
              if(e.target.classList.contains('sub-menu__ikon-wrapper') 
              || e.target.classList.contains('sub-menu__ikon') 
              || e.target.tagName == 'use'){
                el.classList.toggle('__show_dropdown_sub') 
              }
            }
           
        }) 
    }) 
    closeSubMenu();
    document.addEventListener("keydown", function (event) {
      if (event.code == "Escape") {
        removeClassOpenMenu();
      }
    });

  }

    // АНИМАЦИЮ СИРЕНВУЮ ДОБАВИТЬ!СКРИПТ
 

});
// маска телефона

// ее нет - она в index
// конец







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

// // кнопка наверх в мобилке при скроле окна на 800px появляется, а если меньше - исчезает, таблетке и десктопе не исчезает
// var button = document.querySelector(".button-up");

// window.addEventListener("scroll", function(){
//   if (window.pageYOffset > 800) {
//     button.classList.add( 'button-up--visible' );
//     // button.classList.remove('button-up--hiden');
//   } else if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
//     // button.classList.add('button-up--hiden');
//     button.classList.remove( 'button-up--visible' );
//   }
// });


// Новый код кнопка наверх в мобилке при скроле окна на 800px появляется, а если меньше - исчезает, при этом коде !!! НЕ ИСЧЕЗАЕТ!!!
// else if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) - на десктопе!!!!!!!!!

var button = document.querySelector('.button-up');
if(button){
    window.onscroll = function () {
        if (window.pageYOffset > 800) {
            button.classList.add('button-up--visible')
        } else {
            button.classList.remove( 'button-up--visible' );
        }
    };

  button.onclick = function () {
      window.scrollTo(0, 0);
  };
}
// Новый код кнопка наверх -КОНЕЦ

// Ищем поля, чб фокус устанавливался автоматически

var feedbackForm = document.querySelector("#feedback-form");
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

// Например, можно взять изначальное значение из атрибута и сравнить со свойством, чтобы узнать, изменилось ли значение.
//  А при необходимости и перезаписать свойство атрибутом, отменив изменения.

// Слайдер с отзывами
var sliderBtnttonNext = document.querySelector(".reviews__next");
var sliderBtnttonPrev = document.querySelector(".reviews__prev");
if(sliderBtnttonNext && sliderBtnttonPrev){
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
}