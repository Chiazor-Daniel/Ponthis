/* eslint-disable react/no-unescaped-entities */
import React from "react";
const Features = () => {
  return (
    <section
      className="feature feature--style2 padding-bottom padding-top feature-bg-color bg--cover"
      style={{
        backgroundImage: `url(/images/feature/home3/bg.png)`,
      }}
    >
      <div className="section-header section-header--style3 section-header--max57">
        <h2 className="mb-15 mt-minus-5">Features We have</h2>
        <p>
          Hey there! Here are the features we have: user-friendly interface,
          top-notch security, and fast performance.
        </p>
      </div>
      <div className="container">
        <div className="feature__wrapper">
          <div className="row g-4 align-items-center">
            <div className="col-sm-6 col-lg-3">
              <div
                className="feature__item"
                data-aos="fade-up"
                data-aos-duration="800"
              >
                <div className="feature__item-inner text-center">
                  <div className="feature__item-thumb">
                    <img
                      className="dark"
                      src="/images/feature/home3/1.png"
                      alt="feature-item-icon"
                    />
                  </div>
                  <div className="feature__item-content">
                    <h5> Real-time data </h5>
                    <p>
                      Real-time data is like having a magic crystal ball that
                      tells you what's happening now.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div
                className="feature__item"
                data-aos="fade-up"
                data-aos-duration="800"
              >
                <div className="feature__item-inner text-center">
                  <div className="feature__item-thumb">
                    <img
                      className="dark"
                      src="/images/feature/home3/2.png"
                      alt="feature-item-icon"
                    />
                  </div>
                  <div className="feature__item-content">
                    <h5> Customer support</h5>
                    <p>
                      Hey there! How can I help? Just shoot me a message and
                      I'll get back to you ASAP!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div
                className="feature__item"
                data-aos="fade-up"
                data-aos-duration="800"
              >
                <div className="feature__item-inner text-center">
                  <div className="feature__item-thumb">
                    <img
                      className="dark"
                      src="/images/feature/home3/3.png"
                      alt="feature-item-icon"
                    />
                  </div>
                  <div className="feature__item-content">
                    <h5> Higher security </h5>
                    <p>
                      Looks like we've got higher security now, better make sure
                      we have our IDs with us.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div
                className="feature__item"
                data-aos="fade-up"
                data-aos-duration="800"
              >
                <div className="feature__item-inner text-center">
                  <div className="feature__item-thumb">
                    <img
                      className="dark"
                      src="/images/feature/home3/4.png"
                      alt="feature-item-icon"
                    />
                  </div>
                  <div className="feature__item-content">
                    <h5>Lower commissions</h5>
                    <p>
                      I heard we're lowering commissions. That sucks, but at
                      least it's not my fault sure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="feature__shape">
        <span className="feature__shape-item feature__shape-item--1">
          <img src="/images/feature/home3/5.png" alt="shape-icon" />
        </span>
      </div>
    </section>
  );
};

export default Features;
