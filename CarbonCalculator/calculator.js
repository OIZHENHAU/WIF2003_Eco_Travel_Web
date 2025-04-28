let accomodationBtn = document.getElementById("accomodationBtn")
let vehicleBtn = document.getElementById("vehicleBtn")
let restaurantBtn = document.getElementById("restaurantBtn")

function toggleContent(buttonId, contentId) {
    //remove active class from all buttons
    document.querySelectorAll(".toggle-btn").forEach(btn => btn.classList.remove("active"))
    //hide all category content
    document.querySelectorAll(".category").forEach(category => category.style.display = "none")

    document.getElementById(contentId).style.display = "block";
    document.getElementById(buttonId).classList.add("active")
}

function test() {
    console.log("test print")
}

