import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup, Dropdown, DropdownButton, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';
import { BASE_URL } from '../../api';
import { useGetAllAssetsQuery, useGetAllUserAssetsQuery } from '../../redux-contexts/redux/services/transactions';
import { FaBitcoin } from 'react-icons/fa'; 

const CryptoPurchaseComponent = ({ userToken, onAssetSelect, asset, refetchUserAssets, currency, refetchAllAssets }) => {
  const [coin, setCoin] = useState('');
  const [amount, setAmount] = useState('');
  const { data, isLoading } = useGetAllUserAssetsQuery(userToken);
  const [equivalent, setEquivalent] = useState('');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imgError, setImgError] = useState(false); 

  useEffect(() => {
    if (asset) {
      setCoin(asset);
    }
  }, [asset]);
  
  useEffect(() => {
    if (amount && selectedAsset?.asset_symbol && currency?.curr) {
      fetchEquivalent(selectedAsset.asset_symbol, currency.curr);
    }
  }, [amount, selectedAsset, currency]);
  
  const fetchEquivalent = async (assetSymbol, currencySymbol = currency.curr) => {
    try {
      setLoading(true);
      let symbol;
      if (currencySymbol === 'USD') {
        symbol = `${assetSymbol.toUpperCase()}USDT`;
      } else if (currencySymbol === 'EUR') {
        symbol = `${assetSymbol.toUpperCase()}EUR`;
      } else if (currencySymbol === 'GBP') {
        symbol = `${assetSymbol.toUpperCase()}GBP`;
      } else {
        throw new Error(`Unsupported currency: ${currencySymbol}`);
      }
  
      const response = await fetch(`https://api.binance.com/api/v3/avgPrice?symbol=${symbol}`);
      const data = await response.json();
      const price = parseFloat(data.price);
      if (amount) {
        setEquivalent((amount * price).toFixed(2));
      } else {
        setEquivalent('0.00');
      }
    } catch (error) {
      console.error('Error fetching equivalent:', error);
      setEquivalent('');
    } finally {
      setLoading(false);
    }
  };

  const handleAssetSelect = (asset) => {
    setSelectedAsset(asset);
    setCoin(asset.asset_symbol);
    onAssetSelect(asset.asset_symbol)
    if (asset && currency?.curr) {
      fetchEquivalent(asset.asset_symbol, currency.curr); 
    }
    setImgError(false); 
  };

  const handleConvert = async () => {
    if (!selectedAsset) {
      Swal.fire({
        title: 'Error',
        text: 'Please select an asset to convert.',
        icon: 'error',
        customClass: 'card'
      });
      return;
    }
  
    if (!amount) {
      Swal.fire({
        title: 'Error',
        text: 'Please enter an amount to convert.',
        icon: 'error',
        customClass: 'card'
      });
      return;
    }
  
    try {
      setLoading(true);
  
      const response = await axios.post(`${BASE_URL}/user/transactions/convert-crypto-to-fiat/`, null, {
        headers: {
          'x-token': userToken
        },
        params: {
          amount,
          asset_id: selectedAsset.asset_id
        }
      });
  
      const responseData = response.data;
      console.log(responseData)
  
      if (responseData.status === 'success') {
        refetchUserAssets && refetchUserAssets()
        refetchAllAssets && refetchAllAssets()
        Swal.fire({
          title: 'Success',
          text: responseData.message,
          icon: 'success',
          customClass: 'card'
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Conversion failed: ' + responseData.message,
          icon: 'error',
          customClass: 'card'
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.response?.data?.message || 'Conversion failed.',
        icon: 'error',
        customClass: 'card'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = () => {
    setImgError(true);
  };

  return (
    <div className='col-9 mt-4'>
      <div style={{ padding: '5px', background: 'black', width: '100px', borderRadius: '50px', color: 'white', textAlign: 'center' }}>
        Exchange
      </div>
      <Form.Group className="mb-3 mt-2">
        <span style={{ textAlign: 'right', width: '100%' }}>Asset:</span>
        <InputGroup>
          {imgError ? (
            <img src='/coin.png' style={{ marginRight: '10px', width: '30px', fontSize: '1.5rem' }} alt="Default coin" />
          ) : (
            <img
              src={coin ? `https://static.nexo.com/currencies/${coin.toLocaleUpperCase()}.svg` : '/coin.png'}
              alt={coin || "Coin"}
              style={{ marginRight: '10px', height: '24px', width: '24px' }}
              onError={handleImageError}
            />
          )}
          <Form.Control value={coin?.toUpperCase()} readOnly style={{ background: '#D6EFD8', fontWeight: 'bold', fontSize: '1.2rem' }} />
          <DropdownButton title="" id="input-group-dropdown-1">
            {!isLoading && Array.isArray(data) && data.map(asset => (
              <Dropdown.Item key={asset.id} onClick={() => handleAssetSelect(asset)}>
                {asset.asset_name} {`(${asset.asset_symbol?.toLocaleUpperCase()})`}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </InputGroup>
      </Form.Group>
      
      <div className='row mb-3'>
        <Form.Group className="col-4">
          <span>Amount:</span>
          <InputGroup>
            <Form.Control
              value={amount}
              style={{ background: '#D6EFD8', fontWeight: 'bold', fontSize: '1.2rem', textAlign: 'right' }}
              onChange={(e) => setAmount(e.target.value)}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group className="col-8">
          <span>{currency?.curr}</span>
          <InputGroup>
            <Form.Control
              value={loading ? '' : `${currency?.curr} ${equivalent}`}
              readOnly
              style={{ background: '#D6EFD8', fontWeight: 'bold', fontSize: '1.2rem', textAlign: 'right', color: '#1A5319' }}
              placeholder={loading ? '' : '0.00'}
            />
            {loading && (
              <InputGroup.Text style={{ background: '#D6EFD8', border: 'none' }}>
                <Spinner animation="border" size="sm" />
              </InputGroup.Text>
            )}
          </InputGroup>
        </Form.Group>
      </div>

      <Button style={{ width: '100%', background: 'black ' }} onClick={handleConvert}>
        Convert
      </Button>
    </div>
  );
};

export default CryptoPurchaseComponent;