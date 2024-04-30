import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toast notifications
import Swal from "sweetalert2"; // Import SweetAlert
import Spinner from 'react-bootstrap/Spinner'; // Import Bootstrap spinner
import { BASE_URL } from "../../../api";
const ToggleTrade = ({ autoTrader, handleAutoTrader }) => {
    const { userInfo, userToken } = useSelector(state => state.auth);
    const [autoTrade, setAutoTrade] = useState(userInfo.can_auto_trade);
    const [loading, setLoading] = useState(false); // State to manage loading indicator

    const handleToggleAutoTrade = () => {
        // Trigger SweetAlert confirmation dialog
        Swal.fire({
            title: autoTrade ? "Deactivate Auto Trader?" : "Activate Auto Trader?",
            text: autoTrade ? "Are you sure you want to deactivate auto trader?" : "Are you sure you want to activate auto trader?",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            showLoaderOnConfirm: true, // Show loading spinner on confirm button
            preConfirm: () => {
                // Set loading state to true
                setLoading(true);
                // Call fetchAutoTrader after user confirms
                fetchAutoTrader();
            }
        });
    };

    const fetchAutoTrader = () => {
        axios.get( `${BASE_URL}/user/trader/auto-trade/`, {
            headers: {
                "x-token": userToken
            }
        })
        .then((response) => {
            console.log(response);
            if (response.data.status === "success") {
                setAutoTrade(!autoTrade);
                toast.success("🤖 Auto trader activated successfully!", { autoClose: 1000 });
                // Show SweetAlert success notification
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text:  autoTrade ? 'Auto trader activated successfully!': "Auto trader deactivated successfully!"
                });
            } else {
                // Show SweetAlert error notification
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Please try again later.',
                });
            }
            
        })
        .catch((err) => {
            console.log(err);
            toast.error("Please try again later.", { autoClose: 1000 });
        })
        .finally(() => {
            // Set loading state to false after request completes
            setLoading(false);
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
                    <button className="slider" type="button" onClick={handleToggleAutoTrade} disabled={loading}>
                        {loading ? <Spinner animation="border" size="sm" /> : ""}
                    </button>
                </span>
            </div>
        </div>
    );
};

export default ToggleTrade;
