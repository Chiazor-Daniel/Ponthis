import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination, A11y } from "swiper";
import { FaStar, FaStarHalfAlt, FaRegStar, FaQuoteRight, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useRef } from "react";
import Avatar from "react-avatar";
import "swiper/swiper-bundle.min.css";

SwiperCore.use([Autoplay, Navigation, Pagination]);

const dummyTestimonialData = [
  {
    author: "Sarah Johnson",
    rating: 5,
    description: "The recovery services provided by this platform were exceptional. I managed to regain access to my accounts effortlessly.",
  },
  {
    author: "Michael Chen",
    rating: 4.5,
    description: "I was impressed with the thorough investigation and swift recovery of my assets. The team was professional and reliable.",
  },
  {
    author: "Emma Rodriguez",
    rating: 5,
    description: "Their security consulting services significantly enhanced the protection of our digital assets. Highly recommended for anyone in the digital finance space.",
  },
  {
    author: "David Thompson",
    rating: 4,
    description: "Our experience with the platform has been nothing short of excellent. The recovery process was smooth and efficient, and the security consulting provided was invaluable.",
  },
];

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    } else if (i - 0.5 <= rating) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-400" />);
    }
  }
  return <div className="flex mb-2">{stars}</div>;
};

const Testimonials = () => {
  const [testimonialData, setTestimonialData] = useState([]);
  const swiperRef = useRef();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/user/general-route/get-dashboard-reviews');
        const data = await response.json();
        if (data.status === "success" && Array.isArray(data.data)) {
          setTestimonialData(data.data);
        } else {
          setTestimonialData(dummyTestimonialData);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setTestimonialData(dummyTestimonialData);
      }
    };

    fetchReviews();
  }, []);

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
              Reviews from <span>Clients</span>
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
                            <StarRating rating={item.rating} />
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
              className="swiper-nav__btn active swiper-nav__btn-prev testimonial__slider-prev"
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