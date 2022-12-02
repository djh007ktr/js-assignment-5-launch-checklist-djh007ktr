// Write your JavaScript code here!

const formSubmission = require("./scriptHelper");

window.addEventListener("load", () => {
    let listedPlanets;
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = formSubmission.myFetch;
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        console.log(listedPlanets);
    }).then(function () {
        console.log(listedPlanets);
        // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
        let selected = formSubmission.pickPlanet(listedPlanets);
        formSubmission.addDestinationInfo(document, selected.name, selected.diameter, selected.star, selected.distance, selected.moons, selected.imageUrl);
    });

    let form = document.querySelector('form');
    let list = document.getElementById('faultyItems');
    list.style.visibility = 'hidden';

    form.addEventListener('submit', function(event) {

        event.preventDefault();
        let pilotInput = document.getElementById('input[id=pilotName]');
        let pilot = pilotInput.value;
        let copilotInput = document.querySelector('input[name=copilotName]');
        let copilot = copilotInput.value;
        let fuelInput = document.querySelector('input[name=fuelLevel]');
        let fuelLevel = Number(fuelInput.value);
        let cargoInput = document.querySelector('input[name=cargoMass]');
        let cargoMass = Number(cargoInput.value);
        


        formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass);           

    });

});