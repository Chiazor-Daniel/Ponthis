import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner, Card } from 'react-bootstrap';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { useGetUserCardsQuery } from '../../redux-contexts/redux/services/transactions';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import CardRequestModal from './swiper/CardRequestModal';
import { BASE_URL } from '../../api';
import axios from 'axios';

const UserCards = () => {
    const { userInfo, userToken } = useSelector(state => state.auth)
  const { data: cards, isLoading: cardsLoading, refetch } = useGetUserCardsQuery(userToken);
  const [showModal, setShowModal] = useState(false);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [isLoadingPendingRequests, setIsLoadingPendingRequests] = useState(true);



  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/cards/get-cards-requests`, {
          headers: {
            'x-token': userToken
          }
        });
        setPendingRequests(response.data);
      } catch (error) {
        console.error('Error fetching pending requests:', error);
      } finally {
        setIsLoadingPendingRequests(false);
      }
    };

    fetchPendingRequests();
  }, [userToken]);
  const toggleCardStatus = async (cardId, currentStatus) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/user/cards/enable-or-disable-cards/${cardId}?card_status=${currentStatus === 'enabled' ? 'disabled' : 'enabled'}`,
        {},
        {
          headers: {
            'x-token': userToken
          }
        }
      );

      if (response.data.status === 'success') {
        refetch(); // Refetch the cards data to update the UI
        Swal.fire({
          title: 'Success!',
          text: `Card has been ${currentStatus === "enabled" ? 'deactivated' : 'activated'}.`,
          icon: 'success',
          
        });
      } else {
        throw new Error('Failed to update card status');
      }
    } catch (error) {
      console.error('Error toggling card status:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to update card status. Please try again.',
        icon: 'error',
       
      });
    }
  };

  const handleCardClick = (card) => {
    Swal.fire({
      title: card.status === "enabled" ? 'Deactivate Card?' : 'Activate Card?',
      // text: `Do you want to ${card.status === "disabled" ? 'deactivate' : 'activate'} this card?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: card.status === "enabled" ? 'Deactivate' : 'Activate',
     
    }).then((result) => {
      if (result.isConfirmed) {
        toggleCardStatus(card.id, card.status);
      }
    });
  };

  if (cardsLoading || isLoadingPendingRequests) {
    return <Spinner animation="border" />;
  }

  return (
    <Container>
      <h2 className="my-4">Your Cards</h2>
      <Row>
        {cards && cards.length > 0 ? (
          cards.map((card) => (
            <Col key={card.id} xs={12} md={6} lg={4} className="mb-4">
              <div style={{ cursor: 'pointer' }} onClick={() => handleCardClick(card)}>
                <Cards
                  number={card.card_number}
                  name={card.cvv ? card.cvv : "***" }
                  expiry={card.expiry_date}
                  cvc={card.cvc}
                  preview={true}
                  focused={'number'}
                />
                <div onClick={() => handleCardClick(card)} style={{ textAlign: 'center', marginTop: '10px', fontWeight: 'bold', color: card.status === "disabled" ? 'green' : 'red' }}>
                    {card.status === "enabled" ? 'Deactivate' : 'Activate'}
                  </div>
              </div>
            </Col>
          ))
        ) : (
          <Col>
            <p>No active cards available</p>
          </Col>
        )}
      </Row>

      <h2 className="my-4">Card Requests</h2>
      <Row>
        {pendingRequests && pendingRequests.length > 0 ? (
          pendingRequests.map((request) => (
            <Col key={request.id} xs={12} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{request.card_type}</Card.Title>
                  <Card.Text>
                    Status: <span style={{ fontWeight: 'bold', color: request.status == 'approved' ? 'green': 'orange' }}>{request.status}</span>
                  </Card.Text>
                  <Card.Text>
                    Request Date: {new Date(request.request_date).toLocaleDateString()}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p>No pending card requests</p>
          </Col>
        )}
      </Row>

      <Row className="mt-4">
        <Col className="text-center">
          <Button onClick={() => setShowModal(true)} style={{ background: 'black' }}>
            Request New Card
          </Button>
        </Col>
      </Row>
      <CardRequestModal show={showModal} onHide={() => setShowModal(false)} refetch={refetch}/>
    </Container>
  );
};

export default UserCards;