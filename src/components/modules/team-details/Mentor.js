/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Link from 'next/link'
const Mentor = () => {
  return (
    <div className="team team--details padding-top padding-bottom bg-color-3">
    <div className="container">
      <div className="team__wrapper">
        <div className="row g-5 align-items-center">
          <div className="col-md-5">
            <div className="team__thumb">
              <img src="/images/team-details/1.png" alt="Team Image"/>
            </div>
          </div>
          <div className="col-md-7">
            <div className="team__content">
              <h3>Shamika Thompson</h3>
              <p className="designation">Trade Consultant</p>
              <p className="info">Hey there! So glad you stopped by to Meet Our Company. Don't miss out on this opportunity
                to learn about what we do and the amazing team that makes it all happen! </p>

              <p>
                Our company is all about creating innovative solutions and providing top-notch services to our clients.
                From start to finish, we're dedicated to delivering results that exceed expectations.
              </p>

              <ul className="social mt-30">
                <li className="social__item">
                  <Link scroll={false} href="" className="social__link social__link--style2"><i className="fab fa-facebook-f"></i></Link>
                </li>
                <li className="social__item">
                  <Link scroll={false} href="" className="social__link social__link--style2 "><i className="fab fa-instagram"></i></Link>
                </li>
                <li className="social__item">
                  <Link scroll={false} href="" className="social__link social__link--style2"><i className="fa-brands fa-linkedin-in"></i></Link>
                </li>
                <li className="social__item">
                  <Link scroll={false} href="" className="social__link social__link--style2"><i className="fab fa-youtube"></i></Link>
                </li>
                <li className="social__item">
                  <Link href="" className="social__link social__link--style2 d-sm-none d-md-block"><i
                      className="fab fa-twitter"></i></Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Mentor