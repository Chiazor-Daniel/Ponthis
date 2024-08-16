import Link from "next/link";

const DefaultFooter = () => {
  const bankName = "Apex Trust";
  const socialMediaLinks = [
    { href: "#", className: "bi bi-facebook", label: "Facebook" },
    { href: "#", className: "bi bi-linkedin", label: "LinkedIn" },
    { href: "#", className: "bi bi-twitter", label: "Twitter" },
  ];

  const companyLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
    { href: "/services", label: "Services" },
  ];

  const servicesLinks = [
    { href: "/personal-banking", label: "Personal Banking" },
    { href: "/business-banking", label: "Business Banking" },
    { href: "/loans", label: "Loans" },
    { href: "/investments", label: "Investments" },
    { href: "/online-banking", label: "Online Banking" },
  ];

  const companyAddress = (
    <>
      123 Oxford Street, <br />
      London, W1D 1BT, <br />
      United Kingdom
    </>
  );

  const emailAddress = "support@apextrust.online";

  return (
    <div className="footer-middle style-two">
      <div className="container">
        <div className="footer-bg">
          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <div className="widget widgets-company-info mb-4 mb-lg-0">
                <div className="company-info-desc pr-2">
                  <h4 className="widget-title"> About Us </h4>
                  <p>
                    {bankName} is a financial institution dedicated to providing
                    reliable banking services. Our goal is to offer effective
                    financial solutions tailored to our customers' needs.
                  </p>
                </div>
                
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="widget widget-nav-menu">
                <h4 className="widget-title">Quick Links</h4>
                <div className="menu-quick-link-content">
                  <ul className="footer-menu">
                    {companyLinks.map((link, index) => (
                      <li key={index}>
                        <Link href={link.href}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="widget widget-nav-menu">
                <h4 className="widget-title"> Services </h4>
                <div className="menu-quick-link-content">
                  <ul className="footer-menu">
                    {servicesLinks.map((link, index) => (
                      <li key={index}>
                        <Link href={link.href}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
            <div className="company-contact-info mt-4">
                  <h4 className="widget-title">Contact Information</h4>
                  <p>
                    <strong>Address:</strong> <br />
                    {companyAddress}
                  </p>
                  <p>
                    <strong>Email:</strong> <br />
                    <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
                  </p>
                </div>   

            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom-area d-flex align-items-center">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-md-4">
              <div className="logo">
                <Link href="/" className="logo_thumb" title={bankName}>
                  {bankName}
                </Link>
              </div>
            </div>
            <div className="col-md-8">
              <div className="footer-bottom-content">
                <div className="footer-bottom-content-copy">
                  <p>
                    © {new Date().getFullYear()} <span>{bankName}</span>. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultFooter;
