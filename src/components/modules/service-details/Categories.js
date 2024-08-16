/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Link from 'next/link'
const Categories = () => {
  return (
    <div className="sidebar__categorie" data-aos="fade-up" data-aos-duration="1000">
    <div className="sidebar__head">
      <h6>Categories</h6>
    </div>
    <div className="sidebar__categorie-body">
      <div className="sidebar__social-content">
        <ul>
          <li className="active">
            <Link scroll={false} href="">
              Modules for smart trading</Link>
          </li>
          <li>
            <Link scroll={false} href="">
              Social assistant that is flexible</Link>
          </li>
          <li>
            <Link scroll={false} href="">
              Reporter's news analyst</Link>
          </li>
          <li>
            <Link scroll={false} href="">
              Trading cryptocurrency platform</Link>
          </li>
          <li>
            <Link scroll={false} href="">
              Changes to exchange orders</Link>
          </li>
          <li>
            <Link scroll={false} href="">
              Price notification module</Link>
          </li>
        </ul>
      </div>
    </div>
  </div>
  )
}

export default Categories