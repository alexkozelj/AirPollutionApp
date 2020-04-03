// ///////////////////// autocomplete ////////////////////
class Autocomplete {

   constructor() {
      // Api key
      this.apiKey = '08145b70-7c87-4d40-9c07-1bcdbe2b35f4';

      // search input text
      this.searchInputText;
      // index of a list element that is in focus
      this.childIndex = 0;

      // COUNTRY //

      // countries from json file to fetch
      this.countries;
      // matches of countries from input 
      this.countryMatches;
      // input box for countries
      this.country;


      // STATE //

      // input box for states
      this.states;
      // state from list of suggestions
      this.stateMatches;
      // this.stateMatch;
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



   // ///////////////////////////       COUNTRY       ///////////////////////////////

   getCountries = async () => {
      const res = await fetch('https://alexkozelj.github.io/AirPollutionApp/countries.json');
      // console.log(res);
      this.countries = await res.json();
   };


   // Filter countries
   searchCountries = searchText => {
      // set the text in input field
      this.searchInputText = searchText;
      // Get matches to current text input
      this.countryMatches = this.countries.data.filter(country => {
         if (searchText.length > 1) {
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


   // select country over keyboard
   keyboardSelectCountry = (e) => {
      // let currentListIndex = 0;

      // ENTER KEY
      if (e.keyCode === 13) {
         // remove cursor when enter key is pressed
         countryInput.blur();
         // assign  
         this.searchInputText = countryInput.value;
         // if there are no matches on the list, the input value is always false
         if (this.countryMatches.length === 0) {
            countryInput.setAttribute("class", "form-control is-invalid");
         } else {
            // if there is a match, assign to true
            let match = false;
            // go through a list to find a match with input field
            this.countryMatches.forEach((country) => {
               // if there is a match
               if (this.searchInputText.toLowerCase() === country.country.toLowerCase()) {
                  match = true;

                  // set the country value by clicking on a dropdown list of countries
                  this.country = country.country;

                  // add a completion style to input when selection is done
                  countryInput.setAttribute("class", "form-control is-valid");
                  // reset a index for a next search
                  this.childIndex = 0;
                  // show state input field
                  stateForm.style.display = "block";

                  // reset the search list array
                  this.countryMatches = [];
                  // clear search list output
                  this.outputHtmlCountry(this.countryMatches);

                  // GET STATES for a selected country
                  // Serbia states are not complete in api
                  if (this.country === "Serbia") {
                     this.getSerbiaStates();
                  } else {
                     // get states of selected country
                     this.getStates();
                  }
               }

               if (match === false) {
                  countryInput.setAttribute("class", "form-control is-invalid");
               }

            })

         }

         e.preventDefault();
      }


      // DOWN ARROW KEY
      if (e.keyCode === 40) {
         // console.log(this.countryMatches[this.childIndex].country)

         // end of a list
         if (this.childIndex === countryMatchList.children.length - 1) {
            // stay at the last li
            this.childIndex = this.countryMatches.length - 1;
         } else {
            // need a loop while up arrow key changes child index
            for (let i = 0; i < this.countryMatches.length; i++) {
               // match the input name and list item to add style
               if (countryInput.value.toLowerCase() === this.countryMatches[i].country.toLowerCase()) {
                  this.childIndex = i + 1;
               }
            }
         }
         // assign input text to the countries from match list
         countryInput.value = countryMatchList.children[this.childIndex].children[0].innerText;

         // add style to list item 
         for (let i = 0; i < this.countryMatches.length; i++) {
            // match the input name and list item to add style
            if (this.countryMatches[i].country.toLowerCase() === countryInput.value.toLowerCase()) {
               // in case when it's not the first list item
               if (i !== 0) {
                  // default style to previous list item
                  countryMatchList.children[i - 1].setAttribute("class", "card card-body parent");
                  // item that is bin selected
                  countryMatchList.children[i].setAttribute("class", "card card-body parent selectedCard");

               } else {
                  // if its the first list item, set default style to the last element and add style to fist
                  countryMatchList.children[this.countryMatches.length - 1].setAttribute("class", "card card-body parent");
                  countryMatchList.children[i].setAttribute("class", "card card-body parent selectedCard");
               }
            }
         }
         e.preventDefault();
      }
      // UP ARROW KEY
      if (e.keyCode === 38) {
         // stays at the first element
         if (this.childIndex === 0) {
            // first list item
            this.childIndex = 0;
         } else {
            // going back
            this.childIndex -= 1;
         }

         // assign input text to the countries from match list
         countryInput.value = countryMatchList.children[this.childIndex].children[0].innerText;
         // add style to list item 
         for (let i = 0; i < this.countryMatches.length; i++) {
            // match the input name and list item to add style
            if (this.countryMatches[i].country.toLowerCase() === countryInput.value.toLowerCase()) {
               // in case when it's not the first list item
               if (i === this.countryMatches.length - 1) {
                  countryMatchList.children[0].setAttribute("class", "card card-body parent");
                  countryMatchList.children[i].setAttribute("class", "card card-body parent selectedCard");
               } else {
                  // default style to previous list item
                  countryMatchList.children[i + 1].setAttribute("class", "card card-body parent");
                  // item that is bin selected
                  countryMatchList.children[i].setAttribute("class", "card card-body parent selectedCard");

               }
            }
         }

         e.preventDefault();
      }

      // BACKSPACE KEY
      if (e.keyCode === 8) {
         // reset
         this.childIndex = 0;
      }
   }


   // Selecting country from suggestion list
   selectCountry = (e) => {
      // h5 element
      if (e.target.classList.contains("child")) {
         this.country = e.target.innerText;
      }
      // parent div of h5 element
      if (e.target.classList.contains("parent")) {
         this.country = e.target.firstElementChild.innerText;
      }

      // set the country value by clicking on a dropdown list of countries
      countryInput.value = this.country;

      // add a completion style to input when selection is done
      countryInput.setAttribute("class", "form-control is-valid");

      // show state input
      stateForm.style.display = "block";
      // reset the search list array
      this.countryMatches = [];
      // clear search list output
      this.outputHtmlCountry(this.countryMatches);

      // ////////////////////////////////    STATE    ////////////////////////////////////////
      // Serbia states are not complete in api
      if (this.country === "Serbia") {
         this.getSerbiaStates();
      } else {
         // get states of selected country
         this.getStates();
      }

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

   // Clicking on input will reset to input mode
   clickInputCountry = e => {
      if (e.target.classList.contains("is-valid")) {
         stateForm.style.display = "none";
         cityInput.style.display = "none";
         countryInput.setAttribute("class", "form-control")
         countryInput.value = '';

      }
   }









   // //////////////////////////////////////     STATE      ///////////////////////////////////////////

   getStates = async () => {
      const res = await fetch(`https://api.airvisual.com/v2/states?country=${this.country}&key=${this.apiKey}`);
      this.states = await res.json()
      // console.log(this.states);
   };

   getSerbiaStates = async () => {
      const res = await fetch('https://alexkozelj.github.io/AirPollutionApp/serbia_states.json');
      this.states = await res.json();
      // console.log(this.states);
   };


   searchState = searchText => {
      // set the text in input field
      this.searchInputText = searchText;
      // Get matches to current text input
      this.stateMatches = this.states.data.filter(state => {
         if(searchText.length > 0){
            const regex = new RegExp(`${searchText}`, 'gi');
            return state.state.match(regex);
         }

      });


      // Clear when input or matches are empty
      if (searchText.length === 0) {
         this.stateMatches = [];
         this.stateMatches.innerHTML = '';
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
      this.stateMatches.innerHTML = '';


      // ////////////////    CITIES     ////////////////////////

      if (this.states === "Kosovo") {
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
         this.stateMatches.innerHTML = html;
      } else {
         // if no input, clear search list
         this.stateMatches.innerHTML = '';
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
