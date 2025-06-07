const menus = document.querySelector("nav ul");
const header = document.querySelector("header");
const menuBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector(".close-btn");

const likeButton = document.querySelector(".favourite-btn");
const searchNowButton = document.querySelector(".primary-btn");


menuBtn.addEventListener("click", () => {
    menus.classList.add("display"); 
});

closeBtn.addEventListener("click", () => {
    menus.classList.remove("display"); 
})


//scroll sticky navbar
window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > 20) {
        header.classList.add('sticky');

    } else {
        header.classList.remove('sticky');
    }
});


