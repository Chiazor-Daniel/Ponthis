/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination, A11y } from "swiper";
import { FaQuoteRight, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useRef } from "react";
import Avatar from "react-avatar";
import "swiper/swiper-bundle.min.css";

SwiperCore.use([Autoplay, Navigation, Pagination]);

const testimonialData = [
  {
    author: "S. Y.",
    description:
      "The recovery services provided by this platform were exceptional. I managed to regain access to my accounts effortlessly.",
  },
  {
    author: "B. R.",
    description:
      "I was impressed with the thorough investigation and swift recovery of my assets. The team was professional and reliable.",
  },
  {
    author: "H. K.",
    description:
      "Their security consulting services significantly enhanced the protection of our digital assets. Highly recommended for anyone in the digital finance space.",
  },
  {
    img: null,
    author: "Anonymous",
    description:
      "Our experience with the platform has been nothing short of excellent. The recovery process was smooth and efficient, and the security consulting provided was invaluable.",
  },
];

const Testimonials = () => {
  const swiperRef = useRef();

  const breakpoints = {
    576: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    992: { slidesPerView: 3 },
    1200: { slidesPerView: 3, spaceBetween: 25 },
  };

  return (
    <section className="testimonial padding-top padding-bottom-style2 bg-color">
      <div className="container">
        <div className="section-header section-header--style4">
          <div className="section-header__content">
            <h2 className="mb-0">
              Meet our <span>Clients</span>
            </h2>
          </div>
        </div>
        <div className="testimonial__wrapper">
          <div className="testimonial__slider2 swiper">
            <div className="swiper-wrapper">
              <Swiper
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                spaceBetween={24}
                slidesPerView={1}
                speed={500}
                autoplay={true}
                loop={true}
                grabCursor={true}
                modules={[Navigation, Pagination, A11y]}
                breakpoints={breakpoints}
              >
                {testimonialData.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="swiper-slide">
                      <div className="testimonial__item testimonial__item--style2">
                        <div className="testimonial__item-inner">
                          <div className="testimonial__item-content">
                            <p className="mb-0">{item.description}</p>
                            <div className="testimonial__footer">
                              <div className="testimonial__author">
                                <div className="testimonial__author-thumb">
                                  <Avatar
                                    name={item.author}
                                    size="40"
                                    round={true}
                                  />
                                </div>
                                <div className="testimonial__author-designation">
                                  <h6>{item.author}</h6>
                                  {/* <span>{item.designation}</span> */}
                                </div>
                              </div>
                              <div className="testimonial__quote">
                                <span>
                                  <FaQuoteRight />
                                </span>
                              </div>
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
          <div className="swiper-nav swiper-nav--style2">
            <button
              className="swiper-nav__btn active  swiper-nav__btn-prev testimonial__slider-prev"
              onClick={() => swiperRef.current.slidePrev()}
            >
              <FaAngleLeft />
            </button>
            <button
              className="swiper-nav__btn swiper-nav__btn-next testimonial__slider-next"
              onClick={() => swiperRef.current.slideNext()}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
