import Link from "next/link";

const Footer1 = () => {
  const bankName = "Apex TRusts";
  const socialMediaLinks = [
    { href: "#", className: "bi bi-facebook", label: "Facebook" },
    { href: "#", className: "bi bi-instagram", label: "Instagram" },
    { href: "#", className: "bi bi-twitter", label: "Twitter" },
    { href: "#", className: "bi bi-youtube", label: "YouTube" },
  ];

  const companyLinks = [
    { href: "#", label: "Home" },
    { href: "#", label: "About Us" },
    { href: "#", label: "Contact Us" },
    { href: "#", label: "Services" },
    { href: "#", label: "Our Team" },
  ];

  const servicesLinks = [
    { href: "#", label: "Personal Banking" },
    { href: "#", label: "Business Banking" },
    { href: "#", label: "Loans & Mortgages" },
    { href: "#", label: "Wealth Management" },
    { href: "#", label: "Credit Cards" },
  ];

  const popularPosts = [
    {
      href: "#",
      src: "assets/images/resource/footer1.png",
      alt: "Post 1",
      title: "How to Improve Your Credit Score?",
      date: "Jan 10, 2024",
    },
    {
      href: "#",
      src: "assets/images/resource/footer2.png",
      alt: "Post 2",
      title: "Benefits of Online Banking",
      date: "Feb 15, 2024",
    },
  ];

  return (
    <div className="footer-middle">
      <div className="container">
        <div className="subscribe-area">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="subscribe-title">
                <h1>Subscribe to our Newsletter</h1>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <form
                onSubmit={(e) => e.preventDefault()}
                action="https://formspree.io/f/myyleorq"
                method="POST"
                id="dreamit-form"
              >
                <div className="subscribe_form">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    required=""
                    data-error="Please enter your email"
                    placeholder="Enter Your Email"
                  />
                  <button type="submit" className="btn">
                    Subscribe
                  </button>
                </div>
                <div className="subscribe_form_send"></div>
              </form>
              <div id="status" />
            </div>
          </div>
          <div className="subscribe-shape">
            <div className="subscribe-thumb bounce-animate5">
              <img src="assets/images/resource/small-dot.png" alt="" />
            </div>
            <div className="subscribe-thumb1">
              <img src="assets/images/resource/big-dot.png" alt="" />
            </div>
          </div>
        </div>
        <div className="footer-bg">
          <div className="row">
            <div className="col-lg-4 col-sm-6">
              <div className="widget widgets-company-info mb-4 mb-lg-0">
                <div className="company-info-desc pr-2">
                  <h4 className="widget-title"> About Us </h4>
                  <p>
                    {bankName} is a trusted banking institution offering a range
                    of financial services to help you manage your money better.
                    Our mission is to provide innovative banking solutions that
                    meet the needs of our customers.
                  </p>
                </div>
                <div className="follow-company-icon">
                  {socialMediaLinks.map((link, index) => (
                    <a
                      key={index}
                      className={`social-icon-color${index}`}
                      href={link.href}
                      aria-label={link.label}
                    >
                      <i className={link.className} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-6">
              <div className="widget widget-nav-menu">
                <h4 className="widget-title">Company</h4>
                <div className="menu-quick-link-content">
                  <ul className="footer-menu">
                    {companyLinks.map((link, index) => (
                      <li key={index}>
                        <a href={link.href}>{link.label}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="widget widget-nav-menu">
                <h4 className="widget-title">Services</h4>
                <div className="menu-quick-link-content">
                  <ul className="footer-menu">
                    {servicesLinks.map((link, index) => (
                      <li key={index}>
                        <a href={link.href}>{link.label}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div id="em-recent-post-widget" className="mt-5 mt-sm-0">
                <div className="single-widget-item">
                  <h4 className="widget-title">Popular Posts</h4>
                  {popularPosts.map((post, index) => (
                    <div
                      className={`recent-post-item ${
                        index === 0 ? "active" : ""
                      }`}
                      key={index}
                    >
                      <div className="recent-post-image">
                        <a href={post.href}>
                          <img
                            width={80}
                            height={80}
                            src={post.src}
                            alt={post.alt}
                          />
                        </a>
                      </div>
                      <div className="recent-post-text">
                        <h6>
                          <a href={post.href}>{post.title}</a>
                        </h6>
                        <span className="rcomment">{post.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="foorer-shape">
            <div className="footer-thumb">
              <img src="assets/images/resource/red-dot.png" alt="" />
            </div>
            <div className="footer-thumb1 bounce-animate2">
              <img src="assets/images/resource/all-shape.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom-area d-flex align-items-center">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-md-4">
              <div className="consen-logo">
                <Link legacyBehavior href="/">
                  <a className="logo_thumb" title="consen">
                    <img src="assets/images/logo.png" alt="logo" />
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-md-8">
              <div className="footer-bottom-content">
                <div className="footer-bottom-content-copy">
                  <p>
                    © 2024 <span>{bankName}</span> all rights reserved. Design
                    By Dream-IT.
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

export default Footer1;
