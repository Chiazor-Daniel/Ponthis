import React from 'react';
import MyLayout from '../components/layout-other';
import man from '../assets/man.png'
import { RiBitCoinLine, RiMapPinUserFill, RiSignalTowerFill } from "react-icons/ri";
import { IoLogoSteam, IoIosStats, IoMdAnalytics, IoMdCash } from "react-icons/io";
import { FaBalanceScale, FaChartLine, FaDollarSign, FaUniversity } from "react-icons/fa";
import MarqueeComponent from '../components/marquee';
import { GoArrowUpRight } from "react-icons/go";
import bro from "../assets/leader.png";

const About = () => {
    const services = [
        {
            icon: RiBitCoinLine,
            title: 'Client-first approach',
            description: 'Transformed the trading landscape. Online trading platforms and mobile apps have made it easier than ever for individuals'
        },
        {
            icon: RiMapPinUserFill,
            title: 'Integrity and Compliance',
            description: 'One of the fundamental principles of trading is risk management. Successful traders carefully manage their capital'
        },
        {
            icon: RiSignalTowerFill,
            title: 'Fast Execution',
            description: 'Trading is not without its challenges, as markets can be highly volatile and unpredictable. It requires discipline'
        }
    ];

    return (
        <MyLayout title={'About'}>
            <div className='bg-gray-900 w-full min-h-[550px] gap-6 flex md:flex-row flex-col px-[100px] py-[50px]'>
                <div className='md:w-1/2 flex items-center'>
                    <img src={man} alt="Man" className='rounded-xl' />
                </div>
                <div className='md:w-1/2 flex items-center flex-col gap-8 justify-center'>
                    <div>
                        <p className='text-orange-500 text-xl font-normal'>Our Company Story</p>
                        <p className='text-4xl text-white font-bold'>What We Do</p>
                        <p className='text-lg text-gray-200 md:w-[70%]'>Trading is the art and science of buying and selling financial instruments, such as stocks, bonds, currencies.</p>
                    </div>
                    <div className='w-full flex md:flex-row flex-col justify-between p-4 gap-8'>
                        <div className='bg-orange-500 flex flex-col items-center justify-center rounded-full cursor-pointer h-[150px] w-[150px]'>
                            <div className='flex flex-col items-center'>
                                <GoArrowUpRight size={40} />
                                <p className='text-2xl font-semibold'>Start Now</p>
                            </div>
                        </div>
                        <div className='flex-1 flex flex-col'>
                            <p className='text-4xl text-white font-bold'>Who We Are</p>
                            <p className='text-lg text-gray-200'>Trading in financial markets involves a wide range of strategies that traders employ to make informed decisions. From trading to swing trading and long-term investing, each strategy has its own set of principles and risk factors.</p>
                        </div>
                    </div>
                </div>
            </div>
            <MarqueeComponent />
            <div className='flex flex-col px-[100px] py-[50px] bg-gray-900 min-h-[500px]'>
                <div className='flex md:flex-row flex-col justify-between'>
                    <div className='md:w-1/2'>
                        <p className='text-orange-500 text-xl font-bold'>Our Mission</p>
                        <p className='text-white text-4xl font-bold'>Empowering Success How We're Making a Difference</p>
                    </div>
                    <p className='text-gray-200 text-xl text-right md:w-[450px]'>
                        we believe that success is not reserved for the privileged few. It's a journey that anyone can embark upon with right guidance
                    </p>
                </div>
                <div className='flex md:flex-row flex-col gap-8 md:p-[100px]'>
                    {services.map((service, index) => (
                        <div key={index} className='bg-gray-700 gap-4 hover:bg-orange-500 hover:text-black duration-200 cursor-pointer rounded-xl md:w-1/3 flex flex-col items-center justify-center p-8'>
                            <div className='w-fit bg-gray-900 p-4 rounded-full'>
                                <service.icon className='text-orange-500' size={30} />
                            </div>
                            <p className='text-2xl text-white'>{service.title}</p>
                            <p className='font-normal text-gray-100 text-center'>{service.description}</p>
                        </div>
                    ))}
                </div>
                {/* <div className='flex flex-col items-center gap-4'>
                    <p className='text-orange-500 text-xl font-bold'>Team</p>
                    <p className='text-white text-2xl font-bold'>Our Leaders</p>
                    <p className='text-xl text-gray-100'>Trading has always been a passion, but it wasn't until I refined my strategy and embraced risk management.</p>
                    <div className='flex gap-10'>
                        <div className='bg-gray-800 rounded-lg h-[500px] w-[300px]'>
                            <div className='h-1/2'>
                                <div className='relative h-full w-full rounded-t-xl'>
                                    <img src={bro} alt="Leader" className='rounded-md h-full w-full object-cover' />
                                </div>
                            </div>
                            <div className='h-1/2 flex p-3 w-full  flex-col'>
                                <p className='text-white font-bold text-xl text-center'>Petter Ferguson</p>
                                <p className='text-white font-bold text-md text-center'>CEO</p>
                                <p className='text-white text-md text-center'>When I first started trading But with time and experience.</p>
                            </div>
                        </div>
                        <div className='bg-gray-800 rounded-lg h-[500px] w-[300px]'>
                            <div className='h-1/2'>
                                <div className='relative h-full w-full rounded-t-xl'>
                                <img src={"https://images.pexels.com/photos/7821936/pexels-photo-7821936.jpeg?auto=compress&cs=tinysrgb&w=600"} alt="Leader" className='rounded-md h-full w-full object-cover' />
                                </div>
                            </div>
                            <div className='h-1/2 flex p-3 w-full  flex-col'>
                                <p className='text-white font-bold text-xl text-center'>Mike Larry</p>
                                <p className='text-white font-bold text-md text-center'>Founder</p>
                                <p className='text-white text-md text-center'>When I first started trading But with time and experience.</p>
                            </div>
                        </div>
                        <div className='bg-gray-800 rounded-lg h-[500px] w-[300px]'>
                            <div className='h-1/2'>
                                <div className='relative h-full w-full rounded-t-xl'>
                                <img src={"https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=600"} alt="Leader" className='rounded-md h-full w-full object-cover' />
                                </div>
                            </div>
                            <div className='h-1/2 flex p-3 w-full  flex-col'>
                                <p className='text-white font-bold text-xl text-center'>John Scagneli</p>
                                <p className='text-white font-bold text-md text-center'>CEO</p>
                                <p className='text-white text-md text-center'>When I first started trading But with time and experience.</p>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </MyLayout>
    );
};

export default About;
