import React from 'react'
import PageHeader from "@/components/base/PageHeader";
import HeaderTwo from '@/components/HeaderTwo'
import Footer from '@/components/modules/Home-2/Footer'
import Services from '@/components/modules/Home-2/Services'

import Testimonials from '@/components/modules/Home-2/Testimonials'

const reviews = () => {
  return (
    <>
    <HeaderTwo />
    <PageHeader title="Cliensts Reviews" text="Reviews" />
    <Testimonials/>
    <Footer />
    </>
  )
}

export default reviews