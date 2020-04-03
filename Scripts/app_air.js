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


// //////////////////////////// MODAL //////////////////////////

// Modal form element
const form = document.getElementById("form");

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
// Listen country input
countryInput.addEventListener('input', () => autocomplete.searchCountries(countryInput.value));
// Listen for country input keydown
countryInput.addEventListener('keydown', autocomplete.keyboardSelectCountry);
// Listen for a click on a input
countryInput.addEventListener('click', autocomplete.clickInputCountry)
// Selecting country from list
countryMatchList.addEventListener('click', autocomplete.selectCountry);

countryMatchList.addEventListener('mouseenter', autocomplete.onMouseOver)



// ///////////////////////////////////////////////////////

// Change location event
document.getElementById('w-change-btn').addEventListener('click', (e) => {

   let city = autocomplete.cities;
   let state = autocomplete.states;
   let country = autocomplete.country;

   // if there is no input or a wrong input
   // if (city === undefined || city.length === 0 || state === undefined || state.length === 0 || country.length === 0) {
   //    country = "Germany";
   //    state = "Hessen";
   //    city = "Frankfurt am Main";
   // }


   // Change location
   weather.changeLocation(city, state, country);

   // Set location in LS
   storage.setLocationData(city, state, country);

   // Get and display weather
   getWeather();


   // Close modal
   $('#locModal').modal('hide');
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

