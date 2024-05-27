import React from 'react';

import coin1 from './../../assets/stocks.png';
import coin3 from './../../assets/exchange.png';
import coin4 from './../../assets/images/coins/coin4.png';



function BannerCard({btc}){
    const cardData = [
        // {
        //     image: coin4,
        //     title: 'Bitcoin',
        //     subtitle: 'BTC',
        //     price: btc?.price,
        //     percent: '-0.953',
        //     content: 'Bitcoin is the original cryptocurrency, known for its decentralized nature and limited supply. As a digital asset, Bitcoin offers opportunities for both investment and peer-to-peer transactions.'
        // },
        {
            image: coin1,
            title: 'Stocks',
            subtitle: 'STK',
            price: '16,048.40',
            percent: '-1.26',
            content: 'Stocks represent ownership in a company and offer investors a stake in its profits and assets. With a wide range of industries and companies to choose from, investing in stocks provides opportunities for growth and dividends.'
        },
        {
            image: coin3,
            title: 'Foreign Exchange',
            subtitle: 'FOREX',
            price: '1.00',
            percent: '0.0099',
            content: 'Foreign exchange (Forex) trading involves buying and selling currencies in the global market. With high liquidity and round-the-clock trading, Forex offers opportunities for profit through speculation on currency price movements.'
        },
    ];
    return(
        <>
            {cardData.map((data, index)=>(
                <div className="col-lg-4 col-md-6 m-b30 wow fadeInUp" data-wow-delay="0.2s" key={index}>
                    <div className="icon-bx-wraper style-1 box-hover">
                        <div className="icon-media">
                            <img src={data.image} alt="" />
                            <div className="icon-info">
                                <h5 className="title">{data.title}</h5>
                                <span>{data.subtitle}</span>
                            </div>
                        </div>
                        <div className="icon-content">
                            <ul className="price">
                                <li>
                                    <h6 className="mb-0 amount">${data.price}</h6>
                                    <span className= {`percentage ${index===2 ? "text-green" : "text-red"}`}>{data.percent}%</span>
                                </li>
                                <li>
                                    <span>Latest price</span>
                                    <span>24h change</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default BannerCard;