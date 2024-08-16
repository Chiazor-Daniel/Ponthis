import Breadcumb from "@/src/components/Breadcumb";
import Layout from "@/src/layout/Layout";
import Link from "next/link";

const cardTypes = [
  {
    name: "Debit Card",
    role: "Everyday Spending",
    image: "https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg",
    features: ["No annual fee", "Direct deposit", "Online banking"]
  },
  {
    name: "Credit Card",
    role: "Rewards & Benefits",
    image: "https://images.pexels.com/photos/6214477/pexels-photo-6214477.jpeg",
    features: ["Cashback rewards", "Travel insurance", "Purchase protection"]
  },
  {
    name: "Prepaid Card",
    role: "Budgeting Tool",
    image: "https://images.pexels.com/photos/4386433/pexels-photo-4386433.jpeg",
    features: ["No credit check", "Reloadable", "Expense tracking"]
  },
  {
    name: "Business Card",
    role: "Corporate Finances",
    image: "https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg",
    features: ["Expense management", "Employee cards", "Integrated accounting"]
  },
  {
    name: "Secured Card",
    role: "Credit Building",
    image: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg",
    features: ["Low deposit", "Credit score updates", "Graduate to unsecured"]
  },
  {
    name: "Virtual Card",
    role: "Online Shopping",
    image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg",
    features: ["Enhanced security", "Instant issuance", "Multiple cards"]
  }
];

const CardManagement = () => {
  return (
    <Layout>
      <Breadcumb pageName={"Card Management"} />

      <div className="team_area style-two upp">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="consen-section-title upper text-center pb-60">
                <h5>Card Options</h5>
                <h2>
                  Manage Your Finances with Our <span>Card Solutions</span>
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            {cardTypes.map((card, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div className="single_team">
                  <div className="single_team_thumb1">
                    <img src={card.image} alt={card.name} style={{objectFit: "cover", height: "300px"}} />
                  </div>
                  <div className="single_team_content">
                    <div className="team-title">
                      <h4>{card.name}</h4>
                      <span>{card.role}</span>
                    </div>
                    <div className="single_team_icon">
                      {card.features.map((feature, fIndex) => (
                        <span key={fIndex} style={{display: "block", marginBottom: "5px"}}>
                          <i className="bi bi-check-circle" style={{marginRight: "5px", color: "#086AD8"}}></i>
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="about-area style-three upper1" style={{backgroundColor: "#f8f9fe", padding: "50px 0"}}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12">
              <div className="consen-section-title">
                <h2>
                  Ready to Apply for a <span>New Card?</span>
                </h2>
                <p className="about-text1">
                  Choose the right card for your financial needs and enjoy the benefits of our secure and flexible card solutions.
                </p>
              </div>
              <div className="dreamit-icon-box">
                <div className="dreamit-icon-list">
                  <ul>
                    <li>
                      <i className="bi bi-arrow-right-circle"></i>
                      <span>Quick and easy application process</span>
                    </li>
                    <li>
                      <i className="bi bi-arrow-right-circle"></i>
                      <span>Competitive rates and fees</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="about-button" style={{marginTop: "20px"}}>
                <Link legacyBehavior href="/card-application">
                  <a>
                    <i className="bi bi-credit-card"></i> Apply Now
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
            <div className="dreamit-about-thumb">
  <img src="https://images.pexels.com/photos/6214501/pexels-photo-6214501.jpeg" alt="Card Selection" style={{width: "100%", height: "auto"}} />
  <div className="about-shape-thumb1 bounce-animate2">
    <img src="assets/images/about/about-shpe.png" alt="" />
  </div>
</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CardManagement;