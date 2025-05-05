const swiper = new Swiper(".swiper", {
    slidePerView: 1,
    effect: "creative",
    creativeEffect: {
        prev: {
            translate: [0, 0, -400],
        },

        next: {
            translate: ["100%", 0, 0],
        },
    },
    loop: true,
    direction: "horizontal",

    autoplay: {
        delay: 5000,
    },

    speed: 400,
    spaceBetween: 100

});


const swiper2 = new Swiper(".swiper2", {
    slidesPerView: 3,
    spaceBetween: 30,
    slidesPerGroup: 1,
    
    loop: true,
    fade: true,
    centerSlide: true,
    grabCursor: true,
    loopfillGroupwithBlank: true,

    autoplay: {
        delay: 5000,
    },

    speed: 400,
    spaceBetween: 40

});

