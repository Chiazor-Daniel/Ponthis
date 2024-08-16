import React from 'react'
import Link from 'next/link'
const Comments = () => {
  return (
    <div className="blog-details__comment" data-aos="fade-up" data-aos-duration="1000">
      <div className="sidebar">
        <div className="sidebar__comment">
          <div className="sidebar__head">
            <h3>Comment</h3>
          </div>
          <div className="sidebar__comment-body">
            <ul>
              <li className="sidebar__comment-item">
                <div className="comment">
                  <div className="comment__inner">
                    <div className="comment__head">
                      <div className="comment__author">
                        <div className="comment__author-thumb">
                          <img src="/images/blog/user/3.png" alt="comment-author" />
                        </div>
                        <div className="comment__author-info">
                          <h6 className="mb-0">Johanna Erika</h6>
                          <span>26 Marrch 2024 , at 02:00 pm</span>
                        </div>
                      </div>
                      <div className="comment__action">
                        <Link scroll={false} href="/#post"> <img src="/images/blog/user/replay.svg" alt="reply-icon" />
                          reply</Link>
                      </div>
                    </div>
                    <div className="comment__body">
                      <div className="comment__body-inner">
                        <p className="mb-0">We invite you to explore our trading blog for the latest industry
                          insights and expert analysis and make decisions.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="sidebar__comment-item sidebar__comment-item--reply">
                <div className="comment">
                  <div className="comment__inner">
                    <div className="comment__head">
                      <div className="comment__author">
                        <div className="comment__author-thumb">
                          <img src="/images/blog/user/1.png" alt="comment-author" />
                        </div>
                        <div className="comment__author-info">
                          <h6 className="mb-0">Tommy Reed</h6>
                          <span>20 Marrch 2024 , at 02:00 pm</span>
                        </div>
                      </div>
                      <div className="comment__action">
                        <Link scroll={false} href="/#post"> <img src="/images/blog/user/replay.svg" alt="reply-icon" />
                          reply</Link>
                      </div>
                    </div>
                    <div className="comment__body">
                      <div className="comment__body-inner">
                        <p className="mb-0">We invite you to explore our trading blog for the latest industry
                          insights and expert analysis and make decisions.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="sidebar__comment-item sidebar__comment-item--reply">
                <div className="comment">
                  <div className="comment__inner">
                    <div className="comment__head">
                      <div className="comment__author">
                        <div className="comment__author-thumb">
                          <img src="/images/blog/user/2.png" alt="comment-author" />
                        </div>
                        <div className="comment__author-info">
                          <h6 className="mb-0">Max Adams.</h6>
                          <span>15 July 2024 , at 01:00 pm</span>
                        </div>
                      </div>
                      <div className="comment__action">
                        <Link scroll={false} href="/#post"> <img src="/images/blog/user/replay.svg" alt="reply-icon" />
                          reply</Link>
                      </div>
                    </div>
                    <div className="comment__body">
                      <div className="comment__body-inner">
                        <p className="mb-0">We invite you to explore our trading blog for the latest industry
                          insights and expert analysis and make decisions.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="sidebar__comment-item">
                <div className="comment">
                  <div className="comment__inner">
                    <div className="comment__head">
                      <div className="comment__author">
                        <div className="comment__author-thumb">
                          <img src="/images/blog/user/4.png" alt="comment-author" />
                        </div>
                        <div className="comment__author-info">
                          <h6 className="mb-0">Chris Scott</h6>
                          <span>19 Dec 2024 , at 04:00 pm</span>
                        </div>
                      </div>
                      <div className="comment__action">
                        <Link scroll={false} href="/#post"> <img src="/images/blog/user/replay.svg" alt="reply-icon" />
                          reply</Link>
                      </div>
                    </div>
                    <div className="comment__body">
                      <div className="comment__body-inner">
                        <p className="mb-0">We invite you to explore our trading blog for the latest industry
                          insights and expert analysis and make decisions.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comments