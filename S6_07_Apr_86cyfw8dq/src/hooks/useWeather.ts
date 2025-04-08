import { useDispatch } from "react-redux";
import { setCurrentWeather, setForecast } from "../app/WeatherSlice";
import { fetchCurrentWeather,fetchForecast, fetchWeatherByCity } from "../api/weatherApi";

export const useWeather = () => {
  const dispatch = useDispatch();

  const getWeatherByLocation = async (lat: number, lon: number) => {
    try {
      const current = await fetchCurrentWeather(lat, lon);
      dispatch(setCurrentWeather(current));

      const forecast = await fetchForecast(lat,lon);
      dispatch(setForecast(forecast));
    } catch (error) {
      console.error("Failed to fetch weather by location:", error);
    }
  };

  const getWeatherByCity = async (city: string) => {
    try {
      console.log("Fetching weather for", city);
      const current = await fetchWeatherByCity(city); 
      dispatch(setCurrentWeather(current));

      const {coord} = current;
      if(coord?.lat && coord?.lon){
        const forecast = await fetchForecast(coord.lat, coord.lon);
        dispatch(setForecast(forecast));
      }
      
    } catch (error) {
      console.error("Failed to fetch weather by city:", error);
    }
  };

  return { getWeatherByLocation, getWeatherByCity };
};
