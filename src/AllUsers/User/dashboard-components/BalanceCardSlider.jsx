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
    // const { btc_balance, crypto_balance, fiat_balance } = data || {};
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
            bg: '#2F3645',
            icon: <img src='/wallet.png' style={{width: '60px'}} />,
            chartComponent: <TotalBalanceArea />
        },
        {
            countNum: `${currency.symbol}${!isNaN(parseFloat(crypto_assets_value)) ? parseFloat(crypto_assets_value)?.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0.00'}`,
            title: "Crypto Assets",
            bg: "#E88D67",
            icon: <img src='/money-exchange.png' style={{width: '60px'}} />,
            chartComponent: <TotaldipositChart />
        },
        {
            countNum: `${currency.symbol}${!isNaN(parseFloat(fiat_balance)) ? parseFloat(fiat_balance)?.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0.00'}`,
            title: "Fiat Assets",
            bg: '#A1DD70',
            icon: <img src='/money-transfer.png' style={{width: '60px'}} />,
            chartComponent: <TotaldipositChart />
        }
    ];
    

    return (
        <div style={{ padding: isMobile ? "20px" : "" }}>
            <Swiper className="mySwiper"
                slidesPerView={3}
                spaceBetween={12}
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
                        slidesPerView:2,
                        spaceBetween: 30,
                    },
                    1200: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    1788: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                }}>
                {slidesData.map((slide, index) => (
                    <SwiperSlide key={index}>
                            <div className="card" style={{ height: '150px', background: slide.bg,  boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px', overflow: 'hidden'}}>
                                <div className="card-body">
                                    <div className="card-wiget-info">
                                        <h4 className="" style={{ display: 'flex', alignItems: 'center', gap: '10px'}}>
                                            <span>
                                                {slide.icon}
                                            </span>
                                            <span style={{color: 'white', fontSize: '1.2rem', paddingRight: '20px', display: 'grid'}}>
                                                <span style={{fontSize: '1.3rem'}}>
                                                    {slide.countNum}    
                                                </span>
                                                <span>
                                                    {currency.curr}   
                                                </span>
                                                <p style={{ fontWeight: "normal", fontSize: '0.8rem', color: 'white' }}>{slide.title}</p>
                                            </span>
                                        </h4>
                                        
                                    </div>
                                    {/* {slide.chartComponent} */}
                                </div>
                                <div className="back-icon"></div>
                            </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            {/* <FaChevronRight /> */}
        </div>
    );
}

export default BalanceCardSlider;
