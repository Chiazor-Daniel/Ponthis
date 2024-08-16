import React from 'react'
import Link from 'next/link'
const BlogCategories = () => {
  return (
    <div className="sidebar__categorie" >
    <div className="sidebar__head">
      <h6>Categories</h6>
    </div>
    <div className="sidebar__categorie-body">
      <div className="sidebar__categorie-content">
        <ul>
          <li className="active">
            <Link scroll={false} href="">
              Large-cap stocks.</Link>
            <span>2</span>
          </li>
          <li>
            <Link scroll={false} href="">
              Value stocks</Link>
            <span>4</span>
          </li>
          <li>
            <Link scroll={false} href="">
              IPO stocks</Link>
            <span>3</span>
          </li>
          <li>
            <Link scroll={false} href="">
              Dividend stocks</Link>
            <span>5</span>
          </li>
          <li>
            <Link scroll={false} href="">
              Non-dividend stocks</Link>
            <span>1</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
  )
}

export default BlogCategories