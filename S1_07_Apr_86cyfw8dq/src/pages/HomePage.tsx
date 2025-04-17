import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useWeather } from "../hooks/useWeather";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  Divider,
} from "@mui/material";
import { format, parseISO } from "date-fns";

const getWeatherIcon = (description: string) => {
  const desc = description.toLowerCase();
  if (desc.includes("cloud")) return "☁️";
  if (desc.includes("rain")) return "🌧️";
  if (desc.includes("clear")) return "☀️";
  if (desc.includes("snow")) return "❄️";
  if (desc.includes("thunder")) return "⛈️";
  if (desc.includes("fog") || desc.includes("mist")) return "🌫️";
  return "🌈";
};

const formatTime = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const HomePage = () => {
  const { getWeatherByLocation, getWeatherByCity } = useWeather();
  const currentWeather = useSelector((state: RootState) => state.weather.currentWeather);
  const forecast = useSelector((state: RootState) => state.weather.forecast);
  const [city, setCity] = useState("");
  const theme = useTheme();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getWeatherByLocation(latitude, longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  }, []);

  const handleSearch = () => {
    if (city.trim()) {
      getWeatherByCity(city.trim());
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          🌤 Weather App
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2, flexWrap: "wrap" }}>
          <TextField
            label="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ width: "250px" }}
          />
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Box>
      </Box>


      {currentWeather && (
        <Paper
          elevation={4}
          sx={{
            backgroundColor: theme.palette.background.paper,
            padding: 4,
            borderRadius: 3,
            textAlign: "center",
            mb: 4,
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            📍 {currentWeather.name}, {currentWeather.sys.country}
          </Typography>

          <Box sx={{ fontSize: 48, mt: 2 }}>
            {getWeatherIcon(currentWeather.weather[0].description)}
          </Box>

          <Typography variant="h6" sx={{ mt: 1 }}>
            {currentWeather.weather[0].main} - {currentWeather.weather[0].description}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography>🌡 Temperature: {currentWeather.main.temp}°C</Typography>
          <Typography>🤒 Feels Like: {currentWeather.main.feels_like}°C</Typography>
          <Typography>🔻 Min: {currentWeather.main.temp_min}°C | 🔺 Max: {currentWeather.main.temp_max}°C</Typography>
          <Typography>💧 Humidity: {currentWeather.main.humidity}%</Typography>
          <Typography>💨 Wind Speed: {currentWeather.wind.speed} m/s</Typography>

          <Box mt={2} display="flex" justifyContent="center" gap={4}>
            <Box display="flex" alignItems="center" gap={1}>
              🌅 <Typography>{formatTime(currentWeather.sys.sunrise)}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              🌇 <Typography>{formatTime(currentWeather.sys.sunset)}</Typography>
            </Box>
          </Box>
        </Paper>
      )}


      <Typography variant="h6" fontWeight="bold" textAlign="center" gutterBottom>
        5-Day Forecast
      </Typography>

      {forecast ? (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
            mt: 2,
          }}
        >
          {forecast.map((day: any, index: number) => (
            <Paper
              key={index}
              elevation={3}
              sx={{
                padding: 2,
                borderRadius: 3,
                textAlign: "center",
                width: "150px",
                backgroundColor: theme.palette.background.paper,
              }}
            >
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                {format(parseISO(day.date), "EEE, MMM d")}
              </Typography>

              <Box sx={{ fontSize: 32 }}>
                {getWeatherIcon(day.weather)}
              </Box>

              <Typography variant="body2" sx={{ mt: 1 }}>
                <strong>Temp:</strong> {day.temp}°C
              </Typography>
              <Typography variant="body2">
                <strong>Humidity:</strong> {day.humidity}%
              </Typography>
              <Typography variant="body2">
                <strong>Wind:</strong> {day.wind} m/s
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
                {day.weather}
              </Typography>
            </Paper>
          ))}
        </Box>
      ) : (
        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          mt={2}
        >
          No forecast data available.
        </Typography>
      )}
    </Container>
  );
};

export default HomePage;
