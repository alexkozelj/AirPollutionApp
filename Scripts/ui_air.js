class UI {
   constructor() {
      this.location = document.getElementById('w-location');
      this.desc = document.getElementById('w-desc');
      this.string = document.getElementById('w-string');
      this.details = document.getElementById('w-details');
      this.icon = document.getElementById('w-icon');
      this.humidity = document.getElementById('w-humidity');
      this.feelsLike = document.getElementById('w-feels-like');
      this.dewpoint = document.getElementById('w-dewpoint');
      this.wind = document.getElementById('w-wind');

   }

   paint(weather) {
      this.location.textContent = weather.data.city + ", " + weather.data.country;
      this.desc.textContent = weather.data.current.weather.tp + " C°";
      this.string.textContent = "US AirQualityIndex: " + weather.data.current.pollution.aqius;
      this.icon.setAttribute('src', "http://openweathermap.org/img/wn/" + weather.data.current.weather.ic + "@2x.png");
      this.humidity.textContent = `Relative Humidity: ${weather.data.current.weather.hu}%`;
      this.dewpoint.textContent = `Pressure: ${weather.data.current.weather.pr}mb`;
      this.feelsLike.textContent = `Wind Direction: ${this.degToCompass(weather.data.current.weather.wd)}`;
      this.wind.textContent = "Wind Speed: " + weather.data.current.weather.ws + "km/h";
   }

   // Wind direction from degrees(API) to Compas cardinal direction
   degToCompass(num) {
      var val = Math.floor((num / 22.5) + 0.5);
      var arr = ["North", "North-NorthEast", "North-East", "East-NorthEast", "East", "East-SouthEast", "South-East", "South-SouthEast", "South", "South-SouthWest", "South-West", "West-SouthWest", "West", "West-NorthWest", "North-West", "North-NorthWest"];
      return arr[(val % 16)];
   }
}