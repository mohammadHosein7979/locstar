"use client";

import { SectionHeader } from "@/app/components/common";
import { weatherStatusMap } from "@/app/constants/mapper";
import { WeatherData } from "@/app/types/model";
import { CircularProgress, useMediaQuery } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { mobileWidth } from "@/app/constants/constats";

interface Props {
  lat: number;
  long: number;
}

const Weather: FC<Props> = ({ lat, long }) => {
  const isMobile = useMediaQuery(mobileWidth);
  const [forecast, setForecast] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=Asia/Tehran`
      );

      if (!response.ok) {
        throw new Error("مشکلی در دریافت اطلاعات هواشناسی رخ داد.");
      }

      const data = await response.json();
      const forecastData = data.daily.time.map(
        (date: string, index: number) => ({
          date,
          temperature_2m_max: data.daily.temperature_2m_max[index],
          temperature_2m_min: data.daily.temperature_2m_min[index],
          weathercode: data.daily.weathercode[index],
        })
      );
      setForecast(forecastData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطایی رخ داده است.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const RenderWeatherBox = ({ day }: { day: WeatherData }) => (
    <div className="px-2">
      <div className="bg-white shadow-lg flex flex-col justify-center items-center pt-1 pb-4 my-4 rounded-2xl overflow-hidden">
        <img src={weatherStatusMap[day.weathercode]} alt="وضعیت هوا" />
        <div className="text-gray-5 font-bold text-xl">
          {Math.round(day.temperature_2m_max)}°
        </div>
        <div className="text-gray-5 text-xs">
          {new Date(day.date).toLocaleDateString("fa-IR", {
            weekday: "long",
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="px-8">
        <SectionHeader title="هواشناسی" color="black" />
      </div>

      {loading ? (
        <div className="flex justify-center items-center my-4">
          <CircularProgress />
        </div>
      ) : error ? (
        <div className="text-center my-4">
          <button onClick={fetchWeatherData} className="mt-2">
            تلاش مجدد
          </button>
          <p className="text-red-500 text-sm font-light">{error}</p>
        </div>
      ) : (
        <Swiper spaceBetween={10} slidesPerView={isMobile ? 3.5 : 7} className="-mt-4">
          {forecast.map((item, index) => (
            <SwiperSlide key={index}>
              <RenderWeatherBox day={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Weather;
