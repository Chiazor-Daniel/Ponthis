import React, { useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import './cards.css';
import Cards from 'react-credit-cards-2';
import { Navigation } from 'swiper/modules';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Swal from 'sweetalert2';
import CardRequestModal from './CardRequestModal';
import { Button } from 'react-bootstrap';

const SwiperNavButtons = () => {
  const swiper = useSwiper();
  return (
    <>
      <div className="swiper-button-prev card" style={{height: '50px', width: '50px', padding: '10px'}} onClick={() => swiper.slidePrev()}>
        <IoIosArrowBack size={30} />
      </div>
      <div className="swiper-button-next card"  style={{height: '50px', width: '50px', padding: '10px'}}  onClick={() => swiper.slideNext()}>
        <IoIosArrowForward size={40}  />
      </div>
    </>
  );
};

const ImageSwiper = ({ cards: cardData, toggleCardStatus, userToken }) => {
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = (card) => {
    Swal.fire({
      title: card.status === "enabled" ? 'Deactivate Card?' : 'Activate Card?',
      // text: `Do you want to ${card.status === "disabled" ? 'deactivate' : 'activate'} this card?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: card.status === "enabled" ? 'Deactivate' : 'Activate',
      customClass: {
        popup: 'card'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        toggleCardStatus(card.id, card.status);
      }
    });
  };

  return (
    <div className='swiper-container mt-3'>
      {cardData.length > 0 ? (
        <>
          <Swiper
            modules={[Navigation]}
            spaceBetween={50}
            slidesPerView={1}
            loop={true}
            // navigation
          >
            {cardData.map((card) => (
              <SwiperSlide key={card.id} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <div style={{ cursor: 'pointer' }}>
                  <Cards
                    number={card.card_number}
                    name={card.user_id}
                    expiry={card.expiry_date}
                    cvc={card.cvc}
                    preview={true}
                    focused={'number'}
                  />
                  <div onClick={() => handleCardClick(card)} style={{ textAlign: 'center', marginTop: '10px', fontWeight: 'bold', color: card.status === "disabled" ? 'green' : 'red' }}>
                    {card.status === "enabled" ? 'Deactivate' : 'Activate'}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div  style={{display: 'flex', justifyContent: 'center', marginTop: '10px',}}>
            <Button onClick={()=>setShowModal(true)} style={{margin:'auto', background: 'black'}}>Request New Card</Button>
          </div>
          {/* {
            cardData.length > 1 && (
              <SwiperNavButtons />
            )
          } */}
        </>
      ) : (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
          <p style={{textAlign: 'center', marginTop: '50px'}}>
            No cards available
          </p>
          <div  style={{display: 'flex', justifyContent: 'center', marginTop: '10px',}}>
            <Button onClick={()=>setShowModal(true)} style={{margin:'auto', background: 'black'}}>Request New Card</Button>
          </div>
          </div>
      )}
      <CardRequestModal show={showModal} onHide={() => setShowModal(false)} userToken={userToken}/>
    </div>
  );
};

export default ImageSwiper;
