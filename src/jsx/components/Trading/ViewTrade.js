import React from 'react'
import FutureTable from './futuretable'
import {useEffect, useState, useRef } from 'react';
import {Link} from 'react-router-dom';
import { Tab, Nav } from 'react-bootstrap';

const ViewTrade = () => {
    return (
        <div className=''>
            <div className="col-xl-12">
                    <div className="card">
                        <Tab.Container defaultActiveKey="All">
                            <div className="card-header border-0">
                                <Nav as="ul" className="order  nav-tabs" id="pills-tab" role="tablist">
                                    <Nav.Item as="li" className=" my-1" role="presentation">
                                        <Nav.Link as="button"  eventKey="All"  type="button" >All Cryptos</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li" className=" my-1" role="presentation">
                                        <Nav.Link as="button"  eventKey="Spot" type="button">Forex</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li" className=" my-1" role="presentation">
                                        <Nav.Link as="button" className="me-0" eventKey="Listing" type="button">Others</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </div>
                            <div className="card-body pt-0">
                              <FutureTable />
                            </div>
                        </Tab.Container>  
                    </div>
                </div>    
        </div>
    )
}

export default ViewTrade