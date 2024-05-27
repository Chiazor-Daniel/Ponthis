import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// Images
import blog1 from './../../assets/images/blog/pic1.jpg';
import blog2 from './../../assets/images/blog/pic2.jpg';
import avatar1 from './../../assets/images/avatar/avatar1.jpg';
import logo from './../../assets/logo.png'
import avatar2 from './../../assets/images/avatar/avatar2.jpg';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { BarLoader } from 'react-spinners';
function RecentNews() {
    const [news, setNews] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("https://api.marketaux.com/v1/news/all?symbols=TSLA%2CAMZN%2CMSFT&filter_entities=true&language=en&api_token=OgjIOeXomaDmlsuyeN0m920z6yCN31Uzy4PCqCYr");
                setNews(res.data.data);
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };
        fetchData();

    }, []);
    useEffect(() => {
        console.log("news", news);
    }, [news]);

    return (
        <>
        <div className='row'>
            {news ? news.map((data, index) => (
                <div className="dz-card style-1 blog-half m-b30 col-6" key={index}>
                    <div className="dz-media">
                        <Link to={"/blog-details"}><img src={data.image_url} alt="" /></Link>
                        <ul className="dz-badge-list">
                        </ul>
                        <a href={data.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">Read More</a>

                    </div>
                    <div className="dz-info">
                        <div className="dz-meta">
                            <ul>
                                <li className="post-author">
                                    <Link to={"#"}>
                                        <img src={logo} alt="" className="me-2" />
                                        <span>Atlas wavers</span>
                                    </Link>
                                </li>
                                <li className="post-date">
                                    <Link to={"#"}>
                                        {new Date(data.published_at).toLocaleString()}
                                    </Link>
                                </li>

                            </ul>
                        </div>
                        <h4 className="dz-title"><Link to={"/blog-details"}>{data.title}</Link></h4>
                        <p className="m-b0">{data.description}</p>
                    </div>
                </div>
            )): <BarLoader color="#36d7b7" style={{margin: "auto"}}/>}
        </div>
        {
            news && (
                <Button className='col-2' style={{ margin: "auto" }}>Load More</Button>
            )
        }
        </>
    )
}
export default RecentNews;
