import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import TotalBalanceArea from './TotalBalanceArea';
import ProfitLossArea from './ProfitLossArea';
import TotaldipositChart from './TotaldipositChart';

const BalanceCardSlider = () => {
    // Define an array of data representing each slide
    const slidesData = [
        {
            countNum: "$2,478.90",
            title: "Main Balance",
            info: "0.11857418",
            chartComponent: <TotalBalanceArea />
        },
        {
            countNum: "$3,27.23",
            title: "Referral Balance",
            info: "+3.02%",
            chartComponent: <ProfitLossArea />
        },
        {
            countNum: "$2,478.90",
            title: "Bonuses",
            chartComponent: <TotaldipositChart />
        }
    ];

    return (
        <div className='row'>
            {/* Map over the slidesData array and generate a SwiperSlide for each */}
            {slidesData.map((slide, index) => (
                <div key={index} className="col-md-4 mb-3">
                    <div className="card card-wiget">
                        <div className="card-body">
                            <div className="card-wiget-info">
                                <h4 className="count-num">{slide.countNum}</h4>
                                <p>{slide.title}</p>
                                {slide.info && (
                                    <div>
                                        <span className="text-success">{slide.info}</span>
                                    </div>
                                )}
                            </div>
                            {slide.chartComponent}
                        </div>
                        <div className="back-icon">
                            {/* Your back icon SVG */}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default BalanceCardSlider;
