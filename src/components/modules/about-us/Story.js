import React from "react";
import Link from "next/link";
import { useState } from "react";
import FsLightbox from "fslightbox-react";
const Story = () => {
  const [toggler, setToggler] = useState(false);
  return (
    <>
      <FsLightbox
        toggler={toggler}
        sources={[
          "https://youtu.be/MHhIzIgFgJo",
        ]}
      />
      <div className="story padding-top bg-color-3">
        <div className="container">
          <div className="story__wrapper">
            <div className="story__thumb">
              <div
                className="story__thumb-inner"
                data-aos="fade-up"
                data-aos-duration="800"
              >
                <img src="/images/about/4.png" alt="story-image" />
                <div className="story__thumb-playbtn">
                  <Link  href="" onClick={() => setToggler(!toggler)}>
                    <i className="fa-solid fa-circle-play"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="story__shape">
          <span className="story__shape-item story__shape-item--1">
            <span></span>{" "}
          </span>
        </div>
      </div>
    </>
  );
};

export default Story;
