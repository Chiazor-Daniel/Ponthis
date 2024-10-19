import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import Cards from 'react-credit-cards-2';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Swal from 'sweetalert2';
import 'swiper/css/navigation';
import axios from 'axios';
import { BASE_URL } from '../../api';
import { format } from 'date-fns';

const UserCards = ({ cards, handleUpdateCardRequest, adminToken, user_id, refetch }) => {
  const [showModal, setShowModal] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cardType, setCardType] = useState('');
  const [updateModal, setUpdateModal] = useState(false);
  const [cardRequestId, setCardRequestId] = useState('');
  const [cardRequestStatus, setCardRequestStatus] = useState('approved');
  const [userCards, setUserCards] = useState([]);

  useEffect(() => {
    fetchUserCards();
  }, []);

  const fetchUserCards = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/user/view-all-user-cards/${user_id}`, {
        headers: {
          'x-token': adminToken,
        },
      });
      if (response.data) {
        setUserCards(response.data);
      } else {
        setUserCards([])
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to fetch user cards',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleDelete = async (cardId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(`${BASE_URL}/admin/user/delete-user-card/${cardId}/?user_id=${user_id}`, {
        
          headers: {
            'Content-Type': 'application/json',
            'x-token': adminToken,
          },
        });

        if (response.data.status === 'success') {
          fetchUserCards();
          Swal.fire(
            'Deleted!',
            'The card has been deleted.',
            'success'
          );
        } else {
          Swal.fire(
            'Error!',
            'Failed to delete card',
            'error'
          );
        }
      } catch (error) {
        Swal.fire(
          'Error!',
          'Failed to delete card',
          'error'
        );
      }
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/admin/user/create-card/${user_id}`, {
        card_number: cardNumber,
        expiry_date: expiryDate,
        cvv: cardCvv,
        card_type: cardType?.toLowerCase(),
      }, {
        headers: {
          'Content-Type': 'application/json',
          'x-token': adminToken,
        },
      });
      if (response.data.status === 'success') {
        fetchUserCards()
        refetch()
        Swal.fire({
          title: 'Success!',
          text: response.data.message,
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to create card',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to create card',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };
  
  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`${BASE_URL}/admin/user/change-card-requests/${user_id}`, null, {
        params: {
          card_request_id: cardRequestId,
          card_request_status: cardRequestStatus,
        },
        headers: {
          'Content-Type': 'application/json',
          'x-token': adminToken,
        },
      });
      if (response.data.status === 'success') {
        refetch()
        Swal.fire({
          title: 'Success!',
          text: response.data.message,
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to update card request',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update card request',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };
  

  return (
    <div className="" style={{ padding: '20px', marginTop: '20px' }}>
      <div className="request-date" style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', marginBottom: '5px' }}>
        <h3>User Card </h3>
        <Button onClick={() => setShowModal(true)}>Create Card</Button>
      </div>
      <Swiper
        slidesPerView={3}
        spaceBetween={0}
        slidesPerGroup={3}
        loop={true}
        loopFillGroupWithBlank={true}
      >
        {Array.isArray(userCards) && userCards.map((card) => (
          <SwiperSlide key={card.id}>
            <Col className="mb-3">
              <Cards
                number={card.card_number}
                name={card.cvv ? card.cvv : "***" }
                expiry={card.expiry_date}
                cvc="***"
                preview={true}
                focused={'number'}
              />
              <div className="card-info" style={{ marginTop: '10px', width: '', background: '' }}>
                <div className="status" style={{ display: 'flex', justifyContent: 'center', marginBottom: '5px' }}>
                  <span className="label" style={{ fontWeight: 'bold' }}>Type:</span>
                  <span className="value" style={{ color: '#666' }}>{card.card_type}</span>
                </div>
                <div className="request-date" style={{ display: 'flex', justifyContent: 'center', marginBottom: '5px' }}>
                  <button
                    className="btn btn-danger mt-2"
                    style={{ backgroundColor: '#dc3545', borderColor: '#dc3545' }}
                    onClick={() => handleDelete(card.id)}
                  >
                    Delete Card
                  </button>
                </div>
              </div>
            </Col>
          </SwiperSlide>
        ))}
      </Swiper>
      <h3>User Card Requests</h3>

      <Swiper
        slidesPerView={3}
        spaceBetween={0}
        slidesPerGroup={3}
        loop={true}
        loopFillGroupWithBlank={true}
        // navigation={true}
      >
        {cards.status != 'error' && cards.map((card) => (
          <SwiperSlide key={card.id}>
            <Col className="mb-3">
              <Cards
                number={card.card_type === 'visa card' ? '4111 1111 1111 1111' : '5105 1051 0510 5100'}
                name={card.cvv ? card.cvv : "***" }
                expiry={card.approve_date ? format(new Date(card.approve_date), 'MM/yy') : 'MM/YY'}
                cvc="123"
                preview={true}
                focused={'number'}
              />
              <div className="card-info" style={{ marginTop: '10px', width: '', background: '' }}>
                <div className="status" style={{ display: 'flex', justifyContent: 'center', marginBottom: '5px' }}>
                  <span className="label" style={{ fontWeight: 'bold' }}>Status:</span>
                  <span className="value" style={{ color: '#666' }}>{card.status}</span>
                </div>
                <div className="request-date" style={{ display: 'flex', justifyContent: 'center', marginBottom: '5px' }}>
                  <span className="label" style={{ fontWeight: 'bold' }}>Request Date:</span>
                  <span className="value" style={{ color: '#666' }}>{format(new Date(card.request_date), 'MMM d, yyyy')}</span>
                </div>
                <div className="request-date" style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '5px' }}>
                  <button
                    className="btn btn-primary mt-2"
                    style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
                    onClick={() => {
                      setUpdateModal(true);
                      setCardRequestId(card.id);
                    }}
                  >
                    Update Card Request
                  </button>
                  {/* <button
                    className="btn btn-danger mt-2"
                    style={{ backgroundColor: '#dc3545', borderColor: '#dc3545' }}
                    onClick={() => handleDelete(card.id)}
                  >
                    Delete Card
                  </button> */}
                </div>
              </div>
            </Col>
          </SwiperSlide>
        ))}
      </Swiper>
      <Modal show={showModal} onHide={() => setShowModal(false)} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Create</Modal.Title>
          </Modal.Header>
        <Modal.Body>
          <span style={{color: 'orange', fontSize: '0.8rem', padding: '50px', textAlign: 'center'}}>Card number must be greater than 13</span>
          <Form>
            <Form.Group controlId="cardNumber">
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                type="text"
                value={cardNumber}
                onChange={(event) => setCardNumber(event.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="expiryDate">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="text"
                value={expiryDate}
                onChange={(event) => setExpiryDate(event.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="cardNumber">
              <Form.Label>Card CVV</Form.Label>
              <Form.Control
                type="text"
                value={cardCvv}
                onChange={(event) => setCardCvv(event.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="cardType">
              <Form.Label>Card Type</Form.Label>
              <Form.Control
                as="select"
                value={cardType}
                onChange={(event) => setCardType(event.target.value)}
              >
                <option value="visa card">Visa Card</option>
                <option value="master card">Master card</option>
                <option value="american express card">american express card</option>
              </Form.Control>
            </Form.Group>
            <Button onClick={handleSubmit}>Create Card</Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={updateModal} onHide={() => setUpdateModal(false)} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Update Card Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="cardRequestStatus">
              <Form.Label>Card Request Status</Form.Label>
              <Form.Control
                as="select"
                value={cardRequestStatus}
                onChange={(event) => setCardRequestStatus(event.target.value)}
              >
                {/* <option value="pending">Pending</option> */}
                <option value="approved">Approved</option>
                <option value="declined">Declined</option>
              </Form.Control>
            </Form.Group>
            <Button onClick={handleUpdate}>Update Card Request</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserCards;