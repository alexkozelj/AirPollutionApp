// ///////////////////// autocomplete ////////////////////
class Autocomplete {

   constructor () {
      // countries from json file
      this.countries;
      // input box for countries
      this.input;
      // matches of countries from input 
      this.matches;
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
         matchList.innerHTML = '';
      }

      this.outputHtml(this.matches);

   }

   // Selecting country from suggestion list
   selectCountrySug = (e) => {
      
      if(e.target.classList.contains("child")) {
         this.input = e.target.innerHTML;
      }

      if(e.target.classList.contains("parent")) {
         // console.log('tatko')
         this.input = e.target.firstElementChild.innerHTML;
         // console.log(this.input);
      }

      search.value = this.input;
      search.setAttribute("class","form-control is-valid");
      this.matches = [];
      this.outputHtml(this.matches);

      
      // const countryName = suggestion.getElementsByClassName("child").innerHTML;
      // search.value = countryName;
      // console.log(this.input);
      // e.preventDefault();
   }

   // Clicking on input
   clickInput = (e) => {
      if (e.target.classList.contains("is-valid")){
         search.setAttribute("class", "form-control")
      }
   }


   // Show results in HTML
   outputHtml = matches => {
      if (matches.length > 0) {
         const html = matches.map(match => `
            <div class="card card-body parent mb-1">
               <h5 class="child">${match.country}</h5>
            </div>
         `).join('');


         matchList.innerHTML = html;
      } else {
         matchList.innerHTML = '';
      }
   }
}
