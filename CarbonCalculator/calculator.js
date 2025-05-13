// let accomodationBtn = document.getElementById("accomodationBtn")
// let vehicleBtn = document.getElementById("vehicleBtn")
// let restaurantBtn = document.getElementById("restaurantBtn")

const defaultBtn = "accomodationBtn"
const defaultContent = "accomodation"

// var electricity = document.getElementById("electricity")
// var renewableElec = document.getElementById("renewableElec")
// var naturalGas = document.getElementById("naturalGas")
// var renewableGas = document.getElementById("renewableGas")
// var coal = document.getElementById("coal")
// var heatingOil = document.getElementById("heatingOil")

// const accomInputs = [electricity, renewableElec, naturalGas, renewableGas, coal, heatingOil]

// const accomInputs = document.querySelectorAll(".accomInput")

toggleContent(defaultBtn, defaultContent)

function toggleContent(buttonId, contentId) {
    //remove active class from all buttons
    document.querySelectorAll(".toggle-btn").forEach(btn => btn.classList.remove("active"))
    //hide all category content
    document.querySelectorAll(".category").forEach(category => category.style.display = "none")

    document.getElementById(contentId).style.display = "block"
    document.getElementById(buttonId).classList.add("active")
}

function calcEmission(type, value, renew = 0) {
    var emission = 0;
    switch (type) {
        case "electricity":
            emission = value * (1-renew) * 0.27
            break;
        case "naturalGas":
            emission = value * (1-renew) * 0.44
            break;
        case "coal":
            emission = value * 2.42
            break;
        case "heatingOil":
            emission = value * 2.96
            break;
        case "petrol":
            emission = value * 0.16
            break;
        case "diesel":
            emission = value * 0.23
            break;
        case "electric":
            emission = value * 0.04
            break;
    }
    return emission;
}

function calcCost(emission) {
    var cost = emission * 0.025
    return cost;
}

function calculateAccom() {
    var table = document.getElementById("accomTable")
    var numOfRows = table.rows.length;
    for(let i = 0; i < numOfRows - 1; i++) {
        table.deleteRow(-1);
    }

    var totalAccomEmmision = document.getElementById("totalAccomEmission")
    var totalAccomCost = document.getElementById("totalAccomCost")
    var totalEm = 0
    var totalCost = 0

    const accomInputs = document.querySelectorAll(".accomInput")
    var renewElec = (accomInputs[1].value != "") ? accomInputs[1].value : 0;
    var renewGas = (accomInputs[3].value != "") ? accomInputs[3].value : 0;
    
    for(let i = 0; i < accomInputs.length; i++) {
        var currentValue = accomInputs[i].value;
        var emission = 0;
        var cost = 0;
        if (currentValue != "") {
            switch (i) {
                case 0:
                    emission = calcEmission("electricity", currentValue, renewElec / 100).toFixed(2)
                    cost = calcCost(emission).toFixed(2)
                    totalEm += parseFloat(emission)
                    totalCost += parseFloat(cost)
                    addToTable("accomTable", `Electricity: ${currentValue}kWh`, `${emission}kg CO2`, `RM${cost}`)
                    break;
                case 2:
                    emission = calcEmission("naturalGas", currentValue, renewGas / 100).toFixed(2)
                    cost = calcCost(emission).toFixed(2)
                    totalEm += parseFloat(emission)
                    totalCost += parseFloat(cost)
                    addToTable("accomTable", `Natural Gas: ${currentValue}kWh`, `${emission}kg CO2`, `RM${cost}`)
                    break;
                case 4:
                    emission = calcEmission("coal", currentValue).toFixed(2)
                    cost = calcCost(emission).toFixed(2)
                    totalEm += parseFloat(emission)
                    totalCost += parseFloat(cost)
                    addToTable("accomTable", `Coal: ${currentValue}kg`, `${emission}kg CO2`, `RM${cost}`)
                    break;
                case 5:
                    emission = calcEmission("heatingOil", currentValue).toFixed(2)
                    cost = calcCost(emission).toFixed(2)
                    totalEm += parseFloat(emission)
                    totalCost += parseFloat(cost)
                    addToTable("accomTable", `Heating Oil: ${currentValue}kg`, `${emission}kg CO2`, `RM${cost}`)
                    break;
                default:
                    console.log(test)
                    break;
            }
        }
        else {
            console.log("Value empty")
        }
    }
    totalAccomEmmision.textContent = `${totalEm.toFixed(2)}kg CO2`
    totalAccomCost.textContent = `RM${totalCost.toFixed(2)}`
}

function addFootprint(category) {
    var carbonFootprint = document.getElementById("carbonFootprint")
    var totalEmission = document.getElementById(`total${category}Emission`)
    var totalCost = document.getElementById(`total${category}Cost`)

    var row = carbonFootprint.insertRow(-1)
    var cell1 = row.insertCell(0)
    var cell2 = row.insertCell(1)
    var cell3 = row.insertCell(2)

    cell1.insertAdjacentHTML("afterend", "<i class='fas fa-hotel'></i>")
    cell2.innerHTML = totalEmission.innerHTML
    cell3.innerHTML = totalCost.innerHTML
}

function addToTable(tableID, desc, emission, cost) {
    var table = document.getElementById(tableID);

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

