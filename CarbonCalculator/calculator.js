let accomodationBtn = document.getElementById("accomodationBtn")
let vehicleBtn = document.getElementById("vehicleBtn")
let restaurantBtn = document.getElementById("restaurantBtn")

accomodationBtn.addEventListener("click", showCategory("accomodation"))
vehicleBtn.addEventListener("click", showCategory("vehicle"))
restaurantBtn.addEventListener("click", showCategory("restaurant"))

function showCategory(categoryId) {
    let displayCategory = document.getElementById(categoryId)
    let displayCalculator = document.getElementsByClassName("category")
    displayCalculator.style.display = "none";
    displayCategory.style.display = "grid";
}

