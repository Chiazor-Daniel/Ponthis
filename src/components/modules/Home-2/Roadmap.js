/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination, A11y } from "swiper";
import { FaLightbulb, FaDraftingCompass, FaPalette, FaCode, FaClipboardCheck, FaRocket } from 'react-icons/fa';
import { useRef } from "react";
import 'swiper/swiper-bundle.min.css';

SwiperCore.use([Autoplay, Navigation, Pagination]);

const RoadmapData = [
  {
    id: 1,
    title: "Idea",
    date: "Jan 01, 2024 - Jan 15, 2024",
    description: "The idea for our innovative cryptocurrency recovery platform is born.",
    icon: FaLightbulb,
  },
  {
    id: 2,
    title: "Planning",
    date: "Jan 15, 2024 - Jan 30, 2024",
    description: "Detailed planning sessions to outline our services and operational strategies.",
    icon: FaDraftingCompass,
  },
  {
    id: 3,
    title: "Design",
    date: "Feb 01, 2024 - Feb 15, 2024",
    description: "Creating intuitive user interfaces and a seamless experience for our users.",
    icon: FaPalette,
  },
  {
    id: 4,
    title: "Development",
    date: "Feb 15, 2024 - Feb 28, 2024",
    description: "Building robust backend systems and secure protocols for account recovery.",
    icon: FaCode,
  },
  {
    id: 5,
    title: "Testing",
    date: "Mar 1, 2024 - Mar 15, 2024",
    description: "Thoroughly testing our platform to ensure reliability and security.",
    icon: FaClipboardCheck,
  },
  {
    id: 6,
    title: "Launch",
    date: "Mar 15, 2024 - Mar 30, 2024",
    description: "The grand launch of our platform, offering expert cryptocurrency recovery services.",
    icon: FaRocket,
  },
];

const Roadmap = () => {
  const swiperRef = useRef();

  const breakpoints = {
    576: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    1400: {
      slidesPerView: 4,
      spaceBetween: 10,
    }
  };

  return (
    <section className="roadmap roadmap--style2 padding-top  padding-bottom bg-color">
      <div className="container">
        <div className="section-header section-header--max50">
          <h2 className="mb-15 mt-minus-5">
            <span className="style2">Roadmap </span> of our Platform
          </h2>
          <p>
            Follow our journey from idea conception to the launch of our innovative cryptocurrency recovery platform.
          </p>
        </div>
        <div className="roadmap__wrapper">
          <div className="roadmap__upper">
            <div className="roadmap__upper-inner">
              <div className="swiper">
                <div className="roadmap__slider">
                  <div className="swiper-wrapper">
                    <Swiper
                      onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                      }}
                      modules={[Navigation, Pagination, A11y]}
                      slidesPerView={1}
                      grabCursor={true}
                      autoplay={true}
                      speed={500}
                      breakpoints={breakpoints}
                    >
                      {RoadmapData.map((item) => (
                        <SwiperSlide key={item.id}>
                          <div className="swiper-slide">
                            <div
                              className={`roadmap__item ${item.id % 2 === 0 ? "roadmap__item--reverse" : ""}`}
                            >
                              <div className={`roadmap__item-inner roadmap__item-inner--vertical-line-${item.id % 2 === 0 ? "top" : "bottom"}`}>
                                <div className="roadmap__item-icon">
                                  <item.icon size={32} />
                                </div>
                                <div className="roadmap__item-content">
                                  <h5>{item.title}</h5>
                                  <p>{item.description}</p>
                                  <div className="roadmap__item-date">
                                    <span>{item.date}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
