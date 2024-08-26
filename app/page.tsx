"use client"
import WeatherApp from "@/components/WeatherApp";
import { Provider } from "react-redux";
import { store } from "@/store";

export default function Home() {
  return (
    <>
      <Provider store={store}>
        <WeatherApp />
      </Provider>
    </>
  );
}
