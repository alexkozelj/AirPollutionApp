// ///////////////////// autocomplete ////////////////////
class Autocomplete {

   constructor() {
      // Api key
      this.apiKey = '08145b70-7c87-4d40-9c07-1bcdbe2b35f4';
      // countries from json file
      this.countries;
      // input box for countries
      this.country;
      this.countryIsSet = false;
      // input box for states
      this.states;
      // matches of countries from input 
      this.matches;

      this.stateMatch;
      this.stateInput;
      
   }

   getCountries = async () => {
      const res = await fetch('countries.json');
      this.countries = await res.json();
   };

   
   // Filter countries
   searchCountries = searchText => {
      // Get matches to current text input
      this.matches = this.countries.data.filter(country => {
         const regex = new RegExp(`^${searchText}`, 'gi');

         return country.country.match(regex);
      });


      // Clear when input or matches are empty
      if (searchText.length === 0) {
         this.matches = [];
         countryMatchList.innerHTML = '';
      }

      this.outputHtmlCountry(this.matches);

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
      
      // search is set to match the country from the list
      searchCountry.value = this.country;
      // countries from the list are always valid
      searchCountry.setAttribute("class", "form-control is-valid");
      // country is selected, no need of displaying a list
      this.matches = [];
      // clear the matching list
      this.outputHtmlCountry(this.matches);
      
      // //////////////////////////////// STATE ////////////////////////////////////////
      
      // get states of selected country
      this.getStates();
      // create div to put form for states
      const div = document.createElement('div');
      div.setAttribute("id", "stateForm")
      // div.className = 'form-group has-success';
      const state = `
      <div class="form-group has-success">
      <label class="form-control-label" for="state">State / Region</label>
      <input type="text" id="stateInput" class="form-control" placeholder="Enter state"/>
      </div>
      <div id="state-match-list"></div>
      `;
      div.innerHTML = state;
      // append state div to a form
      form.appendChild(div);
      // switch for the country
      this.countryIsSet = true;
      // input of a state form
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
         <div class="card card-body parent mb-1">
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
      // api.airvisual.com/v2/states?country={{COUNTRY_NAME}}&key={{YOUR_API_KEY}}
      const res = await fetch(`http://api.airvisual.com/v2/states?country=${this.country}&key=${this.apiKey}`);
      this.states = await res.json()

   };


   searchState = searchText => {
      // Search state
      const stateInput = document.getElementById("stateInput");
      // Listen state input
      stateInput.addEventListener('input', () => autocomplete.searchState(stateInput.value));
      // Get matches to current text input
      this.matches = this.states.data.filter(state => {
         const regex = new RegExp(`${searchText}`, 'gi');

         return state.state.match(regex);
         
      });


      // Clear when input or matches are empty
      if (searchText.length === 0) {
         this.matches = [];
         this.stateMatch.innerHTML = '';
      }

      this.outputHtmlStates(this.matches);

   }

   selectState = (e) => {
      // h5 element
      if (e.target.classList.contains("child")) {
         this.state = e.target.innerHTML;
      }
      // parent div of h5 element
      if (e.target.classList.contains("parent")) {
         this.state = e.target.firstElementChild.innerHTML;
      }
      
      // search is set to match the state from the list
      stateInput.value = this.state;
      // countries from the list are always valid
      stateInput.setAttribute("class", "form-control is-valid");
      // state is selected, no need of displaying a list
      this.matches = [];
      // clear the matching list
      // this.outputHtmlStates(this.matches);
      this.stateMatch.innerHTML = '';

   }

   // Show results in HTML STATE
   outputHtmlStates = matches => {
      if (matches.length > 0) {
         const html = matches.map(match => `
         <div class="card card-body parent mb-1">
         <h5 class="child">${match.state}</h5>
         </div>
         `).join('');
         
         
         this.stateMatch.innerHTML = html;
      } else {
         this.stateMatch.innerHTML = '';
      }
   }




   // Clicking on input will reset to input mode
   clickInputCountry = e => {
      if (e.target.classList.contains("is-valid")) {
         searchCountry.setAttribute("class", "form-control")
         searchCountry.value = '';
         this.removeElement("stateForm");
      }
   }

   clickInputState = e => {
      if (e.target.classList.contains("is-valid") && e.target.id === "stateInput") {
         this.stateInput.setAttribute("class", "form-control");
         this.stateInput.value = '';
         
      }
   }
   
   removeElement = elementId => {
      // Removes an element from the document
      const element = document.getElementById(elementId);
      element.parentNode.removeChild(element);
  }
}
