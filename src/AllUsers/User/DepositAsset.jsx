import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useGetAllAssetsQuery, useGetAllUserAssetsQuery, useGetUserDepositsQuery } from '../../redux-contexts/redux/services/transactions';
import { BASE_URL } from '../../api';
import {format} from 'date-fns'
import AdminTable from '../../jsx/components/table/FilteringTable/AdminTable';
const DepositAsset = () => {
  const { asset } = useParams();
  const { userToken } = useSelector(state => state.auth);
  const [amount, setAmount] = useState('');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const {data: allUserAssets, refetch: userAssetsRefetch} = useGetAllUserAssetsQuery(userToken)
  const { data: allAssets, isLoading: allAssetsLoading, refetch: allAssetsRefetch  } = useGetAllAssetsQuery(userToken);
  const { data: userDeposits, isLoading: depositsLoading, refetch: depositsRefetch } = useGetUserDepositsQuery(userToken)
  const [assets, setAssets] = useState({});


    useEffect(()=>{
      userAssetsRefetch(),
      allAssetsRefetch(),
      depositsRefetch()
    }, [])

    useEffect(() => {
      if (allUserAssets) {
        const assetMap = {};
        allUserAssets.forEach(asset => {
          assetMap[asset.asset_id] = asset.asset_symbol;
        });
        setAssets(assetMap);
      }
    }, [allUserAssets]);

    const financial_columns = React.useMemo(
      () => [
        {
          Header: 'Amount',
          accessor: 'amount',
          Cell: ({ row }) => (
            <div className="amount-cell">
              <span className="currency">{assets[row.original.asset_id] || 'Unknown'}</span>
              <span className="value">{row.original.amount}</span>
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
      [assets]
    );

  // useEffect(() => {
  //   console.log(allAssets)
  //   if (allAssets && asset) {
  //     const found = allAssets.find(a => a.asset_symbol.toLowerCase() === asset.toLowerCase());
  //     if (found) setSelectedAsset(found);
  //   }
  // }, [allAssets, asset]);

  const handleDeposit = async (e) => {
    e.preventDefault();
    if (!selectedAsset || !amount) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please select an asset and enter an amount.',
      });
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/user/transactions/deposit-asset/`,
        {
          asset_id: selectedAsset.id,
          amount: parseFloat(amount)
        },
        {
          headers: { 'x-token': userToken }
        }
      );

      if (response.data.status === 'success') {
        userAssetsRefetch()
        allAssetsRefetch()
        depositsRefetch()
        Swal.fire({
          icon: 'success',
          title: 'Deposit Successful',
          text: `You have successfully deposited ${amount} ${selectedAsset.symbol}.`,
        });
        setAmount('');
      } else {
        throw new Error(response.data.message || 'Deposit failed');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Deposit Failed',
        text: error.message || 'An error occurred during the deposit.',
      });
    }
  };

  if (allAssetsLoading) {
    return <Spinner animation="border" />;
  }

  return (
      <Row className="justify-content-md-center mt-5" >
        <Col md={4} >
          <Card>
            <Card.Body>
              <Card.Title className="text-center mb-4">Deposit Asset</Card.Title>
              <Form onSubmit={handleDeposit}>
                <Form.Group className="mb-3">
                  <Form.Label>Select Asset</Form.Label>
                  <Form.Select 
                    value={selectedAsset?.id || ''}
                    onChange={(e) => setSelectedAsset(allAssets.find(a => a.id === parseInt(e.target.value)))}
                  >
                    <option value="">Choose an asset</option>
                    {allAssets && allAssets.map((asset) => (
                      <option key={asset.id} value={asset.id}>
                        {asset.name} ({asset.symbol?.toUpperCase()})
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control 
                    type="number" 
                    placeholder="Enter amount" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </Form.Group>

                {selectedAsset && (
                  <div className="mb-3">
                    <p>Deposit Address:</p>
                    <code>{selectedAsset.wallet_address}</code>
                  </div>
                )}

                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit">
                    Deposit
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8} style={{height: '600px'}}>
          <>
            {
                Array.isArray(userDeposits) ? (
                    <AdminTable columns={financial_columns} data={userDeposits} search={true} />
                ) : (
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
                    <p style={{ margin: 0 }}>No deposits available</p>
                  </div>
                )
            }
          </>
        </Col>
      </Row>
  );
};

export default DepositAsset;