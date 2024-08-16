/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Link from 'next/link'

const Pricing = () => {
  return (
    <section className="pricing padding-top padding-bottom bg-color-3">
    <div className="section-header section-header--max50">
      <h2 className="mb-15 mt-minus-5">Our <span className="style2">pricing </span>plan</h2>
      <p>Here's our pricing plan: affordable, straightforward, and no hidden fees. That's it. Let's get started!</p>
    </div>
    <div className="container">
      <div className="pricing__wrapper">
        <div className="row g-4 align-items-center">
          <div className="col-md-6 col-lg-4">
            <div className="pricing__item" data-aos="fade-right" data-aos-duration="1000">
              <div className="pricing__item-inner pricing__item-inner--style2">
                <div className="pricing__item-content">


                  <div className="pricing__item-top">
                    <h6 className="mb-15">Basic</h6>
                    <h3 className="mb-25">$99/<span>Monthly</span> </h3>
                  </div>


                  <div className="pricing__item-middle">
                    <ul className="pricing__list">
                      <li className="pricing__list-item"><span><img src="/images/icon/2.png" alt="check"
                            className="dark"/></span>
                        Weekly online meeting</li>
                      <li className="pricing__list-item"><span><img src="/images/icon/2.png" alt="check"
                            className="dark"/></span>
                        Unlimited learning access</li>
                      <li className="pricing__list-item"><span><img src="/images/icon/2.png" alt="check"
                            className="dark"/></span>
                        24/7 technical support</li>
                      <li className="pricing__list-item"><span><img src="/images/icon/2.png" alt="check"
                            className="dark"/></span>
                        Personal training</li>
                    </ul>

                  </div>

                  <div className="pricing__item-bottom">
                    <Link href="signup" className="trk-btn trk-btn--outline4">Choose Plan</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="pricing__item " data-aos="fade-up" data-aos-duration="1000">
              <div className="pricing__item-inner pricing__item-inner--style2 active">
                <div className="pricing__item-content">


                  <div className="pricing__item-top">
                    <h6 className="mb-15">standard</h6>
                    <h3 className="mb-25">$149/<span>Monthly</span> </h3>
                  </div>


                  <div className="pricing__item-middle">
                    <ul className="pricing__list">
                      <li className="pricing__list-item"><span><img src="/images/icon/2.png" alt="check"
                            className="dark"/></span>
                        Weekly online meeting</li>
                      <li className="pricing__list-item"><span><img src="/images/icon/2.png" alt="check"
                            className="dark"/></span>
                        Unlimited learning access</li>
                      <li className="pricing__list-item"><span><img src="/images/icon/2.png" alt="check"
                            className="dark"/></span>
                        24/7 technical support</li>
                      <li className="pricing__list-item"><span><img src="/images/icon/2.png" alt="check"
                            className="dark"/></span>
                        Personal training</li>
                      <li className="pricing__list-item"><span><img src="/images/icon/2.png" alt="check"
                            className="dark"/></span>
                        Business analysis</li>
                    </ul>

                  </div>


                  <div className="pricing__item-bottom">
                    <Link href="signup" className="trk-btn trk-btn--outline4 active">Choose Plan</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="pricing__item" data-aos="fade-left" data-aos-duration="1000">
              <div className="pricing__item-inner pricing__item-inner--style2">
                <div className="pricing__item-content">

                  <div className="pricing__item-top">
                    <h6 className="mb-15">premium</h6>
                    <h3 className="mb-25">$199/<span>Monthly</span> </h3>
                  </div>

                  <div className="pricing__item-middle">
                    <ul className="pricing__list">
                      <li className="pricing__list-item"><span><img src="/images/icon/2.png" alt="check"
                            className="dark"/></span>
                        With all standard features</li>
                      <li className="pricing__list-item"><span><img src="/images/icon/2.png" alt="check"
                            className="dark"/></span>
                        Unlimited learning access</li>
                      <li className="pricing__list-item"><span><img src="/images/icon/2.png" alt="check"
                            className="dark"/></span>
                        24/7 technical support</li>
                      <li className="pricing__list-item"><span><img src="/images/icon/2.png" alt="check"
                            className="dark"/></span>
                        Personal training</li>
                    </ul>

                  </div>

                  <div className="pricing__item-bottom">
                    <Link href="signup" className="trk-btn trk-btn--outline4">Choose Plan</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="pricing__shape">
      <span className="pricing__shape-item pricing__shape-item--3"><span></span> </span>
      <span className="pricing__shape-item pricing__shape-item--4"><img src="/images/others/2.png"
          alt="shape-icon"/></span>
    </div>
  </section>
  )
}

export default Pricing