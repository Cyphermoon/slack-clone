import React from 'react'
import AppBody from '../components/AppBody'
import Header from '../components/Header'
import NavProvider from '../context/NavProvider';

const Home = () => {
  return (
    <>
      <NavProvider>
        <Header />
        <AppBody />
      </NavProvider>
    </>
  )
}

export default Home