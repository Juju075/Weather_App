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

  const minutes = time.getMinutes();
  //console.log(minutes);

  const ampm = hour >= 12 ? "PM" : "AM";
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
