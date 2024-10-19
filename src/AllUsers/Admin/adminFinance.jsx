import React from 'react';
import { useGetPaymentDetailsQuery } from '../../redux-contexts/redux/services/paymentDetails';
import { useSelector } from 'react-redux';
import Finance from './finance'; // Assuming 'Finance' component is imported from the correct location

const AdminFinance = ({ setUserType, superAdmin }) => {
  const { adminToken, adminInfo } = useSelector(state => state.adminAuth);

  return (
    <Finance admin={[adminInfo, adminToken]}/>
  );
};

export default AdminFinance;