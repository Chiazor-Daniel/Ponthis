"use client"
import { FaArrowTrendUp } from "react-icons/fa6";
import him from '../assets/him.png'
import her from '../assets/her.png'
import joy from '../assets/joy.png'
import faq from '../assets/faq.png'
import jet from '../assets/jet.png'
import Marquee from "react-fast-marquee";
import phone from '../assets/phone.png'
import { FaArrowRight } from "react-icons/fa";
import { useState, useEffect } from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoLogoSteam } from "react-icons/io";
import TradingViewWidget from "../components/tradeView";
import FAQ from "../components/faq";
import 'aos/dist/aos.css';
import AOS from 'aos';
import MarqueeComponent from "../components/marquee";

export default function Home() {
  const [isScaled, setIsScaled] = useState(false);
  useEffect(() => {
    AOS.init({ once: true });
    AOS.refresh();
    AOS.init({ duration: 1000 });

    return () => {
      AOS.refreshHard();
    };
  }, []);

  useEffect(() => {
    // Toggle animation class every second
    const interval = setInterval(() => {
      setIsScaled(prevState => !prevState);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const listItems = [
    { text: 'Charts trading', color: 'black' },
    { text: 'Understanding Trading Strategies', color: 'black' },
    { text: 'Risk Management in Trading', color: 'black' },
    { text: 'Technical vs. Fundamental Analysis', color: 'black' }
  ];

  return (
    <>
      <section className="background-image w-full md:h-screen p-4 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="flex flex-col items-center gap-6 mb-[200px]" data-aos="fade-up">
          <p className="text-center text-white text-6xl font-bold" data-aos="fade-up">
            "Experience Pro Trading"
          </p>
          <p className="text-center text-white text-xl" data-aos="fade-up">
            Enjoy Swift AI powered trading
          </p>
          <div className="flex gap-8" data-aos="zoom-in">
            <button className="text-white bg-orange-500 py-3 px-6 rounded-xl flex items-center gap-4">
              <span>Get Started</span>
              <FaArrowTrendUp size={20} />
            </button>
            <button className="text-white border-orange-500 border-b-2 font-semibold">
              Try Demo Account
            </button>
          </div>
        </div>
        <div className="hidden md:flex absolute bottom-[200px] left-[130px]" data-aos="fade-right">
          <img src={him} width={250} height={300} />
        </div>
        <div className="absolute bottom-[100px] right-[50px] md:right-[130px] opacity-50" data-aos="fade-left">
          <img src={jet} width={140} height={200} />
        </div>
        <div className="absolute -bottom-[100px] md:-bottom-[50px] w-full flex justify-center" data-aos="fade-up">
          <img
            src={phone}
            width={300}
            height={300}
            className={isScaled ? 'yo scaled' : 'yo'}
          />
        </div>
        <div className="hidden md:flex girl absolute right-[200px] top-[160px] -rotate-12" data-aos="fade-down"></div>
      </section>
      <MarqueeComponent />
      <section className="min-h-screen w-full bg-black flex items-center" data-aos="fade-in">
  <div className="container flex flex-col md:flex-row">
    <div className="md:w-1/2 flex items-center justify-center" data-aos="fade-right">
      <img src={joy} width={500} />
    </div>
    <div className="md:w-1/2 flex items-center p-4" data-aos="fade-left">
      <div className="flex flex-col gap-4">
        <p className="text-orange-500 text-xl">Engage on Our</p>
        <p className="text-white text-5xl font-semibold">Join Outstanding Platform</p>
        <p className="text-gray-200 text-xl w-[80%]">
          Engaging in financial markets involves various approaches that traders use to make informed decisions. From day trading to long-term investing, each approach comes with its own principles and risks.
        </p>
        <ul className="flex flex-col gap-4">
          <li className="text-lg text-gray-200 flex items-center gap-2" data-aos="fade-right">
            <IoIosCheckmarkCircleOutline size={30} color="#f97316" />
            <span>Charts trading</span>
          </li>
          <li className="text-lg text-gray-200 flex items-center gap-2" data-aos="fade-right">
            <IoIosCheckmarkCircleOutline size={30} color="#f97316" />
            <span>Understanding Trading Strategies</span>
          </li>
          <li className="text-lg text-gray-200 flex items-center gap-2" data-aos="fade-right">
            <IoIosCheckmarkCircleOutline size={30} color="#f97316" />
            <span>Risk Management in Trading</span>
          </li>
          <li className="text-lg text-gray-200 flex items-center gap-2" data-aos="fade-right">
            <IoIosCheckmarkCircleOutline size={30} color="#f97316" />
            <span>Technical vs. Fundamental Analysis</span>
          </li>
        </ul>
        <button className="text-white bg-orange-500 py-3 px-6 rounded-xl flex items-center gap-4 w-fit" data-aos="zoom-in">
          <span>Get Started now</span>
          <FaArrowRight color="white" />
        </button>
      </div>
    </div>
  </div>
</section>

<section className="min-h-[600px] w-full bg-orange-500 flex items-center" data-aos="fade-in">
  <div className="container flex flex-col md:flex-row-reverse relative overflow-hidden">
    <div className="md:w-1/2 flex items-center justify-center overflow-hidden h-full" data-aos="fade-left">
      <img src={her} width={450} height={500} />
    </div>
    <div className="md:w-1/2 flex items-center justify-center pl-4 md:pl-[100px]" data-aos="fade-right">
      <div className="flex flex-col gap-8">
        <p className="text-black text-3xl font-bold">
          Millions Worldwide Creating a Better Tomorrow
        </p>
        <p className="text-black font-normal text-xl w-[80%]">The emergence of cryptocurrencies has introduced new trading opportunities. In this beginner's guide to cryptocurrency trading, we simplify the realm of digital currencies.
        </p>
        <ul className="grid grid-cols-2 gap-4">
          {listItems.map((item, index) => (
            <li
              key={index}
              className="text-lg text-black  flex items-center gap-2"
              data-aos="fade-up"
            >
              <IoIosCheckmarkCircleOutline size={30} color={item.color} />
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
        <div className="flex p-4 gap-8" data-aos="zoom-in">
          <div>
            <h1 className="font-bold text-5xl">12k</h1>
            <p>Users Enlisted</p>
          </div>
          <div>
            <h1 className="font-bold text-5xl">5M</h1>
            <p>Monthly Trading Volume (In USD)</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section className="md:h-screen min-h-[300px] bg-gray-900 w-full md:p-8 pt-[100px]" data-aos="fade-in">
  <h1 className="text-white text-4xl text-center font-bold" data-aos="fade-down">
    Competitive Spreads on Over 150 Instruments
  </h1>
    <TradingViewWidget data-aos="zoom-in" />
  
</section>

<section className="bg-orange-500 flex flex-col items-center min-h-[600px] px-[60px]" data-aos="fade-in">
  <h1 className="text-4xl text-center font-bold p-8" data-aos="fade-down">
    Frequently Asked Questions
  </h1>
  <div className="md:flex w-full">
    <div className="md:w-1/2 flex items-center justify-center" data-aos="fade-right">
      <FAQ />
    </div>
    <div className="md:w-1/2 flex items-center justify-center" data-aos="fade-left">
      <img src={faq} width={500} />
    </div>
  </div>
</section>

   </>
 );
}