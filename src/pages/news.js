import React,{useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import ModalVideo from 'react-modal-video'

import PageLayout from './../layouts/PageLayout';
import PriceBlog from './../components/About/PriceBlog';
import RecentNews from './../components/Home/RecentNews';

const News = () => {
  return (
    <div className='page-content'>
      <PageLayout pageTitle="News and Analysis" />
      <div className='row' style={{padding: "50px"}}>
        <RecentNews />
      </div>
    </div>
  )
}

export default News