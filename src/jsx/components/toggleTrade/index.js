import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toast notifications

const ToggleTrade = ({ autoTrader, handleAutoTrader }) => {
    const { userInfo, userToken } = useSelector(state => state.auth);
    const [autoTrade, setAutoTrade] = useState(userInfo.can_auto_trade);

    const fetchAutoTrader = () => {
        axios.get("https://trader-app.onrender.com/user/trader/auto-trade/", {
            headers: {
                "x-token": userToken
            }
        })
        .then((response) => {
            console.log(response);
            if (response.data.status === "success") {
                setAutoTrade(!autoTrade);
                if (!autoTrade) {
                    toast.success("🤖 Auto trader activated successfully!", { autoClose: 1000 });
                } else {
                    toast.success("🤖 Auto trader deactivated successfully!", { autoClose: 1000 });
                }
            }
        })
        .catch((err) => {
            console.log(err);
            toast.error("Failed to toggle auto trader. Please try again later.", { autoClose: 1000 });
        });
    };

    return (
        <div style={{ alignItems: "center", gap: "10px", display: "flex", justifyContent: "center" }}>
            <ToastContainer />
            <p style={{ margin: "auto" }}>Enable Auto Trader</p>
            <div className="switch">
                <span>
                    <input
                        type="checkbox"
                        id="toggleInput"
                        checked={autoTrade}
                    />
                    <button className="slider" type="button" onClick={fetchAutoTrader}></button>
                </span>
            </div>
        </div>
    );
};

export default ToggleTrade;
