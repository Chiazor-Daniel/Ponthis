import React from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import './cards.css'
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { Navigation } from 'swiper/modules';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const SwiperNavButtons = () => {
  const swiper = useSwiper();
  return (
    <>
      <div className="swiper-button-prev" onClick={() => swiper.slidePrev()}>
        <IoIosArrowBack size={30} />
      </div>
      <div className="swiper-button-next" onClick={() => swiper.slideNext()}>
        <IoIosArrowForward size={30} />
      </div>
    </>
  );
};

const ImageSwiper = () => {
  const images = [
    'https://bankhub.vercel.app/_next/image?url=%2Fimages%2Fmy-wallet-2.png&w=384&q=75',
    'https://bankhub.vercel.app/_next/image?url=%2Fimages%2Fmy-wallet-3.png&w=384&q=75',
    'https://bankhub.vercel.app/_next/image?url=%2Fimages%2Fmy-wallet-1.png&w=384&q=75'
  ];

  return (
    <div className='swiper-container'>
      <Swiper
        modules={[Navigation]}
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
            <img src={image} alt={`Slide ${index + 1}`} style={{width: '300px'}} />
          </SwiperSlide>
        ))}
        <SwiperNavButtons />
      </Swiper>
    </div>
  );
};

export default ImageSwiper;