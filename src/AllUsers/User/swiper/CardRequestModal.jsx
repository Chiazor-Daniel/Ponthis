import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Stepper } from 'react-form-stepper';
import { BASE_URL } from '../../../api';
import { useSelector } from 'react-redux';
import axios from 'axios';

const CardRequestModal = ({ show, onHide, refetch }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [cardReason, setCardReason] = useState('');
  const {userToken} = useSelector(state=>state.auth)
  const [cardType, setCardType] = useState('');
  const [cardPurpose, setCardPurpose] = useState('');
  const [minTransaction, setMinTransaction] = useState('');
  const [maxTransaction, setMaxTransaction] = useState('');

 

  const handleSubmit = async (event) => {
    // event.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/user/cards/request`,
        {
          card_type: cardType.toLocaleLowerCase(),
          
        },
        {
          headers: {
            'x-token': userToken, // Replace with your token
          },
        }
      );
    
      onHide();
      if(response){
        setTimeout(() => {
          refetch && refetch()
          Swal.fire({
            title: 'Request Sent',
            text: 'Your card request has been submitted successfully!',
            icon: 'success',
           
          });
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to submit card request. Please try again.',
        icon: 'error',
      
      });
    }
  };

  const cardPurposes = ['Personal', 'Business', 'Travel', 'Student', 'Others'];
  const cardReasons = ['New Card', 'Replacement', 'Additional Card'];
  const cardTypes = ['Visa Card', 'Master Card', 'American Express Card'];

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Request New Card</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stepper activeStep={activeStep} steps={['Card Reason', 'Card Type', 'Card Purpose', 'Transaction Limits', 'Confirmation']} />
        <Form className="mt-4">
          {activeStep === 0 && (
            <div>
              <h4 className="mb-3">Reason for card request</h4>
              {cardReasons.map((reason, index) => (
                <Form.Check
                  key={index}
                  type="radio"
                  id={`reason-${reason}`}
                  label={reason}
                  value={reason}
                  checked={cardReason === reason}
                  onChange={(e) => setCardReason(e.target.value)}
                  className="mb-2"
                />
              ))}
            </div>
          )}
          {activeStep === 1 && (
            <div>
              <h4 className="mb-3">Select Card Type</h4>
              {cardTypes.map((type, index) => (
                <Form.Check
                  key={index}
                  type="radio"
                  id={`cardType-${type}`}
                  label={type}
                  value={type}
                  checked={cardType === type}
                  onChange={(e) => setCardType(e.target.value)}
                  className="mb-2"
                />
              ))}
            </div>
          )}
          {activeStep === 2 && (
            <div>
              <h4 className="mb-3">What do you want to use the card for?</h4>
              {cardPurposes.map((purpose, index) => (
                <Form.Check
                  key={index}
                  type="radio"
                  id={`purpose-${purpose}`}
                  label={purpose}
                  value={purpose}
                  checked={cardPurpose === purpose}
                  onChange={(e) => setCardPurpose(e.target.value)}
                  className="mb-2"
                />
              ))}
            </div>
          )}
          {activeStep === 3 && (
            <div>
              <h4 className="mb-3">Set Transaction Limits</h4>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Minimum Transaction:</Form.Label>
                    <Form.Control
                      type="number"
                      value={minTransaction}
                      onChange={(e) => setMinTransaction(e.target.value)}
                      placeholder="Enter minimum amount"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Maximum Transaction (optional):</Form.Label>
                    <Form.Control
                      type="number"
                      value={maxTransaction}
                      onChange={(e) => setMaxTransaction(e.target.value)}
                      placeholder="Enter maximum amount"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          )}
          {activeStep === 4 && (
            <div>
              <h4 className="mb-3">Confirm Your Request</h4>
              <p>Please review your card request details before submitting.</p>
            </div>
          )}
          <div className="d-flex justify-content-between mt-4">
            {activeStep > 0 && (
              <Button variant="secondary" onClick={() => setActiveStep(activeStep - 1)}>Back</Button>
            )}
            {activeStep < 4 && (
              <Button variant="primary" onClick={() => setActiveStep(activeStep + 1)}>Next</Button>
            )}
        {activeStep === 4 && <Button onClick={handleSubmit}>Submit</Button>}
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CardRequestModal;