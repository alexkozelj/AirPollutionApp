class Weather {
   constructor(city, state, country) {
      this.apiKey = '08145b70-7c87-4d40-9c07-1bcdbe2b35f4';
      this.city = city;
      this.state = state;
      this.country = country;

   }

   // Fetch weather from API
   async getWeather() {
      // Kosovo is Serbian state, correction
      if (this.city === "Kosovska Mitrovica" && this.state === "Kosovo" && this.country === "Serbia") {
         const response = await fetch(`https://api.airvisual.com/v2/city?city=mitrovice&state=mitrovica&country=kosovo&key=08145b70-7c87-4d40-9c07-1bcdbe2b35f4`);
         const responseData = await response.json();
         return responseData;
      } else {
         const response = await fetch(`https://api.airvisual.com/v2/city?city=${this.city}&state=${this.state}&country=${this.country}&key=${this.apiKey}`);
         const responseData = await response.json();
         return responseData;
      }
   }

   // change location collected from modal
   changeLocation(city, state, country) {
      this.city = city;
      this.state = state;
      this.country = country;
   }

}