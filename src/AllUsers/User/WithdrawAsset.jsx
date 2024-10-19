import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner, Tab, Tabs, Alert, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useGetUserWithdrawalsQuery, useGetAllUserAssetsQuery, useWithdrawMutation } from '../../redux-contexts/redux/services/transactions';
import AdminTable from '../../jsx/components/table/FilteringTable/AdminTable';
import { format } from 'date-fns';
import axios from 'axios';
import { BASE_URL } from '../../api';
import { Copy } from 'lucide-react';

const cardStyle = {
  backgroundColor: '#2a2a2a',
  border: 'none',
  borderRadius: '10px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  color: 'white'
};

const formControlStyle = {
  backgroundColor: '#3a3a3a',
  color: 'white',
  border: '1px solid #4a4a4a'
};

const tableStyle = {
  backgroundColor: '#2a2a2a',
  color: 'white'
};

const statusBadgeStyle = (status) => {
  const baseStyle = {
    padding: '5px 10px',
    borderRadius: '15px',
    fontSize: '0.85rem',
    fontWeight: '500'
  };
  
  const statusColors = {
    approved: { backgroundColor: '#1e8e3e', color: 'white' },
    pending: { backgroundColor: '#f9ab00', color: 'black' },
    canceled: { backgroundColor: '#d93025', color: 'white' }
  };

  return { ...baseStyle, ...statusColors[status.toLowerCase()] };
};

const WithdrawAsset = ({ currency }) => {
  const { userInfo, userToken } = useSelector(state => state.auth);
  const [amount, setAmount] = useState('');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const { data: allAssets, isLoading: allAssetsLoading, refetch: allUserAssetsRefetch } = useGetAllUserAssetsQuery(userToken);
  const { data: allWithdrawals, isLoading: allWithdrawalsLoading, refetch: allWithdrawalsRefetch } = useGetUserWithdrawalsQuery(userToken);
  const [withdrawalMethod, setWithdrawalMethod] = useState('cryptocurrency');
  useEffect(()=> console.log(allWithdrawals), [])
  const [copySuccess, setCopySuccess] = useState('');

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      setCopySuccess('Failed to copy');
    }
  };

  useEffect(() => {
    allUserAssetsRefetch();
    allWithdrawalsRefetch();
  }, [allUserAssetsRefetch, allWithdrawalsRefetch]);

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

    if (withdrawalMethod === 'cryptocurrency') {
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
          allWithdrawalsRefetch();
          Swal.fire({
            icon: 'success',
            title: 'Withdrawal Initiated',
            text: `Your withdrawal of ${currency.symbol} ${amount} has been initiated.`,
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
    } else {
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
          allWithdrawalsRefetch();
          Swal.fire({
            icon: 'success',
            title: 'Withdrawal Initiated',
            text: `Your withdrawal of ${currency.symbol} ${amount} ${selectedAsset ? selectedAsset.asset_symbol : ""} has been initiated.`,
          });
          // Reset form
          setAmount('');
          setWithdrawalMethod('card-payment');
          // Reset all other form fields...
          setCardNumber('');
          setExpiryDate('');
          setCvv('');
          setBankName('');
          setAccountName('');
          setIban('');
          setBic('');
          setReference('');
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
        const statusStyles = statusBadgeStyle(value);
        return (
          <span style={statusStyles}>
            {value === 'not approved' ? "Reversed" : value.charAt(0).toUpperCase() + value.slice(1)}
          </span>
        );
      },
    },
    {
      Header: 'Created At',
      accessor: 'created_at',
      Cell: ({ value }) => {
        const date = new Date(value);
        return format(date, 'MMM d, yyyy HH:mm');
      },
    },
  ], []);

  if (allAssetsLoading || isWithdrawing) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Card style={cardStyle}>
            <Card.Body>
              <Card.Title className="text-center mb-4" style={{ fontSize: '1.5rem', color: '#aaa' }}>Withdraw Asset</Card.Title>
              <Form onSubmit={handleWithdraw}>
                <Alert variant="warning" style={{ backgroundColor: '#f9ab00', color: 'black', border: 'none' }}>
                  <span style={{ fontSize: '0.8rem' }}>Withdrawals should be greater than {currency.symbol}5</span>
                </Alert>

                <Tabs
                  activeKey={withdrawalMethod}
                  onSelect={(k) => setWithdrawalMethod(k)}
                  style={{ marginTop: '20px', color: '#aaa' }}
                  className="mb-3"
                >
                  <Tab eventKey="card-payment" title="Card Withdrawal" style={{color: '#aaa'}}>
                    <Alert variant="info" style={{ backgroundColor: '#3a3a3a', color: 'white', border: 'none' }}>
                      <span style={{ fontSize: '0.8rem' }}>Card must match with {userInfo?.first_name} {userInfo?.last_name}</span>
                    </Alert>
                    <Form.Group className="mb-3 mt-3">
                      <Form.Label>Amount</Form.Label>
                      <Form.Control 
                        type="number" 
                        placeholder="Enter amount" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        style={formControlStyle}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Card Number</Form.Label>
                      <Form.Control 
                        type="text" 
                        value={cardNumber} 
                        onChange={(e) => setCardNumber(e.target.value)} 
                        style={formControlStyle}
                      />
                    </Form.Group>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label>Expiry Date</Form.Label>
                          <Form.Control 
                            type="text" 
                            placeholder="MM/YY" 
                            value={expiryDate} 
                            onChange={(e) => setExpiryDate(e.target.value)} 
                            style={formControlStyle}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label>CVV</Form.Label>
                          <Form.Control 
                            type="text" 
                            value={cvv} 
                            onChange={(e) => setCvv(e.target.value)} 
                            style={formControlStyle}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Tab>
                  <Tab eventKey="bank-transfer" title="Bank Transfer">
                    <Form.Group className="mb-3">
                      <Form.Label>Amount</Form.Label>
                      <Form.Control 
                        type="number" 
                        placeholder="Enter amount" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        style={formControlStyle}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Bank Name</Form.Label>
                      <Form.Control 
                        type="text" 
                        value={bankName} 
                        onChange={(e) => setBankName(e.target.value)} 
                        style={formControlStyle}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Account Name</Form.Label>
                      <Form.Control 
                        type="text" 
                        value={accountName} 
                        onChange={(e) => setAccountName(e.target.value)} 
                        style={formControlStyle}
                      />
                    </Form.Group>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label>IBAN</Form.Label>
                          <Form.Control 
                            type="text" 
                            value={iban} 
                            onChange={(e) => setIban(e.target.value)} 
                            style={formControlStyle}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label>BIC</Form.Label>
                          <Form.Control 
                            type="text" 
                            value={bic} 
                            onChange={(e) => setBic(e.target.value)} 
                            style={formControlStyle}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mb-3">
                      <Form.Label>Reference</Form.Label>
                      <Form.Control 
                        type="text" 
                        value={reference} 
                        onChange={(e) => setReference(e.target.value)} 
                        style={formControlStyle}
                      />
                    </Form.Group>
                  </Tab>
                  <Tab eventKey="cryptocurrency" title="Crypto Withdrawal">
                    <Form.Group className="mb-3">
                      <Form.Label>Amount</Form.Label>
                      <Form.Control 
                        type="number" 
                        placeholder="Enter amount" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        style={formControlStyle}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Wallet Address</Form.Label>
                      <Form.Control 
                        type="text" 
                        value={walletAddress} 
                        onChange={(e) => setWalletAddress(e.target.value)} 
                        style={formControlStyle}
                      />
                    </Form.Group>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label>Network Chain</Form.Label>
                          <Form.Control 
                            type="text" 
                            value={networkChain} 
                            onChange={(e) => setNetworkChain(e.target.value)} 
                            style={formControlStyle}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label>Preferred Token</Form.Label>
                          <Form.Control 
                            type="text" 
                            value={preferredToken} 
                            onChange={(e) => setPreferredToken(e.target.value)} 
                            style={formControlStyle}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Tab>
                </Tabs>

                <Button 
                  variant="primary" 
                  type="submit" 
                  disabled={isWithdrawing}
                  className="w-100 mt-3"
                >
                  {isWithdrawing ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Processing...
                    </>
                  ) : 'Withdraw'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={12}>
          <Card style={cardStyle}>
            <Card.Body>
              <Card.Title className="text-white mb-4" style={{ fontSize: '1.5rem' }}>Withdrawal History</Card.Title>
              {Array.isArray(allWithdrawals) && allWithdrawals.length > 0 ? (
                <Table responsive style={tableStyle}>
                  <thead>
                    <tr>
                      <th style={{ color: '#888' }}>Amount</th>
                      <th style={{ color: '#888' }}>Method</th>
                      <th style={{ color: '#888' }}>Status</th>
                      <th style={{ color: '#888' }}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allWithdrawals[1].data.map((withdrawal) => (
                      <tr key={withdrawal.id}>
                        <td style={{ color: 'white' }}>
                          {withdrawal.transaction_amount} {allAssets.find(a => a.id === withdrawal.asset_id)?.symbol}
                        </td>
                        <td style={{ color: 'white' }}>
                          {withdrawal?.transaction_method?.charAt(0)?.toUpperCase() + withdrawal?.transaction_method?.slice(1)}
                        </td>
                        <td>
                          <span style={statusBadgeStyle(withdrawal.status)}>
                            {withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1)}
                          </span>
                        </td>
                        <td style={{ color: 'white' }}>
                          {format(new Date(withdrawal?.created_at), 'MMM d, yyyy HH:mm')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: '2rem',
                  color: '#888'
                }}>
                  No withdrawal history available
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default WithdrawAsset;
