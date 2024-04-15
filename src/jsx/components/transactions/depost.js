import React, { useState } from 'react';
import { AiFillBank } from 'react-icons/ai';
import { HiBanknotes } from 'react-icons/hi2';
import { FaCoins } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaCopy } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import { SiMastercard } from "react-icons/si";
import { RiVisaFill } from "react-icons/ri";
import { MdError } from "react-icons/md";
import { FaCcVisa } from "react-icons/fa";

const buttons = [
    { icon: <AiFillBank size={25} />, text: 'Bank transfer' },
    { icon: <FaCoins size={25} />, text: 'Crypto' },
    { icon: <HiBanknotes size={25} />, text: 'Card payment' }
];

const Deposit = () => {
    const [activeButton, setActiveButton] = useState(1);
    const [formData, setFormData] = useState({
        cardNumber: "",
        cardHolder: "",
        expiryDate: "",
        cvv: ""
    });
    const [cardType, setCardType] = useState(null);

    const handleButtonClick = (index) => {
        setActiveButton(index);
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });

        // Check the card type based on the first digit of the card number
        if (id === 'cardNumber' && value.length <= 15) {
            const firstDigit = value.charAt(0);
            if (firstDigit === '5') {
                setCardType('mastercard');
            } else if (firstDigit === '4') {
                setCardType('visa');
            } else {
                setCardType(null); // Invalid card number
            }
        }
    };

    return (
        <div className='row p-4' style={{ display: 'flex', gap: '30px', height: '600px' }}>
            <div className='card col-lg-2 p-4' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '100%' }}>
                {buttons.map((button, index) => (
                    <button
                        key={index}
                        className={`btn btn-primary p-4 ${activeButton === index ? 'active' : ''}`}
                        style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                        onClick={() => handleButtonClick(index)}
                    >
                        {button.icon}
                        <span>{button.text}</span>
                    </button>
                ))}
            </div>
            <div className='card col-lg-9 p-4' style={{ height: '100%' }}>
                <h1>Deposit via <span>{buttons[activeButton]?.text}</span></h1>
                {activeButton === 1 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div>
                            <p>Preferred network: </p>
                            <Form.Select size='lg'>
                                <option>Ethereum</option>
                                <option>BND</option>
                            </Form.Select>
                        </div>
                        <div>
                            <p>Wallet Address: </p>
                            <InputGroup className='mb-3' size='lg'>
                                <Form.Control aria-label='Amount (to the nearest dollar)' placeholder='Enter wallet address' />
                                <InputGroup.Text style={{ cursor: 'pointer' }} ><FaCopy /></InputGroup.Text>
                            </InputGroup>
                        </div>
                        <div>
                            <p>Assets: </p>
                            <Form.Select size='lg'>
                                <option>BNDBTC</option>
                                <option>BND</option>
                            </Form.Select>
                        </div>
                    </div>
                )}
                {
                    activeButton === 2 && (
                        <>
                            <Form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                <Form.Group controlId="cardHolder">
                                    <Form.Label> Card Holder Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter card holder name" value={formData.cardHolder} onChange={handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="cardNumber">
                                    <Form.Label>Card Number</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text id="basic-addon1">
                                            {formData.cardNumber.length <= 15 ? (
                                                cardType === 'mastercard' ? <SiMastercard size={20} /> :
                                                    cardType === 'visa' ? <FaCcVisa size={20} /> :
                                                        <MdError size={20} color='#E72929'/>
                                            ) : <MdError size={20} color='#E72929'/>}
                                        </InputGroup.Text>


                                        <Form.Control type="text" placeholder="Enter credit card number" value={formData.cardNumber} onChange={handleInputChange} />
                                    </InputGroup>
                                    <p>
                                        {formData.cardNumber.length <= 15 ? (
                                            cardType === 'mastercard' ? 'Mastercard' :
                                                cardType === 'visa' ? 'Visa' :
                                                    'Invalid card'
                                        ) : 'Invalid card'}
                                    </p>

                                </Form.Group>
                                <div className='row'>
                                    <Form.Group controlId="expiryDate" className='col-lg-4'>
                                        <Form.Label>Expiry Date</Form.Label>
                                        <div className='row' style={{display: "flex", alignItems: "center"}}>
                                            <Form.Group controlId="expiryMonth" className='col-lg-4'>
                                                <Form.Control type="text" placeholder="MM" value={formData.expiryDate.substring(0, 2)} onChange={(e) => handleInputChange({ target: { id: "expiryDate", value: e.target.value + formData.expiryDate.substring(2) } })} />
                                            </Form.Group>
                                            <span className='col-lg-1'>/</span>
                                            <Form.Group controlId="expiryYear" className='col-lg-4'>
                                                <Form.Control type="text" placeholder="YY" value={formData.expiryDate.substring(3)} onChange={(e) => handleInputChange({ target: { id: "expiryDate", value: formData.expiryDate.substring(0, 3) + e.target.value } })} />
                                            </Form.Group>
                                        </div>

                                    </Form.Group>
                                    <Form.Group controlId="cvv" className='col-lg-4'>
                                        <Form.Label>CVV</Form.Label>
                                        <Form.Control type="text" placeholder="Enter CVV" value={formData.cvv} onChange={handleInputChange} />
                                    </Form.Group>
                                </div>
                            </Form>
                        </>
                    )
                }
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }} className='p-4'>
                    <button className='btn btn-primary'>Continue</button>
                </div>
            </div>
        </div>
    );
};

export default Deposit;
