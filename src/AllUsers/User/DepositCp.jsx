import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import MyCryptoChart from './dashboard-components/mycp';
import { CiWallet } from 'react-icons/ci';
import AdminTable from '../../jsx/components/table/FilteringTable/AdminTable';
import CryptoPurchaseComponent from './assetform';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetAllAssetsQuery, useGetAllUserAssetsQuery } from '../../redux-contexts/redux/services/transactions';
import { useParams } from 'react-router-dom';
import { MdArrowRightAlt } from 'react-icons/md';
import { useResponsive } from '../../redux-contexts/context/responsive';
import { BeatLoader } from 'react-spinners';

const DepositCp = ({ currency }) => {
  const { isMobile } = useResponsive()
  const { userInfo, userToken } = useSelector(state => state.auth);
  const { asset } = useParams();
  const navigate = useNavigate()
  const { data: allAssets, isLoading: allAssetsLoading, refetch: refetchAllAssets } = useGetAllAssetsQuery(userToken);
  const { data: allUserAssets, isLoading: allUserAssetsLoading, refetch: refetchAllUserAssets } = useGetAllUserAssetsQuery(userToken);
  const [cryptoPair, setCryptoPair] = useState(asset || (Array.isArray(allUserAssets) ? allUserAssets[0]?.asset_symbol : '') || 'BTC');
  const [refetchTimestamp, setRefetchTimestamp] = useState(Date.now());

  const handleAction = async () => {
    try {
      const results = await Promise.all([
        refetchAllAssets(),
        refetchAllUserAssets()
      ]);
      
      const allSuccessful = results.every(result => !result.error);
      
      if (allSuccessful) {
        setRefetchTimestamp(Date.now());
      }
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  };

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
            const assetId = row.original.id;
            const userAsset = Array.isArray(allUserAssets) && allUserAssets.find(asset => asset.asset_id === assetId);
            setBalance(userAsset ? userAsset.balance : 0);
            setLoading(false);
          }, [row.original.id, allUserAssets, refetchTimestamp]);

          return (
            <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
              {loading ? <Spinner /> : balance.toLocaleString('en-US', { maximumFractionDigits: 2 })}
            </span>
          );
        }
      },
      {
        Header: currency.curr,
        accessor: 'asset_id',
        Cell: ({ row }) => {
          const [usdValue, setUsdValue] = React.useState(0);
          const [loading, setLoading] = React.useState(true);

          React.useEffect(() => {
            const fetchUsdValueEffect = async () => {
              try {
                setLoading(true);
                const assetId = row.original.id;
                const userAsset = Array.isArray(allUserAssets) && allUserAssets.find(asset => asset.asset_id === assetId);
                const balance = userAsset ? userAsset.balance : 0;

                if (balance > 0) {
                  const value = await fetchUsdValue(row.original.symbol, balance);
                  setUsdValue(value);
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

            fetchUsdValueEffect();
          }, [row.original.symbol, allUserAssets, refetchTimestamp]);

          return (
            <div>
              {loading ? (
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
          </div>
        ),
      },
    ],
    [navigate, allUserAssets, currency, refetchTimestamp]
  );

  return (
    <Container fluid>
      <Row style={{ height: isMobile ? 'auto' : '500px', marginBottom: '20px' }}>
        <Col md={4}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src='/value.png' style={{ width: '100px', margin: 'auto' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CryptoPurchaseComponent 
              currency={currency} 
              asset={asset} 
              userToken={userToken} 
              onAssetSelect={(sym) => setCryptoPair(sym?.toUpperCase())}
              handleAction={handleAction}
            />
          </div>
        </Col>
        <Col md={8}>
          <Card style={{ padding: '10px', overflow: 'hidden', height: isMobile ? '400px' : '', backgroundColor: '#272B2F', marginTop: isMobile ? '20px' : '' }}>
            <MyCryptoChart cryptoPair={cryptoPair} currency={currency} />
          </Card>
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
                }}
              >
                <p style={{ margin: 0 }}>No assets available</p>
              </div>
            ) : (
              <AdminTable columns={asset_columns} data={allAssets?.slice(0, 5)} pag={true} />
            )
          }
        </div>
      </Row>
    </Container>
  );
};

export default DepositCp;