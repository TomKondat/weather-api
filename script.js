import { getCityWeather } from "./apiServices.js";

const root = document.getElementById("root");
const form = document.getElementById("search-bar");

let cities = [];

const createCardEl = (data) => {
  const cardEl = document.createElement("div");
  cardEl.innerHTML = `
        <div id="card">
 <img src="${data.current.condition.icon}" alt="${data.current.condition.text}"><div>
    <h5>${data.location.name}, ${data.location.country}</h5>
        <p>${data.current.condition.text}</p>
        <p>${data.current.temp_c}°C</p>
  </div>
</div>
    `;
  const a = {
    city: data.location.name,
    condition: data.current.condition.text,
    temp: data.current.temp_c,
  };

  cities.push(a);
  console.log(cities);

  root.append(cardEl);
  return cardEl;
};

const handleSearchCity = (e) => {
  e.preventDefault();
  const city = e.target.children[1].value;
  getCityWeather(city).then((data) => {
    renderSingle(root, data, createCardEl);
  });
};
//---------------------
const render = (elToAddTo, dataListArr, createCard) => {
  elToAddTo.innerHTML = "";
  dataListArr?.map((el) => addTo(elToAddTo, createCard(el)));
};
render(root, cities, createCardEl);

const addTo = (elToAddTo, elToBeAdded) => elToAddTo.append(elToBeAdded);
const renderSingle = (elToAddTo, dataObj, createCard) => {
  addTo(elToAddTo, createCard(dataObj));
};

//----------------------

form.addEventListener("submit", handleSearchCity);
