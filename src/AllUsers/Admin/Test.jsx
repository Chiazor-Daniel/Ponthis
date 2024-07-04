import React from 'react'
import CompanyList from './companyList'
import { useSelector } from 'react-redux';
import BlogList from './blogList';
import TestimonialList from './testimonials';


const TestimonialsR = () => {
    const { adminToken, adminInfo } = useSelector(state => state.adminAuth);
  return (
    <div className='row'>
      <TestimonialList admin={[adminInfo, adminToken]} />
    </div>
  )
}

export default TestimonialsR