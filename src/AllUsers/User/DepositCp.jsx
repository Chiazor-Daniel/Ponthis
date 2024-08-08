import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import MyCryptoChart from './dashboard-components/mycp';
import { CiWallet } from 'react-icons/ci';
import AdminTable from '../../jsx/components/table/FilteringTable/AdminTable';
import CryptoPurchaseComponent from './assetform';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useGetAllAssetsQuery, useGetAllUserAssetsQuery } from '../../redux-contexts/redux/services/transactions';
import { useParams } from 'react-router-dom'; // Import useParams hook
import { MdArrowRightAlt } from 'react-icons/md';
import { useResponsive } from '../../redux-contexts/context/responsive';
import { BeatLoader } from 'react-spinners';

const DepositCp = ({ currency }) => {
  const { isMobile } = useResponsive()
  const { userInfo, userToken } = useSelector(state => state.auth);
  const { asset } = useParams(); // Get asset from URL parameters
  const navigate = useNavigate()
  const { data: allAssets, isLoading: allAssetsLoading, refetch: allUserAssetsRefetch } = useGetAllAssetsQuery(userToken);
  const { data: allUserAssets, isLoading: allUserAssetsLoading, refetch: allAssetsRefetch } = useGetAllUserAssetsQuery(userToken);
  const [cryptoPair, setCryptoPair] = useState(asset || (Array.isArray(allUserAssets) ? allUserAssets[0]?.asset_symbol : '') || 'BTC');


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
          const assetId = row.original.id;
          const balance = Array.isArray(allUserAssets) && allUserAssets.find(asset => asset.asset_id === assetId)?.balance;
          return (
            <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{balance ? balance.toLocaleString('en-US', { maximumFractionDigits: 2 }) : <Spinner />}</span>
          )
        }
      },
      {
        Header: currency.curr,
        accessor: 'asset_id',
        Cell: ({ row }) => {
          const assetId = row.original.id;
          const balance = Array.isArray(allUserAssets) && allUserAssets.find(asset => asset.asset_id === assetId)?.balance || 0;
          const [usdValue, setUsdValue] = React.useState(0);
          const [loading, setLoading] = React.useState(true);
      
          React.useEffect(() => {
            const timer = setTimeout(() => {
              setLoading(false);
            }, 5000);
      
            fetchUsdValue(row.original.symbol, balance).then((value) => {
              setUsdValue(value);
              setLoading(false);
            });
      
            return () => clearTimeout(timer);
          }, [row.original.symbol, balance]);
      
          return (
            <div>
              {loading || usdValue === 0 ? (
                <BeatLoader />
              ) : (
                <div style={{ color: '#1A5319', fontWeight: 'bold' }}>
                  {currency.symbol}{usdValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                </div>
              )}
            </div>
          );
        },
      },
      // {
      //   Header: 'Wallet Address',
      //   accessor: 'wallet_address',
      //   Cell: ({ row }) => {
      //     const walletAddress = row.original.wallet_address;
      //     const shortenedWalletAddress = walletAddress.length > 20 ? `${walletAddress?.slice(0, 6)}...${walletAddress?.slice(-4)}` : walletAddress;

      //     return (
      //       <div>
      //         <div style={{ color: '#666' }}>{shortenedWalletAddress}</div>
      //       </div>
      //     );
      //   },
      // },
      {
        Header: '',
        accessor: 'action',
        Cell: ({ row }) => (
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
            <Button style={{ width: '60%', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }} size="sm" onClick={() => navigate(`/dashboard/deposit/${row.original.symbol}`)}>
              <span>Deposit</span>
              <MdArrowRightAlt size={20} />
            </Button>
            {/* <div style={{ paddingLeft: '20px', paddingRight: '20px', background: '#D6EFD8', display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate(`/dashboard/assets/${row.original.symbol}`)}>
              <CiWallet size={30} />
            </div> */}
          </div>
        ),
      },
    ],
    [navigate]
  );
  return (
    <Container fluid>
      <Row style={{ height: isMobile ? 'auto' : '500px', marginBottom: '20px' }}>
        <Col md={8}>
          <Card style={{ padding: '20px', overflow: 'hidden', height: isMobile ? '400px' : '' }}>
            <MyCryptoChart cryptoPair={cryptoPair} currency={currency} /> {/* Pass currentCryptoPair to MyCryptoChart */}
          </Card>
        </Col>
        <Col md={4}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src='/value.png' style={{ width: '100px', margin: 'auto' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CryptoPurchaseComponent currency={currency} asset={asset} userToken={userToken} onAssetSelect={(sym) => setCryptoPair(sym?.toUpperCase())} /> {/* Pass setCryptoPair */}
          </div>
        </Col>
      </Row>
      <Row>
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
                <AdminTable columns={asset_columns} data={allAssets?.slice(0, 5)} pag={true} />
              </>
            )
          }
        </div>
      </Row>
    </Container>
  );
};

export default DepositCp;
