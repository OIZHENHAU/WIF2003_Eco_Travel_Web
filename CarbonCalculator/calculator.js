// let accomodationBtn = document.getElementById("accomodationBtn")
// let vehicleBtn = document.getElementById("vehicleBtn")
// let restaurantBtn = document.getElementById("restaurantBtn")

const defaultBtn = "accomodationBtn"
const defaultContent = "accomodation"

toggleContent(defaultBtn, defaultContent)

function toggleContent(buttonId, contentId) {
    //remove active class from all buttons
    document.querySelectorAll(".toggle-btn").forEach(btn => btn.classList.remove("active"))
    //hide all category content
    document.querySelectorAll(".category").forEach(category => category.style.display = "none")

    document.getElementById(contentId).style.display = "block"
    document.getElementById(buttonId).classList.add("active")
}

function calculate() {

}

function addToTable(tableID, desc, emission, cost) {
    var table = document.getElementById(tableID);
    var numOfRows = table.rows.length;

    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.innerHTML = desc;
    cell2.innerHTML = emission;
    cell3.innerHTML = cost;
}

function test() {
    console.log("test print")
}

