import React from 'react';
import { Header } from '../layout/Header';
import { RoomSearch } from '../room/RoomSearch';
import { useSelector } from 'react-redux';
import HotelList from './hotelList';

export const Home = () => {
  const { email, name, isAuthenticated } = useSelector((state) => state.user || {});

  if (!isAuthenticated) {
    return (
      <section className="container text-center">
        <h2>Please log in to access this page.</h2>
      </section>
    );
  }
  
  return (
    <section>
      <Header />
      <section className='container'>
        <RoomSearch />
        <HotelList />
      </section>
    </section>
  )
}
