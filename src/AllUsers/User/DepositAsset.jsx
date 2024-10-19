import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Card, Form, Button, Spinner, Table, Alert, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useGetAllAssetsQuery, useGetAllUserAssetsQuery, useGetUserDepositsQuery } from '../../redux-contexts/redux/services/transactions';
import { BASE_URL } from '../../api';
import { format } from 'date-fns';
import { Copy } from 'lucide-react';
import QRCode from 'react-qr-code';

// Styles
const cardStyle = {
  backgroundColor: '#2a2a2a',
  border: 'none',
  borderRadius: '10px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
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

const termsTextAreaStyle = {
  height: '300px',
  overflowY: 'scroll',
  backgroundColor: '#3a3a3a',
  color: 'white',
  padding: '1rem',
  marginBottom: '1rem'
};

const statusBadgeStyle = (status) => ({
  padding: '5px 10px',
  borderRadius: '15px',
  fontSize: '0.85rem',
  fontWeight: '500',
  ...(status.toLowerCase() === 'approved' && { backgroundColor: '#1e8e3e', color: 'white' }),
  ...(status.toLowerCase() === 'pending' && { backgroundColor: '#f9ab00', color: 'black' }),
  ...(status.toLowerCase() === 'canceled' && { backgroundColor: '#d93025', color: 'white' })
});

const termsAndConditions = `
Terms and Conditions for Service Provider Deposits

1. Introduction
These terms and conditions govern your use of our service provider deposit feature.

2. Service Description
Our service allows you to deposit funds through approved service providers.

3. User Responsibilities
- You must provide accurate information
- You are responsible for any fees associated with the deposit
- You must comply with all applicable laws and regulations

4. Deposit Process
- Minimum deposit amount may apply
- Processing times vary by service provider
- Fees may be charged by the service provider

5. Risks and Limitations
- Deposits may be subject to verification
- Service may not be available in all regions
- Processing delays may occur

6. Privacy and Security
We protect your information according to our privacy policy.

7. Modifications
We reserve the right to modify these terms at any time.

[Continue scrolling for more terms...]

8. Dispute Resolution
Any disputes will be resolved according to our dispute resolution policy.

9. Contact Information
For questions about these terms, contact our support team.

10. Acceptance
By checking the box below, you acknowledge that you have read and agree to these terms.
`;

const DepositAsset = () => {
  const { userToken } = useSelector(state => state.auth);
  const [amount, setAmount] = useState('');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [depositType, setDepositType] = useState('crypto');
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [hasReadTerms, setHasReadTerms] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const termsRef = useRef(null);
  const [copySuccess, setCopySuccess] = useState('');

  const { data: allUserAssets, refetch: userAssetsRefetch } = useGetAllUserAssetsQuery(userToken);
  const { data: allAssets, isLoading: allAssetsLoading, refetch: allAssetsRefetch } = useGetAllAssetsQuery(userToken);
  const { data: userDeposits, isLoading: depositsLoading, refetch: depositsRefetch } = useGetUserDepositsQuery(userToken);

  // Reset states when changing deposit type
  useEffect(() => {
    setSelectedAsset(null);
    setAmount('');
    setHasReadTerms(false);
    setAcceptedTerms(false);
  }, [depositType]);

  const handleScroll = (e) => {
    const element = e.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      setHasReadTerms(true);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      setCopySuccess('Failed to copy');
    }
  };

  const handleDepositTypeChange = (type) => {
    setDepositType(type);
    if (type === 'service provider') {
      setShowTermsModal(true);
    }
  };

  const handleTermsModalClose = () => {
    if (!acceptedTerms) {
      setDepositType('crypto');
    }
    setShowTermsModal(false);
  };

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

    if (depositType === 'service provider' && !acceptedTerms) {
      Swal.fire({
        icon: 'error',
        title: 'Terms & Conditions Required',
        text: 'Please accept the terms and conditions to proceed.',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/user/transactions/deposit-asset/?deposit_type=${depositType}`,
        {
          asset_id: selectedAsset.id,
          amount: parseFloat(amount),
        },
        {
          headers: { 'x-token': userToken }
        }
      );

      if (response.data.status === 'success') {
        userAssetsRefetch();
        allAssetsRefetch();
        depositsRefetch();
        Swal.fire({
          icon: 'success',
          title: 'Deposit Initiated',
          text: `You have successfully initiated a deposit of ${amount} ${selectedAsset.symbol}.`,
        });
        setAmount('');
        setSelectedAsset(null);
      } else {
        throw new Error(response.data.message || 'Deposit failed');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Deposit Failed',
        text: error.message || 'An error occurred during the deposit.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (allAssetsLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <>
      <Row className="mt-4">
        <Col md={5}>
          <Card style={cardStyle}>
            <Card.Body>
              <Card.Title className="text-white mb-4" style={{ fontSize: '1.5rem' }}>Deposit Asset</Card.Title>
              <Form onSubmit={handleDeposit}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white">Deposit Type</Form.Label>
                  <Form.Select
                    style={formControlStyle}
                    value={depositType}
                    onChange={(e) => handleDepositTypeChange(e.target.value)}
                  >
                    <option value="crypto">Crypto</option>
                    <option value="service provider">Service Provider</option>
                  </Form.Select>
                </Form.Group>

                {depositType === 'service provider' && !acceptedTerms ? (
                  <Alert variant="info" style={{ backgroundColor: '#3a3a3a', color: 'white', border: 'none' }}>
                    Please accept the terms and conditions to proceed with service provider deposit.
                  </Alert>
                ) : (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-white">Select Asset</Form.Label>
                      <Form.Select 
                        style={formControlStyle}
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

                    <Form.Group className="mb-4">
                      <Form.Label className="text-white">Amount</Form.Label>
                      <Form.Control 
                        type="number" 
                        style={formControlStyle}
                        placeholder="Enter amount" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </Form.Group>

                    {depositType === 'crypto' && selectedAsset && (
                      <Alert variant="info" style={{ backgroundColor: '#3a3a3a', color: 'white', border: 'none' }}>
                        <Alert.Heading style={{ fontSize: '1.1rem' }}>Deposit Address</Alert.Heading>
                        <div className="d-flex flex-column align-items-center mt-3">
                          <div style={{ background: 'white', padding: '16px', marginBottom: '16px', borderRadius: '8px' }}>
                            <QRCode value={`ethereum:${selectedAsset.wallet_address}`} size={150} />
                          </div>
                          <div className="d-flex align-items-center w-100 mb-2" style={{background: '#2a2a2a', padding: '10px', borderRadius: '5px'}}>
                            <code style={{ flex: 1, fontSize: '0.9rem', wordBreak: 'break-all', color: '#fff' }}>
                              {selectedAsset.wallet_address}
                            </code>
                            <Button
                              variant="outline-light"
                              size="sm"
                              onClick={() => copyToClipboard(selectedAsset.wallet_address)}
                              style={{ marginLeft: '10px' }}
                            >
                              <Copy size={16} />
                            </Button>
                          </div>
                          {copySuccess && <span className="text-success mt-2">{copySuccess}</span>}
                        </div>
                      </Alert>
                    )}
                  </>
                )}

                <Button 
                  variant="primary" 
                  type="submit" 
                  disabled={isSubmitting || (depositType === 'service provider' && !acceptedTerms) || !selectedAsset || !amount} 
                  className="w-100"
                  style={{ marginTop: '1rem' }}
                >
                  {isSubmitting ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                      Processing...
                    </>
                  ) : 'Confirm Deposit'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={7}>
          <Card style={cardStyle}>
            <Card.Body>
              <Card.Title className="text-white mb-4" style={{ fontSize: '1.5rem' }}>Deposit History</Card.Title>
              {Array.isArray(userDeposits) && userDeposits.length > 0 ? (
                <Table responsive style={tableStyle}>
                  <thead>
                    <tr>
                      <th style={{ color: '#888' }}>Amount</th>
                      <th style={{ color: '#888' }}>Type</th>
                      <th style={{ color: '#888' }}>Status</th>
                      <th style={{ color: '#888' }}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userDeposits.map((deposit) => (
                      <tr key={deposit.id}>
                        <td style={{ color: 'white' }}>
                          {deposit.amount} {allAssets.find(a => a.id === deposit.asset_id)?.symbol}
                        </td>
                        <td style={{ color: 'white' }}>
                          {deposit.deposit_type}
                        </td>
                        <td>
                          <span style={statusBadgeStyle(deposit.status)}>
                            {deposit.status}
                          </span>
                        </td>
                        <td style={{ color: 'white' }}>
                          {format(new Date(deposit.created_at), 'MMM d, yyyy HH:mm')}
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
                  No deposit history available
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal
        show={showTermsModal}
        onHide={handleTermsModalClose}
        centered
        backdrop="static"
        size="lg"
      >
        <Modal.Header closeButton style={{ backgroundColor: '#2a2a2a', color: 'white', border: 'none' }}>
          <Modal.Title>Service Provider Terms & Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#2a2a2a', color: 'white' }}>
          <div 
            ref={termsRef}
            onScroll={handleScroll}
            style={termsTextAreaStyle}
          >
            {termsAndConditions}
          </div>
          <Form.Check
            type="checkbox"
            id="terms-checkbox"
            label="I have read and agree to the terms and conditions"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            disabled={!hasReadTerms}
            style={{ color: 'white' }}
          />
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#2a2a2a', border: 'none' }}>
          <Button variant="secondary" onClick={handleTermsModalClose}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleTermsModalClose}
            disabled={!acceptedTerms}
          >
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DepositAsset