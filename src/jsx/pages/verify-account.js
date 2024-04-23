import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import RingLoader from 'react-spinners/RingLoader';
import swal from 'sweetalert';
import axios from 'axios';
import bg6 from '../../images/background/bg6.jpg';

const VerifyEmail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    const [loading, setLoading] = useState(true);

    const handleVerifyEmail = async () => {
        try {
            const response = await axios.get(`https://trader-app.onrender.com/user/verify-and-reset/verify-email/?email_token=${token}`);
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
        setTimeout(()=>{
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
    }, 4000)
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
        }
    }, [token]);

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
