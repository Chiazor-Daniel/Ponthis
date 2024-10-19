import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Badge, Spinner, Alert, Card, Button, Modal, Form } from 'react-bootstrap';
import { AlertCircle, Eye, RefreshCw } from 'lucide-react';
import Swal from 'sweetalert2';
import { useGetAllAssetsQuery } from '../../redux-contexts/redux/services/admin';

const UserLoanRequests = ({ userId, token }) => {
  const [loanRequests, setLoanRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const { data: assets, isLoading, refetch } = useGetAllAssetsQuery(token);
  const [selectedAssetId, setSelectedAssetId] = useState('');

  useEffect(() => {
    fetchLoanRequests();
  }, [userId, token]);

  const fetchLoanRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.ledgersafe-ai.com/admin/user/loan/get-user-requests', {
        params: { user_id: userId },
        headers: { "x-token": token }
      });
      setLoanRequests(response.data || []);
    } catch (err) {
      setError('Error fetching loan requests. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewLoan = async (loanRequestId) => {
    setLoadingDetail(true);
    try {
      const response = await axios.get('https://api.ledgersafe-ai.com/admin/user/loan/view-user-request', {
        params: { user_id: userId, loan_request_id: loanRequestId },
        headers: { "x-token": token }
      });
      setSelectedLoan(response.data);
      setNewStatus(response.data.status);
      setShowModal(true);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error fetching loan details. Please try again later.',
      });
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!selectedLoan || !newStatus) return;

    setUpdatingStatus(true);
    try {
      await axios.put('https://api.ledgersafe-ai.com/admin/user/loan/change-request-status', null, {
        params: {
          user_id: userId,
          loan_request_id: selectedLoan.id,
          status_: newStatus,
          crypto_asset_id: selectedAssetId // Assuming this is part of the loan data
        },
        headers: { "x-token": token }
      });
      
      // Update the local state
      setSelectedLoan({ ...selectedLoan, status: newStatus });
      setLoanRequests(loanRequests.map(loan =>
        loan.id === selectedLoan.id ? { ...loan, status: newStatus } : loan
      ));

      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Status updated successfully',
      });
    } catch (err) {
      // Show error message using SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error updating loan status. Please try again later.',
      });
    } finally {
      setUpdatingStatus(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      pending: 'warning',
      approved: 'success',
      rejected: 'danger',
      processing: 'info',
      not_approved: 'secondary'
    };
    return <Badge bg={statusColors[status] || 'secondary'}>{status || 'Unknown'}</Badge>;
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        <AlertCircle className="me-2" />
        {error}
      </Alert>
    );
  }

  return (
    <>
      <Card className="shadow-sm" style={{backgroundColor: '#2a2a2a',}}>
        <Card.Header as="h2" className="text-center py-3 bg-primary text-white">
          User Loan Requests
        </Card.Header>
        <Card.Body>
          {loanRequests.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>Purpose</th>
                  <th>Amount</th>
                  <th>Repayment Duration</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loanRequests.map((loan) => (
                  <tr key={loan.id}>
                    <td>{loan.purpose}</td>
                    <td>${loan.amount.toLocaleString()}</td>
                    <td>{loan.repayment_duration_weeks} weeks</td>
                    <td>{getStatusBadge(loan.status)}</td>
                    <td>{formatDate(loan.created_at)}</td>
                    <td>
                      <Button variant="outline-primary" size="sm" onClick={() => handleViewLoan(loan.id)}>
                        <Eye size={16} className="me-1" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Alert variant="info">No loan requests found for this user.</Alert>
          )}
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Loan Request Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loadingDetail ? (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : selectedLoan ? (
            <div>
              <h5>Personal Information</h5>
              <Table responsive bordered>
                <tbody>
                  <tr><td><strong>Full Name</strong></td><td>{selectedLoan.full_name}</td></tr>
                  <tr><td><strong>Address</strong></td><td>{selectedLoan.address}</td></tr>
                  <tr><td><strong>Date of Birth</strong></td><td>{formatDate(selectedLoan.dob)}</td></tr>
                  <tr><td><strong>Marital Status</strong></td><td>{selectedLoan.marital_status}</td></tr>
                  <tr><td><strong>Home Owner</strong></td><td>{selectedLoan.is_home_owner ? 'Yes' : 'No'}</td></tr>
                  <tr><td><strong>Has Mortgage</strong></td><td>{selectedLoan.has_mortgage ? 'Yes' : 'No'}</td></tr>
                  <tr><td><strong>Years at Address</strong></td><td>{selectedLoan.years_at_address}</td></tr>
                </tbody>
              </Table>

              <h5 className="mt-4">Employment Information</h5>
              <Table striped bordered>
                <tbody>
                  <tr><td><strong>Employment Status</strong></td><td>{selectedLoan.employment_status}</td></tr>
                  <tr><td><strong>Job Title</strong></td><td>{selectedLoan.job_title}</td></tr>
                  <tr><td><strong>Industry</strong></td><td>{selectedLoan.industry}</td></tr>
                  <tr><td><strong>Employer Name</strong></td><td>{selectedLoan.employer_name}</td></tr>
                  <tr><td><strong>Annual Income</strong></td><td>${selectedLoan.annual_income.toLocaleString()}</td></tr>
                  <tr><td><strong>Other Household Income</strong></td><td>{selectedLoan.has_other_household_income ? 'Yes' : 'No'}</td></tr>
                  {selectedLoan.has_other_household_income && (
                    <tr><td><strong>Other Annual Household Income</strong></td><td>${selectedLoan.other_annual_household_income.toLocaleString()}</td></tr>
                  )}
                  <tr><td><strong>Number of Dependents</strong></td><td>{selectedLoan.number_of_dependents}</td></tr>
                </tbody>
              </Table>

              <h5 className="mt-4">Loan Information</h5>
              <Table striped bordered>
                <tbody>
                  <tr><td><strong>Purpose</strong></td><td>{selectedLoan.purpose}</td></tr>
                  <tr><td><strong>Amount</strong></td><td>${selectedLoan.amount.toLocaleString()}</td></tr>
                  <tr><td><strong>Repayment Duration</strong></td><td>{selectedLoan.repayment_duration_weeks} weeks</td></tr>
                  <tr><td><strong>Payment Type</strong></td><td>{selectedLoan.payment_type}</td></tr>
                  <tr><td><strong>Due Date</strong></td><td>{formatDate(selectedLoan.due_date)}</td></tr>
                  <tr>
                    <td><strong>Status</strong></td>
                    <td>
                      <Form.Select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        disabled={updatingStatus}
                      >
                        <option value="processing">Processing</option>
                        <option value="not_approved">Not Approved</option>
                        <option value="approved">Approved</option>
                      </Form.Select>
                    </td>
                  </tr>
                  <tr><td><strong>Crypto Asset</strong></td>
<td>
<Form.Select
value={selectedAssetId}
onChange={(e) => setSelectedAssetId(e.target.value)}
disabled={updatingStatus}
>
<option value="">Select a Crypto Asset</option>
{assets?.map(asset => (
<option key={asset.id} value={asset.id}>
{asset.name} ({asset.symbol})
</option>
))}
</Form.Select>
</td>
</tr>
                  <tr><td><strong>Created At</strong></td><td>{formatDate(selectedLoan.created_at)}</td></tr>
                  <tr><td><strong>Updated At</strong></td><td>{formatDate(selectedLoan.updated_at)}</td></tr>
                </tbody>
              </Table>

              <Button
                variant="primary"
                onClick={handleUpdateStatus}
                disabled={updatingStatus || newStatus === selectedLoan.status}
                className="mt-3"
              >
                {updatingStatus ? (
                  <>
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                    Updating...
                  </>
                ) : (
                  <>
                    <RefreshCw size={16} className="me-2" />
                    Update Status
                  </>
                )}
              </Button>
            </div>
          ) : (
            <Alert variant="warning">No loan details available.</Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserLoanRequests;