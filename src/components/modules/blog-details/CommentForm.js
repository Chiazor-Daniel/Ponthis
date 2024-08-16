import React from "react";
import { useState } from "react";
const CommentForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setmessage] = useState("");
  const handleClick = (e) =>{
    e.preventDefault()
  }
  return (
    <div
      className="blog-details__commentform "
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <div className="sidebar">
        <div className="sidebar__commentform" id="post">
          <div className="sidebar__head">
            <h3>Leave A Comment</h3>
          </div>
          <div className="sidebar__commentform-body pt-25">
            <form action="/">
              <div className="row g-4">
                <div className="col-md-6">
                  <div>
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="name"
                      placeholder="Full Name"
                      value={name}
                      onChange={setName}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div>
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      className="form-control"
                      type="email"
                      id="email"
                      placeholder="Email here"
                      value={email}
                      onChange={setEmail}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div>
                    <label htmlFor="textarea" className="form-label">
                      Message
                    </label>
                    <textarea
                      cols="30"
                      rows="5"
                      className="form-control"
                      id="textarea"
                      placeholder="Enter Your Message"
                        value={message}
                        onChange={setmessage}
                    ></textarea>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="trk-btn trk-btn--border trk-btn--primary mt-4"
                onClick={handleClick}
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
