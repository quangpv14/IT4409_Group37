import React from 'react';
import { Header } from '../layout/Header';
import { RoomSearch } from '../room/RoomSearch';

export const Home = () => {

  return (
    <section>
      <Header />
      <section className='container'>
        <RoomSearch />
      </section>
    </section>
  )
}
