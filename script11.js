//1- préparer tout les Elements par selection d' id="
// const nommage idName+El
const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const timeZoneEl = document.getElementById("time-zone");
const countryEl = document.getElementById("country");
const currentTempEl = document.getElementById("current-temp");
const weatherForecastEl = document.getElementById("weather-forecast");
const currentWeatherItemsEl = document.getElementById("current-weather-items");
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

const API_KEY = "79fe865edaa858ac2767c81e9af5cc8b";

//2-

/**
 * The setInterval() method, offered on the Window and Worker interfaces,
 * repeatedly calls a function or executes a code snippet, with a fixed time delay between each call.
 * This method returns an interval ID which uniquely identifies the interval, so you can remove it
 * later by calling clearInterval().
 */

/**
 * Obj new Date() Constructeur Date()
 * Les objets Date contiennent un nombre (Number) qui représente le nombre
 * de millisecondes écoulées depuis le premier janvier 1970 (UTC).
 */

setInterval(() => {
  const time = new Date();

  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();

  //Format us
  const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
  //console.log(hoursIn12HrFormat);

  const minutes = time.getMinutes(); //2 decimales
  //console.log(minutes);

  const ampm = hour >= 12 ? "PM" : "AM"; //ternaire
  //console.log(ampm);

  //Affectation selecteur heure.
  /**
   * element.innerHTML
   * La propriété Element.innerHTML de Element récupère ou
   * définit la syntaxe HTML décrivant les descendants de l'élément.
   */

  //hour pb avec minutes
  timeEl.innerHTML =
    hoursIn12HrFormat + ":" + minutes + " " + `<span id="am-pm">${ampm}</span>`;

  //days[day] months[month] javascript months array
  dateEl.innerHTML = days[day] + "," + date + " " + months[month];
}, 1000);

getWeatherData();

//FUNCTION Promise - Call API  callback and option.
/**
 * API Fetch | moyen facile et logique de récupérer des ressources à travers le réseau
 * de manière asynchrone.
 */
//$jquery prefix variables https://learn.jquery.com/using-jquery-core/dollar-object-vs-function/
function getWeatherData() {
  navigator.geolocation.getCurrentPosition((success) => {
    let { latitude, longitude } = success.coords;

    // 401 "Invalid API key. Please see http://openweathermap.org/faq#error401 for more info."
    //fetch les seuls elements qui nous interesse   requete > response sous forme json >
    fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`
    )
      //resolute
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        showWeatherData(data);
      });
  });





  
  /**
   * Moment.js 2.29.3
   * Parse, validate, manipulate,
   * and display dates and times in JavaScript.
   * https://momentjs.com/?utm_source=cdnjs&utm_medium=cdnjs_link&utm_campaign=cdnjs_library
   *
   * get momentJS from window?
   * Just bind your moment to window.moment bind(=lier)
   */
  function showWeatherData(data) {
    console.log(data.current);
    //data.current est le tableau de toute les datas  let {xxx} conserve uniquement les elements desiré.
    let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;

    //template
    //Block today <div class="today" id="current-temp">
    currentWeatherItemsEl.innerHTML = 
    `<div class="weather-item">
    <div>Humidite</div>
    <div>${humidity}%</div>
    </div>
    <div class="weather-item">
    <div>Pression</div>
    <div>${pressure}</div>
    </div>
    <div class="weather-item">
    <div>Vitesse du vent</div>
    <div>${wind_speed}</div>
    </div>
    <div class="weather-item">
    <div>Sunrise</div>
    <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
    </div>
    <div class="weather-item">
    <div>Sunset</div>
    <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
    </div>
    `;
    
    
    // <div class="future-forecast"> | id="current-temp" | id="weather-forecast" / class="weather-forecast-item" *5 



    // Today currentTempEl / Today jour?  | weather icon | Night Day temperature 
    // Template (boucle *5)/ Forecast 5 days.  Block .weather-forecast-item    global weatherForecastEl

    
    let otherDayForcast  = '' //type string
  
  /**
   * Array.prototype.forEach()
   * La méthode forEach() permet d'exécuter une fonction donnée sur chaque élément du tableau.
   * array1.forEach(element => console.log(element));
   */

  /**
   * L'opérateur d'addition et d'affectation (+=) 
   * calcule la somme ou la concaténation de ses deux opérandes 
   * puis affecte le résultat à la variable représentée par l'opérande gauche. 
   * C'est le type des opérandes qui détermine s'il y a somme ou concaténation.
   */

    //Operation Asynchrone
    data.daily.forEach((day, idx)=>{

      if(idx == 0){  
        currentTempEl.innerHTML = `
        <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
        <div class="other">
        <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
        <div class="temp">Night - ${day.temp.night}&#176;C</div>
        <div class="temp">Day - ${day.temp.day}&#176;C</div>
        </div>
        `
      }else{
        otherDayForcast += `
        <div class="weather-forecast-item">
            <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
            <div class="temp">Nuit - ${day.temp.night}&#176;C</div>
            <div class="temp">Jour - ${day.temp.day}&#176;C</div>
        </div>
        `
      }
    })
    //Block forecast *5  boucle ou rajout de 5.  +=
    //reecriture de tout le bloc *5 inner
    weatherForecastEl.innerHTML = otherDayForcast;
  }
}
