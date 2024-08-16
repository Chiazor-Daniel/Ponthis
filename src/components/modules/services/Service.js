/* eslint-disable react/no-unescaped-entities */
import React from "react";
function Services() {
  return (
    <section className="service padding-top padding-bottom">
      <div className="section-header section-header--max50">
        <h2 className="mb-15 mt-minus-5"><span>services </span>We offer</h2>
        <p>We offer the best services around - from installations to repairs, maintenance, and more!</p>
      </div>
      <div className="container">
        <div className="service__wrapper">
          <div className="row g-4 align-items-center">
            <div className="col-sm-6 col-md-6 col-lg-4">
              <div className="service__item service__item--style1" data-aos="fade-up" data-aos-duration="800">
                <div className="service__item-inner text-center">
                  <div className="service__item-thumb mb-30">
                    <img className="dark" src="/images/service/1.png" alt="service-icon" />
                  </div>
                  <div className="service-content">
                    <h5 className="mb-15"> <a className="stretched-link" href="service-details">Strategy Consulting</a> </h5>
                    <p className="mb-0">A social assistant that's flexible can accommodate your schedule and needs, making
                      life easier.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="service__item service__item--style1" data-aos="fade-up" data-aos-duration="1000">
                <div className="service__item-inner text-center">
                  <div className="service__item-thumb mb-30">
                    <img className="dark" src="/images/service/2.png" alt="service-icon" />
                  </div>
                  <div className="service-content">
                    <h5 className="mb-15"> <a className="stretched-link" href="service-details"> Financial Advisory</a> </h5>
                    <p className="mb-0">Modules transform smart trading by automating processes and improving decision-making.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="service__item service__item--style1" data-aos="fade-up" data-aos-duration="1200">
                <div className="service__item-inner text-center">
                  <div className="service__item-thumb mb-30">
                    <img className="dark" src="/images/service/3.png" alt="service-icon" />
                  </div>
                  <div className="service-content">
                    <h5 className="mb-15"> <a className="stretched-link" href="service-details">Management</a> </h5>
                    <p className="mb-0">There, it's me, your friendly neighborhood reporter's news analyst processes and
                      improving</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="service__item service__item--style1" data-aos="fade-up" data-aos-duration="800">
                <div className="service__item-inner text-center">
                  <div className="service__item-thumb mb-30">
                    <img className="dark" src="/images/service/4.png" alt="service-icon" />
                  </div>
                  <div className="service-content">
                    <h5 className="mb-15"> <a className="stretched-link" href="service-details">Supply Optimization </a>
                    </h5>
                    <p className="mb-0">Hey, have you checked out that new cryptocurrency platform? It's pretty cool and easy
                      to use!</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="service__item service__item--style1" data-aos="fade-up" data-aos-duration="1000">
                <div className="service__item-inner text-center">
                  <div className="service__item-thumb mb-30">
                    <img className="dark" src="/images/service/5.png" alt="service-icon" />
                  </div>
                  <div className="service-content">
                    <h5 className="mb-15"> <a className="stretched-link" href="service-details">HR consulting</a> </h5>
                    <p className="mb-0">Hey guys, just a quick update on exchange orders. There have been some changes
                      currency!</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="service__item service__item--style1" data-aos="fade-up" data-aos-duration="1200">
                <div className="service__item-inner text-center">
                  <div className="service__item-thumb mb-30">
                    <img className="dark" src="/images/service/6.png" alt="service-icon" />
                  </div>
                  <div className="service-content">
                    <h5 className="mb-15"> <a className="stretched-link" href="service-details">Marketing consulting</a>
                    </h5>
                    <p className="mb-0">Hey! Just wanted to let you know that the price notification module processes is now
                      live!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="service__shape">
        <span className="service__shape-item service__shape-item--1"><img src="/images/icon/1.png"
          alt="shape-icon" /></span>
      </div>
    </section>
  );
}

export default Services;
