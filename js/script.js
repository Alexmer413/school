//"use strict"

let animItems = document.querySelectorAll('._anim-items');
let header = document.querySelector('.header');

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll() {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight; //высота элемента
            const animItemOffset = offset(animItem).top; //координата элемента, то есть расстояние от верха страницы вообще до его начала
            const animStart = 4; //момент старта анимации

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) { //если высота элемента больш чем высота окна браузера
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((window.scrollY > (animItemOffset - animItemPoint)) && window.scrollY < (animItemOffset + animItemHeight)) { //window.scrollY  - это координата прокрутки
                animItem.classList.add('_active'); //добавляем класс если координата прокрутки находится на объекте      //pageYOffset - то же самое 
            }
            else {
                if (!animItem.classList.contains('_anim-no-hide')) {
                    animItem.classList.remove('_active');
                }
            }
        }

        //моя часть для появления header

        // const header = headerElement[0];
        if (window.scrollY > window.innerHeight) { //то есть если докрутили выше одного экрана 
            header.classList.add('_active'); //  
        }
        else {
            header.classList.remove('_active');
        }
        ///////////////////////////

    }


    function offset(el) { //функция для вычисления координат элемента
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.scrollX || document.documentElement.scrollLeft,
            scrollTop = window.scrollY || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }

    setTimeout(() => { //запускаем работу функции, чтобы она срабатывала не только когда начнем скроллить
        animOnScroll(); //но и когда элемент при открытии страницы уже на экране
    }, 300);
}

////////клик по кнопке

const mailusElement = document.querySelector('.mailus__img');
const mailusItems = document.querySelectorAll('.mailus__item');

if (mailusItems.length > 0) {
    mailusElement.addEventListener('click', mailToOpen);
    function mailToOpen() {
        for (index = 0; index < mailusItems.length; index++) {
            const mailusItem = mailusItems[index];
            mailusItem.classList.toggle('_active');
            mailusElement.classList.toggle('_active');
        }
    }
}


/*----Fancybox----*/

Fancybox.bind('[data-fancybox="gallery"]', {
    hideScrollbar: false,
    //closeButton: true,
    //loop: false,

    Toolbar: {
        display: {
            left: [],
            middle: [],
            right: ['close'],
        },
    },

    Thumbs: false,
});

Fancybox.bind('[data-fancybox="single"]', {
    groupAttr: false,
    hideScrollbar: false,
});






/* КНОПКА НАВЕРХ*/

// считываем кнопку
const goTopBtn = document.querySelector(".go-top");

// обработчик на нажатии
goTopBtn.addEventListener("click", goTop);

function goTop() {
    // пока не вернулись в начало страницы
    if (window.pageYOffset > 0) {
        // скроллим наверх
        window.scrollBy(0, -30); // второй аргумент - скорость
        setTimeout(goTop, 0); // входим в рекурсию
    }
}



/*--------переходы к разделам---------*/

const navLinks = document.querySelectorAll('.nav__link[data-goto]');
//console.log(navLinks);
if (navLinks.length > 0) {
    navLinks.forEach(navLink => {
        navLink.addEventListener("click", onMemuLinkClick);
    });
    function onMemuLinkClick(e) {

        const navLink = e.target;
        if (navLink.dataset.goto && document.querySelector(navLink.dataset.goto)) {
            const gotoBlock = document.querySelector(navLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;

            /*    if (burger.classList.contains('_active')) {
                    burger.classList.remove('_active');
                    nav.classList.remove('_active');
                    document.body.classList.remove('_lock');
                    window.scrollTo({
                        top: gotoBlockValue,
                        behavior: "auto"
                    });
                }*/

            window.scrollTo({
                top: gotoBlockValue,
                // behavior: "smooth"
                behavior: 'auto'
            });

            e.preventDefault();
        }
    }
}




/*========popup_js========*/


const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');//добавляем этот класс общему объекту body и к фиксированным объектам, так как они к body не привязаны, и будут сдвигаться

let unlock = true;
const timeOut = 600; //чтобы пока открывается окно заблокировать вторичное нажатие на окна

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener("click", function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const currentPopup = document.getElementById(popupName);
            popupOpen(currentPopup);
            e.prevrntDefault(); //запрещает ссылке перезагружать страницу
        });                     //то есть поскольку мы нажали на ссылку, а открываем окно сами через JS
        //то мы блокируем работы ссылки по умолчанию
    }
}

const popupCloseIcon = document.querySelectorAll('.popup_js-close');
if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup_js'));//ищет ближайшего родителя нашего крестика с классом popup, наш закрывашка находится внутри своего окна, которое надо закрыть
            e.preventDefault();
        });
    }
}

function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
        
        if (!currentPopup.classList.contains("popup-double")){
            const popupActive = document.querySelector('.popup_js.open');
              if (popupActive) {   //убрал это чтобы при открытии второго окна первое не закрывалось так как нам нужно возвращаться на него
                  popupClose(popupActive, false);
              } else {
            bodyLock(); //скрывает скролл
              }
        }
        else{
            bodyLock(); //скрывает скролл
        }
        
        //  if (popupActive) {   //убрал это чтобы при открытии второго окна первое не закрывалось так как нам нужно возвращаться на него
        //      popupClose(popupActive, false);
        //  } else {
      //  bodyLock(); //скрывает скролл
        //  }
        currentPopup.classList.add('open');
        currentPopup.addEventListener("click", function (e) {
            if (!e.target.closest('.popup_js__content')) {
                popupClose(e.target.closest('.popup_js'));
            }
        });
    }
}

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {

        popupActive.classList.remove('open');

        if (doUnlock && !document.querySelector('.popup_js.open')) { //добавил в проверку правую часть чтобы не возвращять скролл если открыто ещё какое-то окно
            bodyUnLock();
        }
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeOut);
}

function bodyUnLock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeOut); //чтобы скролл появлялся только после закрытия окна а не сразу после нажатия

    unlock = false; //блокируем возможность повторного открытия окна пока окно закрывается
    setTimeout(function () {
        unlock = true;
    }, timeOut);
}

document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup_js.open');
        popupClose(popupActive);
    }
});

//дальше идут полифилы для свойств closest и matches
//так как свойства новые, то, чтобы старый браузер понимал, что с ними делать
//мы добавляем блок кода который ему расшифровывает на понятном языке

(function () {
    if (!Element.prototype.closest) {//если нет прототипа для этого свойства
        Element.prototype.closest = function (css) {
            var node = this;
            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }
})();

(function () {
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector
    }
})();



//всплывающее окно через 5 секунд после того как дойдет до этого кода обработчик
//а можно поидее от времени загрузки отсчитать
/*setTimeout(function(){ 
    document.getElementById("timer-open").click();
}, 5000);*/