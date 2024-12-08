'use client';
import { fetchProducts } from '../../../lib/detialsSlice';
import { detialsUpcoming } from '../../../lib/detialsUpcoming';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Details() {
  const [show, setShow] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products);

  useEffect(() => {
    try {
      dispatch(fetchProducts({ id }));
    } catch (error) {
      console.error(error);
    }
  }, [dispatch, id]);

  useEffect(() => {
    try {
      dispatch(detialsUpcoming({id}));
    } catch (error) {
      console.error(error);
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (items) {
      setShow(items);
    }
  }, [items]);

  return (
    <div
      className="min-h-screen flex items-center justify-center pt-20"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${show?.backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {show ? (
        <div className="flex flex-col lg:flex-row rounded-lg shadow-lg overflow-hidden max-w-5xl w-full">
          {/* الصورة */}
          <img
            src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
            alt={show.name}
            className="w-full lg:w-1/3 object-cover rounded-lg lg:rounded-none"
          />
          {/* المحتوى */}
          <div className="p-6 lg:w-2/3 bg-white rounded-b-lg lg:rounded-none lg:bg-transparent">
            <h1 className="text-3xl font-bold text-black">{show.name}</h1>
            <p className="text-black text-base leading-relaxed mt-4">{show.overview}</p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold text-black">Genres:</h3>
                <ul className="list-disc pl-5 text-black">
                  {show.genres?.map((genre) => (
                    <li key={genre.id} className="text-sm">{genre.name}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-black">Languages:</h3>
                <ul className="list-disc pl-5 text-black">
                  {show.spoken_languages?.map((language) => (
                    <li key={language.iso_639_1} className="text-sm">{language.name}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row sm:justify-between">
              <p className="text-sm font-semibold text-black">Status: {show.status}</p>
              <p className="text-sm font-semibold text-black">Vote Average: {show.vote_average}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-lg text-black animate-pulse">Loading...</p>
        </div>
      )}
    </div>
  );
}
