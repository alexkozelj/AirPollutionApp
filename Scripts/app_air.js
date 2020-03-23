// Init Storage
const storage = new Storage();
// Get stored location data
const weatherLocation = storage.getLocationData();
// console.log(weatherLocation);
// console.log(weatherLocation.city);
// console.log(weatherLocation.state);
// console.log(weatherLocation.country);

// Init weather object
const weather = new Weather(weatherLocation.city, weatherLocation.state, weatherLocation.country);

// Init UI object
const ui = new UI();

// Get weather on DOM load
document.addEventListener('DOMContentLoaded', getWeather());

// Init autocomplete
const autocomplete = new Autocomplete();


// //////////////////////////// MODAL //////////////////////////

// Search country
const searchCountry = document.getElementById("countryInput");

// Result list of matches
const countryMatchList = document.getElementById("country-match-list");

// Modal form element
const form = document.getElementById("form");


// Load json country list
window.addEventListener('DOMContentLoaded', autocomplete.getCountries); 
// Listen country input
searchCountry.addEventListener('input', () => autocomplete.searchCountries(searchCountry.value));
// Listen for a click on a input
searchCountry.addEventListener('click', autocomplete.clickInputCountry)
// Selecting country from list
countryMatchList.addEventListener('click', autocomplete.selectCountry);



// ///////////////////////////////////////////////////////

// Change location event
document.getElementById('w-change-btn').addEventListener('click', (e) => {

   let city = autocomplete.cities;
   let state = autocomplete.states;
   let country = autocomplete.country;

   // if there is no input or a wrong input
   if (city === undefined || city.length === 0 || state === undefined || state.length === 0 || country.length === 0) {
      country = "Germany";
      state = "Hessen";
      city = "Frankfurt am Main";
   }


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

   weather.getWeather()
      .then(results => {
         ui.paint(results, storage);
      })
      .catch(err => {
         alert("please enter valid name");
         console.log(err);
      });
}

