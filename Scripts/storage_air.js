class Storage {
   constructor() {
      this.city;
      this.state;
      this.country;
      this.defaultCity = 'Frankfurt am Main';
      this.defaultState = 'Hessen'
      this.defaultCountry = 'Germany';
   }

   getLocationData() {
      if (localStorage.getItem('city') === null) {
         this.city = this.defaultCity;
      } else {
         this.city = localStorage.getItem('city');
      }

      if (localStorage.getItem('state') === null) {
         this.state = this.defaultState;
      } else {
         this.state = localStorage.getItem('state');
      }

      if (localStorage.getItem('country') === null) {
         this.country = this.defaultCountry;
      } else {
         this.country = localStorage.getItem('country');
      }

      return {
         city: this.city,
         state: this.state,
         country: this.country
      }
   }

   setLocationData(city, state, country) {
      localStorage.setItem('city', city);
      localStorage.setItem('state', state);
      localStorage.setItem('country', country);
   }

   // getLocalCountries() {
   //    let countries = [];
   //    fetch('countries.json')
   //       .then(res => {
   //          return res.json();
   //       })
   //       .then(data => {
   //          console.log(data);
   //          for (let i = 0; i < data.data.length; i++) {
   //             let country = data.data[i].country;
   //             countries.push(country)
   //          }
   //       });

   //    return countries
   // }
}

