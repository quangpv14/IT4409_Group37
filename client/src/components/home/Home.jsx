import React from 'react';
import { Header } from '../layout/Header';
import { RoomSearch } from '../room/RoomSearch';
import { useSelector, useDispatch } from 'react-redux';

export const Home = () => {
  const { email, name, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <section>
      <Header />
      <section className='container'>
        <RoomSearch />
      </section>
    </section>
  )
}
