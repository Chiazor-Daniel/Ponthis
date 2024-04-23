/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';

const OrderForm = ({ tradePair, onPriceChange, onAmountChange, onTotalChange,  onSubmit, orderType }) => {
    // Extracting the first and second currencies from the trade pair
    const currency1 = tradePair.substring(0, 3);
    const currency2 = tradePair.substring(3);
    const {main_balance} = useSelector(state=>state.userAccount)

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="sell-blance">
                    <label className="form-label text-primary">Price</label>
                    <div className="form-label blance"><span>BALANCE:</span><p>${main_balance}</p></div>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="0.00" onChange={onPriceChange} />
                        <span className="input-group-text">{currency2}</span> {/* Displaying second currency */}
                    </div>
                </div>
                <div className="sell-blance">
                    <label className="form-label text-primary">Amount</label>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Amount" onChange={onAmountChange} />
                        <span className="input-group-text">{currency1}</span> {/* Displaying first currency */}
                    </div>
                </div>
                <div className="sell-blance">
                    <label className="form-label text-primary">Total</label>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Total" onChange={onTotalChange} />
                        <span className="input-group-text">{currency2}</span> {/* Displaying second currency */}
                    </div>
                </div>
                <div className="slider-wrapper">
                </div>
                <div className="text-center" style={{ marginBottom: "10px" }}>
                    <button type='submit' className="btn btn-primary w-75">{orderType || "Buy"} {currency1}</button> {/* Displaying first currency */}
                </div>
            </form>
        </>
    )
}

export default OrderForm;
