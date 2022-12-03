// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.
    let missionDiv = document.getElementById('missionTarget');
    missionDiv.innerHTML = 
    `<h2>Mission Destination</h2>
    <ol>
        <li>Name: ${name}</li>
        <li>Diameter: ${diameter}</li>
        <li>Star: ${star}</li>
        <li>Distance from Earth: ${distance} </li>
        <li>Number of Moons: ${moons}</li>
    </ol>
    <img src="${imageUrl}">`;

}

function validateInput(testInput) {
    let makeInputNum = Number(testInput);
    if (testInput === "") {
        return 'Empty';
    } else if (isNaN(makeInputNum)) {
        return 'Not a Number';
    } else {
        return 'Is a Number';
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {

    let pilotStatus = document.getElementById('pilotStatus');
    let copilotStatus = document.getElementById('copilotStatus');
    let fuelStatus = document.getElementById('fuelStatus');
    let cargoStatus = document.getElementById('cargoStatus');
    let launchStatus = document.getElementById('launchStatus');

    if (validateInput(pilot) === 'Empty' || validateInput(copilot) === 'Empty' || validateInput(fuelLevel) === 'Empty' || validateInput(cargoLevel) === 'Empty') {
        alert('All fields are required!');
    } else if (validateInput(pilot) === 'Is a Number' || validateInput(copilot) === 'Is a Number' || validateInput(fuelLevel) === 'Not a Number' || validateInput(cargoLevel) === 'Not a Number') {
        alert('Please fill in fields with only the appropriate data!');
    } else {
        list.style.visibility = 'visible';
        pilotStatus.innerHTML = `Pilot ${pilot} Ready`;
        copilotStatus.innerHTML =`Co-pilot ${copilot} Ready`;
        if (fuelLevel < 10000 || cargoLevel < 10000) {
            fuelStatus.innerHTML = 'Fuel level too low for launch.';
            cargoStatus.innerHTML = 'Cargo mass low enough for launch';
            launchStatus.innerHTML = 'Shuttle not ready for launch';
            launchStatus.style.color = red;
        } else if (fuelLevel > 10000 || cargoLevel > 10000) {
            fuelStatus.innerHTML = 'Fuel level high enough for launch.';
            cargoStatus.innerHTML = 'Cargo mass too high for launch';
            launchStatus.innerHTML = 'Shuttle not ready for launch';
            launchStatus.style.color = red;
        } else if (fuelLevel < 10000 && cargoLevel > 10000) {
            fuelStatus.innerHTML = 'Fuel level too low for launch.';
            cargoStatus.innerHTML = 'Cargo mass too high for launch';
            launchStatus.innerHTML = 'Shuttle not ready for launch';
            launchStatus.style.color = red;
        } else {
            fuelStatus.innerHTML = 'Fuel level high enouugh for launch.';
            cargoStatus.innerHTML = 'Cargo mass low enough for launch';
            launchStatus.innerHTML = 'Shuttle is ready for launch';
            launchStatus.style.color = green;
        }
    }

}

async function myFetch() {

    let planetsReturned = fetch('https://handlers.education.launchcode.org/static/planets.json').then( function(response) {
        if (response.status >= 400) {
            throw Error("Response Failed.");
        } else {
            return response.json();
        }
        
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    return planets[Math.floor(Math.random() * planets.length)];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
