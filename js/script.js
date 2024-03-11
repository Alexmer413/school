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



/*========LOCK_PADDING========*/

/*const fancyLinks = document.querySelectorAll('.fancybox__item');
const body = document.querySelector('body');

const lockPadding = document.querySelectorAll('.lock-padding');//добавляем этот класс общему объекту body и к фиксированным объектам, так как они к body не привязаны, и будут сдвигаться

let unlock = true;
const timeOut = 800;

if (fancyLinks.length > 0) {
    for (let index = 0; index < fancyLinks.length; index++) {
        const fancyLink = fancyLinks[index];
        fancyLink.addEventListener("click", function (e) {

            bodyLock();
            // e.preventDefault(); //запрещает ссылке перезагружать страницу
        });                     
    }
}


const fancyCloseIcon = document.querySelectorAll('[title = "close"]');
if (fancyCloseIcon.length > 0) {

    for (let index = 0; index < fancyCloseIcon.length; index++) {
        const el = fancyCloseIcon[index];
        el.addEventListener('click', function (e) {

            bodyUnLock();
            // e.preventDefault();
        });
    }
}


function fancyClose(fancyActive, doUnlock = true) {
    if (unlock) {
        fancyActive.classList.remove('open');
        if (doUnlock) {
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
        
    }, timeOut); 
    body.classList.remove('lock');
    unlock = false; //блокируем возможность повторного открытия окна пока окно закрывается
    setTimeout(function () {
        unlock = true;
    }, timeOut);
}*/


/* КНОПКА НАВЕРХ*/

// считываем кнопку
const goTopBtn = document.querySelector(".go-top");

// обработчик на скролл окна
window.addEventListener("scroll", trackScroll);
// обработчик на нажатии
goTopBtn.addEventListener("click", goTop);

function trackScroll() {
  // вычисляем положение от верхушки страницы
  const scrolled = window.pageYOffset;
  // считаем высоту окна браузера
  const coords = document.documentElement.clientHeight;
  // если вышли за пределы первого окна
  if (scrolled > coords) {
    // кнопка появляется
    goTopBtn.classList.add("go-top--show");
  } else {
    // иначе исчезает
    goTopBtn.classList.remove("go-top--show");
  }
}

function goTop() {
  // пока не вернулись в начало страницы
  if (window.pageYOffset > 0) {
    // скроллим наверх
    window.scrollBy(0, -55); // второй аргумент - скорость
    setTimeout(goTop, 0); // входим в рекурсию
  }
}