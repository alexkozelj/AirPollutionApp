class Weather {
   constructor(city, state, country) {
      this.apiKey = '08145b70-7c87-4d40-9c07-1bcdbe2b35f4';
      this.city = city;
      this.state = state;
      this.country = country;

   }

   // Fetch weather from API
   async getWeather() {
      // const response = await fetch(`http://api.airvisual.com/v2/city?city=Beograd&state=Central Serbia&country=Serbia&key=${this.apiKey}`);
      const response = await fetch(`http://api.airvisual.com/v2/city?city=${this.city}&state=${this.state}&country=${this.country}&key=${this.apiKey}`);

      const responseData = await response.json();
      console.log(responseData);
      // should say return responseData.weather.data - all that I need is there
      return responseData;
   }

   async getCountry() {
      // const response = await fetch(`http://api.airvisual.com/v2/city?city=Beograd&state=Central Serbia&country=Serbia&key=${this.apiKey}`);
      const response = await fetch(`http://api.airvisual.com/v2/countries?key=${this.apiKey}`);
      let countries = [];

      await response.json()
         .then(data => {
            for (let i = 0; i < data.data.length; i++) {
               let country = data.data[i].country;
               countries.push(country)
            }

         });
      
      // console.log(countries);
      return countries;

   }

   changeLocation(city, state, country) {
      // if(city === null || " " || undefined){
      //   this.city = "Beograd"
      // } else {
      //   this.city = city;
      // }
      // console.log(city);
      // if(state === null || " "){
      //   this.state = "Central Serbia"
      // } else {
      //   this.state = state;
      // }

      // if(country === null || " "){
      //   this.country = "Serbia"
      // } else {
      //   this.country = country;
      // }


      this.city = city;
      this.state = state;
      this.country = country;
   }

}