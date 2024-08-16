import React from 'react'
import PageHeader from '@/components/modules/services/PageHeader'
import HeaderTwo from '@/components/HeaderTwo'
import Footer from '@/components/modules/Home-2/Footer'
import Services from '@/components/modules/Home-2/Services'

import Testimonials from '@/components/modules/Home-2/Testimonials'

const services = () => {
  return (
    <>
    <HeaderTwo />
    <PageHeader />
    <Services />
    <Testimonials/>
    {/* <Newsletter/> */}
    <Footer />
    </>
  )
}

export default services