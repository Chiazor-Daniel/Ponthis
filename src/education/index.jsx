import React from 'react'
import MyLayout from '../components/layout-other'
import gr from "../../public/gr.png"
import faq from "../../public/faq.png"
import { GoArrowUpRight } from 'react-icons/go'
import FAQ from '../components/faq'
const Education = () => {
  return (
    <MyLayout title={'Education'}>
      <section className='bg-gray-900 px-[100px] p-8 min-h-[600px] flex flex-col md:flex-row items-center'>
        <div className='md:w-1/2 flex items-center justify-center'>
          <img src={gr} width={600} />
        </div>
        <div className='md:w-1/2 flex items-center flex-col gap-8 '>
          <div className='flex flex-col gap-4'>
            <p className='text-orange-500 text-xl font-normal'>Our Company Story</p>
            <p className='text-4xl text-white font-bold'>Investing in Knowledge A Wise Choice for Success</p>
            <p className='text-lg text-gray-200 w-[70%]'>Knowledge empowers individuals to make informed decisions. Whether it's in personal finance, career choices, or everyday life navigate challenges with confidence.</p>
            <button className='bg-orange-500 py-2 px-6 border-none text-white mt-4 rounded-md w-fit'>Start Learning</button>
          </div>
        </div>
      </section>
      <section
        className="bg-orange-500 flex flex-col items-center min-h-[600px] px-[60px]"
      >
        <h1 className="text-4xl text-center font-bold p-8">
          FAQs
        </h1>
        <div className="flex w-full">
            <FAQ />
          <div className="md:w-1/2 flex items-center justify-center">
          </div>
          <div className="hidden w-1/2 md:flex items-center justify-center">
            <img src={faq} className='' />
          </div>
        </div>
      </section>
    </MyLayout>
  )
}

export default Education