import React from 'react'
import Link from 'next/link'
const Team = () => {
  return (
    <div className="service-details__team mt-50">
    <h5 className="mb-25">Meet with our experts</h5>
    <div className="team" data-aos="fade-up" data-aos-duration="1200">
      <div className="row g-5">
        <div className="col-sm-6">
          <div className="team__item team__item--shape" data-aos="fade-up" data-aos-duration="800">
            <div className="team__item-inner team__item-inner--shape2"> 
              <div className="team__item-thumb team__item-thumb--style1">
                <img src="/images/team/other/1.png" alt="Team Image" className="dark"/>
              </div>
              <div className="team__item-content team__item-content--style1">
                <div className="team__item-author team__item-author--style1">
                  <div className="team__item-authorinfo">
                    <h6 className="mb-1"><Link href="team-details" className="stretched-link">Tyler Jones</Link>
                    </h6>
                    <p className="mb-0">Trader Boss</p> 
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="team__item team__item--shape" data-aos="fade-up" data-aos-duration="900">
            <div className="team__item-inner team__item-inner--shape2">
              <div className="team__item-thumb team__item-thumb--style1">
                <img src="/images/team/other/2.png" alt="Team Image" className="dark"/>
              </div>
              <div className="team__item-content team__item-content--style1">
                <div className="team__item-author team__item-author--style1">
                  <div className="team__item-authorinfo">
                    <h6 className="mb-1"><Link href="team-details" className="stretched-link">Adam Smith</Link>
                    </h6>
                    <p className="mb-0">Nimble Broker</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Team