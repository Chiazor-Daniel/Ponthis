import React, { useState, useEffect } from 'react';
import { Table, Card, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AssetTable = ({ 
  data = [], 
  currency, 
  userToken, 
  onAction, 
  isLoading = false 
}) => {
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const tableStyles = {
    container: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      margin: '20px 0'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      padding: '0 10px'
    },
    headerTitle: {
      fontSize: '20px',
      fontWeight: '600',
      margin: '0'
    },
    table: {
      marginBottom: '0'
    },
    tableHeader: {
      backgroundColor: '#f8f9fa',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      position: 'relative',
      padding: '15px 10px'
    },
    sortIndicator: {
      marginLeft: '5px',
      fontSize: '12px'
    },
    assetCell: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      padding: '12px 10px'
    },
    assetIcon: {
      width: '32px',
      height: '32px',
      objectFit: 'contain'
    },
    assetInfo: {
      display: 'flex',
      flexDirection: 'column'
    },
    assetName: {
      fontWeight: '600',
      fontSize: '14px',
      margin: '0'
    },
    assetSymbol: {
      color: '#6c757d',
      fontSize: '12px',
      margin: '0'
    },
    valueCell: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end'
    },
    primaryValue: {
      fontWeight: '600',
      fontSize: '14px',
      margin: '0'
    },
    secondaryValue: {
      color: '#6c757d',
      fontSize: '12px',
      margin: '0'
    },
    actionButtons: {
      display: 'flex',
      gap: '10px',
      justifyContent: 'flex-end'
    },
    depositButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      padding: '6px 12px',
      fontSize: '14px'
    },
    walletButton: {
      width: '40px',
      height: '36px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0'
    },
    priceChange: (isPositive) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      color: isPositive ? '#198754' : '#dc3545',
      fontWeight: '500'
    })
  };

  const sortData = (items, sortConfig) => {
    if (!sortConfig.key) return items;
    
    return [...items].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  const handleSort = (key) => {
    setSortConfig((prevSort) => ({
      key,
      direction: prevSort.key === key && prevSort.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const formatBalance = (value) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 8
    }).format(value);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency?.curr || 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <div style={tableStyles.container}>
      <div style={tableStyles.header}>
        <h3 style={tableStyles.headerTitle}>Asset Portfolio</h3>
        <Button 
          variant="outline-primary"
          size="sm"
          onClick={onAction}
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            'Refresh'
          )}
        </Button>
      </div>

      <Table hover style={tableStyles.table}>
        <thead>
          <tr>
            <th 
              onClick={() => handleSort('name')} 
              style={tableStyles.tableHeader}
            >
              Asset
              <span style={tableStyles.sortIndicator}>
                {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </span>
            </th>
            <th 
              onClick={() => handleSort('balance')} 
              style={{...tableStyles.tableHeader, textAlign: 'right'}}
            >
              Balance
              <span style={tableStyles.sortIndicator}>
                {sortConfig.key === 'balance' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </span>
            </th>
            <th style={{...tableStyles.tableHeader, textAlign: 'right'}}>Value</th>
            <th style={{...tableStyles.tableHeader, textAlign: 'right'}}>24h Change</th>
            <th style={{...tableStyles.tableHeader, textAlign: 'right'}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortData(data, sortConfig).map((asset) => (
            <tr key={asset.id}>
              <td>
                <div style={tableStyles.assetCell}>
                  <img
                    src={`https://static.nexo.com/currencies/${asset.symbol?.toUpperCase()}.svg`}
                    alt={asset.symbol}
                    style={tableStyles.assetIcon}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/api/placeholder/32/32';
                    }}
                  />
                  <div style={tableStyles.assetInfo}>
                    <p style={tableStyles.assetName}>{asset.name?.toUpperCase()}</p>
                    <p style={tableStyles.assetSymbol}>{asset.symbol?.toUpperCase()}</p>
                  </div>
                </div>
              </td>
              <td>
                <div style={tableStyles.valueCell}>
                  <p style={tableStyles.primaryValue}>{formatBalance(asset.balance)}</p>
                  <p style={tableStyles.secondaryValue}>{asset.symbol?.toUpperCase()}</p>
                </div>
              </td>
              <td>
                <div style={tableStyles.valueCell}>
                  <p style={tableStyles.primaryValue}>{formatCurrency(asset.usdValue)}</p>
                </div>
              </td>
              <td>
                <div style={tableStyles.valueCell}>
                  <span style={tableStyles.priceChange(asset.priceChange24h >= 0)}>
                    {asset.priceChange24h >= 0 ? '↑' : '↓'} 
                    {Math.abs(asset.priceChange24h).toFixed(2)}%
                  </span>
                </div>
              </td>
              <td>
                <div style={tableStyles.actionButtons}>
                  <Button
                    variant="primary"
                    size="sm"
                    style={tableStyles.depositButton}
                    onClick={() => navigate(`/dashboard/deposit/${asset.symbol}`)}
                  >
                    Deposit →
                  </Button>
                  <Button
                    variant="light"
                    size="sm"
                    style={tableStyles.walletButton}
                    onClick={() => navigate(`/dashboard/assets/${asset.symbol}`)}
                  >
                    <i className="fa fa-wallet"></i>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AssetTable;