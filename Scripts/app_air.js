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
document.addEventListener('DOMContentLoaded', getWeather(), storage.getLocalCountries());




// Modal search box
const search = document.getElementById("search");
const matchList = document.getElementById("match-list");
let states;

const getCountries = async () => {
   const res = await fetch('countries.json');
   states = await res.json();
};

// Filter states
const searchCountries = searchText => {
   // Get matches to current text input
   let matches = states.data.filter(state => {
      const regex = new RegExp(`^${searchText}`, 'gi');
     
      return state.country.match(regex);
   });


   // Clear when input or matches are empty
   if(searchText.length === 0) {
      matches = [];
      matchList.innerHTML = '';
   }
   
   outputHtml(matches);

}

// Show results in HTML
const outputHtml = matches => {
   if(matches.length > 0) {
      const html = matches.map(match => `
         <div class="card card-body mb-1">
            <h5>${match.country}</h5>
         </div>
      `).join('');


      matchList.innerHTML = html;
   } else {
      matchList.innerHTML = '';
   }
}

// Listen for input
search.addEventListener('input', () => searchCountries(search.value));
window.addEventListener('DOMContentLoaded', getCountries)


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

