import React from 'react';
import Marquee from 'react-fast-marquee';
import { IoLogoSteam, IoIosStats, IoMdAnalytics, IoMdCash } from "react-icons/io";
import { FaBalanceScale, FaChartLine, FaDollarSign, FaUniversity } from "react-icons/fa";
import { RiSignalTowerFill } from "react-icons/ri";

const companies = [
    { name: 'Logariths', icon: IoLogoSteam },
    { name: 'TradeWind', icon: FaChartLine },
    { name: 'CryptoWave', icon: IoMdCash },
    { name: 'FinMart', icon: FaDollarSign },
    { name: 'EquiTrade', icon: FaBalanceScale },
    { name: 'MarketPulse', icon: IoIosStats },
    { name: 'StockBridge', icon: FaUniversity },
    { name: 'InvestNet', icon: IoMdAnalytics },
    { name: 'AlphaBrokers', icon: RiSignalTowerFill },
    { name: 'HedgePoint', icon: FaChartLine }
];

const MarqueeComponent = () => {
    return (
        <Marquee
            style={{ backgroundColor: '#f97316', height: '120px', display: 'flex', justifyContent: 'space-between' }}
            data-aos="slide-left"
        >
            {companies.map((company, index) => (
                <div key={index}>
                    <div className="h-full flex gap-6 mx-8 items-center">
                        <company.icon size={70} />
                        <p className="text-2xl font-bold">{company.name}</p>
                    </div>
                </div>
            ))}
        </Marquee>
    );
};

export default MarqueeComponent;
