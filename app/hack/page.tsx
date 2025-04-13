import Dummy from '@/components/hack-celerate/Dummy';
import Hero from '@/components/hack-celerate/Hero'
import Navbar from '@/components/hack-celerate/NavBar'
import Cursor from '@/components/ui/default-cursor';
import React from 'react'

const page = () => {
  return (
    <div className="overflow-clip bg-[#121212] relative ">
      <Cursor/>
      <Navbar />
      <Hero />
      <Dummy/>
    </div>
  );
}

export default page