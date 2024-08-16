/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Link from 'next/link';

const blogData = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Top 10 Tips for Successful Trading',
    description:
      'Follow these 10 trading tips: research, diversify, stay disciplined, risk smartly, stay informed, trade small, stay patient, track performance, ignore emotions.',
    link: '/blog-details',
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/7567441/pexels-photo-7567441.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Trading Wins and Losses in the Market!',
    description:
      "Trading Tales reminds us that profits and losses are part of the investment game, but it's the lessons learned that truly matter. Keep calm and trade on!",
    link: '/blog-details',
  },
];

const Blogs = () => {
  return (
    <section className="blog padding-top padding-bottom of-hidden">
      <div className="container">
        <div className="section-header section-header--style4">
          <div className="section-header__content section-header__content--style3">
            <h2 className="mb-0">
              Popular Trading <span>Articles</span>
            </h2>
          </div>
          <div className="section-header__action">
            {/* <div>
              <Link href="blogs" className="trk-btn trk-btn--border trk-btn--secondary">View All</Link>
            </div> */}
          </div>
        </div>
        <div className="blog__wrapper">
          <div className="row g-4">
            {blogData.map((blog) => (
              <div className="col-md-6" key={blog.id}>
                <div
                  className="blog__item blog__item--style2"
                  data-aos="fade-right"
                  data-aos-duration="1000"
                >
                  <div className="blog__item-inner blog__item-inner--style2 pt-30 px-30 pb-40">
                    <div className="blog__thumb">
                      <img src={blog.image} alt="blog Images"  style={{height: '400px', objectFit: 'cover'}}/>
                    </div>

                    <div className="blog__content mt-30">
                      <h5 className="style2">
                        <Link href={blog.link}>{blog.title}</Link>
                      </h5>

                      <p className="mb-15">{blog.description}</p>

                      <Link href={blog.link} className="text-btn text-btn--style2">
                        Read more <i className="fa-solid fa-angle-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="blog__shape">
        <span className="blog__shape-item blog__shape-item--1">
          {' '}
          <span></span>{' '}
        </span>
      </div>
    </section>
  );
};

export default Blogs;
