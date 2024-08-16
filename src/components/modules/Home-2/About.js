import React from 'react'

const aboutData = [
  {
    id: 1,
    title: "AI-Powered Insights",
    description: "Leverage advanced analytics to gain valuable insights and make informed decisions about your digital assets.",
    iconName: "brain",
    delay: 800,
  },
  {
    id: 2,
    title: "Top-notch Security",
    description: "We prioritize your security with advanced encryption and secure protocols to protect your assets.",
    iconName: "shield",
    delay: 900,
  },
  {
    id: 3,
    title: "Unified Asset Management",
    description: "Manage all your digital assets in one place with our comprehensive and user-friendly platform.",
    iconName: "chart",
    delay: 1000,
  },
];

const About = () => {
  return (
    <section className="about padding-top padding-bottom bg-light">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="section-header mb-4">
              <h2>Advanced <span className="highlight">AI-Powered</span> Asset Management</h2>
            </div>
            {aboutData.map((item) => (
              <div className="feature-item" key={item.id} data-aos="fade-right" data-aos-duration={item.delay}>
                <div className="feature-icon">
                  <i className={`icon-${item.iconName}`}></i>
                </div>
                <div className="feature-content">
                  <h5>{item.title}</h5>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="col-lg-6">
            <div className="about-image" data-aos="fade-left" data-aos-duration="800">
              <img src="dude.webp" alt="About our platform" className="img-fluid" style={{width: '600px', borderRadius: '20px'}}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About