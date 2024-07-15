import { callApi, getCityWeather } from "./apiServices.js";

const root = document.getElementById("root");
const form = document.getElementById("search-bar");

const url = `https://api.weatherapi.com/v1/current.json?key=b8a9505712a14179b93115900241507&q=London&aqi=no`;

let cities = [];

const createCardEl = (data) => {
  const cardEl = document.createElement("div");
  cardEl.innerHTML = `
        <div id="card">
 <img src="${data.current.condition.icon}" alt="${data.current.condition.text}">  <div >
    <h5 >${data.location.name}</h5>
        <p>${data.current.condition.text}</p>
        <p>${data.current.temp_c}°C</p>
  </div>
</div>
    `;

  root.append(cardEl);
  return cardEl;
};

const handleSearchCity = (e) => {
  e.preventDefault();
  const city = e.target.children[1].value;
  const a = getCityWeather(city).then((data) => {
    renderSingle(root, data, createCardEl);
  });
  cities.push(a);
  render(root, cities, createCardEl);
};

//---------------------
const addTo = (elToAddTo, elToBeAdded) => elToAddTo.append(elToBeAdded);
const renderSingle = (elToAddTo, dataObj, createCard) => {
  elToAddTo.innerHTML = "";
  addTo(elToAddTo, createCard(dataObj));
};

const render = (elToAddTo, dataListArr, createCard) => {
  elToAddTo.innerHTML = "";
  dataListArr?.map((el) => addTo(elToAddTo, createCard(el)));
};

//----------------------
callApi(url).then((data) => {
  renderSingle(root, data, createCardEl);
});

form.addEventListener("submit", handleSearchCity);
