import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { RiAdminFill } from 'react-icons/ri';
import { useGetAllTradesQuery } from '../../../../redux/services/trades';
import { useSelector } from 'react-redux';
import robo from '../../../../images/robot.png';

const FutureTable = () => {
  const { userToken } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10); // Set page size to 10
  const { data: trades = [], isFetching } = useGetAllTradesQuery(userToken);
  const paginatedTrades = trades[1]?.data || [];

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

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
              {paginatedTrades.slice(currentPage * pageSize, (currentPage + 1) * pageSize).map((trade, index) => (
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
                {Array.from({ length: Math.ceil(paginatedTrades.length / pageSize) }, (_, index) => (
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
