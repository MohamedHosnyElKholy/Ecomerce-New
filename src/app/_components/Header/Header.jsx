"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import Image from "next/image";

export default function Header() {
  const [show, setShow] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const api_key = "02a708bf6e4b7205976338b061b32fc6"; // ضع هنا الـ API Key الخاص بك

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  async function getDataHeaders() {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${api_key}`
      );
      setShow(res.data.results.slice(0, 3)); // جلب أول 3 أفلام
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function getTrailer(movie_id) {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${api_key}&language=en-US`
      );
      const trailer = res.data.results.find((video) => video.type === "Trailer");
      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
      } else {
        console.log("No trailer found.");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  }

  const closeTrailer = () => {
    setTrailerUrl(null);
  };

  useEffect(() => {
    getDataHeaders();
  }, []);

  return (
    <Slider {...settings}>
      {show.map((movie) => (
        <div key={movie.id} className="relative w-full h-[500px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
          <div className="absolute inset-0">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
              priority
            />
          </div>

          {/* محتوى فوق الخلفية */}
          <div className="absolute inset-0 flex items-center justify-between p-4 sm:p-2 bg-gradient-to-t from-black via-transparent to-transparent">
            <div className="w-1/3 pr-4 sm:w-1/2 md:w-1/3">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={300}
                height={450}
                className="rounded-lg"
              />
            </div>

            <div className="w-2/3 p-4 bg-opacity-50 rounded-lg sm:w-full sm:p-2 md:w-2/3 lg:w-2/3">
              <h3 className="text-xl font-bold text-white sm:text-lg">{movie.title}</h3>
              <p className="text-sm text-white sm:text-xs">{movie.release_date}</p>
              <p className="text-sm text-white truncate sm:text-xs">{movie.overview}</p>

              <div className="mt-4">
                <button
                  onClick={() => getTrailer(movie.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 sm:px-3 sm:py-1"
                >
                  Watch Trailer
                </button>
              </div>
            </div>
          </div>

          {trailerUrl && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40 pt-20">
              <iframe
                width="90%"
                height="auto"
                src={`https://www.youtube.com/embed/${trailerUrl.split("v=")[1]}`}
                title="Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="sm:w-full sm:h-72 md:h-[400px] lg:h-[450px] xl:h-[500px]"
              ></iframe>
              <button
                onClick={closeTrailer}
                className="absolute w-[20px] h-[20px] flex justify-center items-center top-[4rem] right-4 text-white text-2xl bg-black bg-opacity-70 p-3 rounded-full hover:bg-opacity-90 z-50"
              >
                &times;
              </button>
            </div>
          )}
        </div>
      ))}
    </Slider>
  );
}
