"use client";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import data from "../data/myData.json";
import axios from "axios";
import { Search } from "lucide-react";
import GradientText from "./GradientText";
import WeatherCard from "./WeatherDisplay";

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

export default function WeatherApp() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      const filtered = data.filter((city) =>
        city.localCityName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCities(filtered.slice(0, 5));
    } else {
      setFilteredCities([]);
    }
  }, [searchTerm, data]);

  const getLocalityId = (city: string) => {
    const cityData = data.find((cityn) => cityn.localCityName === city);
    return cityData ? cityData.localityId : null;
  };

  const fetchWeatherData = async (locality_id: string, city: string) => {
    try {
      const response = await axios.request({
        method: "GET",
        url: "https://www.weatherunion.com/gw/weather/external/v0/get_locality_weather_data",
        headers: { "X-Zomato-Api-Key": "d54a37e2fc5a8eb91a74c2dae9bb6003" },
        params: {
          locality_id: locality_id,
        },
      });
      if (response.data.locality_weather_data.temperature === null) {
        setError("No weather data available for this city currently.");
      } else {
        const weatherData: WeatherData = {
          ...response.data.locality_weather_data,
          cityName: city,
        };
        console.log(weatherData);
        setWeatherData(weatherData);
        setError("");
      }
    } catch (error) {
      setError("An error occurred while fetching weather data.");
    }
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setSearchTerm("");
    const localityId = getLocalityId(city);
    if (localityId) {
      fetchWeatherData(localityId, city);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 flex flex-col items-center">
      <motion.div
        className={`w-full max-w-2xl flex flex-col gap-5 py-32 lg:py-10 ${expanded ? "h-full" : "h-[calc(100vh-5rem)]"}`}
        initial={{ justifyContent: "center" }}
        animate={{ justifyContent: expanded ? "start" : "center" }}
        transition={{ duration: 1 }}
      >
        <GradientText text="Weather Union" />
        <motion.div
          initial={{ display: "block", opacity: 1 }}
          animate={{ display: "hidden", opacity: expanded ? 0 : 1 }}
          transition={{ duration: 0.1 }}
          className="text-center"
        >
          <span className="text-xl font-medium text-center mb-4">
            Weather Union a zomato giveback
          </span>
        </motion.div>
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ width: "50%", y: 0 }}
            animate={{
              width: expanded ? "100%" : "50%",
              y: expanded ? -50 : 0,
            }}
            className="relative flex items-center justify-center"
            onClick={() => setExpanded(true)}
          >
            <Input
              type="text"
              placeholder="Search for a city..."
              className="lg:min-w-2xl pl-14 py-10 lg:pl-16 lg:pr-10 lg:py-10 rounded-[999px] max-sm:w-[400px] border border-gray-800 dark:border-gray-700 focus-within:outline-none focus:outline-none focus:border-0 text-lg dark:bg-zinc-800 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div
              className={`absolute max-sm:left-14 lg:left-5 top-1/2 transform -translate-y-1/2 ${expanded ? "max-sm:flex" : "max-sm:hidden"}`}
            >
              <Search className="text-gray-400" size={24} />
            </div>
          </motion.div>
        </div>
        {filteredCities.length > 0 && (
          <div className="bg-zinc-100 dark:bg-zinc-800 rounded-xl shadow overflow-y-auto max-h-64 fixed top-1/2 left-1/2 -translate-x-1/2 transform -translate-y-[180px] lg:-translate-y-[300px] w-[300px] lg:w-[550px] z-10">
            {filteredCities.map((city) => (
              <div
                key={city.id}
                className="lg:px-5 p-4 hover:bg-gray-200 dark:hover:bg-zinc-700 cursor-pointer dark:text-white"
                onClick={() => handleCitySelect(city.localCityName)}
              >
                {city.localCityName}
              </div>
            ))}
          </div>
        )}
      </motion.div>
      {expanded &&
        selectedCity &&
        weatherData &&
        getLocalityId(selectedCity as string) ==
          getLocalityId(weatherData.cityName) && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: expanded ? -50 : 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 max-sm:w-[30rem] bg-transparent rounded-lg lg:max-w-2xl max-w-[28rem]"
          >
            <WeatherCard weatherData={weatherData} />
          </motion.div>
        )}
      {expanded && error && error?.length > 0 && (
        <motion.div className="mt-8 p-6 bg-white dark:bg-zinc-900 rounded-lg max-w-2xl w-full flex flex-col items-center justify-center">
          <ExclamationTriangleIcon className="text-red-500 size-24" />
          <span className="mt-4">{error}</span>
          <span className="">Please try again after some time.</span>
        </motion.div>
      )}
    </div>
  );
}
