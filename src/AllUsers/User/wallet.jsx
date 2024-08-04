import React, { useEffect, useState } from 'react';
import { Form, InputGroup, DropdownButton, Dropdown, Button } from 'react-bootstrap';
import { FaCcVisa } from 'react-icons/fa';
import { SiMastercard } from 'react-icons/si';
import ImageSwiper from './swiper/cardswiper';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import Avatar from 'react-avatar';
import CryptoPurchaseComponent from './assetform';
import { useGetUserCardsQuery } from '../../redux-contexts/redux/services/transactions';
import axios from 'axios'; // Make sure to import axios
import Swal from 'sweetalert2'; // Make sure to import Swal
import { BASE_URL } from '../../api';

const WalletCard = ({ handleTransfer, userToken, refetchUserAssets, currency, refetchAllAssets }) => {
  const [cardType, setCardType] = useState('Visa');
  const [accountNumber, setAccountNumber] = useState('');
  const [transferCurrency, setTransferCurrency] = useState('$');
  const [transferAmount, setTransferAmount] = useState('');
  const [focus, setFocus] = useState('');
  const { data: cards, isLoading: cardsLoading, refetch } = useGetUserCardsQuery(userToken);

  useEffect(() => console.log(cards), [cards]);

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
          customClass: {
            popup: 'card'
          }
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
        customClass: {
          popup: 'card'
        }
      });
    }
  };

  return (
    <div className="col-xl-4 col-12" style={{ height: 'auto', background: '' }}>
      <div className='card'>
        <ImageSwiper cards={cards || []} toggleCardStatus={toggleCardStatus} userToken={userToken}/>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CryptoPurchaseComponent userToken={userToken} refetchUserAssets={refetchUserAssets} currency={currency} refetchAllAssets={refetchAllAssets}/>
        </div>
      </div>
    </div>
  );
};

export default WalletCard;