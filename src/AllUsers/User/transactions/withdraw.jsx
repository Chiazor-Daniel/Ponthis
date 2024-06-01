
import React from 'react';
import { AiFillBank } from 'react-icons/ai';
import { HiBanknotes } from 'react-icons/hi2';
import { FaCoins } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { SiMastercard } from 'react-icons/si';
import { MdError } from 'react-icons/md';
import { FaCcVisa } from 'react-icons/fa';
import { FaPaste } from 'react-icons/fa6';
import { MdReportGmailerrorred } from 'react-icons/md';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import useWithdraw from '../../../customHooks/user/transactions/useWithdraw';
import { CgUnavailable } from "react-icons/cg";

const buttons = [
    { icon: <AiFillBank size={25} />, text: 'Bank transfer' },
    { icon: <HiBanknotes size={25} />, text: 'Card payment' }
];

const Withdraw = ({ fetchDataAndDispatch }) => {
    const {
        activeButton,
        cardFormData,
        setcardFormData,
        isWithdrawLoading,
        isWithdrawError,
        withdrawError,
        cardType,
        data,
        isLoading,
        error,
        selectedNetwork,
        setSelectedNetwork,
        cryptoDetails,
        preferredToken,
        bankDetails,
        paymentType,
        myPreferredToken,
        setMyPreferredToken,
        copied,
        setCopied,
        expMonth,
        setExpMonth,
        expYear,
        setExpYear,
        amount,
        setAmount,
        withdrawAddress,
        setWithDrawAddress,
        bankFormData,
        setBankFormData,
        handleButtonClick,
        onCryptoWithdraw,
        handleInputChange,
        handleWalletAddressCopy,
        userInfo,
        handleCardPayment,
        handleBankChange,
        handleBankSubmit
    } = useWithdraw(fetchDataAndDispatch);

    return (
        <>
        {
            userInfo.verified ? (
            <div className='row' style={{ display: 'flex', gap: '10px', height: 'auto',  }}>
                <div className='p-4' style={{ display: 'flex', flexDirection: '', justifyContent: 'center', height: '', gap: '30px' }}>
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
                <div className='card col-lg-9 p-4' style={{ height: '100%', margin: 'auto' }}>
                    <h1>Withdraw via <span>{buttons[activeButton]?.text}</span></h1>
                    {activeButton === 0 && (
                        <p style={{ display: "flex", alignItems: "center" }}> <MdReportGmailerrorred color='#DC6B19' />
                            <span style={{ fontStyle: "italic" }}>
                                Warning: Bank account accepted is only accounts with the name you registered with.
                            </span>
                        </p>
                    )}
                    {activeButton === 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div>
                                <p>Bank Name: </p>
                                <InputGroup className='mb-0' size='lg'>
                                    <Form.Control
                                        aria-label='Amount (to the nearest dollar)'
                                        placeholder='Enter Bank Name'
                                        name='bankName'
                                        value={bankFormData.bankName}
                                        onChange={handleBankChange}
                                        disabled={false}
                                    />
                                </InputGroup>
                            </div>
                            <div>
                                <p>Select Account Type: </p>
                                <Form.Select size='lg' name='accountType' defaultValue={bankFormData.accountType} onChange={handleBankChange}>
                                    <option>Fixed deposit account</option>
                                    <option>Saving account</option>
                                    <option>Current account</option>
                                    <option>Checkings account</option>
                                </Form.Select>
                            </div>
                            <div>
                                <p>Account Name: </p>
                                <InputGroup className='mb-0' size='lg'>
                                    <Form.Control
                                        aria-label='Amount (to the nearest dollar)'
                                        placeholder='Enter Account Name'
                                        name='accountName'
                                        value={bankFormData.accountName}
                                        onChange={handleBankChange}
                                        disabled={false}
                                    />
                                </InputGroup>
                            </div>
                            <div>
                                <p>Enter Account Number: </p>
                                <InputGroup className='mb-0' size='lg'>
                                    <Form.Control
                                        aria-label='Amount (to the nearest dollar)'
                                        placeholder='Enter Account Number'
                                        name='accountNumber'
                                        value={bankFormData.accountNumber}
                                        onChange={handleBankChange}
                                    />
                                    <InputGroup.Text style={{ cursor: 'pointer' }} ><FaPaste /></InputGroup.Text>
                                </InputGroup>
                            </div>
                            <div className='row'>
                                <div className='col-lg-6'>
                                    <p>BIC: </p>
                                    <InputGroup className='mb-0' size='lg'>
                                        <Form.Control
                                            aria-label='Amount (to the nearest dollar)'
                                            placeholder='Enter BIC'
                                            name='bic'
                                            value={bankFormData.bic}
                                            onChange={handleBankChange}
                                            disabled={false}
                                        />
                                    </InputGroup>
                                </div>
                                <div className='col-lg-6'>
                                    <p>IBAN: </p>
                                    <InputGroup className='mb-0' size='lg'>
                                        <Form.Control
                                            aria-label='Amount (to the nearest dollar)'
                                            placeholder='Enter IBAN'
                                            name='iban'
                                            value={bankFormData.iban}
                                            onChange={handleBankChange}
                                            disabled={false}
                                        />
                                    </InputGroup>
                                </div>
                            </div>
                            <div className='col-4'>
                                <p>Amount: </p>
                                <InputGroup className='mb-0' size='lg'>
                                    <InputGroup.Text style={{ cursor: 'pointer' }} >$</InputGroup.Text>
                                    <Form.Control
                                        aria-label='Amount (to the nearest dollar)'
                                        placeholder='Enter Amount'
                                        name='amount'
                                        value={bankFormData.amount}
                                        onChange={handleBankChange}
                                    />
                                </InputGroup>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }} className='p-4'>
                                <button className='btn btn-primary' onClick={handleBankSubmit}>Request Withdrawal</button>
                            </div>
                        </div>
                    )}
                
                    {activeButton === 1 && (
                        <>
                            <Form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                <Form.Group controlId="cardHolder">
                                    <Form.Label> Card Holder Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter card holder name" value={cardFormData.card.cardHolder} onChange={handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="cardNumber">
                                    <Form.Label>Card Number</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text id="basic-addon1">
                                            {!cardFormData.cardNumber?.length <= 15 ? (
                                                cardType === 'mastercard' ? <SiMastercard size={20} /> :
                                                    cardType === 'visa' ? <FaCcVisa size={20} /> :
                                                        <MdError size={20} color='#E72929' />
                                            ) : <MdError size={20} color='#E72929' />}
                                        </InputGroup.Text>
                                        <Form.Control type="text" placeholder="Enter credit card number" value={cardFormData.card.cardNumber} onChange={handleInputChange} />
                                    </InputGroup>
                                    <p>
                                        {!cardFormData?.cardNumber?.length <= 15 ? (
                                            cardType === 'mastercard' ? 'Mastercard' :
                                                cardType === 'visa' ? 'Visa' :
                                                    'Invalid card'
                                        ) : 'Invalid card'}
                                    </p>
                                </Form.Group>
                                <div className='row'>
                                    <Form.Group controlId="expiryDate" className='col-lg-4'>
                                        <Form.Label>Expiry Date</Form.Label>
                                        <div className='row' style={{ display: "flex", alignItems: "center" }}>
                                            <Form.Group controlId="expiryMonth" className='col-lg-4'>
                                                <Form.Control type="text" placeholder="MM" value={expMonth} onChange={(e) => setExpMonth(e.target.value)} />
                                            </Form.Group>
                                            <span className='col-lg-1'>/</span>
                                            <Form.Group controlId="expiryYear" className='col-lg-4'>
                                                <Form.Control type="text" placeholder="YY" value={expYear} onChange={(e) => setExpYear(e.target.value)} />
                                            </Form.Group>
                                        </div>
                                    </Form.Group><Form.Group controlId="cvv" className='col-lg-4'>
                                        <Form.Label>CVV</Form.Label>
                                        <Form.Control type="text" placeholder="Enter CVV" value={cardFormData?.cvv} onChange={handleInputChange} />
                                    </Form.Group>
                                </div>
                                <Form.Group controlId="cvv" className='col-lg-4 mt-4'>
                                    <Form.Label>Amount</Form.Label>
                                    <InputGroup className='mb-0' size='lg'>
                                        <InputGroup.Text style={{ cursor: 'pointer' }} >$</InputGroup.Text>
                                        <Form.Control aria-label='Amount (to the nearest dollar)' placeholder='Enter Amount' value={amount} onChange={(e) => setAmount(e.target.value)} />
                                    </InputGroup>
                                </Form.Group>
                            </Form>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }} className='p-4'>
                                <button className='btn btn-primary' onClick={handleCardPayment}>Continue</button>
                            </div>
                        </>
                    )}
                </div>
            </div >
            ): (
                <div style={{height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                    <p style={{fontSize: '2.5rem', fontWeight: ''}}><CgUnavailable /> Withdrawal Unavailable</p>
                    <p   style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>Click to verify your account for withdrawal</p>
                </div>
            )
        }
        
        </>
        )
};
export default Withdraw;
