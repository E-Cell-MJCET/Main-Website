import React from 'react'

import AboutUs from '@/components/about-us/aboutus'
import Navbar from '@/components/LandingPage/Navbar'
import Footer from '@/components/LandingPage/Footer'

const page = () => {
  return (
    <div>
      <Navbar/>
      <AboutUs/>
      <Footer/>
    </div>
  )
}

export default page