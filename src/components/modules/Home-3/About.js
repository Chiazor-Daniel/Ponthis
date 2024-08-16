/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Counter from '@/components/base/Counter'
import Link from "next/link";

const About = () => {
  return (
    <section className="about about--style3 padding-top padding-bottom ">
      <div className="container">
        <div className="about__wrapper">
          <div className="row g-5">
            <div className="col-md-6">
              <div className="about__thumb" data-aos="fade-right" data-aos-duration="800">
                <div className="about__thumb-inner">
                  <div className="about__thumb-image text-center floating-content">
                    <img className="dark" src="/images/about/home3/1.png" alt="about-image" />
                    <div className="floating-content__bottom-left floating-content__bottom-left--style3">
                      <div className="floating-content__item floating-content__item--style4">
                        <div className="floating-content__item-thum">
                          <img src="/images/about/home3/5.png" alt="author" />
                        </div>
                        <div className="floating-content__item-content">
                          <p>Dillion Megida</p>
                          <span>Founder & MD</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="about__content" data-aos="fade-left" data-aos-duration="800">
                <div className="about__content-icon">
                  <img src="/images/banner/home3/2.png" alt="trade icon" />
                </div>
                <h2>Meet our platform to know more about</h2>
                <p className="mb-0">Hey folks! Meet our platform! With our platform, you'll get access to all the info you
                  need to make informed decisions. Our platform is your one-stop-shop for everything you need to know.
                  So what are you waiting for? Let's get started! </p>
                <Link href="about" className="trk-btn trk-btn--border trk-btn--primary">Explore More </Link>
              </div>
            </div>
          </div>
          <div className="row g-5 mt-100">
            <div className="col-md-6">
              <div className="about__content" data-aos="fade-right" data-aos-duration="800">
                <h2>our Commitment to help growing your business</h2>
                <ul>
                  <li><span><img src="/images/about/home3/check.png" alt="check" /></span> Building a Better Trading
                    Future</li>
                  <li><span><img src="/images/about/home3/check.png" alt="check" /></span> Provide a Trading
                    Experience</li>
                  <li><span><img src="/images/about/home3/check.png" alt="check" /></span> The Experts Behind Your
                    Success</li>
                  <li><span><img src="/images/about/home3/check.png" alt="check" /></span> Empowering Traders
                    Worldwide</li>
                </ul>
                <Link href="team" className="trk-btn trk-btn--border trk-btn--primary">Meet our experts</Link>
              </div>
            </div>
            <div className="col-md-6">
              <div className="about__thumb" data-aos="fade-left" data-aos-duration="800">
                <div className="about__thumb-inner">
                  <div className="about__thumb-image text-center floating-content">
                    <img className="dark" src="/images/about/home3/2.png" alt="about-image" />
                    <div className="floating-content__top-left floating-content__top-left--style2">
                      <div className="floating-content__item floating-content__item--style5">
                        <h3><Counter start={0} end={90} delay={20} />%
                        </h3>
                        <p>Satisfied clients</p>

                        <div className="progress">
                          <div className="progress-bar w-75" role="progressbar" aria-valuenow="75" aria-valuemin="0"
                            aria-valuemax="100"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About