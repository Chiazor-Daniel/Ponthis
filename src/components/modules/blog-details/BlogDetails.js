/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import CommentForm from './CommentForm'
import Comments from './Comments'
import Link from 'next/link'

// Sample blog data
const blogData = {
  title: "Advantages of day trading",
  author: "Dillion Megida",
  date: "April 25, 2024",
  comments: 4,
  mainImageUrl: "https://images.pexels.com/photos/8370391/pexels-photo-8370391.jpeg?auto=compress&cs=tinysrgb&w=600",
  paragraphs: [
    "Lorem ipsum dolor sit amet consectetur. At sed amet viverra etiam elit vivamus ultrices pharetra. Diam augue in dictumst nisl varius libero morbi dolor. Diam nibh lectus lectus volutpat praesent vulputate condimentum. Leo ipsum mi amet ut at vitae. Eu proin lacus maecenas nibh lectus lectus."
  ],
  segments: [
    {
      title: "Short-term investment to the market",
      content: [
        "Looking to make some quick cash in the market? Short-term investments might be just the ticket.",
        "They can be risky, but with a little research and some luck, you could see some solid returns in no time the market!"
      ],
      imageUrl: "/images/blog/details/2.png"
    },
    {
      title: "Long-term investment to higher return",
      content: [
        "If you're looking to make some serious cash, a long-term investment is definitely the way to go.",
        "Sure, it may take a little patience, but the returns will be worth it in the end! Don't settle for mediocre gains when you could be making bank with a smart."
      ],
      imageUrl: "/images/blog/details/3.png"
    }
  ],
  tags: ["trading", "investor"],
  socialLinks: [
    { url: "", icon: "fab fa-facebook-f" },
    { url: "", icon: "fab fa-instagram" },
    { url: "", icon: "fa-brands fa-linkedin-in" },
    { url: "", icon: "fab fa-youtube" }
  ]
};

const BlogDetails = () => {
  return (
    <div className="blog-details__item">
      <div className="blog-details__item-inner">
        <div className="blog-details__thumb">
          <div className="blog-details__thumb-inner" data-aos="fade-up" data-aos-duration="800">
            <img src={blogData.mainImageUrl} alt="blog-image" />
          </div>
        </div>
        <div className="blog-details__content">
          <h3>{blogData.title}</h3>
          <div className="blog-details__meta">
            <ul>
              <li><img src="/images/blog/icon/1.png" alt="user-icon" /> {blogData.author}</li>
              <li><img src="/images/blog/icon/2.png" alt="date-icon" /> {blogData.date}</li>
              <li>
                <Link scroll={false} href=""><img src="/images/blog/icon/3.png" alt="comment-icon" /> {blogData.comments} Comments</Link>
              </li>
            </ul>
          </div>
          {blogData.paragraphs.map((paragraph, index) => (
            <p key={index} className="mb-0">{paragraph}</p>
          ))}
        </div>
        <div className="blog-details__segment" data-aos="fade-up" data-aos-duration="1000">
          <div className="blog-details__segment-inner">
            {blogData.segments.map((segment, index) => (
              <div key={index} className="blog-details__segment-item">
                <div className="row gy-4">
                  <div className={`col-xl-6 ${index % 2 === 0 ? '' : 'order-xl-2'}`}>
                    <div className="blog-details__segment-thumb">
                      <img src={segment.imageUrl} alt="blog-image" />
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="blog-details__segment-content">
                      <h5>{segment.title}</h5>
                      {segment.content.map((content, i) => (
                        <p key={i}>{content}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="blog-details__action" data-aos="fade-up" data-aos-duration="1000">
          <div className="blog-details__action-inner">
            <div className="blog-details__tag">
              <div className="tags tags--style2">
                <ul>
                  <li>
                    <h6 className="mb-0">Tags</h6>
                  </li>
                  {blogData.tags.map((tag, index) => (
                    <li key={index}>
                      <Link scroll={false} href="" className={index === 0 ? 'active' : ''}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="blog-details__social">
              <ul className="social">
                <li className="social__item">
                  <h6 className="mb-0">Share</h6>
                </li>
                {blogData.socialLinks.map((link, index) => (
                  <li key={index} className="social__item">
                    <Link scroll={false} href={link.url} className={`social__link social__link--style2 ${index === 0 ? 'active' : ''}`}>
                      <i className={link.icon}></i>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <Comments />
        <CommentForm />
      </div>
    </div>
  )
}

export default BlogDetails
