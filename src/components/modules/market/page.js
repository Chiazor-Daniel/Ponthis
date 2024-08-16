import React from 'react';

const marketSections = [
  {
    title: "Digital Asset Market Insights",
    content: [
      "Stay updated with the latest trends and insights in the digital asset market. Our platform provides comprehensive data and analysis to help you make informed decisions.",
      "Learn about market movements, emerging technologies, and strategies to optimize your digital asset management."
    ],
    imageUrl: "coin.jpeg" // Replace with a locally hosted image
  },
  {
    title: "Financial Market Updates",
    content: [
      "Get the latest updates on various financial markets. Our experts provide in-depth analysis and forecasts to help you navigate the markets with confidence.",
      "Stay informed about market trends, economic indicators, and opportunities across different asset classes."
    ],
    imageUrl: "hall.jpeg" // Replace with a locally hosted image
  },
  {
    title: "Global Market Analysis",
    content: [
      "Access comprehensive analysis of global markets. Our platform offers tools and insights to help you understand international market dynamics and make informed decisions.",
      "Stay ahead of the curve with our expert analysis and real-time global market data."
    ],
    imageUrl: "graph.webp" // Replace with a locally hosted image
  },
];

const Markets = () => {
  return (
    <section className="markets padding-top padding-bottom section-bg-color">
      <div className="container">
        <div className="markets__wrapper">
          {marketSections.map((section, index) => (
            <div key={index} className={`row g-4 align-items-center ${index !== 0 ? 'mt-5' : ''}`}>
              <div className={`col-lg-6 ${index % 2 !== 0 ? 'order-lg-2' : ''}`}>
                <div className="markets__thumb" data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'} data-aos-duration="800">
                  <div className="markets__thumb-inner">
                    <div className="markets__thumb-image">
                      <img src={section.imageUrl} alt={`${section.title} illustration`} style={{borderRadius: '20px', width: '100%', height: 'auto'}} />
                    </div>
                  </div>
                </div>
              </div>
              <div className={`col-lg-6 ${index % 2 !== 0 ? 'order-lg-1' : ''}`}>
                <div className="markets__content" data-aos={index % 2 === 0 ? 'fade-left' : 'fade-right'} data-aos-duration="800">
                  <div className="markets__content-inner">
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

export default Markets;
