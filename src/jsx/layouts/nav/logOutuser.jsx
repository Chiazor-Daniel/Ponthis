import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux-contexts/redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { adminLogout } from '../../../redux-contexts/redux/features/auth/admin-authSlice';
import Swal from 'sweetalert2';

function LogoutPage() {
  const { userToken } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleLogout = () => {
      Swal.fire({
        title: 'Are you sure you want to logout?',
        text: 'You will be logged out of your account',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, logout',
        cancelButtonText: 'Go Back'
      }).then((result) => {
        if (result.isConfirmed) {
          if(userToken?.userType === "user"){
            dispatch(logout());
            sessionStorage.removeItem('userInfo');
            sessionStorage.removeItem('token');
          }
          if(userToken?.userType === "admin"){
            dispatch(adminLogout());
            sessionStorage.removeItem('adminInfo');
            sessionStorage.removeItem('adminToken');
          }
          navigate("/");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          navigate(-1); // Go back to previous page
        }
      });
    };
    handleLogout();
  }, [userToken, navigate, dispatch]);

  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  );
}

export default LogoutPage;