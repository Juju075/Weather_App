//1- préparer tout les Elements par selection d' id="
// const nommage idName+El
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');


const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
const months = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aout', 'Sept', 'Oct', 'Nov', 'Dec'];

const API_KEY ='49cc8c821cd2aff9af04c9f98c36eb74';

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
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

     //Format us
    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`
    //console.log(hoursIn12HrFormat);
    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);


/**
 * FONCTIONNALITE A AJOUTER 
 * barre de recherche ville dans le monde.
 * autocompletation
 * resultat longitude latitude -> getWeatherData(latitude, longitude)
 */


//FUNCTION Promise - Call API  callback and option.
/**
 * API Fetch | moyen facile et logique de récupérer des ressources à travers le réseau
 * de manière asynchrone.
 */
//$jquery prefix variables https://learn.jquery.com/using-jquery-core/dollar-object-vs-function/
getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        let {latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`)
        .then(res => res.json())
        .then(data => {

        console.log(data);
        showWeatherData(data);
        })

    })
}



  /**
   * Moment.js 2.29.3
   * Parse, validate, manipulate,
   * and display dates and times in JavaScript.
   * https://momentjs.com/?utm_source=cdnjs&utm_medium=cdnjs_link&utm_campaign=cdnjs_library
   *
   * get momentJS from window?
   * Just bind your moment to window.moment bind(=lier)
   */
function showWeatherData (data){
    let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;

    //
    timezone.innerHTML = data.timezone;
    countryEl.innerHTML = data.lat + 'N ' + data.lon+'E'

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
        <div>Levé du soleil</div>
        <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
    </div>
    <div class="weather-item">
        <div>Couché du soleil</div>
        <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
    </div>
    `;


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
    let otherDayForcast = ''

    data.daily.forEach((day, idx) => {
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
    //console.log(otherDayForcast);
    weatherForecastEl.innerHTML = otherDayForcast;
}


/**
 * Ameliorations
 * background par default | background en lien avec la ville recherché.
 * here:
 * icone weather: 
 * jeu spin the well javascript 'find your best destination in world" => acheter billet d'avion 'sugestion automatique'
 */

//Data
/**
current:
clouds: 0
dew_point: 6.07
dt: 1654002609
feels_like: 19.6
humidity: 39
pressure: 1013
sunrise: 1653969194
sunset: 1654026231
temp: 20.48
uvi: 3
visibility: 10000
weather: [{…}]
wind_deg: 250
wind_speed: 5.66
 */




/**
 * lie les icones dans un dossier locale.
 * Icone meteo current
weather: Array(1)
0: {id: 800, main: 'Clear', description: 'clear sky', icon: '01d'}
length: 1 
 */
//Data
/**
daily: Array(8)
0: {dt: 1653994800, sunrise: 1653969194, sunset: 1654026231, moonrise: 1653970320, moonset: 1654031400, …}
1: {dt: 1654081200, sunrise: 1654055551, sunset: 1654112691, moonrise: 1654059060, moonset: 0, …}
2: {dt: 1654167600, sunrise: 1654141912, sunset: 1654199149, moonrise: 1654148460, moonset: 1654121100, …}
3: {dt: 1654254000, sunrise: 1654228274, sunset: 1654285605, moonrise: 1654238280, moonset: 1654210320, …}
4: {dt: 1654340400, sunrise: 1654314640, sunset: 1654372059, moonrise: 1654328580, moonset: 1654298940, …}
5: {dt: 1654426800, sunrise: 1654401008, sunset: 1654458512, moonrise: 1654419060, moonset: 1654387020, …}
6: {dt: 1654513200, sunrise: 1654487378, sunset: 1654544962, moonrise: 1654509660, moonset: 1654474800, …}
7: {dt: 1654599600, sunrise: 1654573751, sunset: 1654631410, moonrise: 1654600320, moonset: 1654562340, …}
length: 8
 */

//otherDayForcast
/**
            `<div class="weather-forecast-item">
                <div class="day">Wed</div>
                <img src="http://openweathermap.org/img/wn/01d@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Nuit - 15.3&#176;C</div>
                <div class="temp">Jour - 20.45&#176;C</div>
            </div>
            
            
            <div class="weather-forecast-item">
                <div class="day">Thu</div>
                <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Nuit - 17.87&#176;C</div>
                <div class="temp">Jour - 22.05&#176;C</div>
            </div>
            
            
            <div class="weather-forecast-item">
                <div class="day">Fri</div>
                <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Nuit - 17.68&#176;C</div>
                <div class="temp">Jour - 21.44&#176;C</div>
            </div>
            
            
            <div class="weather-forecast-item">
                <div class="day">Sat</div>
                <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Nuit - 17.08&#176;C</div>
                <div class="temp">Jour - 26.07&#176;C</div>
            </div>
            
            
            <div class="weather-forecast-item">
                <div class="day">Sun</div>
                <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Nuit - 15.69&#176;C</div>
                <div class="temp">Jour - 21.54&#176;C</div>
            </div>
            
            
            <div class="weather-forecast-item">
                <div class="day">Mon</div>
                <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Nuit - 13.43&#176;C</div>
                <div class="temp">Jour - 13.94&#176;C</div>
            </div>
            
            
            <div class="weather-forecast-item">
                <div class="day">Tue</div>
                <img src="http://openweathermap.org/img/wn/03d@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Nuit - 15.78&#176;C</div>
                <div class="temp">Jour - 20.73&#176;C</div>
            </div>`
 */
