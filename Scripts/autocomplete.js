// ///////////////////// autocomplete ////////////////////
class Autocomplete {

   constructor() {
      // Api key
      this.apiKey = '08145b70-7c87-4d40-9c07-1bcdbe2b35f4';
      
      // COUNTRY //

      // countries from json file
      this.countries;
      // matches of countries from input 
      this.countryMatches;
      // input box for countries
      this.country;


      // STATE //

      this.stateMatches;
      // input box for states
      this.states;
      // state from list of suggestions
      this.stateMatch;
      // input field for state
      this.stateInput;

      // CITY //

      this.cityMatches;
      // cities
      this.cities;
      // city from list
      this.cityMatch;
      // city input field
      this.cityInput;
   }

   getCountries = async () => {
      const res = await fetch('https://alexkozelj.github.io/AirPollutionApp/countries.json');
      // console.log(res);
      this.countries = await res.json();
   };


   // Filter countries
   searchCountries = searchText => {
      // Get matches to current text input
      this.countryMatches = this.countries.data.filter(country => {
         if(searchText.length > 1) {
            const regex = new RegExp(`^${searchText}`, 'gi');
            return country.country.match(regex);
         }

      });


      // Clear when input or matches are empty
      if (searchText.length === 0) {
         this.countryMatches = [];
         countryMatchList.innerHTML = '';
      }

      this.outputHtmlCountry(this.countryMatches);

   };


   // Selecting country from suggestion list
   selectCountry = (e) => {
      // h5 element
      if (e.target.classList.contains("child")) {
         this.country = e.target.innerHTML;
      }
      // parent div of h5 element
      if (e.target.classList.contains("parent")) {
         this.country = e.target.firstElementChild.innerHTML;
      }

      // set the country value by clicking on a dropdown list of countries
      searchCountry.value = this.country;
      
      // add a completion style to input when selection is done
      searchCountry.setAttribute("class", "form-control is-valid");
      // reset the search list array
      this.countryMatches = [];
      // clear search list output
      this.outputHtmlCountry(this.countryMatches);

      // //////////////////////////////// STATE ////////////////////////////////////////
      // Serbia states are not complete in api
      if( this.country === "Serbia"){
         this.getSerbiaStates();
      } else {
         // get states of selected country
         this.getStates();
      }

      // create div to put form for states
      const div = document.createElement('div');
      div.setAttribute("id", "stateForm")
      
      // state input div
      const state = `
      <div class="form-group has-success">
      <label class="form-control-label" for="state">State / Region</label>
      <input type="text" id="stateInput" class="form-control" placeholder="Enter state" autocomplete="off"/>
      </div>
      <div id="state-match-list"></div>
      `;
      div.innerHTML = state;
      // append state input div to a form
      form.appendChild(div);
      
      // state input
      const stateInput = document.getElementById("stateInput");
      // listen for state input and search states
      stateInput.addEventListener('input', () => autocomplete.searchState(stateInput.value));

      // list of states of the selected country
      const stateMatchList = document.getElementById("state-match-list");
      // Select state from the list
      stateMatchList.addEventListener('click', autocomplete.selectState);

      stateInput.addEventListener('click', this.clickInputState);

      this.stateMatch = stateMatchList;
      this.stateInput = stateInput;


      e.preventDefault();
   }


   // Show results in HTML COUNTRY
   outputHtmlCountry = matches => {
      if (matches.length > 0) {
         const html = matches.map(match => `
         <div class="card card-body parent">
         <h5 class="child">${match.country}</h5>
         </div>
         `).join('');


         countryMatchList.innerHTML = html;
      } else {
         countryMatchList.innerHTML = '';
      }
   }









   // //////////////////////////////////////     STATE      ///////////////////////////////////////////

   getStates = async () => {
      const res = await fetch(`https://api.airvisual.com/v2/states?country=${this.country}&key=${this.apiKey}`);
      this.states = await res.json()
   };

   getSerbiaStates = async () => {
      const res = await fetch('https://alexkozelj.github.io/AirPollutionApp/serbia_states.json');
      this.states = await res.json();
   };


   searchState = searchText => {
      // Search state
      const stateInput = document.getElementById("stateInput");
      // Listen state input
      stateInput.addEventListener('input', () => autocomplete.searchState(stateInput.value));
      // Get matches to current text input
      this.stateMatches = this.states.data.filter(state => {
         const regex = new RegExp(`${searchText}`, 'gi');

         return state.state.match(regex);

      });


      // Clear when input or matches are empty
      if (searchText.length === 0) {
         this.stateMatches = [];
         this.stateMatch.innerHTML = '';
      }

      this.outputHtmlStates(this.stateMatches);

   }

   selectState = (e) => {
      // h5 element
      if (e.target.classList.contains("child")) {
         this.states = e.target.innerHTML;
      }
      // parent div of h5 element
      if (e.target.classList.contains("parent")) {
         this.states = e.target.firstElementChild.innerHTML;
      }

      // search is set to match the state from the list
      stateInput.value = this.states;
      console.log(this.states);
      // countries from the list are always valid
      stateInput.setAttribute("class", "form-control is-valid");
      // state is selected, no need of displaying a list
      this.stateMatches = [];
      // clear the matching list
      this.stateMatch.innerHTML = '';


      // ////////////////    CITIES     ////////////////////////

      if(this.states === "Kosovo") {
         this.getKosovoCities();
      } else {
         // get states of selected country
         this.getCities();
      }

      // city input div
      const cityDiv = document.createElement('div');
      cityDiv.setAttribute("id", "cityForm")
      // city input
      const city = `
      <div class="form-group has-success">
      <label class="form-control-label" for="city / town"> City / Town</label>
      <input type="text" id="cityInput" class="form-control" placeholder="Enter city" autocomplete="off"/>
      </div>
      <div id="city-match-list"></div>
      `;
      cityDiv.innerHTML = city;
      // append city div to a form
      form.appendChild(cityDiv);

      // input of a state form
      const cityInput = document.getElementById("cityInput");
      // listen for state input and search states
      cityInput.addEventListener('input', () => autocomplete.searchCities(cityInput.value));

      // list of states of the selected country
      const cityMatchList = document.getElementById("city-match-list");
      // Select state from the list
      cityMatchList.addEventListener('click', autocomplete.selectCity);

      cityInput.addEventListener('click', this.clickInputCity);

      this.cityMatch = cityMatchList;
      this.cityInput = cityInput;


      e.preventDefault();

   }

   // Show results in HTML STATE
   outputHtmlStates = matches => {
      if (matches.length > 2) {
         const html = matches.map(match => `
         <div class="card card-body parent">
         <h5 class="child">${match.state}</h5>
         </div>
         `).join('');
         this.stateMatch.innerHTML = html;
      } else {
         // if no input, clear search list
         this.stateMatch.innerHTML = '';
         stateInput.setAttribute("class", "form-control is-invalid");
      }
   }





   // ////////////////////         CITIES         //////////////////////////////

   getCities = async () => {
      const res = await fetch(`https://api.airvisual.com/v2/cities?state=${this.states}&country=${this.country}&key=${this.apiKey}`);
      this.cities = await res.json()
   };

   
   getKosovoCities = async () => {  
      const res = await fetch(`https://alexkozelj.github.io/AirPollutionApp/serbia_cities.json`);
      this.cities = await res.json()
   };

   searchCities = searchText => {
      // Search state
      const cityInput = document.getElementById("cityInput");
      // Listen state input
      cityInput.addEventListener('input', () => autocomplete.searchCities(cityInput.value));
      // Get matches to current text input
      this.cityMatches = this.cities.data.filter(city => {
         const regex = new RegExp(`${searchText}`, 'gi');

         return city.city.match(regex);

      });


      // Clear when input or matches are empty
      if (searchText.length === 0) {
         this.cityMatches = [];
         this.cityMatch.innerHTML = '';
      }

      this.outputHtmlCities(this.cityMatches);

   }


   selectCity = (e) => {
      // h5 element
      if (e.target.classList.contains("child")) {
         this.cities = e.target.innerHTML;
      }
      // parent div of h5 element
      if (e.target.classList.contains("parent")) {
         this.cities = e.target.firstElementChild.innerHTML;
      }

      // assign cities from search list
      cityInput.value = this.cities;
      // set valid style to input
      cityInput.setAttribute("class", "form-control is-valid");
      // city is selected, no need of displaying a list
      this.cityMatches = [];
      // clear the matching list
      this.cityMatch.innerHTML = '';

   }


   // Show results in HTML CITY
   outputHtmlCities = matches => {
      if (matches.length > 2) {
         const html = matches.map(match => `
         <div class="card card-body parent">
         <h5 class="child">${match.city}</h5>
         </div>
         `).join('');


         this.cityMatch.innerHTML = html;
      } else {
         this.cityMatch.innerHTML = '';
      }
   }



   // Clicking on input will reset to input mode
   clickInputCountry = e => {
      if (e.target.classList.contains("is-valid")) {
         searchCountry.setAttribute("class", "form-control")
         searchCountry.value = '';
         this.removeElement("stateForm");
         const cityInput = document.getElementById("cityForm");
         if(cityInput !== null){
            this.removeElement("cityForm");
         }
      }
   }

   clickInputState = e => {
      if (e.target.classList.contains("is-valid") && e.target.id === "stateInput") {
         this.stateInput.setAttribute("class", "form-control");
         this.stateInput.value = '';
         this.removeElement("cityForm");
         this.getCountries();
         this.getStates();
      }
   }

   clickInputCity = e => {
      if (e.target.classList.contains("is-valid") && e.target.id === "cityInput") {
         this.cityInput.setAttribute("class", "form-control");
         this.cityInput.value = '';
         this.getCities();
      }
   }
   // remove element by id
   removeElement = elementId => {
      // Removes an element from the document
      const element = document.getElementById(elementId);
      element.parentNode.removeChild(element);
   }
}
