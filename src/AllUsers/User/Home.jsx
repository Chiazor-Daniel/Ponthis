import React, { useEffect, useState } from 'react';
import { Spinner, Button } from 'react-bootstrap';
import BalanceCardSlider from './dashboard-components/BalanceCardSlider';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useResponsive } from '../../redux-contexts/context/responsive';
import AdminTable from '../../jsx/components/table/FilteringTable/AdminTable';
import { useConvertCryptoMutation, useGetAllUserAssetsQuery, useGetRecoveryTransactionsQuery, useGetUserDepositsQuery } from '../../redux-contexts/redux/services/transactions';
import { useTrade } from '../../customHooks/user/userDashboard/useTrade';
import { SiPayoneer } from "react-icons/si";
import { useGetAllAssetsQuery } from '../../redux-contexts/redux/services/transactions';
import { SiMastercard } from 'react-icons/si';
import { FaCcVisa, FaPaypal } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { useGetUserAssetsQuery } from '../../redux-contexts/redux/services/transactions';
import { MdArrowRightAlt } from "react-icons/md";
import WalletCard from './wallet';
import { CiWallet } from "react-icons/ci";
import { dummyData } from './dummy';
import { IoIosArrowForward } from "react-icons/io";
import { format } from 'date-fns';
import { BeatLoader, SyncLoader } from 'react-spinners';
import { BASE_URL } from '../../api';
import Deposit from './transactions/deposit';
import { GiPayMoney } from "react-icons/gi";
import { FaMoneyBillWheat } from "react-icons/fa6";

import Loan from './loan';

const Home = ({ theme, fetchDataAndDispatch, currency, handleLoan }) => {
  const { userInfo, userToken } = useSelector(state => state.auth);
  const { data: allUserAssets, isLoading: allUserAssetsLoading, refetch: refetchAllUserAssets } = useGetAllUserAssetsQuery(userToken);
  const navigate = useNavigate();
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const { data: userAssets, isLoading: userAssetLoading, refetch: refetchUserAssets, isError } = useGetUserAssetsQuery(userToken);
  const { data: allAssets, isLoading: allAssetsLoading, refetch: refetchAllAssets } = useGetAllAssetsQuery(userToken);
  const { data: userDeposits, isLoading: depositsLoading, refetch: refetchDeposits } = useGetUserDepositsQuery(userToken);
  const [cardType, setCardType] = useState('Visa');
  const [accountNumber, setAccountNumber] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferCurrency, setTransferCurrency] = useState('$');
  const [bS, setBs] = useState([]);
  const [balances, setBalances] = useState({});
  const [refetchTimestamp, setRefetchTimestamp] = useState(Date.now());

  useEffect(() => {
    const fetchBalances = async () => {
      const response = await axios.get(`${BASE_URL}/user/transactions/get-user-assets/`, {
        headers: {
          'x-token': userToken,
        },
      });
      const balancesData = response.data.reduce((acc, asset) => {
        acc[asset.asset_id] = asset.balance;
        return acc;
      }, {});
      setBalances(balancesData);
    };
    fetchBalances();
  }, [userToken, refetchTimestamp]);

  const financial_columns = React.useMemo(
    () => [
      {
        Header: 'Amount',
        accessor: 'amount',
        Cell: ({ value }) => (
          <div className="amount-cell">
            <span className="currency">{currency?.curr}</span>
            <span className="value">{value}</span>
          </div>
        ),
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ value }) => {
          const statusStyles = {
            approved: { backgroundColor: '#e6f4ea', color: '#1e8e3e' },
            pending: { backgroundColor: '#fef7e0', color: '#f9ab00' },
            canceled: { backgroundColor: '#fce8e6', color: '#d93025' },
          };
          const style = statusStyles[value.toLowerCase()] || { backgroundColor: '#f1f3f4', color: '#5f6368' };
          return (
            <div className="status-cell" style={style}>
              <span className="status-dot" style={{ backgroundColor: style.color }}></span>
              <span className="status-text">{value}</span>
            </div>
          );
        },
      },
      {
        Header: 'Created At',
        accessor: 'created_at',
        Cell: ({ value }) => {
          const date = new Date(value);
          return (
            <div className="date-cell">
              <span className="date">{format(date, 'MMM d, yyyy')}</span>
              <span className="time">{format(date, 'h:mm a')}</span>
            </div>
          );
        },
      },
    ],
    [currency]
  );

  const fetchUsdValue = async (asset_symbol, balance) => {
    const currencyCode = currency.curr.toLowerCase();
    const assetSymbol = asset_symbol.toLowerCase();

    const response = await fetch(`https://api.coinconvert.net/convert/${assetSymbol}/${currencyCode}?amount=${balance}`);
    const data = await response.json();

    if (data && data.status === "success" && data[currency.curr]) {
      return parseFloat(data[currency.curr]);
    } else {
      throw new Error(`Conversion failed for ${asset_symbol} to ${currency.curr}`);
    }
  };

  const asset_columns = React.useMemo(
    () => [
      {
        Header: 'Asset',
        accessor: 'name',
        Cell: ({ row }) => {
          const { name, symbol } = row.original;
          const iconUrl = symbol ? `https://static.nexo.com/currencies/${symbol.toUpperCase()}.svg` : `https://static.nexo.com/currencies/BTC.svg`;
          return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <span><img src={iconUrl} alt={symbol} style={{ width: '40px' }} /></span>
              <span>{name?.toUpperCase()} ({symbol?.toUpperCase()})</span>
            </div>
          );
        },
      },
      {
        Header: "Balance",
        accessor: 'balance',
        Cell: ({ row }) => {
          const [balance, setBalance] = React.useState(0);
          const [loading, setLoading] = React.useState(true);
          const balanceRef = React.useRef(null);

          React.useEffect(() => {
            const fetchBalance = async () => {
              try {
                setLoading(true);
                const response = await axios.get(`${BASE_URL}/user/transactions/get-user-assets/`, {
                  headers: {
                    'x-token': userToken,
                  },
                });
                const asset = response.data.find(asset => asset.asset_id === row.original.id);
                const newBalance = asset ? asset.balance : 0;
                setBalance(newBalance);
                balanceRef.current = newBalance;
              } catch (error) {
                console.error(error);
              } finally {
                setLoading(false);
              }
            };
            fetchBalance();
          }, [row.original.id, refetchTimestamp]);

          return (
            <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
              {loading ? <SyncLoader /> : balance.toLocaleString('en-US', { maximumFractionDigits: 2 })}
            </span>
          );
        },
      },
      {
        Header: currency.curr,
        accessor: 'asset_id',
        Cell: ({ row }) => {
          const [usdValue, setUsdValue] = React.useState(0);
          const [loading, setLoading] = React.useState(true);
          const balanceRef = React.useRef(null);

          React.useEffect(() => {
            const fetchUsdValueWithBalance = async () => {
              try {
                setLoading(true);
                const response = await axios.get(`${BASE_URL}/user/transactions/get-user-assets/`, {
                  headers: {
                    'x-token': userToken,
                  },
                });
                const asset = response.data.find(asset => asset.asset_id === row.original.id);
                const currentBalance = asset ? asset.balance : 0;
                balanceRef.current = currentBalance;

                if (currentBalance > 0) {
                  const usdValue = await fetchUsdValue(row.original.symbol, currentBalance);
                  setUsdValue(usdValue);
                } else {
                  setUsdValue(0);
                }
              } catch (error) {
                console.error('Error fetching USD value:', error);
                setUsdValue(0);
              } finally {
                setLoading(false);
              }
            };

            fetchUsdValueWithBalance();
          }, [row.original.symbol, row.original.id, refetchTimestamp]);

          return (
            <div>
              {loading ? (
                <SyncLoader />
              ) : (
                <div style={{ color: 'green', fontWeight: 'bold' }}>
                  {currency.symbol}{usdValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                </div>
              )}
            </div>
          );
        },
      },
      {
        Header: '',
        accessor: 'action',
        Cell: ({ row }) => (
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
            <Button
              style={{
                width: '60%',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                justifyContent: 'center'
              }}
              size="sm"
              onClick={() => navigate(`/dashboard/deposit/${row.original.symbol}`)}
            >
              <span>Deposit</span>
              <MdArrowRightAlt size={20} />
            </Button>
            <div
              style={{
                paddingLeft: '20px',
                paddingRight: '20px',
                background: '#BDE8CA',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}
              onClick={() => navigate(`/dashboard/assets/${row.original.symbol}`)}
            >
              <CiWallet size={30} color='#18A594' />
            </div>
            <div
              style={{
                paddingLeft: '20px',
                paddingRight: '20px',
                background: '',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            
            >
            <FaMoneyBillWheat size={30} color='#18A594' />
            </div>
          </div>
        ),
      }
    ],
    [currency, refetchTimestamp, userToken, navigate]
  );

  const handleAction = async () => {
    try {
      const results = await Promise.all([
        refetchAllAssets(),
        refetchAllUserAssets(),
        refetchUserAssets()
      ]);

      const allSuccessful = results.every(result => !result.error);

      if (allSuccessful) {
        setRefetchTimestamp(Date.now());
      }
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  };

  const handleTransfer = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="row" style={{ height: '', overflow: "hidden" }}>
        {/* <img
          src='/loan.png'
          style={{
            position: "absolute",
            zIndex: 9,
            width: '200px',
            right: '-72px',
            cursor: 'pointer',
            top: '250px',
            filter: 'drop-shadow(10px 10px 15px rgba(0, 0, 0, 0.4))',
            opacity: 0.7,
            transition: 'right 0.3s ease, opacity 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.right = '-35px';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0.7';
            e.currentTarget.style.right = '-50px';
          }}
          onClick={() => {
            handleLoan(true)
          }}
        /> */}

        <div className="col-12 col-xl-8" style={{ overflow: 'hidden' }}>
          <div className="row">
            <div className="col-12">
              <div className='row'>
                <div className='col-12'>
                  {
                    userAssets ? (
                      <BalanceCardSlider userAssets={userAssets} currency={currency} />
                    ) : (
                      <BalanceCardSlider userAssets={[]} currency={currency} />
                    )
                  }
                </div>
              </div>
              <div className='' style={{ height: isMobile ? 'auto' : '465px' }}>
                {
                  (!Array.isArray(allAssets) && !(allAssets)) ? (
                    <div
                      className=''
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        fontSize: '18px',
                        color: '#666',
                        fontWeight: 'bold',
                        padding: '20px',
                        borderRadius: '10px',
                        backgroundColor: '#2a2a2a',
                      }}
                    >
                      <p style={{ margin: 0 }}>No assets available</p>
                    </div>
                  ) : (
                    <AdminTable columns={asset_columns} data={allAssets.slice(0, 5)} pag={true} />
                  )
                }
              </div>
            </div>
          </div>
        </div>
        {
          isMobile ? (
            <div style={{ padding: isMobile ? '20px' : '' }}>
              <WalletCard
                userToken={userToken}
                refetchUserAssets={refetchUserAssets}
                currency={currency}
                refetchAllAssets={refetchAllAssets}
                handleAction={handleAction}
              />

            </div>
          ) : (
            <WalletCard
              userToken={userToken}
              refetchUserAssets={refetchUserAssets}
              currency={currency}
              refetchAllAssets={refetchAllAssets}
              handleAction={handleAction}
            />
          )
        }
      </div>
      <Deposit />
    </>
  );
};

export default Home;