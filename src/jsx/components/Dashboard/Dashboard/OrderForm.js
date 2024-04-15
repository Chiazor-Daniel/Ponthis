import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactSlider from 'react-slider';
import Nouislider from "nouislider-react";

const OrderForm = ({ tradePair }) => {
    // Extracting the first and second currencies from the trade pair
    const currency1 = tradePair.substring(0, 3);
    const currency2 = tradePair.substring(3);

    return (
        <>
            <form>
                <div className="sell-blance">
                    <label className="form-label text-primary">Price</label>
                    <div className="form-label blance"><span>BALANCE:</span><p>$0.00</p></div>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="0.00" />
                        <span className="input-group-text">{currency2}</span> {/* Displaying second currency */}
                    </div>
                </div>
                <div className="sell-blance">
                    <label className="form-label text-primary">Amount</label>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Amount" />
                        <span className="input-group-text">{currency1}</span> {/* Displaying first currency */}
                    </div>
                </div>
                <div className="sell-blance">
                    <label className="form-label text-primary">Total</label>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Total" />
                        <span className="input-group-text">{currency2}</span> {/* Displaying second currency */}
                    </div>
                </div>
                <div className="slider-wrapper">
                </div>
                <div className="text-center" style={{ marginBottom: "10px" }}>
                    <Link to={"/exchange"} className="btn btn-primary w-75">BUY {currency1}</Link> {/* Displaying first currency */}
                </div>
            </form>
        </>
    )
}

export default OrderForm;
