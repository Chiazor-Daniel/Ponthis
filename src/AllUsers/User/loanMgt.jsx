import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Table, Badge, Spinner, Alert, Button, Modal, Form } from 'react-bootstrap';
import { DollarSign, Calendar, UserCheck, Briefcase, AlertCircle, CheckCircle, CreditCard, Plus } from 'lucide-react';
import { useSelector } from 'react-redux';
import LoanApplicationStepper from './loanstepper';
import Swal from 'sweetalert2';

const LoanApplicationPage = () => {
  const [loanRequests, setLoanRequests] = useState([]);
  const [dueInstallments, setDueInstallments] = useState([]);
  const { userInfo, userToken } = useSelector(state => state.auth);
  const [loadingLoanRequests, setLoadingLoanRequests] = useState(true);
  const [loadingDueInstallments, setLoadingDueInstallments] = useState(true);
  const [errorLoanRequests, setErrorLoanRequests] = useState(null);
  const [errorDueInstallments, setErrorDueInstallments] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [installmentPayments, setInstallmentPayments] = useState([]);
  const approvedLoans = loanRequests.filter(loan => loan.status === 'approved');
  const totalApprovedLoans = approvedLoans.length;
  const totalApprovedAmount = approvedLoans.reduce((sum, loan) => sum + (loan.amount || 0), 0);

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [loanApplication, setLoanApplication] = useState({
    full_name: '',
    purpose: '',
    amount: '',
    repayment_duration_weeks: '',
  });
  const [applyingForLoan, setApplyingForLoan] = useState(false);
  const [applyError, setApplyError] = useState(null);

  const fetchLoanRequests = async () => {
    try {
      const response = await axios.get('https://api.ledgersafe-ai.com/user/loan/get-loan-requests', {
        headers: { "x-token": userToken }
      });
      setLoanRequests(response.data || []);
    } catch (err) {
      setErrorLoanRequests('Error fetching loan requests. Please try again later.');
    } finally {
      setLoadingLoanRequests(false);
    }
  };
  useEffect(() => {
fetchLoanRequests()
    const fetchDueInstallments = async () => {
      try {
        const response = await axios.get('https://api.ledgersafe-ai.com/user/loan/get-due-installment-payments', {
          headers: { "x-token": userToken }
        });
        setDueInstallments(response.data?.data || []);
      } catch (err) {
        setErrorDueInstallments('Error fetching due installments. Please try again later.');
      } finally {
        setLoadingDueInstallments(false);
      }
    };

    fetchLoanRequests();
    fetchDueInstallments();
  }, [userToken]);

  const modalStyle = {
    content: {
      backgroundColor: '#2a2a2a',
      color: 'white',
    },
    header: {
      backgroundColor: '#1a1a1a',
      borderBottom: '1px solid #3a3a3a',
    },
    body: {
      backgroundColor: 'transparent',
    },
    footer: {
      backgroundColor: '#1a1a1a',
      borderTop: '1px solid #3a3a3a',
    },
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
      rejected: 'danger'
    };
    return <Badge bg={statusColors[status] || 'secondary'}>{status || 'Unknown'}</Badge>;
  };

  const handleViewLoan = async (loanRequestId) => {
    setLoadingLoanRequests(true);
    setErrorLoanRequests(null);
  
    try {
      const [paymentsResponse, loanResponse] = await Promise.allSettled([
        axios.get(`https://api.ledgersafe-ai.com/user/loan/get-installment-payments?loan_request_id=${loanRequestId}`, {
          headers: { "x-token": userToken }
        }),
        axios.get(`https://api.ledgersafe-ai.com/user/loan/view-loan-request?loan_request_id=${loanRequestId}`, {
          headers: { "x-token": userToken }
        })
      ]);
  
      if (paymentsResponse.status === 'fulfilled') {
        setInstallmentPayments(paymentsResponse.value.data || []);
      } else {
        console.error('Error fetching installment payments:', paymentsResponse.reason);
      }
  
      if (loanResponse.status === 'fulfilled') {
        setSelectedLoan(loanResponse.value.data || null);
        setShowModal(true);
      } else {
        console.error('Error fetching loan details:', loanResponse.reason);
        setErrorLoanRequests('Error fetching loan details. Please try again later.');
      }
  
    } catch (err) {
      console.error('Unexpected error:', err);
      setErrorLoanRequests('Unexpected error occurred. Please try again later.');
    } finally {
      setLoadingLoanRequests(false);
    }
  };

  const handleApplyForLoan = async (e) => {
    e.preventDefault();
    setApplyingForLoan(true);
    setApplyError(null);

    try {
      const response = await axios.post('https://api.ledgersafe-ai.com/user/loan/apply', loanApplication, {
        headers: { "x-token": userToken }
      });
      setLoanRequests([...loanRequests, response.data]);
      setShowApplyModal(false);
    } catch (err) {
      setApplyError('Error applying for loan. Please try again later.');
    } finally {
      setApplyingForLoan(false);
    }
  };

  if (loadingLoanRequests && loadingDueInstallments) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container fluid className="" style={{ backgroundColor: '' }}>
      <Row className="justify-content-center">
        <Col xs={12} lg={10}>
          <h3 className="mb-4">Application Statistics</h3>
          {loadingLoanRequests ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading loan requests...</span>
            </Spinner>
          ) : errorLoanRequests ? (
            <Alert variant="danger">
              <AlertCircle className="me-2" />
              {errorLoanRequests}
            </Alert>
          ) : (
            <Row>
              {[
                { icon: DollarSign, title: 'Total Amount', value: `$${loanRequests.reduce((sum, loan) => sum + (loan.amount || 0), 0).toLocaleString()}` },
                { icon: Calendar, title: 'Average Duration', value: `${Math.round(loanRequests.reduce((sum, loan) => sum + (loan.repayment_duration_weeks || 0), 0) / (loanRequests.length || 1))} weeks` },
                { icon: UserCheck, title: 'Total Applications', value: loanRequests.length },
                { icon: Briefcase, title: 'Most Common Purpose', value: loanRequests.length > 0 ? 
                  Object.entries(loanRequests.reduce((acc, loan) => {
                    if (loan.purpose) {
                      acc[loan.purpose] = (acc[loan.purpose] || 0) + 1;
                    }
                    return acc;
                  }, {})).reduce((a, b) => (a[1] > b[1] ? a : b), ['N/A', 0])[0] : 'N/A' 
                },
              ].map((stat, index) => (
                <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <div className="h-100 shadow-sm" style={{  backgroundColor: '#2a2a2a', borderRadius: '10px', color: 'gray'}}>
                    <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                      <stat.icon size={32} className="mb-3 text-primary" />
                      <Card.Title className="text-center" style={{color: 'white'}}>{stat.title}</Card.Title>
                      <Card.Text className="text-center font-weight-bold">
                        {stat.value}
                      </Card.Text>
                    </Card.Body>
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>

      <Row className="justify-content-center mt-4">
        <Col xs={12} lg={10}>
          <div className="shadow-sm" style={{ backgroundColor: '#2a2a2a', borderRadius: '10px', marginBottom: '20px' }}>
            <Card.Header as="h2" className="text-center py-4 bg-primary text-white d-flex justify-content-between align-items-center" style={{border: 'none'}}>
              Apply for a Loan
              <Button variant="light" onClick={() => setShowApplyModal(true)}>
                <Plus size={18} className="me-2" />
                Apply Now
              </Button>
            </Card.Header>
            <Card.Body>
              <p className="text-center text-light">
                Need financial assistance? Apply for a loan today and get the support you need.
              </p>
            </Card.Body>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center mt-4">
        <Col xs={12} lg={10}>
          <div className="shadow-sm" style={{ backgroundColor: '#2a2a2a',  borderRadius: '10px', }}>
            <Card.Header as="h2" className="text-center py-4 bg-primary text-white" style={{border: 'none'}}>
              Due Installments
            </Card.Header>
            <Card.Body>
              {loadingDueInstallments ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading due installments...</span>
                </Spinner>
              ) : errorDueInstallments ? (
                <Alert variant="danger">
                  <AlertCircle className="me-2" />
                  {errorDueInstallments}
                </Alert>
              ) : dueInstallments.length > 0 ? (
                <Table responsive striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Amount</th>
                      <th>Due Date</th>
                      <th>Status</th>
                      <th>Loan ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dueInstallments.map((installment) => (
                      <tr key={installment.id}>
                        <td>${(installment.amount || 0).toLocaleString()}</td>
                        <td>{formatDate(installment.due_date)}</td>
                        <td>
                          <Badge bg={installment.paid ? 'success' : 'warning'}>
                            {installment.paid ? 'Paid' : 'Due'}
                          </Badge>
                        </td>
                        <td>{installment.loan_id}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <Alert variant="info">No due installments found.</Alert>
              )}
            </Card.Body>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center mt-4">
        <Col xs={12} lg={10}>
          <div className="shadow-sm" style={{  backgroundColor: '#2a2a2a',}}>
            <Card.Header as="h2" className="text-center py-4 bg-primary text-white" style={{border: 'none'}}>
              Loan Applications
            </Card.Header>
            <Card.Body>
              {loadingLoanRequests ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading loan applications...</span>
                </Spinner>
              ) : errorLoanRequests ? (
                <Alert variant="danger">
                  <AlertCircle className="me-2" />
                  {errorLoanRequests}
                </Alert>
              ) : loanRequests.length > 0 ? (
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Full Name</th>
                      <th>Purpose</th>
                      <th>Amount</th>
                      <th>Repayment Duration</th>
                      <th>Status</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loanRequests.map((loan) => (
                      <tr key={loan.id}>
                        <td>{loan.full_name || 'N/A'}</td>
                        <td>{loan.purpose || 'N/A'}</td>
                        <td>${(loan.amount || 0).toLocaleString()}</td>
                        <td>{loan.repayment_duration_weeks || 'N/A'} weeks</td>
                        <td>{getStatusBadge(loan.status)}</td>
                        <td>
                          <Button variant="outline-primary" size="sm" onClick={() => handleViewLoan(loan.id)}>View</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <Alert variant="info">No loan applications found.</Alert>
              )}
            </Card.Body>
          </div>
        </Col>
      </Row>

      <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)} 
        size="lg"
        contentClassName="bg-dark text-white"
      >
        <Modal.Header closeButton style={modalStyle.header}>
          <Modal.Title>Loan Request Details</Modal.Title>
        </Modal.Header>
        <Modal.Body style={modalStyle.body}>
          {selectedLoan ? (
            <div style={{background: 'transparent'}}>
              <h4 className="text-primary mt-4">Installment Payments</h4>
              {installmentPayments.length > 0 ? (
                <Table responsive bordered>
                  <thead>
                    <tr>
                      <th>Amount</th>
                      <th>Due Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {installmentPayments.map((payment) => (
                      <tr key={payment.id}>
                        <td>${(payment.amount || 0).toLocaleString()}</td>
                        <td>{formatDate(payment.due_date)}</td>
                        <td>
                          <Badge bg={payment.paid ? 'success' : 'warning'}>
                            {payment.paid ? 'Paid' : 'Pending'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <Alert variant="warning" className="mt-3">No installment payments found for this loan.</Alert>
              )}
              <h4 className="text-primary">Personal Information</h4>
              <Table responsive bordered>
                <tbody>
                  <tr><td><strong>Full Name:</strong></td><td>{selectedLoan.full_name || 'N/A'}</td></tr>
                  <tr><td><strong>Date of Birth:</strong></td><td>{formatDate(selectedLoan.dob)}</td></tr>
                  <tr><td><strong>Address:</strong></td><td>{selectedLoan.address || 'N/A'}</td></tr>
                  <tr><td><strong>Marital Status:</strong></td><td>{selectedLoan.marital_status || 'N/A'}</td></tr>
                  <tr><td><strong>Home Owner:</strong></td><td>{selectedLoan.is_home_owner ? 'Yes' : 'No'}</td></tr>
                  <tr><td><strong>Has Mortgage:</strong></td><td>{selectedLoan.has_mortgage ? 'Yes' : 'No'}</td></tr>
                  <tr><td><strong>Years at Address:</strong></td><td>{selectedLoan.years_at_address || 'N/A'}</td></tr>
                </tbody>
              </Table>

              <h4 className="text-primary mt-4">Employment Information</h4>
              <Table responsive bordered>
                <tbody>
                  <tr><td><strong>Employment Status:</strong></td><td>{selectedLoan.employment_status || 'N/A'}</td></tr>
                  <tr><td><strong>Job Title:</strong></td><td>{selectedLoan.job_title || 'N/A'}</td></tr>
                  <tr><td><strong>Industry:</strong></td><td>{selectedLoan.industry || 'N/A'}</td></tr>
                  <tr><td><strong>Employer Name:</strong></td><td>{selectedLoan.employer_name || 'N/A'}</td></tr>
                  <tr><td><strong>Annual Income:</strong></td><td>${(selectedLoan.annual_income || 0).toLocaleString()}</td></tr>
                  <tr><td><strong>Other Household Income:</strong></td><td>{selectedLoan.has_other_household_income ? 'Yes' : 'No'}</td></tr>
                  {selectedLoan.has_other_household_income && (
                    <tr><td><strong>Other Annual Household Income:</strong></td><td>${(selectedLoan.other_annual_household_income || 0).toLocaleString()}</td></tr>
                  )}
                  <tr><td><strong>Number of Dependents:</strong></td><td>{selectedLoan.number_of_dependents || 'N/A'}</td></tr>
                </tbody>
              </Table>

              <h4 className="text-primary mt-4">Loan Information</h4>
              <Table responsive bordered>
                <tbody>
                  <tr><td><strong>Purpose:</strong></td><td>{selectedLoan.purpose || 'N/A'}</td></tr>
                  <tr><td><strong>Amount:</strong></td><td>${(selectedLoan.amount || 0).toLocaleString()}</td></tr>
                  <tr><td><strong>Repayment Duration:</strong></td><td>{selectedLoan.repayment_duration_weeks || 'N/A'} weeks</td></tr>
                  <tr><td><strong>Payment Type:</strong></td><td>{selectedLoan.payment_type || 'N/A'}</td></tr>
                  <tr><td><strong>Due Date:</strong></td><td>{formatDate(selectedLoan.due_date)}</td></tr>
                  <tr><td><strong>Status:</strong></td><td>{getStatusBadge(selectedLoan.status)}</td></tr>
                  <tr><td><strong>Created At:</strong></td><td>{formatDate(selectedLoan.created_at)}</td></tr>
                  <tr><td><strong>Updated At:</strong></td><td>{formatDate(selectedLoan.updated_at)}</td></tr>
                </tbody>
              </Table>
            </div>
          ) : (
            <Alert variant="warning">No loan details available.</Alert>
          )}
        </Modal.Body>
        <Modal.Footer style={modalStyle.footer}>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal 
  show={showApplyModal} 
  onHide={() => setShowApplyModal(false)} 
  size="lg"
  dialogClassName="modal-override" // Use a custom class to style the modal
>
  <Modal.Body style={{ background: 'transparent', padding: '0' }}>
      <LoanApplicationStepper 
        userToken={userToken}
        onClose={() => setShowApplyModal(false)}
        onSuccess={() => {
          // Show success message and refresh loan requests
          Swal.fire({
            title: 'Success!',
            text: 'Loan request submitted successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          fetchLoanRequests();
        }}
      />
  </Modal.Body>
</Modal>

    </Container>
  );
};

export default LoanApplicationPage;