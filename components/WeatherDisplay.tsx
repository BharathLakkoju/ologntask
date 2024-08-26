"use client";
import { cn } from "@/lib/utils";
import {
  WiRain,
  WiWindy,
  WiStrongWind,
  WiDayLightWind,
  WiDayCloudyGusts,
  WiHot,
} from "react-icons/wi";
import { SiRainmeter } from "react-icons/si";
import { MdWaves } from "react-icons/md";
import { motion } from "framer-motion";
import {
  ArrowBigRight,
  ArrowRight,
  MoveRight,
  Snowflake,
  Sun,
} from "lucide-react";
interface WeatherData {
  cityName: string;
  temperature: number;
  humidity: number;
  wind_speed: number;
  wind_direction: number;
  rain_intensity: number;
  rain_accumulation: number;
}

export default function WeatherCard({
  weatherData,
}: {
  weatherData: WeatherData;
}) {
  const {
    cityName,
    temperature,
    humidity,
    wind_speed,
    wind_direction,
    rain_intensity,
    rain_accumulation,
  } = weatherData;

  return (
    <motion.div
      className={cn(
        "max-sm:w-[20rem] w-[28rem] lg:w-[42rem] lg:p-6 dark:text-white text-black rounded-xl",
        "flex flex-col items-start space-y-8 max-sm:space-y-4 mx-auto",
      )}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <span className="max-sm:text-xl text-2xl lg:text-4xl font-bold">
        {cityName}
      </span>
      <div className="flex flex-col items-start space-y-0">
        <span className="max-sm:text-[3rem] text-[5rem] font-bold">
          {temperature}°C
        </span>
        <div className="flex items-center gap-1">
          {temperature > 37 ? (
            <WiHot
              className={cn(
                "text-orange-500",
                "text-4xl",
                "p-0",
                "animate-pulse",
              )}
            />
          ) : temperature < 20 ? (
            <WiDayLightWind
              className={cn(
                "text-blue-200",
                "text-4xl",
                "p-0",
                "animate-pulse",
                "spin-slow",
              )}
            />
          ) : (
            <WiDayCloudyGusts
              className={`size-8 p-0 dark:text-yellow-200 text-yellow-400`}
            />
          )}
          <span className="text-lg">Temperature</span>
        </div>
      </div>

      <div className="flex flex-wrap max-sm:justify-center items-center min-w-[20rem] lg:min-w-5xl text-sm gap-10">
        <div className="flex flex-col justify-center items-center max-sm:w-[100px] w-[100px]">
          <div className="flex items-center gap-1">
            <MdWaves className="size-6 dark:text-blue-200 text-blue-400" />
            <span className="text-lg">humidity</span>
          </div>
          <span className="text-xl font-semibold">{humidity} %</span>
        </div>
        <div className="flex flex-col items-center justify-center max-sm:w-[130px] w-[150px]">
          <div className="flex items-center gap-1">
            <SiRainmeter className="size-6 text-blue-500" />
            <span className="text-lg">Rain Intensity</span>
          </div>
          <span className="text-lg font-bold">{rain_intensity} mm/min</span>
        </div>
        <div className="flex flex-col items-center justify-center max-sm:w-[175px] w-[200px]">
          <div className="flex items-center gap-1">
            <WiRain className="size-8 dark:text-cyan-400 text-cyan-600" />
            <span className="text-lg">Rain Accumulation</span>
          </div>
          <span className="text-lg font-bold">{rain_accumulation} mm</span>
        </div>
        <div className="flex flex-col items-center justify-center w-[150px] max-sm:w-[130px]">
          <div className="flex items-center gap-1">
            <WiWindy className="size-10 dark:text-zinc-200 text-zinc-900" />
            <span className="text-lg">Wind Speed</span>
          </div>
          <span className="text-lg font-bold">
            {wind_speed ? wind_speed : 0} m/s
          </span>
        </div>
        <div className="flex flex-col items-center justify-center max-sm:w-[150px] w-[200px]">
          <div className="flex items-center gap-1">
            <WiStrongWind
              className={`size-8 dark:text-zinc-400 text-gray-400`}
            />
            <span className="text-lg">Wind Direction</span>
          </div>
          <span className="text-lg font-bold">
            {wind_direction}
            <sup>o</sup> deg
          </span>
        </div>
      </div>
    </motion.div>
  );
}
