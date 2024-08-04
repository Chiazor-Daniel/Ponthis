import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner, Tab, Tabs } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useGetUserWithdrawalsQuery } from '../../redux-contexts/redux/services/transactions';
import { useGetAllUserAssetsQuery, useWithdrawMutation } from '../../redux-contexts/redux/services/transactions';
import AdminTable from '../../jsx/components/table/FilteringTable/AdminTable';
import {format} from 'date-fns'
import axios from 'axios';
import { BASE_URL } from '../../api';
const WithdrawAsset = ({currency}) => {
  const { userInfo, userToken } = useSelector(state => state.auth);
  const [amount, setAmount] = useState('');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const { data: allAssets, isLoading: allAssetsLoading, refetch: allUserAssetsRefetch } = useGetAllUserAssetsQuery(userToken);
  const { data: allWithdrawals, isLoading: allWithdrawalsLoading, refetch: allWithdrawalsRefetch } = useGetUserWithdrawalsQuery(userToken);
  const [withdrawalMethod, setWithdrawalMethod] = useState('cryptocurrency');

  useEffect(()=> {
    allUserAssetsRefetch()
    allWithdrawalsRefetch()
  }, [])

  // Card details
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  // Bank details
  const [bankName, setBankName] = useState('');
  const [accountName, setAccountName] = useState('');
  const [iban, setIban] = useState('');
  const [bic, setBic] = useState('');
  const [reference, setReference] = useState('');

  // Crypto details
  const [walletAddress, setWalletAddress] = useState('');
  const [networkChain, setNetworkChain] = useState('');
  const [preferredToken, setPreferredToken] = useState('');

  const [withdraw, { isLoading: isWithdrawing }] = useWithdrawMutation();

  const handleWithdraw = async (e) => {
    e.preventDefault();
    if (!amount) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please select an asset and enter an amount.',
      });
      return;
    }
    if (withdrawalMethod === 'crypto') {
      try {
        const response = await axios.post(
          `${BASE_URL}/user/transactions/withdraw-transaction`,
          {
            transaction_data: {
              user_id: userInfo.id,
              transaction_amount: parseFloat(amount),
              created_at: new Date().toISOString(),
              status: "pending",
              transaction_method: "cryptocurrency"
            },
            crypto_data: {
              wallet_address: walletAddress,
              network_chain: networkChain,
              preferred_token: preferredToken
            },
            card_details_data: {
              firstname: "string",
              lastname: "string",
              card_number: 0,
              expiry_date: "string",
              cvv: 0
            },
            bank_details_data: {
                bank_name: "string",
              account_name: "string",
              iban: "string",
              bic: "string",
              reference: "string"
            }
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'x-token': userToken
            }
          }
        );
  
        if (response.data.status === 'success') {
          allWithdrawalsRefetch()
          Swal.fire({
            icon: 'success',
            title: 'Withdrawal Initiated',
            text: `Your withdrawal of ${currency.symbol} ${amount} ${selectedAsset.asset_symbol} has been initiated.`,
          });
          // Reset form
          setAmount('');
          setWalletAddress('');
          setNetworkChain('');
          setPreferredToken('');
          setSelectedAsset(null);
          
          // Refetch data
          allUserAssetsRefetch();
          allWithdrawalsRefetch();
        } else {
          throw new Error(response.data.message || 'Withdrawal failed');
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Withdrawal Failed',
          text: error.message || 'An error occurred during the withdrawal process.',
        });
      }
    } else{
      try {
        const response = await withdraw({
          amount: parseFloat(amount),
          user_id: userInfo.id,
          type: withdrawalMethod,
          token: userToken,
          card_number: cardNumber,
          expiry_date: expiryDate,
          cvv,
          wallet_address: walletAddress,
          network_chain: networkChain,
          preferred_token: preferredToken,
          bank_name: bankName,
          account_name: accountName,
          iban,
          bic,
          referrence: reference,
        }).unwrap();
  
        if (response.status === 'success') {
          allWithdrawalsRefetch()
          Swal.fire({
            icon: 'success',
            title: 'Withdrawal Initiated',
            text: `Your withdrawal of ${currency.symbol} ${amount} ${selectedAsset ? selectedAsset.asset_symbol : ""} has been initiated.`,
          });
          // Reset form
          setAmount('');
          setWithdrawalMethod('card');
          // Reset all other form fields...
        } else {
          throw new Error(response.message || 'Withdrawal failed');
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Withdrawal Failed',
          text: error.message || 'An error occurred during the withdrawal process.',
        });
      }

    }
  };



  const columns = React.useMemo(() => [
    {
      Header: 'Transaction Amount',
      accessor: 'transaction_amount',
    },
    {
      Header: 'Transaction Method',
      accessor: 'transaction_method',
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
  ], []);

  if (allAssetsLoading || isWithdrawing) {
    return <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Spinner animation="border" />;
    </div>
  }

  return (
    <Container>
        <Row className="justify-content-md-center mt-5">
          <Col md={8}>
            <Card>
              <Card.Body>
                <Card.Title className="text-center mb-4">Withdraw Asset</Card.Title>
                <Form onSubmit={handleWithdraw}>
                    <span style={{color: 'orange', fontSize: '0.8rem', padding: '20px', marginBottom: '20px'}}>All Non crypto withdraws from fiat </span>

                  <Tabs
                    activeKey={withdrawalMethod}
                    onSelect={(k) => setWithdrawalMethod(k)}
                    className="mb-3"
                  >
                    <Tab eventKey="card-payment" title="Card Withdrawal">
                      <span style={{color: 'orange', fontSize: '0.8rem', padding: '20px'}}>Card must match with {userInfo?.first_name + " " + userInfo?.last_name}</span>
                    <Form.Group className="mb-3 mt-3">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control 
                      type="number" 
                      placeholder="Enter amount" 
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Card Number</Form.Label>
                        <Form.Control type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Expiry Date</Form.Label>
                        <Form.Control type="text" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} placeholder="MM/YY" />
                      </Form.Group>
                    
                    </Tab>
                    <Tab eventKey="bank-transfer" title="Bank Transfer">
                    <Form.Group className="mb-3">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control 
                      type="number" 
                      placeholder="Enter amount" 
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Bank Name</Form.Label>
                        <Form.Control type="text" value={bankName} onChange={(e) => setBankName(e.target.value)} />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Account Name</Form.Label>
                        <Form.Control type="text" value={accountName} onChange={(e) => setAccountName(e.target.value)} />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>IBAN</Form.Label>
                        <Form.Control type="text" value={iban} onChange={(e) => setIban(e.target.value)} />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>BIC</Form.Label>
                        <Form.Control type="text" value={bic} onChange={(e) => setBic(e.target.value)} />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Reference</Form.Label>
                        <Form.Control type="text" value={reference} onChange={(e) => setReference(e.target.value)} />
                      </Form.Group>
                    </Tab>
                    <Tab eventKey="crypto" title="Crypto Withdrawal">
                    <Form.Group className="mb-3">
                    <Form.Label>Select Asset</Form.Label>
                    <Form.Select 
                      value={selectedAsset?.id || ''}
                      onChange={(e) => setSelectedAsset(allAssets.find(a => a.id === parseInt(e.target.value)))}
                    >
                      <option value="">Choose an asset</option>
                      {Array.isArray(allAssets) && allAssets.map((asset) => (
                        <option key={asset.id} value={asset.id}>
                          {asset.asset_name} ({asset.asset_symbol})
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
                      <Form.Group className="mb-3">
                        <Form.Label>Wallet Address</Form.Label>
                        <Form.Control type="text" value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Network Chain</Form.Label>
                        <Form.Control type="text" value={networkChain} onChange={(e) => setNetworkChain(e.target.value)} />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Preferred Token</Form.Label>
                        <Form.Control type="text" value={preferredToken} onChange={(e) => setPreferredToken(e.target.value)} />
                      </Form.Group>
                    </Tab>
                  </Tabs>

                  <div className="d-grid gap-2 mt-3">
                    <Button variant="primary" type="submit" disabled={isWithdrawing}>
                      {isWithdrawing ? 'Processing...' : 'Withdraw'}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
          <Col md={12}>
            {
                Array.isArray(allWithdrawals) ? (
                  <AdminTable 
                  columns={columns} 
                  data={allWithdrawals[1]?.data} 
                  search={true} 
                  
                />
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
                  <p style={{ margin: 0 }}>No Withdrawals available</p>
                </div>
              )
            }
          </Col>
    </Container>
  );
};

export default WithdrawAsset;