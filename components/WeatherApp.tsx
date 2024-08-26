"use client";

import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import data from "../data/myData.json";
import GradientText from "./GradientText";
import WeatherCard from "./WeatherDisplay";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  setSearchTerm,
  setFilteredCities,
  setSelectedCity,
  setExpanded,
  clearWeatherData,
  fetchWeatherData,
} from "@/store/WeatherSlice";

export default function WeatherApp() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    searchTerm,
    filteredCities,
    selectedCity,
    weatherData,
    error,
    expanded,
  } = useSelector((state: RootState) => state.weather);

  useEffect(() => {
    if (searchTerm) {
      const filtered = data.filter((city) =>
        city.localCityName.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      dispatch(setFilteredCities(filtered.slice(0, 5)));
    } else {
      dispatch(setFilteredCities([]));
    }
  }, [searchTerm, dispatch]);

  const getLocalityId = (city: string) => {
    const cityData = data.find((cityn) => cityn.localCityName === city);
    return cityData ? cityData.localityId : null;
  };

  const handleCitySelect = (city: string) => {
    dispatch(setSelectedCity(city));
    dispatch(setSearchTerm(""));
    const localityId = getLocalityId(city);
    if (localityId) {
      dispatch(fetchWeatherData({ locality_id: localityId, city }));
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
            onClick={() => dispatch(setExpanded(true))}
          >
            <Input
              type="text"
              placeholder="Search for a city..."
              className="lg:min-w-2xl pl-14 py-10 lg:pl-14 lg:pr-10 lg:py-10 rounded-[999px] max-sm:w-[400px] border border-gray-800 dark:border-gray-700 focus-within:outline-none focus:outline-none focus:border-0 text-lg dark:bg-zinc-800 dark:text-white"
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            />
          </motion.div>
        </div>
        {filteredCities.length > 0 && (
          <div className="bg-zinc-100 dark:bg-zinc-800 rounded-xl w-[600px] max-sm:w-[350px] shadow-xl overflow-y-auto max-h-64 fixed top-[18rem] sm:top-[19rem] lg:top-[14rem] left-1/2 -translate-x-1/2 z-10">
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
        getLocalityId(selectedCity) === getLocalityId(weatherData.cityName) && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: expanded ? -50 : 0 }}
            transition={{ duration: 0.5 }}
            className="max-sm:w-[20rem] bg-transparent rounded-lg lg:max-w-2xl max-w-[28rem]"
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
