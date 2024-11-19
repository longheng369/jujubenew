import React from 'react';
import Navigation from './Navigation';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
const Layout: React.FC = () => {
  return (
    <div>
      <Navigation/>
      <div className='px-4'>
        <Outlet/>
      </div>
      <Footer/>
    </div>
  )
}

export default Layout