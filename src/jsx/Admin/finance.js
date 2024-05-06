import React, { useState } from 'react';
import { AiFillBank } from 'react-icons/ai';
import { FaCoins } from 'react-icons/fa';
import { Button, Card, Modal, Form, Tab, Tabs } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useCreateBankDetailsMutation } from '../../redux/services/admin';

const Finance = ({ paymentDetails, token, refetch }) => {
  const [selectedButton, setSelectedButton] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [bankDetails, setBankDetails] = useState(paymentDetails.bank_details);
  const [editedDetail, setEditedDetail] = useState({
    id: '',
    iban: '',
    account_name: '',
    owner: '',
    bank_name: '',
    bic: '',
    reference: ''
  });
  const [createBankDetails, {isLoading: createBankDetailsLoading, error: createBankDetailsError}] = useCreateBankDetailsMutation()

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleButtonClick = (text) => {
    setSelectedButton(text);
  };

  const handleCreateNewBankDetails = () => {
    setEditedDetail({
      id: '',
      iban: '',
      account_name: '',
      owner: '',
      bank_name: '',
      bic: '',
      reference: ''
    });
    handleShowModal();
  };

  const handleSaveBankDetails = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const newBankDetails = {
      iban: formData.get('bankIban'),
      account_name: formData.get('bankAccountName'),
      owner: formData.get('bankOwner'),
      bank_name: formData.get('bankName'),
      bic: formData.get('bankBic'),
      reference: formData.get('bankReference'),
      id: bankDetails.length + 1 // Generate a unique id
    };
    setBankDetails([...bankDetails, newBankDetails]);
  
    try {
      // Show processing message
      Swal.fire({
        title: 'Processing...',
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        }
      });
  
      const result = await createBankDetails({
        token: token,
        key: 'Less Loved',
        bank_name: newBankDetails.bank_name,
        account_name: newBankDetails.account_name,
        iban: newBankDetails.iban,
        bic: newBankDetails.bic,
        reference: newBankDetails.reference
      });
  
      // Close processing message
      Swal.close();
  
      // Show success message
      if(result.data){
        Swal.fire({
          icon: 'success',
          title: 'Bank details created successfully!',
          showConfirmButton: false,
          timer: 1500
        });
        refetch()
      } else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong! Please try again later.',
        });
      }
    } catch (error) {
      // Close processing message
      Swal.close();
  
      // Show error message
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again later.',
      });
  
      console.error("Error creating bank details:", error);
    }
  };

  const handleSaveEditedDetails = () => {
    // Logic to save edited details
    // This can be implemented based on your requirements
    handleCloseModal();
  };

  const handleEditDetails = (bank) => {
    setEditedDetail(bank);
    handleShowModal();
  };

  return (
    <div className='container'>
      <h2 className='text-center'>View Payment Details</h2>
      <div className='d-flex justify-content-center' style={{ gap: "20px" }}>
        <Button
          variant={selectedButton === 'Bank transfer' ? 'primary' : 'secondary'}
          onClick={() => handleButtonClick('Bank transfer')}
          className='mr-3'
        >
          <AiFillBank size={25} />
          <span className='ml-2'>Bank transfer</span>
        </Button>
        <Button
          variant={selectedButton === 'Crypto' ? 'primary' : 'secondary'}
          onClick={() => handleButtonClick('Crypto')}
        >
          <FaCoins size={25} />
          <span className='ml-2'>Crypto</span>
        </Button>
      </div>
      <div className="text-center mt-3">
        <Button variant="success" onClick={handleCreateNewBankDetails}>
          Create new bank details
        </Button>
      </div>
      <div className='mt-4'>
        <Card className='shadow'>
          <Card.Body>
            {selectedButton === 'Bank transfer' && bankDetails.length > 0 ? (
              <ul className='list-unstyled'>
                {bankDetails.map((bank, index) => (
                  <>
                    <li key={index} className='mb-3'>
                      <span className='font-weight-bold'>Bank Name:</span> {bank.bank_name}<br />
                      <span className='font-weight-bold'>IBAN:</span> {bank.iban}<br />
                      <span className='font-weight-bold'>Account Name:</span> {bank.account_name}<br />
                      <span className='font-weight-bold'>Owner:</span> {bank.owner}<br />
                      <span className='font-weight-bold'>BIC:</span> {bank.bic}<br />
                      <span className='font-weight-bold'>Reference:</span> {bank.reference}
                    </li>
                    <Button onClick={() => handleEditDetails(bank)}>Edit Details</Button>
                  </>
                ))}
              </ul>
            ) : (
              <p>No details available</p>
            )}
          </Card.Body>
        </Card>
      </div>

      {/* Modal for creating and editing bank details */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editedDetail.id ? 'Edit' : 'Create'} Bank Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={editedDetail.id ? handleSaveEditedDetails : handleSaveBankDetails}>
            <Form.Group controlId="bankIban">
              <Form.Label>IBAN</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter IBAN"
                required
                value={editedDetail.iban}
                onChange={(e) => setEditedDetail({ ...editedDetail, iban: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="bankAccountName">
              <Form.Label>Account Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter account name"
                required
                value={editedDetail.account_name}
                onChange={(e) => setEditedDetail({ ...editedDetail, account_name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="bankOwner">
              <Form.Label>Owner</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter owner name"
                required
                value={editedDetail.owner}
                onChange={(e) => setEditedDetail({ ...editedDetail, owner: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="bankName">
              <Form.Label>Bank Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter bank name"
                required
                value={editedDetail.bank_name}
                onChange={(e) => setEditedDetail({ ...editedDetail, bank_name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="bankBic">
              <Form.Label>BIC</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter BIC"
                required
                value={editedDetail.bic}
                onChange={(e) => setEditedDetail({ ...editedDetail, bic: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="bankReference">
              <Form.Label>Reference</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter reference"
                required
                value={editedDetail.reference}
                onChange={(e) => setEditedDetail({ ...editedDetail, reference: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {editedDetail.id ? 'Save' : 'Create'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Finance;
