import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";

function ContactCard() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const { name, email, subject, message } = formData;
    setIsFormValid(name && email && subject && message);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;

    try {
      const response = await axios.post(
        "https://api.ai-ledger.net/user/general-route/send-email",
        null,
        {
          params: { name, email, subject, message },
          headers: {
            email_token: "BopDaddy112233443322111223BopDaddy!!!!!",
          },
        }
      );

      if (response.data.status === "error" && response.data.message === "Invalid Token Provided") {
        Swal.fire({
          title: "Error!",
          text: "Invalid token provided. Please contact support.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Success!",
          text: "Your message has been sent successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "There was an error sending your message. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="contact padding-top padding-bottom">
      <div className="container">
        <div className="contact__wrapper">
          <div className="row g-5">
            <div className="col-md-5">
              <div className="contact__info" data-aos="fade-right" data-aos-duration="1000">
                <div className="contact__social">
                  <h3>let’s <span>get in touch </span>with us</h3>
                </div>
                <div className="contact__details">
                  <div className="contact__item" data-aos="fade-right" data-aos-duration="1000">
                    <div className="contact__item-inner">
                      <div className="contact__item-thumb">
                        <span><img src="1.png" alt="contact-icon" className="dark" /></span>
                      </div>
                      <div className="contact__item-content">
                        <p>
                          <Link href="tel:+447441448582">Uk Line : +4407895648310</Link>
                        </p>
                        <p>
                          <Link href="tel:+8801313941166">Belgium Line : +32466907438</Link>
                        </p>
                        <p>
                          <Link href="tel:+8801313941166">Canada line : +12042894539</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="contact__item" data-aos="fade-right" data-aos-duration="1100">
                    <div className="contact__item-inner">
                      <div className="contact__item-thumb">
                        <span><img src="2.png" alt="contact-icon" className="dark" /></span>
                      </div>
                      <div className="contact__item-content">
                      <p>
  <Link target="_blank" href="mailto:mail@ledgersafe.ai">mail@ledgersafe-ai.com</Link>
</p>
<p>
  <Link target="_blank" href="mailto:support@ledgersafe.ai">support@ledgersafe-ai.com</Link>
</p>

                      </div>
                    </div>
                  </div>
                  <div className="contact__item" data-aos="fade-right" data-aos-duration="1200">
                    <div className="contact__item-inner">
                      <div className="contact__item-thumb">
                        <span><img src="3.png" alt="contact-icon" className="dark" /></span>
                      </div>
                      <div className="contact__item-content">
                        <p>
                          123 Oxford Street, <br />London, W1D 1BT, United Kingdom
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <div className="contact__form">
                <form onSubmit={handleSubmit} data-aos="fade-left" data-aos-duration="1000">
                  <div className="row g-4">
                    <div className="col-12">
                      <div>
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                          className="form-control"
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Full Name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div>
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                          className="form-control"
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Email here"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div>
                        <label htmlFor="subject" className="form-label">Subject</label>
                        <input
                          className="form-control"
                          type="text"
                          id="subject"
                          name="subject"
                          placeholder="Subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div>
                        <label htmlFor="textarea" className="form-label">Message</label>
                        <textarea
                          cols="30"
                          rows="5"
                          className="form-control"
                          id="textarea"
                          name="message"
                          placeholder="Enter Your Message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="trk-btn trk-btn--border trk-btn--primary mt-4 d-block"
                    disabled={!isFormValid}
                  >
                    Contact us now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contact__shape">
        <span className="contact__shape-item contact__shape-item--1"><img src="/images/contact/4.png" alt="shape-icon" /></span>
        <span className="contact__shape-item contact__shape-item--2"><span></span></span>
      </div>
    </div>
  );
}

export default ContactCard;
