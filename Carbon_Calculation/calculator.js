// let accomodationBtn = document.getElementById("accomodationBtn")
// let vehicleBtn = document.getElementById("vehicleBtn")
// let restaurantBtn = document.getElementById("restaurantBtn")

const defaultBtn = "accomodationBtn"
const defaultContent = "accomodation"

const offsetCarbon = document.getElementById('offsetNow');

offsetCarbon.addEventListener('click', () => {
    window.location.href = `../Page-22/carbonOffset.html`;
    
});

toggleContent(defaultBtn, defaultContent)

function toggleContent(buttonId, contentId) {
    //remove active class from all buttons
    document.querySelectorAll(".toggle-btn").forEach(btn => btn.classList.remove("active"))
    //hide all category content
    document.querySelectorAll(".category").forEach(category => category.style.display = "none")

    document.getElementById(contentId).style.display = "block"
    document.getElementById(buttonId).classList.add("active")
}

function test() {
    console.log("test print")
}

