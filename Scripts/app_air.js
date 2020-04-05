// Init Storage
const storage = new Storage();
// Get stored location data
const weatherLocation = storage.getLocationData();


// Init weather object
const weather = new Weather(weatherLocation.city, weatherLocation.state, weatherLocation.country);

// Init UI object
const ui = new UI();


// Spinner
const spinner = new Spinner();
// child of a row div
const rowDiv = document.getElementById("parent-div");
// spinner div
const spinnerDiv = document.getElementById("spinner");



// Get weather on DOM load
document.addEventListener('DOMContentLoaded', getWeather());

// Init autocomplete
const autocomplete = new Autocomplete();



// ////////////////////    COUNTRY       ////////////////////

// Country input 
const countryInput = document.getElementById("countryInput");
// Country fieldset
const countryForm = document.getElementById("country-form");
// Result list of matches
const countryMatchList = document.getElementById("country-match-list");


// ///////////////////     STATE      ///////////////

// State input
const stateInput = document.getElementById("stateInput");
// State form
const stateForm = document.getElementById("state-form");
// State match list
const stateMatchList = document.getElementById("state-match-list");


// ////////////////////    CITY        ////////////////////////

// City input field
const cityInput = document.getElementById("cityInput");
// City form
const cityForm = document.getElementById("city-form");
// City match list
const cityMatchList = document.getElementById("city-match-list");



// //////////////////        EVENT LISTENERS         //////////////////////////////

// Load json country list
window.addEventListener('DOMContentLoaded', autocomplete.getCountries); 


// COUNTRY
// Listen country input
countryInput.addEventListener('input', () => autocomplete.searchCountries(countryInput.value));
// Listen for country input keydown
countryInput.addEventListener('keydown', autocomplete.keyboardSelectCountry);
// Listen for a click on a input
countryInput.addEventListener('click', autocomplete.clickInputCountry)
// Selecting country from list
countryMatchList.addEventListener('click', autocomplete.selectCountry);

// STATE
// Listen state input
stateInput.addEventListener('input', () => autocomplete.searchState(stateInput.value));
// Listen for state input keydown
stateInput.addEventListener('keydown', autocomplete.keyboardSelectState);
// Listen for a click on a input
stateInput.addEventListener('click', autocomplete.clickInputState)
// Selecting state from list
stateMatchList.addEventListener('click', autocomplete.selectState);

// CITY
// Listen city input
cityInput.addEventListener('input', () => autocomplete.searchCity(cityInput.value));
// Listen for city input keydown
cityInput.addEventListener('keydown', autocomplete.keyboardSelectCity);
// Listen for a click on a input
cityInput.addEventListener('click', autocomplete.clickInputCity);
// Select city from a list
cityMatchList.addEventListener('click', autocomplete.selectCity);


// //////////////////////////// MODAL //////////////////////////

// Modal form element
const form = document.getElementById("form");

const modalInfo = document.getElementById("modal-info");


// /////////////////// MODAL SAVE CHANGES BUTTON /////////////////

// Change location event
document.getElementById('w-change-btn').addEventListener('click', (e) => {
   console.log(autocomplete.countryInput);
   console.log(autocomplete.stateInput);
   console.log(autocomplete.cityInput);

   let city = autocomplete.cityInput;
   let state = autocomplete.stateInput;
   let country = autocomplete.countryInput;



   if( city === undefined || state === undefined || country === undefined) {

      city === undefined ? cityInput.setAttribute("class", "form-control is-invalid") : cityInput.setAttribute("class", "form-control is-valid");
      state === undefined ? stateInput.setAttribute("class", "form-control is-invalid") : stateInput.setAttribute("class", "form-control is-valid");
      country === undefined ? countryInput.setAttribute("class", "form-control is-invalid") : countryInput.setAttribute("class", "form-control is-valid");

      modalInfo.style.display = "block";

   } 
   else if (countryInput.value === '') {
      // Close modal
      $('#locModal').modal('hide');
   }
   else {
      // Change location
      weather.changeLocation(city, state, country);
   
      // Set location in LS
      storage.setLocationData(city, state, country);
   
      // Get and display weather
      getWeather();

      autocomplete.cityInput.value = '';
      autocomplete.stateInput.value = '';
      autocomplete.countryInput.value = '';
      autocomplete.searchInputText.value = '';
      // cityInput.setAttribute("class", "form-control");
      // cityInput.value = '';
      // stateInput.setAttribute("class", "form-control");
      // stateInput.value = '';
      // countryInput.setAttribute("class", "form-control");
      // countryInput.value = '';
   
      // Close modal
      $('#locModal').modal('hide');

   }

});


function getWeather() {
   spinner.showSpinner(spinnerDiv, rowDiv);
   weather.getWeather()
      .then(results => {
         spinner.hideSpinner(rowDiv, spinnerDiv);
         ui.paint(results, storage);
      })
      .catch(err => {
         alert("please enter valid name");
         console.log(err);
      });
}

