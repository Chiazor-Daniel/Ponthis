"use client"
import React from 'react';
import MyLayout from '../components/layout-other';
import TradingViewTimelineWidget from '../components/new';
import TradingViewWidget from '../components/tradeView';
import Stocks from '../components/stocks';

const Market = () => {
  return (
    <MyLayout title={'Market'}>
      <section className="h-screen bg-gray-900 w-full p-8 pt-[100px]">
        <TradingViewTimelineWidget />
     </section>
     <section className="h-screen bg-gray-900 w-full p-8 pt-4">
        <Stocks />
     </section>
    </MyLayout>
  );
};

export default Market;
