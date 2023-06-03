var items = document.querySelectorAll('.carousel .carousel__item');
var currentItem = 0;
var isEnabled = true;

function changeCurrentItem(n) {
	currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
	isEnabled = false;
	items[currentItem].classList.add(direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('active', direction);
	});
}

function showItem(direction) {
	items[currentItem].classList.add('next', direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('next', direction);
		this.classList.add('active');
		isEnabled = true;
	});
}

function nextItem(n) {
	hideItem('to-left');
	changeCurrentItem(n + 1);
	showItem('from-right');
}

function previousItem(n) {
	hideItem('to-right');
	changeCurrentItem(n - 1);
	showItem('from-left');
}

document.querySelector('.carousel__control.left').addEventListener('click', function() {
	if (isEnabled) {
		previousItem(currentItem);
	}
});

document.querySelector('.carousel__control.right').addEventListener('click', function() {
	if (isEnabled) {
		nextItem(currentItem);
	}
});

// функция отслеживает состояние свайпа
var swipedetect = function(el) {
  
	var surface = el;
	var startX = 0;
	var startY = 0;
	var distX = 0;
	var distY = 0;
	var startTime = 0;
	var elapsedTime = 0;

	var threshold = 150;
	var restraint = 100;
	var allowedTime = 300;

	surface.addEventListener('mousedown', function(e){
		startX = e.pageX;
		startY = e.pageY;
		startTime = new Date().getTime();
		e.preventDefault();
	}, false);

	surface.addEventListener('mouseup', function(e){
		distX = e.pageX - startX;
		distY = e.pageY - startY;
		elapsedTime = new Date().getTime() - startTime;
		if (elapsedTime <= allowedTime){
			if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
				if ((distX > 0)) {
					if (isEnabled) {
						previousItem(currentItem);
					}
				} else {
					if (isEnabled) {
						nextItem(currentItem);
					}
				}
			}
		}
		e.preventDefault();
	}, false);

	surface.addEventListener('touchstart', function(e){
		if (e.target.classList.contains('carousel__arrow') || e.target.classList.contains('carousel__control')) {
			if (e.target.classList.contains('left')) {
				if (isEnabled) {
					previousItem(currentItem);
				}
			} else {
				if (isEnabled) {
					nextItem(currentItem);
				}
			}
		}
			var touchobj = e.changedTouches[0];
			startX = touchobj.pageX;
			startY = touchobj.pageY;
			startTime = new Date().getTime();
			// e.preventDefault();
	}, false);

	surface.addEventListener('touchmove', function(e){
			e.preventDefault();
	}, false);

	surface.addEventListener('touchend', function(e){
			var touchobj = e.changedTouches[0];
			distX = touchobj.pageX - startX;
			distY = touchobj.pageY - startY;
			elapsedTime = new Date().getTime() - startTime;
			if (elapsedTime <= allowedTime){
					if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
							if ((distX > 0)) {
								if (isEnabled) {
									previousItem(currentItem);
								}
							} else {
								if (isEnabled) {
									nextItem(currentItem);
								}
							}
					}
			}
			e.preventDefault();
	}, false);
}

var el = document.querySelector('.carousel');
swipedetect(el);

// slaider carusel отзывы end

// tooltip 
window.addEventListener('load', function(){ 
//   if(window.innerWidth <= 768){
    var tooltip = document.querySelector ('.tooltip__content');
    var tooltipTogle = document.querySelector ('.tooltip__toggle');


    if(tooltipTogle){
      tooltipTogle.addEventListener('click', function(){
        tooltip.classList.toggle('__opened');       
    }); 
      document.addEventListener("keydown", function (event) {
          if (event.code == "Escape") {
            tooltip.classList.remove('__opened');
          }
      });
    // }
  }
});

// chat
  window.addEventListener('load', function(){ 
    if(window.innerWidth <= 767){
      var chat = document.querySelector ('.chat__list');
      var chatTogle = document.querySelector ('.chat__btn-toggle--open');
      var chatClouse = document.querySelector ('.chat__btn-toggle--clouse');

      if(chatTogle){
        chatTogle.addEventListener('click', function(){
          chat.classList.add('chat__list--showed'); 
          chatClouse.classList.add('__show')
          chatClouse.classList.remove('__hide')
          chatTogle.classList.add('__hide')
  
      }); 
      chatClouse.addEventListener('click', function(){
          chat.classList.remove('chat__list--showed'); 
          chatClouse.classList.remove('__show')
          chatClouse.classList.add('__hide')
          chatTogle.classList.remove('__hide')
      }); 
        document.addEventListener("keydown", function (event) {
          // console.log(ev.keyCode); не вывел в консоль почему-то????
            if (event.code == "Escape") {
              chat.classList.remove('chat__list--showed');
            }
        });
      }
    }
  });
