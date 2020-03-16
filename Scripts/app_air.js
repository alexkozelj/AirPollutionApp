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

// let openClose = 0;
document.getElementById('pollution-sign').addEventListener('click', (e) => {
   
   let aqi = ui.pollutionNumber;
   const parent = document.getElementById("desc-parent");
   
   
   function togNav() {
      var nav = document.getElementById("nav");
      if (nav.style.width == '200px') {
         nav.style.width = '0';
         nav.style.opacity = 0;
      } else {
         nav.style.width = "200px";
         nav.style.opacity = 1;
      }
   }
   
   const good = "Air quality is satisfactory and poses little or no health risk. Ventilating your home is recommended. Recommendations: Enjoy your usual outdoor activities. We recommend opening your windows and ventilating your home to bring in fresh, oxygen-rich air.";
   
   // const aqiStr = document.getElementById('w-aqi').innerHTML;
   // const aqi = parseInt(aqiStr);
   // if (openClose === 1) {
      //    openClose = 0;
      //    const racqu = document.getElementById("description-id");
      //    // const tataNaRacqu = document.getElementById("parent-div");
      //    // tataNaRacqu.removeChild(tataNaRacqu.childNodes(7));
      //    const parent = document.getElementById("desc-parent");
      //    racqu.remove();
      // }
      
   if(aqi < 50){
      if(parent.style.height == "") {
         const description = document.createElement("p");
         description.setAttribute("class", "description")
         description.setAttribute("id", "description-id")
         description.innerHTML = good;
  
         // const parent = document.getElementById("desc-parent");
  
         parent.appendChild(description);
      } else {
         parent.style.height = 0;
         parent.style.opacity = 0;
      }
      // function myFunction() {
      //    var newItem = document.createElement("LI");
      //    var textnode = document.createTextNode("Water");
      //    newItem.appendChild(textnode);
       
      //    var list = document.getElementById("myList");
      //    list.insertBefore(newItem, list.childNodes[0]);
      //  }
      // if(openClose === 0) {
      //    openClose = 1;
         
         // const parent = document.getElementById("parent-div");
         // parent.insertBefore(description, beforeEl);
      // } 
   }
   else if (aqi > 50 && aqi < 101) {

   }
   else if (aqi > 100 && aqi < 151) {

   }
   else if (aqi > 150 && aqi < 251) {

   }
   else if (aqi > 250 && aqi < 301) {

   } else {
      console.log('something went wrong')
   }

   e.preventDefault();
})

function getWeather() {
   // weather.getCountry();
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

