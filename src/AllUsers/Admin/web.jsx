import React from 'react'
import CompanyList from './companyList'
import { useSelector } from 'react-redux';
import BlogList from './blogList';


const Web = () => {
    const { adminToken, adminInfo } = useSelector(state => state.adminAuth);
  return (
    <div className='row'>
        <div className='col-6'>
            <CompanyList admin={[adminInfo, adminToken]}/>
        </div>
        <div className='col-6'>
            <BlogList admin={[adminInfo, adminToken]}/>
        </div>
    </div>
  )
}

export default Web