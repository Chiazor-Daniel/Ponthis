/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";

const sections = [
  {
    imageUrl: "talk.webp",
    title: "Welcome to LedgerSafeAI",
    content: [
      "Welcome to LedgerSafe, your comprehensive solution for managing digital assets. Our platform leverages advanced technology to help you make data-driven decisions in the dynamic world of digital finance.",
      "Our team combines expertise in blockchain technology, AI, and cybersecurity to deliver an unparalleled experience for our clients. Whether you're new to digital assets or an experienced user, LedgerSafe is designed to meet your needs with precision and security."
    ],
    buttonText: "Learn More About Us",
    buttonLink: "/about"
  },
  {
    imageUrl: "graph.webp",
    title: "Our Commitment to Innovation",
    content: [
      "At LedgerSafe, innovation is at the heart of everything we do. Our platform uses advanced algorithms to provide real-time insights and analysis, helping you navigate the digital asset market with confidence.",
      "We are committed to constantly evolving and integrating the latest technological advancements to ensure that our clients always have the best tools at their disposal."
    ],
    buttonText: "Explore Our Services",
    buttonLink: "/services"
  }, 
  {
    imageUrl: "hand.webp",
    title: "Why Choose LedgerSafeAI",
    content: [
      "Discover why many people trust LedgerSafe for their digital asset management needs. Our platform offers a secure, intuitive interface, comprehensive asset management, and real-time market analysis.",
      "Whether you are trading, managing, or monitoring multiple digital assets, LedgerSafe provides the tools and insights to help you succeed and stay informed about market trends."
    ],
    buttonText: "Explore Our Features",
    buttonLink: "/features"
  }
];

function About() {
  return (
    <section className="about about--style1">
      <div className="container">
        <div className="about__wrapper">
          {sections.map((section, index) => (
            <div key={index} className={`row gx-5 gy-4 gy-sm-0 align-items-center ${index !== 0 ? 'mt-5' : ''}`}>
              <div className={`col-lg-6 ${index % 2 !== 0 ? 'order-lg-2' : ''}`}>
                <div
                  className="about__thumb pe-lg-5"
                  data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
                  data-aos-duration="800"
                >
                  <div className="about__thumb-inner">
                    <div className="about__thumb-image floating-content">
                      <img
                        src={section.imageUrl}
                        alt={`About ${section.title}`}
                        style={{width: '100%', height: 'auto', borderRadius: '10px'}}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={`col-lg-6 ${index % 2 !== 0 ? 'order-lg-1' : ''}`}>
                <div
                  className="about__content"
                  data-aos={index % 2 === 0 ? 'fade-left' : 'fade-right'}
                  data-aos-duration="800"
                >
                  <div className="about__content-inner">
                    <h2>{section.title}</h2>
                    {section.content.map((paragraph, idx) => (
                      <p key={idx} className="mb-3">{paragraph}</p>
                    ))}
                    
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
