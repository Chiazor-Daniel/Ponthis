import React from 'react'
import Link from 'next/link'
const RecentPost = () => {
  return (
    <div className="sidebar__recentpost" >
      <div className="sidebar__head">
        <h6>Recent Post</h6>
      </div>
      <div className="sidebar__recentpost-body">
        <ul>
          <li>
            <div className="sidebar__recentpost-item">
              <div className="sidebar__recentpost-inner">
                <div className="sidebar__recentpost-thumb">
                  <Link href="blog-details"><img src="/images/blog/recent/1.png"
                    alt="recentpost-image" /></Link>
                </div>
                <div className="sidebar__recentpost-content">
                  <p><Link href="blog-details">Real Estate Investing</Link></p>
                  <span>Dec 22, 2024</span>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="sidebar__recentpost-item">
              <div className="sidebar__recentpost-inner">
                <div className="sidebar__recentpost-thumb">
                  <Link href="blog-details"><img src="/images/blog/recent/2.png"
                    alt="recentpost-image" /></Link>
                </div>
                <div className="sidebar__recentpost-content">
                  <p><Link href="blog-details">Technical analysis </Link></p>
                  <span>July 28, 2024</span>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="sidebar__recentpost-item">
              <div className="sidebar__recentpost-inner">
                <div className="sidebar__recentpost-thumb">
                  <Link href="blog-details"><img src="/images/blog/recent/3.png"
                    alt="recentpost-image" /></Link>
                </div>
                <div className="sidebar__recentpost-content">
                  <p><Link href="blog-details">Trading risk tolerance</Link></p>
                  <span>May 18, 2024</span>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="sidebar__recentpost-item">
              <div className="sidebar__recentpost-inner">
                <div className="sidebar__recentpost-thumb">
                  <Link href="blog-details"><img src="/images/blog/recent/4.png"
                    alt="recentpost-image" /></Link>
                </div>
                <div className="sidebar__recentpost-content">
                  <p><Link href="blog-details">Harmonic price pattern</Link></p>
                  <span>Feb 16, 2024</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default RecentPost