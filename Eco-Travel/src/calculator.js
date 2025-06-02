const menus = document.querySelector("nav ul");
const header = document.querySelector("header");
const menuBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector(".close-btn");


menuBtn.addEventListener("click", () => {
    menus.classList.add("display"); 
});

closeBtn.addEventListener("click", () => {
    menus.classList.remove("display"); 
})

const offsetNowButton = document.getElementById('offsetNow');

offsetNowButton.addEventListener('click', () => {
    const table = document.getElementById("carbonFootprint")
    const rows = table.querySelectorAll("tbody tr")
    var tableData = []

    rows.forEach(row => {
        const cells = row.querySelectorAll("td")
        tableData.push({
            emission: cells[1].textContent,
            cost: cells[2].textContent
        })
    })

    fetch("/offset-now", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({tableData})
    })
        .then(response => response.json())
        .then(data => {
            window.location.href = `../carbon-offset?data=${encodeURIComponent(JSON.stringify(data))}`
        })
        .catch(err => console.error(err))
});

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

function calcFoodEmission(people, highM = 0, medM = 0, lowM = 0, fish = 0, veg = 0) {
    var emissionPerP = (highM * 2.92) + (medM * 2.34) + (lowM * 2.15) + (fish * 1.69) + (veg * 0.25)
    var totalEmission = emissionPerP * people

    return totalEmission
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

    var totalAccomEmission = document.getElementById("totalAccomEmission")
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
    totalAccomEmission.textContent = `${totalEm.toFixed(2)}kg CO2`
    totalAccomCost.textContent = `RM${totalCost.toFixed(2)}`
}

function calculateVehicle() {
    var table = document.getElementById("vehicleTable")
    var numOfRows = table.rows.length;
    for(let i = 0; i < numOfRows - 1; i++) {
        table.deleteRow(-1);
    }

    var totalVehicleEmission = document.getElementById("totalVehicleEmission")
    var totalVehicleCost = document.getElementById("totalVehicleCost")
    var emission = 0
    var cost = 0
    var totalEm = 0
    var totalCost = 0

    const vehicleInputs = document.querySelectorAll(".vehicleInput")
    const vehicleType = vehicleInputs[0].value
    const fuelType = vehicleInputs[1].value
    const distance = vehicleInputs[2].value

    var fuelFactor = 1;
    var vehicleTypeName = "Small Car"

    if (vehicleType == "middleCar") {
        fuelFactor = 1.2
        vehicleTypeName = "Middle Car"
    }
    else if (vehicleType == "largeCar") {
        fuelFactor = 1.5
        vehicleTypeName = "Large Car"
    }

    emission = (calcEmission(fuelType, distance) * fuelFactor).toFixed(2)
    cost = calcCost(emission).toFixed(2)
    totalEm += parseFloat(emission)
    totalCost += parseFloat(cost)

    switch (fuelType) {
        case "petrol":
            addToTable("vehicleTable", `${vehicleTypeName}(Petrol): ${distance}km`, `${emission}kg CO2`, `RM${cost}`)
            break;
        case "diesel":
            addToTable("vehicleTable", `${vehicleTypeName}(Diesel): ${distance}km`, `${emission}kg CO2`, `RM${cost}`)
            break;
        case "electric":
            addToTable("vehicleTable", `${vehicleTypeName}(Electric): ${distance}km`, `${emission}kg CO2`, `RM${cost}`)
            break;
    }

    
    totalVehicleEmission.textContent = `${totalEm.toFixed(2)}kg CO2`
    totalVehicleCost.textContent = `RM${totalCost.toFixed(2)}`
}

function calculateRest() {
    var table = document.getElementById("restaurantTable")
    var numOfRows = table.rows.length;
    for(let i = 0; i < numOfRows - 1; i++) {
        table.deleteRow(-1);
    }

    var totalRestaurantEmission = document.getElementById("totalRestaurantEmission")
    var totalRestaurantCost = document.getElementById("totalRestaurantCost")
    var totalEm = 0
    var totalCost = 0

    const restInputs = document.querySelectorAll(".restInput")
    var restArr = [].slice.call(restInputs).map(input => input.value)
    restArr = restArr.map(input => (input != 0) ? input : 0)
    totalEm = calcFoodEmission(restArr[5], restArr[0], restArr[1], restArr[2], restArr[3], restArr[4])
    totalEm *= 52 //for one year
    totalCost = (calcCost(totalEm)).toFixed(2)


    var desc = `Food for ${restArr[5]} people, for 1 year`
    for (let i = 0; i < restArr.length - 1; i++) {
        if (restArr[i] == 0) {
            continue;
        }
        switch (i) {
            case 0:
                desc += `<br>High meat-eater (${restArr[i]} day(s) a week)`
                break;
            case 1:
                desc += `<br>Medium meat-eater (${restArr[i]} day(s) a week)`
                break;
            case 2:
                desc += `<br>Low meat-eater (${restArr[i]} day(s) a week)`
                break;
            case 3:
                desc += `<br>Fish eater (${restArr[i]} day(s) a week)`
                break;
            case 4:
                desc += `<br>Vegetarian (${restArr[i]} day(s) a week)`
                break;
        }
    }
    addToTable("restaurantTable", desc, `${(totalEm / 1000).toFixed(2)} tCO2`, `RM${totalCost}`)

    totalRestaurantEmission.textContent = `${(totalEm / 1000).toFixed(2)} tCO2`
    totalRestaurantCost.textContent = `RM${totalCost}`
}

function addFootprint(category) {
    var carbonFootprint = document.getElementById("carbonFootprint")
    var totalEmission = document.getElementById(`total${category}Emission`)
    var totalCost = document.getElementById(`total${category}Cost`)

    var row = carbonFootprint.insertRow(-1)
    var cell1 = row.insertCell(0)
    var cell2 = row.insertCell(1)
    var cell3 = row.insertCell(2)

    var htmlIcon = ""

    switch(category) {
        case "Accom":
            htmlIcon = "<i class='fas fa-hotel'></i>"
            break;
        case "Vehicle":
            htmlIcon = "<i class='fas fa-car'></i>"
            break;
        case "Restaurant":
            htmlIcon = "<i class='fas fa-utensils'></i>"
            break;
        default:
            htmlIcon = "<p>icon</p>"
            break;
    }

    cell1.insertAdjacentHTML("afterend", htmlIcon)
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



