import React, { useEffect } from 'react'
import HeaderTwo from '@/components/HeaderTwo'
import Hero from '@/components/modules/Home-2/Hero'
import About from '@/components/modules/Home-2/About'
import Services from '@/components/modules/Home-2/Services'
import Testimonials from '@/components/modules/Home-2/Testimonials'
import Faq from '@/components/modules/index/FAQs'
import Footer from '@/components/modules/Home-2/Footer'
const Home2 = () => {
  return (
    <>
    <HeaderTwo isDarkLogoSame={true} />
    <Hero />
    <About />
    <Services />
    <Testimonials />
    <Faq />
    <Footer />
    </>
  )
}

export default Home2