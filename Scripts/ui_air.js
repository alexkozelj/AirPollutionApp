class UI {
   constructor() {
      this.location = document.getElementById('w-location');
      this.pollution = document.getElementById('w-aqi');
      this.pollutionNumber;
      this.pollutionSign = document.getElementById('pollution-sign');
      this.desc = document.getElementById('w-temp');
      this.details = document.getElementById('w-details');
      this.icon = document.getElementById('w-icon');
      this.humidity = document.getElementById('w-humidity');
      this.feelsLike = document.getElementById('w-wind-direction');
      this.dewpoint = document.getElementById('w-pressure');
      this.wind = document.getElementById('w-wind-speed');

   }

   

   paint(weather) {
      
      this.location.textContent = weather.data.city + ", " + weather.data.country;
      this.pollution.textContent = "US AirQualityIndex: " + weather.data.current.pollution.aqius;
      this.pollutionNumber = weather.data.current.pollution.aqius;
      let aqi = weather.data.current.pollution.aqius;
      // depending of index, button will get certain class
      if(aqi < 50) {
         this.pollutionSign.setAttribute("class", "col-md-4 mx-auto text-center mb-4 mt-4 good");
         this.pollutionSign.innerHTML = "Good";
         const good = "Air quality is satisfactory and poses little or no health risk. Ventilating your home is recommended. Recommendations: Enjoy your usual outdoor activities. We recommend opening your windows and ventilating your home to bring in fresh, oxygen-rich air.";
         document.getElementById("description").innerHTML = good;
      }
      else if (aqi > 50 && aqi < 101) {
         this.pollutionSign.setAttribute("class", "btn btn-secondary mb-4 moderate");
         this.pollutionSign.innerHTML = "Moderate";
      }
      else if (aqi > 100 && aqi < 151) {
         this.pollutionSign.setAttribute("class", "btn btn-secondary mb-4 unhealthy-1");
         this.pollutionSign.innerHTML = "Unhealthy*";
      }
      else if (aqi > 150 && aqi < 251) {
         this.pollutionSign.setAttribute("class", "btn btn-secondary mb-4 unhealthy-2");
         this.pollutionSign.innerHTML = "Unhealthy**";
      }
      else if (aqi > 250 && aqi < 301) {
         this.pollutionSign.setAttribute("class", "btn btn-secondary mb-4 hazardous");
         this.pollutionSign.innerHTML = "Hazardous";
      }
      else {
         alert("Something's wrong, please try latter")
      }
      this.desc.textContent = weather.data.current.weather.tp + " C°";
      // if there is a fog, change the N character to D to get the icon from server
      this.icon.setAttribute('src', "https://airvisual.com/images/" + weather.data.current.weather.ic + ".png");
      if(weather.data.current.weather.ic === "50n") {
         this.icon.setAttribute('src', "https://airvisual.com/images/50d.png");
      } 
      if (weather.data.current.weather.ic === "04n") {
         this.icon.setAttribute('src', "https://airvisual.com/images/04d.png");
      }
      this.humidity.textContent = `Relative Humidity: ${weather.data.current.weather.hu}%`;
      this.dewpoint.textContent = `Pressure: ${weather.data.current.weather.pr}mb`;
      this.feelsLike.textContent = `Wind Direction: ${this.degToCompass(weather.data.current.weather.wd)}`;
      this.wind.textContent = "Wind Speed: " + weather.data.current.weather.ws + "km/h";
   }

   // Wind direction from degrees(API) to Compass cardinal direction
   degToCompass(num) {
      var val = Math.floor((num / 22.5) + 0.5);
      var arr = ["North", "North-NorthEast", "North-East", "East-NorthEast", "East", "East-SouthEast", "South-East", "South-SouthEast", "South", "South-SouthWest", "South-West", "West-SouthWest", "West", "West-NorthWest", "North-West", "North-NorthWest"];
      return arr[(val % 16)];
   }

}