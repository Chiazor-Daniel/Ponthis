import React from 'react';
import "swiper/css";
import TotalBalanceArea from './TotalBalanceArea';
import ProfitLossArea from './ProfitLossArea';
import { Swiper, SwiperSlide, } from "swiper/react";
import TotaldipositChart from './TotaldipositChart';
import { useSelector } from 'react-redux';
import { useResponsive } from '../../../redux-contexts/context/responsive';
import { FaBitcoin } from "react-icons/fa6";

const BalanceCardSlider = ({ data }) => {
    const { isMobile, isTablet } = useResponsive();
    const { crypto_balance, fiat_balance } = data || {}

    const slidesData = [
        {
            countNum: ` ${crypto_balance || "0.00"} BTC`,
            title: "Balance",
            convert: '$365',
            info: "0",
            chartComponent: <TotalBalanceArea />
        },
        {
            countNum: `$ ${fiat_balance || "0.00"}`,
            title: "USD(Fiat)",
            convert: '$365',
            info: "0",
            chartComponent: <TotaldipositChart />
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
                                        <h4 className="count-num" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                            {
                                                index === 0 && (
                                                    <FaBitcoin size={30} color='#F7931A' />
                                                )
                                            }
                                            <span>
                                            {slide.countNum}
                                        </span>
                                        </h4>
                                        {/* <p>{slide.convert}</p> */}
                                        <p style={{fontSize: '1.2rem'}}>{slide.title}</p>
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
