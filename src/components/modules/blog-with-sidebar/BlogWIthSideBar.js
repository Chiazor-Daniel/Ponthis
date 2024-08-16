import React from 'react'
import BlogData from '../../../../public/api/blog-side-bar/BlogSideBar.json'
import SidebarSearch from '@/components/base/SidebarSearch'
import BlogCategories from '@/components/base/BlogCategories'
import RecentPost from '@/components/base/RecentPost'
import PopularTag from '@/components/base/PopularTag'
import BlogCard from '@/components/cards/BlogCard'
import Link from 'next/link'
const BlogWIthSideBar = () => {
  return (
    <div className="blog padding-top padding-bottom section-bg-color">
    <div className="container">
      <div className="blog__wrapper">
        <div className="row g-5">
          <div className="col-lg-8">
            <div className="row g-4">
            {BlogData.map((item, index) => (
              <div key={index} className="col-sm-6 ">
                <BlogCard data={item} />
              </div>
            ))}
            </div>
            <div className="paginations" data-aos="fade-up" data-aos-duration="800">
              <ul className="lab-ul d-flex flex-wrap justify-content-center mb-1">
                <li>
                  <Link scroll={false} href=""><i className="fa-solid fa-angle-left me-2"></i> Prev</Link>
                </li>
                <li>
                  <Link scroll={false} href="" className="active">1</Link>
                </li>
                <li className="d-none d-sm-block">
                  <Link scroll={false} href="">2</Link>
                </li>
                <li className="d-none d-sm-block">
                  <Link scroll={false} href="">3</Link>
                </li>
                <li>
                  <Link scroll={false} href="" className="dot">...</Link>
                </li>
                <li>
                  <Link scroll={false} href="">12</Link>
                </li>
                <li>
                  <Link scroll={false} href="" className="active">Next <i className="fa-solid fa-angle-right ms-2"></i> </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-md-8  col-12">
            <div className="sidebar" data-aos="fade-left" data-aos-duration="1000">
              <div className="row g-4">
                <div className="col-12">
                  <SidebarSearch />
                </div>
                <div className="col-12">
                  <BlogCategories/>
                </div>
                <div className="col-12">
                  <RecentPost />
                </div>
                <div className="col-12">
                  <PopularTag />
                </div>
                <div className="col-12">
                  <div className="sidebar__social" >
                    <div className="sidebar__head">
                      <h6>Social Links</h6>
                    </div>
                    <div className="sidebar__social-body">
                      <div className="sidebar__social-content">
                        <ul className="social mt-25">
                          <li className="social__item">
                            <Link scroll={false} href="" className="social__link social__link--style2 active"><i className="fab fa-facebook-f"></i></Link>
                          </li>
                          <li className="social__item">
                            <Link scroll={false} href="" className="social__link social__link--style2 "><i className="fab fa-instagram"></i></Link>
                          </li>
                          <li className="social__item">
                            <Link scroll={false} href="" className="social__link social__link--style2"><i
                                className="fa-brands fa-linkedin-in"></i></Link>
                          </li>
                          <li className="social__item">
                            <Link scroll={false} href="" className="social__link social__link--style2"><i className="fab fa-youtube"></i></Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default BlogWIthSideBar