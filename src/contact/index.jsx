import React from 'react';
import MyLayout from '../components/layout-other';
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Contact = () => {
  return (
    <MyLayout title={'Contact'}>
      <section className='bg-gray-800 min-h-[600px] flex md:flex-row flex-col px-8 gap-4 md:px-[100px] items-center'>
        <div className='flex md:w-1/2 flex-col gap-4'>
          <h1 className='text-6xl text-white'>Contact Information</h1>
          <p className='text-white font-normal text-xl'>Fill up the form and our team will get back to you within 24 hours.</p>
          <div className='flex gap-4 items-center'>
            <FaPhoneAlt className='text-orange-500' size={30} />
            <span className='text-white text-xl'>+44 151946 0857</span>
          </div>
          <div className='flex gap-4 items-center'>
            <MdEmail className='text-orange-500' size={30} />
            <span className='text-white text-xl'>info@finnovent.com</span>
          </div>
          <div className='flex gap-4 items-center'>
            <MdEmail className='text-orange-500' size={30} />
            <span className='text-white text-xl'>support@finnovent.com</span>
          </div>
        </div>
        <div className='bg-gray-700 p-8 md:w-1/2 w-full rounded-md'>
        <h1 className='text-6xl text-white font-semibold'>Get In Touch</h1>
          <form className='flex flex-col gap-4'>
            <div>
              <label className='text-white text-lg' htmlFor='name'>Name</label>
              <input
                type='text'
                id='name'
                name='name'
                className='w-full p-2 rounded-md mt-2 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-orange-500'
                placeholder='Your Name'
                required
              />
            </div>
            <div>
              <label className='text-white text-lg' htmlFor='email'>Email</label>
              <input
                type='email'
                id='email'
                name='email'
                className='w-full p-2 rounded-md mt-2 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-orange-500'
                placeholder='Your Email'
                required
              />
            </div>
            <div>
              <label className='text-white text-lg' htmlFor='message'>Message</label>
              <textarea
                id='message'
                name='message'
                rows='4'
                className='w-full p-2 rounded-md mt-2 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-orange-500'
                placeholder='Your Message'
                required
              ></textarea>
            </div>
            <button
              type='submit'
              className='bg-orange-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-orange-600 transition duration-300'
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </MyLayout>
  );
}

export default Contact;
