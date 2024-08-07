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
// import { useGetAllAssetsQuery } from '../../redux-contexts/redux/services/transactions';
import WalletCard from './wallet';
import { CiWallet } from "react-icons/ci";
import { dummyData } from './dummy';
import { IoIosArrowForward } from "react-icons/io";
import { format } from 'date-fns';
import { BeatLoader } from 'react-spinners';
import { BASE_URL } from '../../api';

const Home = ({ theme, fetchDataAndDispatch, currency }) => {
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
  const [balances, setBalances] = useState({});
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
      console.log(balancesData)
    };
    fetchBalances();
  }, [userToken]);


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
    []
  );
  const fetchUsdValue = async (asset_symbol, balance) => {
    let symbol;
    if (currency.curr === 'USD') {
      symbol = `${asset_symbol.toUpperCase()}USDT`;
    } else if (currency.curr === 'EUR') {
      symbol = `${asset_symbol.toUpperCase()}EUR`;
    } else if (currency.curr === 'GBP') {
      symbol = `${asset_symbol.toUpperCase()}GBP`;
    } else {
      throw new Error(`Unsupported currency: ${currency.curr}`);
    }

    const response = await fetch(`https://api.binance.com/api/v3/avgPrice?symbol=${symbol}`);
    const data = await response.json();
    return parseFloat(data.price) * parseFloat(balance);
  };
  const asset_columns = React.useMemo(
    () => [
      {
        Header: 'Asset',
        accessor: 'name',
        Cell: ({ row }) => {
          const { name, symbol } = row.original;
          const iconUrl = symbol ? `https://static.nexo.com/currencies/${symbol.toUpperCase()}.svg` : `https://static.nexo.com/currencies/BTC.svg`
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
                setBalance(asset ? asset.balance : 0);
              } catch (error) {
                console.error(error);
              } finally {
                setLoading(false);
              }
            };
            fetchBalance();
          }, [row.original.id, refetchAllAssets, refetchAllUserAssets]);
      
          return (
            <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
              {loading ? 'Loading...' : balance.toLocaleString('en-US', { maximumFractionDigits: 2 })}
            </span>
          );
        },
      },
      {
  Header: currency.curr,
  accessor: 'asset_id',
  Cell: ({ row }) => {
    const assetId = row.original.id;
    const balance = balances[assetId] || 0;
    const [usdValue, setUsdValue] = React.useState(0);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      const intervalId = setInterval(() => {
        if (balance !== 0) {
          fetchUsdValue(row.original.symbol, balance).then((value) => {
            setUsdValue(value);
            setLoading(false);
          });
          clearInterval(intervalId);
        }
      }, 1000); // Try every 1 second

      return () => clearInterval(intervalId);
    }, [row.original.symbol, balance]);

    return (
      <div>
        <div style={{ color: '#1A5319', fontWeight: 'bold' }}>
          {loading ? <BeatLoader /> : usdValue ? `${currency.symbol}${usdValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}` : `${currency.symbol}0.00`}
        </div>
      </div>
    );
  },
},
      {
        Header: '',
        accessor: 'action',
        Cell: ({ row }) => (
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
            <Button style={{ width: '60%', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }} size="sm" onClick={() => navigate(`/dashboard/deposit/${row.original.symbol}`)}>
              <span>Deposit</span>
              <MdArrowRightAlt size={20} />
            </Button>
            <div style={{ paddingLeft: '20px', paddingRight: '20px', background: '#FFAAAA', borderRadius: '10px', display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate(`/dashboard/assets/${row.original.symbol}`)}>
              <CiWallet size={30} color='#c6164f'/>
            </div>
          </div>
        ),
      },
    ],
    []
  );
  const handleTransfer = (e) => {
    e.preventDefault();
    // Handle the transfer logic here
    console.log('Transfer:', { cardType, accountNumber, transferAmount, transferCurrency });
    // You can add your transfer logic or API call here
  };

    return (
        <>
          <div className="row" style={{ height: '', overflow: "hidden" }}>
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
                    {/* <div className='col-1' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <div className='card' style={{ margin: '', cursor: 'pointer', padding: '10px', borderRadius: '100%', height: '50px', width: '50px' }}>
                        <IoIosArrowForward size={30} />
                      </div>
                    </div> */}
                  </div>
                  <div className='' style={{ height: isMobile ? 'auto' : '465px' }}>
                    {
                      !Array.isArray(allAssets) ? (
                        <div
                          className='card'
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
                            // backgroundColor: '#f0f0f0',
                          }}
                        >
                          <p style={{ margin: 0 }}>No assets available</p>
                        </div>
                      ) : (
                        <>
                          <AdminTable columns={asset_columns} data={allAssets.slice(0, 5)} pag={true} />
                        </>
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
            <WalletCard userToken={userToken} refetchUserAssets={refetchUserAssets} currency={currency} refetchAllAssets={refetchAllAssets}/>
          </div>
          {
            Array.isArray(userDeposits) && (
              <>
                <AdminTable columns={financial_columns} data={userDeposits?.slice(0, 8)} search={true} />
              </>
            )
          }
        </>
    );
  // }
};

export default Home;
