import React from 'react'
import Link from 'next/link'
const PopularTag = () => {
  return (
    <div className="sidebar__tags" >
    <div className="sidebar__head">
      <h6>Popular Tag</h6>
    </div>
    <div className="sidebar__tags-body">
      <div className="tags">
        <ul>
          <li><Link scroll={false} href="" className="active">trading</Link></li>
          <li><Link scroll={false} href="">business</Link></li>
          <li><Link scroll={false} href="">stock</Link></li>
          <li><Link scroll={false} href="">forextrader</Link></li>
          <li><Link scroll={false} href="">investor</Link></li>
          <li><Link scroll={false} href="">Trading</Link></li>
          <li><Link scroll={false} href="">investor</Link></li>
          <li><Link scroll={false} href="">daytrading</Link></li>
        </ul>
      </div>
    </div>
  </div>
  )
}

export default PopularTag