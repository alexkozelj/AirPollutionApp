// Init Storage
const storage = new Storage();
// Get stored location data
const weatherLocation = storage.getLocationData();
console.log(weatherLocation);
console.log(weatherLocation.city);
console.log(weatherLocation.state);
console.log(weatherLocation.country);

// Init weather object
const weather = new Weather(weatherLocation.city, weatherLocation.state, weatherLocation.country);

// Init UI object
const ui = new UI();

// Get weather on DOM load
document.addEventListener('DOMContentLoaded', getWeather());

// Init autocomplete
const autocomplete = new Autocomplete();

// //////////////////////////// MODAL //////////////////////////

// Modal search box
const search = document.getElementById("search");
// Result list of matches
const matchList = document.getElementById("match-list");
// variable used for filtering countries
// const suggestion = document.getElementsByClassName("card card-body choose mb-1");

// console.log(suggestion);
console.log(matchList);

// Listen for input
search.addEventListener('input', () => autocomplete.searchCountries(search.value));
// Listen for a click on a input
search.addEventListener('click', autocomplete.clickInput)
// Load json country list
window.addEventListener('DOMContentLoaded', autocomplete.getCountries); 
// Selecting suggestion from list
matchList.addEventListener('click', autocomplete.selectCountrySug);


// ///////////////////////////////////////////////////////

// Change location event
document.getElementById('w-change-btn').addEventListener('click', (e) => {
   let city = document.getElementById('city').value;
   let state = document.getElementById('state').value;
   let country = document.getElementById('country').value;



   if (city.length === 0 && state.length === 0 && country.length === 0) {
      country = "Germany";
      state = "Hessen";
      city = "Frankfurt am Main";
   }

   console.log(city);
   console.log(state);
   console.log(country);

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
         ui.paint(results);
         // console.log(results);
      })
      .catch(err => {
         alert("please enter valid name");

         console.log(err);
      });
}

