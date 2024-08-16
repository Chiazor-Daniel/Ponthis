import React from "react";
import { useState } from "react";
import Link from "next/link";
import FsLightbox from "fslightbox-react";
import Counter from "@/components/base/Counter";
const Hero = () => {
  const [toggler, setToggler] = useState(false);
  return (
    <>
      <FsLightbox
        toggler={toggler}
        sources={["https://youtu.be/MHhIzIgFgJo"]}
      />
      <section className="banner banner--style3">
        <div className="banner__bg">
          <div className="banner__bg-element">
            <img src="/images/bg/1.png" alt="section-bg-element" />
          </div>
        </div>
        <div className="container">
          <div className="banner__wrapper">
            <div className="row gy-5 gx-4 align-items-end">
              <div className="col-lg-5 col-md-5">
                <div
                  className="banner__content"
                  data-aos="fade-right"
                  data-aos-duration="1000"
                >
                  <div className="banner__content-coin banner__content-coin--style2">
                    <img src="/images/banner/home3/2.png" alt="coin icon" />
                  </div>
                  <h1 className="banner__content-heading">
                    Maximize Your Investment Returns
                  </h1>
                  <p className="banner__content-moto">
                    Anyone can invest money to different currency to increase
                    their earnings by the help of tradingo through online.
                  </p>
                  <div className="banner__btn-group btn-group">
                    <Link
                      href="signin"
                      className="trk-btn trk-btn--primary"
                    >
                      Get Started
                    </Link>

                    <Link scroll={false} href=""
                      onClick={() => setToggler(!toggler)}
                      className="trk-btn trk-btn--defult"
                    >
                      <span className="style1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_1397_814)">
                            <path
                              d="M10.5547 7.03647C9.89015 6.59343 9 7.06982 9 7.86852V16.1315C9 16.9302 9.89015 17.4066 10.5547 16.9635L16.7519 12.8321C17.3457 12.4362 17.3457 11.5638 16.7519 11.1679L10.5547 7.03647Z"
                              stroke="#0A4FD5"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                          <rect
                            x="-0.75"
                            y="0.75"
                            width="22.5"
                            height="22.5"
                            rx="11.25"
                            transform="matrix(-1 0 0 1 22.5 0)"
                            stroke="#0A4FD5"
                            strokeWidth="1.5"
                          />
                          <defs>
                            <clipPath id="clip0_1397_814">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>{" "}
                      <span className="d-md-none d-lg-block">Watch Video</span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4">
                <div className="banner__thumb">
                  <img
                    src="/images/banner/home3/1.png"
                    alt="banner-thumb"
                    className="dark"
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3">
                <div className="banner__counter">
                  <div className="banner__counter-inner">
                    <div className="banner__counter-item">
                      <h4>
                        {" "}
                        <span
                          className="purecounter"
                          data-purecounter-start="0"
                          data-purecounter-end="10"
                        >
                          {/* <CountUp end={10} duration={10} /> */}
                          <Counter start={0} end={10} delay={300} />
                        </span>{" "}
                        Years
                      </h4>
                      <p>Trading experience</p>
                    </div>
                    <div className="banner__counter-item">
                      <h4>
                        {" "}
                        <span
                          className="purecounter"
                          data-purecounter-start="0"
                          data-purecounter-end="24"
                        >
                          <Counter start={0} end={24} delay={100} />
                        </span>
                        /7
                      </h4>
                      <p>Online Support</p>
                    </div>
                    <div className="banner__counter-item">
                      <h4>
                        {" "}
                        <span
                          className="purecounter"
                          data-purecounter-start="0"
                          data-purecounter-end="25"
                        >
                          <Counter start={0} end={25} delay={100} />
                        </span>
                        K+
                      </h4>
                      <p>satisfied Customers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="banner__shape">
          <span className="banner__shape-item banner__shape-item--3">
            <img src="/images/banner/shape/1.png" alt="shape icon" />
          </span>
          <span className="banner__shape-item banner__shape-item--4">
            <img src="/images/banner/shape/2.png" alt="shape icon" />
          </span>
        </div>
      </section>
    </>
  );
};

export default Hero;
