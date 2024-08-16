import React from 'react'
import Header from '@/components/Header'
import PageHeader from '@/components/base/PageHeader'
import Blog from '@/components/modules/market/page'
import HeaderTwo from '@/components/HeaderTwo'
import Footer from '@/components/modules/Home-2/Footer'

const Blogs = () => {
  return (
    <>
    <HeaderTwo />
    <PageHeader title = "Market" text = "Market" />
    <Blog />
    <Footer />
    </>
  )
}

export default Blogs