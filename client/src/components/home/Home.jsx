import React, { useEffect, useState } from 'react';
import { Header } from '../layout/Header';
import { RoomSearch } from '../room/RoomSearch';
import { useSelector } from 'react-redux';
import HotelList from './hotelList';
import TrendingDestinations from './TrendingDestinations';

export const Home = () => {
  const { email, name, isAuthenticated } = useSelector((state) => state.user || {});
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // if (!isAuthenticated) {
  //   return (
  //     <section className="container text-center">
  //       <h2>Please log in to access this page.</h2>
  //     </section>
  //   );
  // }

  return (
    <section>
      <Header />
      <section className='container'>
        <RoomSearch />
        <div>
          <TrendingDestinations />
        </div>
        <div>
          <h4 style={{ paddingLeft: '12px' }}>Popular destinations</h4>
          <HotelList />
        </div>

      </section>
    </section>
  )
}
