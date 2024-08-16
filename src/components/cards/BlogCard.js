import React from 'react';
import Link from 'next/link';
const BlogCard = ({ data }) => {
  return (
    <div className="blog__item" data-aos="fade-up" data-aos-duration="1000">
      <div className="blog__item-inner blog__item-inner--style2">
        <div className="blog__thumb">
          <img src={data.img} alt="blog Images" />
        </div>

        <div className="blog__content">
          <div className="blog__meta">
            <span className={`blog__meta-tag blog__meta-tag--style${data.tag.style}`}>
              {data.tag.text}
            </span>
          </div>
          <h5 className="10 style2">
            <Link href="blog-details">{data.title}</Link>
          </h5>

          <p className="mb-15">{data.description}</p>

          <div className="blog__writer">
            <div className="blog__writer-thumb">
              <img src={data.writer.img} alt="writer" />
            </div>
            <div className="blog__writer-designation">
              <p>{data.writer.name}</p>
              <span>{data.writer.date}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
