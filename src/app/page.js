
import React from 'react'
import Header from './_components/Header/Header'
import Pouprple from './_components/Pourple/Pouprple'
import RatedMovie from './_components/RatedMovie/RatedMovie'
import UpcomingMovie from './_components/UpcomingMovie/UpcomingMovie'
import NowMovie from './_components/NowMovies/NowMovies'
export default function page() {
  return (
    <>
    <Header/>
    <Pouprple/>
    <RatedMovie/>
    <UpcomingMovie/>
    <NowMovie/>
    </>
  )
}
