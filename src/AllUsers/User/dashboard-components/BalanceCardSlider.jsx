import React from 'react';
import "swiper/css";
import TotalBalanceArea from './TotalBalanceArea'; // Placeholder component for the chart
import ProfitLossArea from './ProfitLossArea'; // Placeholder component for the chart
import { Swiper, SwiperSlide } from "swiper/react";
import { useResponsive } from '../../../redux-contexts/context/responsive';
import { FaDollarSign, FaMoneyBillWave } from "react-icons/fa";

const BalanceCardSlider = () => {
    const { isMobile } = useResponsive();

    // Dummy data for total income and total spending
    const slidesData = [
        {
            countNum: ' $15,000.00',
            title: 'Total Income',
            chartComponent: <TotalBalanceArea /> // Replace with the appropriate chart component
        },
        {
            countNum: ' $7,500.00',
            title: 'Total Spending',
            chartComponent: <ProfitLossArea /> // Replace with the appropriate chart component
        },
    ];

    return (
        <div className='row overflow-auto' style={{ padding: isMobile ? "20px" : "" }}>
            <Swiper className="mySwiper"
                speed={1500}
                slidesPerView={2}
                spaceBetween={15}
                loop={false}
                breakpoints={{
                    300: {
                        slidesPerView: 1,
                        spaceBetween: 30,
                    },
                    416: {
                        slidesPerView: 1,
                        spaceBetween: 30,
                    },
                    768: {
                        slidesPerView: 1,
                        spaceBetween: 30,
                    },
                    1200: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    1788: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                }}>
                {slidesData.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div key={index} className="">
                            <div className="card card-wiget">
                                <div className="card-body">
                                    <div className="card-wiget-info">
                                        <h4 className="count-num" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            {
                                                index === 0 ? (
                                                    <FaDollarSign size={40} color='#28a745' />
                                                ) : (
                                                    <FaMoneyBillWave size={40} color='#dc3545' />
                                                )
                                            }
                                            <span>
                                                {slide.countNum}
                                            </span>
                                        </h4>
                                        <p style={{ fontSize: '1.2rem' }}>{slide.title}</p>
                                    </div>
                                    {slide.chartComponent}
                                </div>
                                <div className="back-icon"></div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default BalanceCardSlider;
