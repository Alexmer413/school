//"use strict"

let animItems = document.querySelectorAll('._anim-items');
let header = document.querySelector('.header');
let headerMove = document.querySelector('.header-move');

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
            headerMove.classList.add('_active'); //  
        }
        else {
            headerMove.classList.remove('_active');
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