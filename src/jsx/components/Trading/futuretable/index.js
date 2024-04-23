/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { RiAdminFill } from 'react-icons/ri';
import { useGetAllTradesQuery } from '../../../../redux/services/trades'; // Import the query hook
import { useSelector } from 'react-redux';
import swal from 'sweetalert';
import axios from 'axios';
const FutureTable = () => {
  const { userToken } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10); // Set page size to 10
  const { data: trades = [], isFetching, refetch } = useGetAllTradesQuery(userToken); // Fetch trades data using the query hook
  const [updatedTrades, setUpdatedTrades] = useState(trades[1]?.data); // Define state for updated trades

  // Update profit continuously
  useEffect(() => {
    const getRandomInterval = () => {
      // Generate a random interval between 5 and 30 seconds (in milliseconds)
      return Math.floor(Math.random() * (30000 - 5000 + 1)) + 5000; // Random number between 5000 and 30000
    };

    const updateProfit = (profit) => {
      const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };
      let output = 0;
      if (profit) {
        output = getRandomInt(-1, profit);
      }
      return output;
    };

    const updateProfitContinuously = () => {
      const updatedDummyData = updatedTrades?.map(trade => {
        const updatedProfit = updateProfit(trade.profit);
        return { ...trade, profit: updatedProfit };
      });
      setUpdatedTrades(updatedDummyData);
    };

    if (trades && trades.length > 0) {
      const intervalId = setInterval(updateProfitContinuously, getRandomInterval());

      return () => clearInterval(intervalId);
    }
  }, [trades, updatedTrades]); // Include trades and updatedTrades in the dependency array


  const handleChangePage = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    if (trades) {
      setUpdatedTrades(trades[1]?.data);
    }
  }, [trades]);
  
  const handleCloseTrade = async (tradeId) => {
    try {
      // Prompt user for confirmation using SweetAlert
      tradeId = parseInt(tradeId)
      const confirmed = await swal({
        title: 'Confirm',
        text: 'Are you sure you want to close this trade?',
        icon: 'warning',
        buttons: ['Cancel', 'Close Trade'],
        dangerMode: true,
      });

      // If user confirms, proceed to close the trade
      if (confirmed) {
        // Make a POST request to close the trade
        console.log(tradeId)
        const response = await axios.post(`https://trader-app.onrender.com/user/trader/close-trade/${tradeId}`, null, {
          headers: {
            'Content-Type': 'application/json',
            'x-token': userToken,
          },
        });

        // Check if the request was successful
        if (response) {
          console.log(response)
          // Refetch the trades data to update the table
          refetch();
          // Show success message using SweetAlert
          swal('Success', 'Trade closed successfully!', 'success');
        } else {
          // Show error message using SweetAlert
          swal('Error', response.data.message || 'Failed to close the trade. Please try again later.', 'error');
        }
      }
    } catch (error) {
      console.error('Error closing trade:', error);
      // Show error message using SweetAlert
      swal('Error', 'Failed to close the trade. Please try again later.', 'error');
    }
  };



  if (trades)
    return (
      <>
        <div className="table-responsive dataTablemarket">
          <div id="future_wrapper" className="dataTables_wrapper no-footer">
            <table className="table dataTable shadow-hover display" style={{ minWidth: '845px' }}>
              <thead>
                <tr>
                  <th>Asset Pair</th>
                  <th className="text-center">Transaction Type</th>
                  <th className="text-center">Amount</th>
                  <th className="text-center">Profit</th>
                  <th className="text-center">Created By</th>
                  <th className="text-center">Created At</th>
                  <th className="text-end">Status</th>
                  <th className="text-end"></th>
                </tr>
              </thead>
              <tbody>
                {updatedTrades?.slice(currentPage * pageSize, (currentPage + 1) * pageSize).map((trade, index) => (
                  <tr key={index}>
                    <td>
                      <Link to={'#'} className="market-title d-flex align-items-center">
                        <h5 className="mb-0 ms-2"> {trade.asset_pair_type?.substring(0, 3)}</h5>
                        <span className="text-muted ms-2"> {trade.asset_pair_type?.substring(3)}</span>
                      </Link>
                    </td>
                    <td>{trade.trade_type}</td>
                    <td>${trade.amount}</td>
                    <td className={`${trade.profit >= 0 ? 'text-success' : 'text-danger'}`}>{trade.profit}%</td>
                    <td style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
                      {trade.created_by === 'auto-trader' ? <FaUserCircle /> : <RiAdminFill />}
                      <span>{trade.created_by}</span>
                    </td>
                    <td>{new Date(trade.created_at).toLocaleString()}</td>
                    <td className="text-end">{trade.status}</td>
                    <td className="text-end">
                      {trade.status === 'open' ? (
                        <button
                          onClick={() => handleCloseTrade(trade.id)} // Pass a function reference
                          style={{ background: 'red', border: 'none', padding: '10px', color: 'white', borderRadius: '10px', cursor: 'pointer' }}
                        >
                          Close Trade
                        </button>
                      ) : (
                        <button
                          disabled={true}
                          style={{ background: 'red', border: 'none', padding: '10px', color: 'white', borderRadius: '10px', cursor: 'not-allowed', opacity: 0.5 }}
                        >
                          Close Trade
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            <div className="d-flex justify-content-center mt-3">
              <nav>
                <ul className="pagination">
                  {Array.from({ length: Math.ceil(updatedTrades?.length / pageSize) }, (_, index) => (
                    <li key={index} className={`page-item ${currentPage === index ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => handleChangePage(index)}>
                        {index + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </>
    );
};

export default FutureTable;
