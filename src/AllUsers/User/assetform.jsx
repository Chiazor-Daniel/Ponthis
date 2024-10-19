import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup, Dropdown, DropdownButton, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';
import { BASE_URL } from '../../api';
import { useGetAllAssetsQuery, useGetAllUserAssetsQuery } from '../../redux-contexts/redux/services/transactions';

const CryptoPurchaseComponent = ({ 
  userToken, 
  onAssetSelect = () => {}, // Make optional with default empty function
  asset, 
  refetchUserAssets, 
  currency, 
  refetchAllAssets, 
  onBalanceUpdate = () => {}, // Make optional with default empty function
  handleAction 
}) => {
  const [coin, setCoin] = useState('');
  const [amount, setAmount] = useState('');
  const { data, isLoading } = useGetAllUserAssetsQuery(userToken);
  const [equivalent, setEquivalent] = useState('');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [conversionLoading, setConversionLoading] = useState(false);

  useEffect(() => {
    if (asset) {
      setCoin(asset);
      // Find and set the selected asset when asset prop changes
      if (data && Array.isArray(data)) {
        const foundAsset = data.find(a => a.asset_symbol?.toLowerCase() === asset?.toLowerCase());
        if (foundAsset) {
          setSelectedAsset(foundAsset);
        }
      }
    }
  }, [asset, data]);
  
  useEffect(() => {
    const fetchEquivalentDebounced = setTimeout(() => {
      if (amount && selectedAsset?.asset_symbol && currency?.curr) {
        fetchEquivalent(selectedAsset.asset_symbol, currency.curr);
      }
    }, 500); // Add debounce

    return () => clearTimeout(fetchEquivalentDebounced);
  }, [amount, selectedAsset, currency]);
  
  const fetchEquivalent = async (assetSymbol, currencySymbol = currency?.curr) => {
    if (!assetSymbol || !currencySymbol) return;

    try {
      setLoading(true);
      const response = await fetch(
        `https://api.coinconvert.net/convert/${assetSymbol.toLowerCase()}/${currencySymbol.toLowerCase()}?amount=1`
      );
      const data = await response.json();
  
      if (data.status !== 'success') {
        throw new Error(`Failed to retrieve price for ${assetSymbol} in ${currencySymbol}`);
      }
  
      const price = data[currencySymbol.toUpperCase()];
  
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
    if (!asset) return;

    setSelectedAsset(asset);
    setCoin(asset.asset_symbol);
    
    // Only call onAssetSelect if it's provided and is a function
    if (typeof onAssetSelect === 'function') {
      onAssetSelect(asset.asset_symbol);
    }
    
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
      });
      return;
    }
  
    if (!amount || isNaN(amount) || amount <= 0) {
      Swal.fire({
        title: 'Error',
        text: 'Please enter a valid amount to convert.',
        icon: 'error',
      });
      return;
    }
  
    try {
      setConversionLoading(true);
  
      const response = await axios.post(
        `${BASE_URL}/user/transactions/convert-crypto-to-fiat/`,
        null,
        {
          headers: {
            'x-token': userToken
          },
          params: {
            amount,
            asset_id: selectedAsset.asset_id
          }
        }
      );
  
      const responseData = response.data;
      
      if (responseData.status === 'success') {
        // Parse the message string to extract values
        const messageParts = responseData.message.split('. ');
        const amountPart = messageParts[1]?.split(': ')[1] || '';
        const ratePart = messageParts[2]?.split(': ')[1] || '';
        const usdPart = messageParts[3]?.split(': ')[1] || '';
  
        // Trigger refreshes
        if (typeof refetchUserAssets === 'function') refetchUserAssets();
        if (typeof refetchAllAssets === 'function') refetchAllAssets();
        if (typeof onBalanceUpdate === 'function') onBalanceUpdate();
        handleAction &&  handleAction();
        
        // Show success message exactly matching the response format
        Swal.fire({
          title: 'Success',
          text: responseData.message,
          icon: 'success',
        });
        
        // Reset form
        setAmount('');
        setEquivalent('0.00');
      } else {
        throw new Error(responseData.message || 'Conversion failed');
      }
    } catch (error) {
      console.error('Conversion error:', error);
      Swal.fire({
        title: 'Error',
        text: error.response?.data?.message || error.message || 'Conversion failed.',
        icon: 'error',
      });
    } finally {
      setConversionLoading(false);
    }
  };

  const handleImageError = () => {
    setImgError(true);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Only allow numeric input with decimals
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  return (
    <div className='col-9 mt-4'>
      <div style={{ padding: '5px', background: '#18A594', width: '100px', borderRadius: '50px', color: 'white', textAlign: 'center' }}>
        Exchange
      </div>
      <Form.Group className="mb-3 mt-2">
        <span style={{ textAlign: 'right', width: '100%' }}>Asset:</span>
        <InputGroup>
          {imgError ? (
            <img src='/coin.png' style={{ marginRight: '10px', width: '30px', fontSize: '1.5rem' }} alt="Default coin" />
          ) : (
            <img
              src={coin ? `https://static.nexo.com/currencies/${coin.toLocaleUpperCase()}.svg` : '/coin2.png'}
              alt={coin || "Coin"}
              style={{ marginRight: '10px', height: '30px', width: '30px' }}
              onError={handleImageError}
            />
          )}
          <Form.Control 
            value={coin?.toUpperCase()} 
            readOnly 
            style={{  
              backgroundColor: '#3a3a3a', 
              fontWeight: 'bold', 
              fontSize: '1.2rem', 
              color: '#F5EDED', 
              border: 'none' 
            }} 
          />
          <DropdownButton 
            title="" 
            id="input-group-dropdown-1" 
            style={{backgroundColor: '#3a3a3a'}}
            disabled={isLoading}
          >
            {!isLoading && Array.isArray(data) && data.map(asset => (
              <Dropdown.Item 
                key={asset.id} 
                onClick={() => handleAssetSelect(asset)}
              >
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
              style={{  
                backgroundColor: '#3a3a3a', 
                fontWeight: 'bold', 
                fontSize: '1.2rem', 
                textAlign: 'right', 
                border: 'none' 
              }}
              onChange={handleAmountChange}
              disabled={conversionLoading}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group className="col-8">
          <span>{currency?.curr}</span>
          <InputGroup>
            <Form.Control
              value={loading ? '' : `${currency?.curr} ${equivalent}`}
              readOnly
              style={{ 
                backgroundColor: '#3a3a3a', 
                border: 'none', 
                fontWeight: 'bold', 
                fontSize: '1.2rem', 
                textAlign: 'right', 
                color: 'green' 
              }}
              placeholder={loading ? '...' : '0.00'}
            />
            {loading && (
              <InputGroup.Text style={{ background: 'rgba(255, 170, 170, 0.5)', border: 'none' }}>
                <Spinner animation="border" size="sm" />
              </InputGroup.Text>
            )}
          </InputGroup>
        </Form.Group>
      </div>

      <Button 
        style={{ width: '100%', background: '#18A594' }} 
        onClick={handleConvert}
        disabled={conversionLoading || !selectedAsset || !amount}
      >
        {conversionLoading ? (
          <>
            <Spinner animation="border" size="sm" className="me-2" />
            Converting...
          </>
        ) : (
          'Convert'
        )}
      </Button>
    </div>
  );
};

export default CryptoPurchaseComponent;