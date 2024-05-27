import React from 'react';
import {Link} from 'react-router-dom';

//images
import Shape1 from './../assets/images/home-banner/shape2.png';
import Shape3 from './../assets/images/home-banner/shape4.png';

const PageLayout = ({pageTitle, desc}) =>{
    return(
        <>
            <div className="dz-bnr-inr style-1 text-center">
                <div className="container">
                    <div className="dz-bnr-inr-entry">
                        <h1>{pageTitle}</h1>
                        {desc !== false  &&   
                            <p className="text-white">
                            Leverage the power of AI technology to kickstart your trading journey today!</p>                            
                        }
                        <nav  className="breadcrumb-row">
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                                <li className="breadcrumb-item active">{pageTitle}</li>
                            </ul>
                        </nav>
                    </div>
                </div>                
                <img className="bg-shape1" src={Shape1} alt="" />
                <img className="bg-shape2" src={Shape1} alt="" />
                <img className="bg-shape3" src={Shape3} alt="" />
                <img className="bg-shape4" src={Shape3} alt="" />
            </div>
        </>
    )
}
export default PageLayout;