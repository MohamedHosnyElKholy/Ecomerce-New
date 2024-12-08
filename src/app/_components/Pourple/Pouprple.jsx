"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function PurpleSlider() {
  const [shows, setShows] = useState([]);
  const apiKey = "02a708bf6e4b7205976338b061b32fc6";

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const fetchPopularShows = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/popular?language=en-US&page=1&api_key=${apiKey}`
      );
      setShows(response.data.results.slice(0, 10));
    } catch (error) {
      console.error("Error fetching popular shows:", error);
    }
  };

  useEffect(() => {
    fetchPopularShows();
  }, []);

  return (
    <div className="p-8 min-h-screen">
      {/* العنوان والزر */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-purple-800">Popular Movies</h2>
        <Link
          href={`/popular`}
          className="text-white bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded-md text-sm font-medium"
        >
          See More
        </Link>
      </div>

      {/* السلايدر */}
      <Slider {...sliderSettings}>
        {shows.map((show) => (
          <Link href={`/detials/${show.id}`} key={show.id} className="p-4">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative w-full h-60">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${show.backdrop_path}`}
                  alt={show.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-purple-700">{show.name}</h3>
                <p className="text-sm text-gray-600">
                  {show.overview
                    ? show.overview.split(" ").slice(0, 20).join(" ") + "..."
                    : "No description available."}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
}
