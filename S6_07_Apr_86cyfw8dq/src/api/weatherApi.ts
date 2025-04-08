import axios from "axios";

const API_KEY = "c907ff9e17d076b32bc4773ebf8f1573";
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const ONE_CALL = "https://api.openweathermap.org/data/2.5/forecast";
export const fetchCurrentWeather = async (lat: number, lon: number) => {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units: "metric",
    },
  });
  return response.data;
};


export const fetchForecast = async (lat: number, lon: number) => {
  const response = await axios.get(`${ONE_CALL}`, {
    params: {
      lat,
      lon,
      //exclude: "minutely,hourly,alerts",
      appid: API_KEY,
      units: "metric",
    },
  });

  const list = response.data.list;

  const grouped = groupForecastByDay(list);
  return grouped;
};

function groupForecastByDay(list:any[]){
  const daysMap: Record<string, any[]> = {};

  list.forEach((item) => {
    const date = new Date(item.dt * 1000).toISOString().split("T")[0];
    if (!daysMap[date]) daysMap[date] = [];
    daysMap[date].push(item);
  });

  const result = Object.entries(daysMap)
    .slice(0, 5)
    .map(([date, items]) => {
      const avg = (arr: number[]) =>
        arr.reduce((a, b) => a + b, 0) / arr.length;

      return {
        date,
        temp: parseFloat(avg(items.map((i) => i.main.temp)).toFixed(1)),
        humidity: Math.round(avg(items.map((i) => i.main.humidity))),
        wind: parseFloat(avg(items.map((i) => i.wind.speed)).toFixed(1)),
        weather: items[0].weather[0].main,
      };
    });

  return result;
}

export const fetchWeatherByCity = async (city: string) => {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      q: city,
      appid: API_KEY,
      units: "metric",
    },
  });

  return response.data;
};
