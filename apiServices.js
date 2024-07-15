const callApi = async (url, method = "GET", body = undefined) => {
  const result = await fetch(url, {
    method,
    body, //כששם המשתנה זהה לערך  שלו אין צורך לכתוב פעמיים
  });
  return result.json();
};

const getCityWeather = (city) => {
  const url = `https://api.weatherapi.com/v1/current.json?key=b8a9505712a14179b93115900241507&q=${city}&aqi=no`;
  const dataPromise = callApi(url);
  return dataPromise;
};
export { callApi, getCityWeather };
