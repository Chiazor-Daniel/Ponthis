import React from 'react';
import "swiper/css";
import TotalBalanceArea from './TotalBalanceArea';
import TotaldipositChart from './TotaldipositChart';
import { Swiper, SwiperSlide } from "swiper/react";
import { FaBitcoin, FaEthereum, FaDollarSign } from "react-icons/fa";
import { useResponsive } from '../../../redux-contexts/context/responsive';
import { FaChevronRight } from "react-icons/fa";

const BalanceCardSlider = ({ data, userAssets, currency }) => {
    const { isMobile } = useResponsive();
    const {
        user_currency,
        total_balance,
        crypto_assets_value,
        fiat_balance
    } = userAssets || {}

    const slidesData = [
        {
            countNum: `${currency.symbol}${!isNaN(parseFloat(total_balance)) ? Number(parseFloat(total_balance)?.toFixed(2)).toLocaleString() : '0.00'}`,
            title: "Total Assets",
            bg: '#292B2F', 
            icon: <img src='/3d-wallet.png' style={{ width: '60px' }} />,
            chartComponent: <TotalBalanceArea />
        },
        {
            countNum: `${currency.symbol}${!isNaN(parseFloat(crypto_assets_value)) ? parseFloat(crypto_assets_value)?.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0.00'}`,
            title: "Crypto Assets",
            bg: "#4B3F72", 
            icon: <img src='/wallet2.png' style={{ width: '60px' }} />,
            chartComponent: <TotaldipositChart />
        },
        {
            countNum: `${currency.symbol}${!isNaN(parseFloat(fiat_balance)) ? parseFloat(fiat_balance)?.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0.00'}`,
            title: "Fiat Assets",
            bg: '#35524A', 
            icon: <img src='/3d-money.png' style={{ width: '60px' }} />,
            chartComponent: <TotaldipositChart />
        }
    ];
    
    return (
        <div style={{ padding: isMobile ? "20px" : "", height: '170px', paddingBottom: '18px' }}>
            <Swiper 
                className="mySwiper"
                slidesPerView={3}
                spaceBetween={18}
                loop={false}
                breakpoints={{
                    300: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    416: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1200: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    1788: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                }}
                style={{ height: '100%' }}
            >
                {slidesData.map((slide, index) => (
                    <SwiperSlide key={index} style={{ height: '100%' }}>
                        <div className="card" style={{ 
                            height: '100%', 
                            borderRadius: '10px', 
                            backgroundColor: slide.bg, 
                            display: 'flex', 
                            flexDirection: 'column', 
                            justifyContent: 'space-between'
                        }}>
                            <div className="card-body">
                                <div className="card-wiget-info">
                                    <h4 className="" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span>
                                            {slide.icon}
                                        </span>
                                        <span style={{ color: 'white', fontSize: '1.2rem', paddingRight: '20px', display: 'grid' }}>
                                            <span style={{ fontSize: '1.3rem' }}>
                                                {slide.countNum}
                                            </span>
                                            <span>
                                                {currency.curr}
                                            </span>
                                            <p style={{ fontWeight: "normal", fontSize: '0.8rem', color: 'white' }}>{slide.title}</p>
                                        </span>
                                    </h4>
                                </div>
                            </div>
                           
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default BalanceCardSlider;