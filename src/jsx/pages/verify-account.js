/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import RingLoader from 'react-spinners/RingLoader';
import swal from 'sweetalert';
import { BASE_URL } from '../../api';
import axios from 'axios';
import bg6 from '../../images/background/bg6.jpg';

const VerifyEmail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    let token = searchParams.get('token');

    // Check if token is present in URL params, if not, extract from the URL
    if (!token) {
        const url = location.pathname + location.search; // Get the full URL including path and search params
        token = url.split('?')[1]; // Split the URL by "?" and take the second part
    }

    const [loading, setLoading] = useState(true);

    const handleVerifyEmail = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/user/verify-and-reset/verify-email/?email_token=${token}`);
            console.log(response)
            if (response.data.status === "success") {
                showSuccessModal();
            } else {
                showFailureModal();
            }
        } catch (error) {
            console.error("Error verifying email:", error);
            showFailureModal();
        }
    };

    const showSuccessModal = () => {
        setTimeout(() => {
            swal({
                title: "Email Verified",
                text: "Email verified successfully.",
                icon: "success",
                button: false,
            });

            setTimeout(() => {
                swal.close(); // Close the modal
                navigate("/");
            }, 2000);
        }, 4000);
    };

    const showFailureModal = () => {
        setLoading(false);
        swal({
            title: "Verification Failed",
            text: "Email verification failed. Please try again.",
            icon: "error",
            buttons: ["Retry", "Cancel"],
        }).then((value) => {
            if (value) {
                handleRetry();
            } else {
                navigate("/");
            }
        });
    };

    const handleRetry = () => {
        setLoading(true);
        handleVerifyEmail();
    };

    useEffect(() => {
        if (token) {
            handleVerifyEmail();
        } else {
            // If token is not found, handle it here (for example, show an error message or redirect)
            console.error("Token not found in URL parameters");
            navigate("/error");
        }
    }, [token, navigate]);

    return (
        <>
            <div className="browse-job login-style3">
                <div className="bg-img-fix overflow-hidden" style={{ background: '#fff url(' + bg6 + ')', height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <RingLoader color="#36d7b7" size={100} loading={loading} />
                </div>
            </div>
        </>
    );
};

export default VerifyEmail;
