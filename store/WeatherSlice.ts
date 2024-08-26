import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface City {
  id: string;
  cityName: string;
  localityName: string;
  localCityName: string;
}

interface WeatherData {
  cityName: string;
  temperature: number;
  humidity: number;
  wind_speed: number;
  wind_direction: number;
  rain_intensity: number;
  rain_accumulation: number;
}

interface WeatherState {
  searchTerm: string;
  filteredCities: City[];
  selectedCity: string | null;
  weatherData: WeatherData | null;
  error: string | null;
  expanded: boolean;
}

const initialState: WeatherState = {
  searchTerm: "",
  filteredCities: [],
  selectedCity: null,
  weatherData: null,
  error: null,
  expanded: false,
};

export const fetchWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  async ({ locality_id, city }: { locality_id: string; city: string }) => {
    const response = await axios.request({
      method: "GET",
      url: "https://www.weatherunion.com/gw/weather/external/v0/get_locality_weather_data",
      headers: { "X-Zomato-Api-Key": "d54a37e2fc5a8eb91a74c2dae9bb6003" },
      params: { locality_id },
    });
    return { ...response.data.locality_weather_data, cityName: city };
  },
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setFilteredCities: (state, action: PayloadAction<City[]>) => {
      state.filteredCities = action.payload;
    },
    setSelectedCity: (state, action: PayloadAction<string | null>) => {
      state.selectedCity = action.payload;
    },
    setExpanded: (state, action: PayloadAction<boolean>) => {
      state.expanded = action.payload;
    },
    clearWeatherData: (state) => {
      state.weatherData = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        if (action.payload.temperature === null) {
          state.error = "No weather data available for this city currently.";
        } else {
          state.weatherData = action.payload;
          state.error = null;
        }
      })
      .addCase(fetchWeatherData.rejected, (state) => {
        state.error = "An error occurred while fetching weather data.";
      });
  },
});

export const {
  setSearchTerm,
  setFilteredCities,
  setSelectedCity,
  setExpanded,
  clearWeatherData,
} = weatherSlice.actions;

export default weatherSlice.reducer;
