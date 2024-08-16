/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import FsLightbox from "fslightbox-react";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import React from "react";

const Hero = () => {
  const [toggler, setToggler] = useState(false);

  const isMobileQuery = useMediaQuery({ query: '(max-width: 768px)' });
  const isDesktopQuery = useMediaQuery({ query: '(min-width: 1024px)' });
  return (
    <>
    <FsLightbox toggler={toggler} sources={[""]} />
    <section
      className="banner banner--style2 bg-color-3 bg--cover"
      style={{ backgroundImage: "" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 1920 739"
        className="bg-shape-svg"
      >
        <clipPath id="shape-clippath">
          <path d="M0 0H1920V350.233C1920 483.334 1821.85 596.054 1690.02 614.364L303.352 806.957C143.029 829.224 0 704.687 0 542.825V0Z" />
        </clipPath>
      </svg>
      <img src={'./images/her.png'} style={{position: 'absolute'}} alt="pic"/>
      <div className="container">
        <div className="banner__wrapper banner__wrapper--style2">
          <div className="row flex-md-row-reverse gx-5">
          <div className="col-lg-6 col-md-5" style={{position: 'relaive'}}>
            {
              !isMobileQuery && (
                <img
                  src="girl.png"
                  alt="banner-thumb"
                  style={{
                    position: 'absolute', 
                    bottom: '130px', 
                    width: '500px',
                    right: "100px", 
                    zIndex: 10
                  }}
                />

              )
            }
                <img src="tts.png" style={{
                    position: 'absolute', 
                    top: '80px', 
                    width: '700px',
                    left: '50%',
                    zIndex: '2'
                  }} />
              <div className="banner__thumb" >
              </div>
            </div>
            <div className="col-lg-6 col-12 col-md-7">
              <div
                className="banner__content"
                data-aos="fade-left"
                data-aos-duration="1000"
              >
                 <h1 className="banner__content-heading banner__content-heading--style2">
                    Enhance Your Digital Asset Management
                  </h1>
                  <p className="banner__content-moto">
                    Our platform offers advanced tools to help you track, manage, and
                    secure your digital assets. Experience a new level of control and
                    peace of mind in the digital economy.
                  </p>
                <div className="btn-group">
              

                  <Link
                  target="_blank" rel="noopener noreferrer"
                     href="https://dashboard.ledgersafe-ai.com/"
                    className="trk-btn trk-btn--primary trk-btn--arrowplay"
                  >
                    Get Started
                    <span className="style2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M9.74165 7.59173C9.81874 7.51447 9.91032 7.45318 10.0111 7.41137C10.1119 7.36955 10.22 7.34802 10.3291 7.34802C10.4383 7.34802 10.5464 7.36955 10.6472 7.41137C10.748 7.45318 10.8396 7.51447 10.9166 7.59173L14.7416 11.4167C14.8189 11.4938 14.8802 11.5854 14.922 11.6862C14.9638 11.787 14.9854 11.8951 14.9854 12.0042C14.9854 12.1134 14.9638 12.2214 14.922 12.3222C14.8802 12.4231 14.8189 12.5146 14.7416 12.5917L10.9166 16.4167C10.8395 16.4939 10.7479 16.5551 10.6471 16.5968C10.5463 16.6386 10.4383 16.6601 10.3291 16.6601C10.22 16.6601 10.112 16.6386 10.0112 16.5968C9.91039 16.5551 9.8188 16.4939 9.74165 16.4167C9.6645 16.3396 9.6033 16.248 9.56154 16.1472C9.51979 16.0464 9.4983 15.9383 9.4983 15.8292C9.4983 15.7201 9.51979 15.6121 9.56154 15.5113C9.6033 15.4105 9.6645 15.3189 9.74165 15.2417L12.975 12.0001L9.74165 8.76673C9.41665 8.44173 9.42498 7.90839 9.74165 7.59173Z"
                          fill="#0C263A"
                        />
                        <rect
                          x="-0.75"
                          y="0.75"
                          width="22.5"
                          height="22.5"
                          rx="11.25"
                          transform="matrix(-1 0 0 1 22.5 0)"
                          stroke="black"
                          strokeOpacity="0.16"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </span>
                  </Link>
                  
                </div>
              </div>
            </div>
          
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Hero;
