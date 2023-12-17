import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen gap-4'>
        <h1 className='text-8xl text-red-500'>Welcome</h1>
        <Link className='text-2xl p-4 text-white bg-black rounded-full' to="/services">Checkout Services</Link>
    </div>
  )
}

export default Home