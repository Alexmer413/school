let pageSlider = new Swiper('.image-slider', {
    navigation: {
        nextEl: '.swiper-right',
        prevEl: '.swiper-left'
    },

    //навигация
    //буллеты, текущее положение, прогресс бар

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
     //autoHeight: true,
     slidesPerView: 1, //можно не целые числа, например 2.5
	 spaceBetween: 8, // отступы между слайдами
	 //centeredSlides: true,

    //  effect: 'fade',
    //  fadeEffect: {
    //      crossFade: true
    //  },
    // effect: 'flip',
    // flipEffect:{
    //     slideShadows: true,
    //     limitRotation: true
    // }
   /* effect: 'cube',
    cubeEffect: {
        slideShadows: true,
        shadow: true,
        shadowOffset: 20,
        shadowScale: 0.94

    },*/
	//slideToClickedSlide: true,//переключает по клику
	keyboard: {
		enabled: true,
	},
    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        480: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 2.5,
        }

    },

});


////////////////////////////////////


let mainSlider = new Swiper('.main-slider', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },

    //навигация
    //буллеты, текущее положение, прогресс бар

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
     //autoHeight: true,
     slidesPerView: 1, //можно не целые числа, например 2.5
	 spaceBetween: 8, // отступы между слайдами
	 //centeredSlides: true,

    //  effect: 'fade',
    //  fadeEffect: {
    //      crossFade: true
    //  },
    // effect: 'flip',
    // flipEffect:{
    //     slideShadows: true,
    //     limitRotation: true
    // }
   /* effect: 'cube',
    cubeEffect: {
        slideShadows: true,
        shadow: true,
        shadowOffset: 20,
        shadowScale: 0.94

    },*/
	//slideToClickedSlide: true,//переключает по клику
	keyboard: {
		enabled: true,
	},
   /* breakpoints: {
        320: {
            slidesPerView: 1,
        },
        480: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 2.5,
        }

    },*/

});
