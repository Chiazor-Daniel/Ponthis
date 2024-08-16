/* eslint-disable react/no-unescaped-entities */
import { useRouter } from "next/router";

function Roadmap() {
  const route = useRouter()
  return (
    <section className="roadmap roadmap--style1 padding-top  padding-bottom bg-color" id="roadmap">
    <div className="container">
      <div className="section-header section-header--max50">
        <h2 className="mb-15 mt-minus-5">Product <span> roadmap</span></h2>
        <p>A product roadmap shows the path ahead, helps teams plan, and guides the delivery of the product.</p>
      </div>
      <div className="roadmap__wrapper">
        <div className="row gy-4 gy-md-0 gx-5">
          <div className="col-md-6 offset-md-6">
            <div className="roadmap__item ms-md-4 aos-init aos-animate" data-aos="fade-left" data-aos-duration="800">
              <div className="roadmap__item-inner">
                <div className="roadmap__item-content">
                  <div className="roadmap__item-header">
                    <h3>project research</h3>
                    <span>P1</span>
                  </div>
                  <p>Project research is the backbone of any successful project. It involves gathering information,
                    setting objectives, and analyzing data to ensure the project is achievable. Without proper research,
                    projects can fail due to lack of knowledge.</p>
                </div>
              </div>

            </div>
          </div>
          <div className="col-md-6">
            <div className="roadmap__item roadmap__item--style2 ms-auto me-md-4 aos-init aos-animate" data-aos="fade-right"
              data-aos-duration="800">
              <div className="roadmap__item-inner">
                <div className="roadmap__item-content">
                  <div className="roadmap__item-header">
                    <h3>framing idea</h3>
                    <span>P2</span>
                  </div>
                  <p>Hey there! Just wanted to throw out a framing idea for our upcoming project. Let's start with the
                    big picture and then work our way down to the details. This way we ensure our vision stays on track
                    while also ironing out.</p>
                </div>
              </div>

            </div>
          </div>
          <div className="col-md-6 offset-md-6">
            <div className="roadmap__item ms-md-4 aos-init" data-aos="fade-left" data-aos-duration="800">
              <div className="roadmap__item-inner">
                <div className="roadmap__item-content">
                  <div className="roadmap__item-header">
                    <h3>Design first draft</h3>
                    <span>P3</span>
                  </div>
                  <p>Hey guys, just wanted to share my design first draft! I went for a minimalist look with a pop of
                    color. What do you think? Open to any suggestions or feedback. Can't wait to see how this turns out
                    over all kind of success!</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="roadmap__item roadmap__item--style2 ms-auto me-md-4 aos-init" data-aos="fade-right"
              data-aos-duration="800">
              <div className="roadmap__item-inner">
                <div className="roadmap__item-content">
                  <div className="roadmap__item-header">
                    <h3>Final design</h3>
                    <span>P4</span>
                  </div>
                  <p>So after lots of reiterations, and endless tweaking, we finally landed on the final design. It's
                    slick, it's modern, and it perfectly captures the essence of what we were aiming for. We couldn't be
                    more excited to launch it!</p>
                </div>
              </div>

            </div>
          </div>
          <div className="col-md-6 offset-md-6">
            <div className="roadmap__item ms-md-4 aos-init" data-aos="fade-left" data-aos-duration="800">
              <div className="roadmap__item-inner">
                <div className="roadmap__item-content">
                  <div className="roadmap__item-header">
                    <h3>Project development</h3>
                    <span>P5</span>
                  </div>
                  <p>So we're deep in project development here, and things are coming along nicely. We've got a solid
                    plan in place and our team is firing on all cylinders. There's still work to be done, but we're
                    excited about what we're building.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="roadmap__item roadmap__item--style2 ms-auto me-md-4 aos-init" data-aos="fade-right"
              data-aos-duration="800">
              <div className="roadmap__item-inner">
                <div className="roadmap__item-content">
                  <div className="roadmap__item-header">
                    <h3>Launch project</h3>
                    <span>P6</span>
                  </div>
                  <p>Alright folks, it's time to get this project off the ground! We've been talking about it for weeks,
                    and now it's time to launch. We've got all the pieces in place, so let's get to work and make this
                    thing happen!</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="roadmap__shape">
      <span className="roadmap__shape-item roadmap__shape-item--1"> <span></span> </span>
      <span className="roadmap__shape-item roadmap__shape-item--2"> <img src="/images/icon/1.png" alt="shape-icon"/>
      </span>
    </div>
  </section>
  );
}

export default Roadmap;
