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
import { FaPaste } from "react-icons/fa6";
import { MdReportGmailerrorred } from "react-icons/md";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Tooltip from 'react-bootstrap/Tooltip';
import ExampleComponent from '../sweetAlert';
import { useEffect } from 'react';
import { MdErrorOutline } from "react-icons/md";
import { MdRunningWithErrors } from "react-icons/md";
import swal from 'sweetalert';
import { useSelector } from 'react-redux';
import { useGetPaymentDetailsQuery } from '../../../redux/services/paymentDetails';
import { useWithdrawMutation } from '../../../redux/services/transactions';
import { RingLoader } from "react-spinners";
import ReactDOMServer from 'react-dom/server';

const buttons = [
    { icon: <AiFillBank size={25} />, text: 'Bank transfer' },
    { icon: <FaCoins size={25} />, text: 'Crypto' },
    { icon: <HiBanknotes size={25} />, text: 'Card payment' }
];

const Withdraw = () => {
    const [activeButton, setActiveButton] = useState(1);
    const [cardFormData, setcardFormData] = useState({
        card: {
            cardNumber: "5455532872782332",
            cardHolder: "Mike Larry",
            expiryDate: "12/12",
            cvv: "122"
        }
    });
    const [withdraw, { isLoading: isWithdrawLoadin, isError: isWithdrawError, error: withdrawError }] = useWithdrawMutation();
    const [cardType, setCardType] = useState(null);
    const { userToken } = useSelector(state => state.auth);
    const { data, isLoading, error } = useGetPaymentDetailsQuery(userToken)
    const [selectedNetwork, setSelectedNetwork] = useState('');
    const [cryptoDetails, setCryptoDetails] = useState(data?.data?.crypto_details || null);
    const preferredToken = data?.data?.crypto_details.find(detail => detail.network_chain === selectedNetwork)?.preferred_token;
    const bankDetails = data?.data?.bank_details;
    const [paymentType, setPaymentType] = useState('');
    const [myPreferredToken, setMyPreferredToken] = useState(preferredToken)
    const [copied, setCopied] = useState(false)
    const [expMonth, setExpMonth] = useState("")
    const [expYear, setExpYear] = useState("")
    const [amount, setAmount] = useState(50);
    const[withdrawAddress, setWithDrawAddress] = useState("0x3F5E5b1b37D8A43D5992bAB2D161564C7Ea7B8C9")
    const handleButtonClick = (index) => {
        setActiveButton(index);
        let newPaymentType = "";
        switch (index) {
            case 0:
                newPaymentType = 'bank-payment';
                break;
            case 1:
                newPaymentType = 'crypto-payment';
                break;
            case 2:
                newPaymentType = 'card-payment';
                break;
            default:
                break;
        }
        setPaymentType(newPaymentType);
        // alert(newPaymentType);
    };
    const onCryptoWithdraw = async () => {
        try {
          // Show loading spinner
          const loadingElement = ReactDOMServer.renderToString(
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: "column", padding: "100px", alignItems: "center" }}>
              <RingLoader color="#36d7b7" size={100} />
              <p>Processing Withdrawal...</p>
            </div>
          );
      
          let loadingToast = swal({
            title: '',
            content: {
              element: 'div',
              attributes: {
                innerHTML: loadingElement,
              },
            },
            buttons: false,
            closeOnClickOutside: false,
            closeOnEsc: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
          })
      
          const response = await withdraw({
            amount: 100, 
            type: "cryptocurrency", 
            wallet_address: withdrawAddress, 
            network_chain: myPreferredToken,
            preferred_token: selectedNetwork, 
            token: userToken 
          });
      
          swal.close();
      
          const status = response.data[0]?.data?.status;
      
          console.log("Withdrawal status:", status);
      
          if (status === "success") {
            swal({
              title: "Withdrawal Successful",
              text: `Your withdrawal has been successfully processed!`,
              icon: "success",
            });
          }
        } catch (error) {
          console.error("Error occurred during withdrawal:", error);
          swal({
            title: "Error",
            text: "An error occurred during withdrawal. Please try again later.",
            icon: "error",
          });
        }
      };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        const field = id.split('-')[0]; // Extract the field name from the controlId

        if (field === 'cardNumber' && value.length <= 15) {
            // Card type detection logic
            const firstDigit = value.charAt(0);
            if (firstDigit === '5') {
                setCardType('mastercard');
            } else if (firstDigit === '4') {
                setCardType('visa');
            } else {
                setCardType(null);
            }
        }

        // Update the state based on the field name
        setcardFormData(prevState => ({
            ...prevState,
            card: {
                ...prevState.card,
                [field]: value
            }
        }));
    };





    const handleNetworkChange = (event) => {
        const selectedNetwork = event.target.value;
        setSelectedNetwork(selectedNetwork);
        const selectedCryptoDetail = data?.data?.crypto_details.find(detail => detail.network_chain === selectedNetwork);
        if (selectedCryptoDetail) {
            setcardFormData(prevState => ({
                ...prevState,
                walletAddress: selectedCryptoDetail.wallet_address
            }));
        }
    };


    const handleWalletAddressCopy = () => {
        navigator.clipboard.writeText(cardFormData.walletAddress).then(() => {
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 1000); // Reset copied state after 3 seconds
        }).catch((error) => {
            console.error('Failed to copy: ', error);
        });
    };

    useEffect(() => {
        if (expMonth && expYear) {
            setcardFormData(prevState => ({
                ...prevState,
                card: {
                    ...prevState.card,
                    expiryDate: expMonth + '/' + expYear
                }
            }));
        }
    }, [expMonth, expYear]);

    const handleContinueButtonClick = async () => {
        const loadingElement = ReactDOMServer.renderToString(<div style={{ display: 'flex', justifyContent: 'center', flexDirection: "column", padding: "100px", alignItems: "center" }}><RingLoader color="#36d7b7" size={100} /><p>Processing Withdrawal...</p></div>);

        let loadingToast = swal({
            title: '',
            content: {
                element: 'div',
                attributes: {
                    innerHTML: loadingElement,
                },
            },
            buttons: false,
            closeOnClickOutside: false,
            closeOnEsc: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
        });

        try {
            const response = await withdraw({ amount: amount, type: "card-payment", card_number: cardFormData.card.cardNumber, expiry_date: expMonth + '/' + expYear, cvv: cardFormData.card.cvv, token: userToken });

            // Extracting the status from the response
            const status = response.data[0]?.data?.status;

            console.log("Withdrawal status:", status);
            console.log("card", cardFormData);

            if (status === "success") {
                // Close loading spinner
                swal.close();

                // Custom SweetAlert for success
                swal({
                    title: "Withdrawal Submitted",
                    text: "Your withdrawal has been successfully processed!",
                    icon: "success",
                });
            }

        } catch (error) {
            // Close loading spinner
            swal.close();

            console.error("Error occurred during withdrawal:", error);
            // Handle error, such as displaying an error message to the user
            swal({
                title: "Error",
                text: "An error occurred during withdrawal. Please try again later.",
                icon: "error",
            });
        }
    };


    return (
        <div className='row p-4' style={{ display: 'flex', gap: '30px', height: 'auto' }}>
            <div className='card col-lg-2 p-4' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '500px' }}>
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
                <h1>Withdraw via <span>{buttons[activeButton]?.text}</span></h1>
                {
                    activeButton === 0 && (
                        <p style={{ display: "flex", alignItems: "center" }}> <MdReportGmailerrorred color='#DC6B19' />
                            <span style={{ fontStyle: "italic" }}>
                                Warning: Bank account accepted is only accounts with the name you registered with.
                            </span>
                        </p>
                    )
                }
                {activeButton === 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div>
                            <p>Bank Name: </p>
                            <InputGroup className='mb-0' size='lg'>
                                <Form.Control aria-label='Amount (to the nearest dollar)' placeholder='Enter Bank Name' disabled={false} />
                            </InputGroup>
                        </div>
                        <div>
                            <p>Select Account Type: </p>
                            <Form.Select size='lg'>
                                <option>Fixed deposit account</option>
                                <option>Saving account</option>
                                <option>Current account</option>
                                <option>Checkings account</option>
                            </Form.Select>
                        </div>
                        <div>
                            <p>Account Name: </p>
                            <InputGroup className='mb-0' size='lg'>
                                <Form.Control aria-label='Amount (to the nearest dollar)' placeholder='Enter Account Name' disabled={false} />
                            </InputGroup>
                        </div>
                        <div>
                            <p>Enter Account Number: </p>
                            <InputGroup className='mb-0' size='lg'>
                                <Form.Control aria-label='Amount (to the nearest dollar)' placeholder='Enter Account Number' />
                                <InputGroup.Text style={{ cursor: 'pointer' }} ><FaPaste /></InputGroup.Text>
                            </InputGroup>
                        </div>
                        <div className='row'>
                            <div className='col-lg-6'>
                                <p>BIC: </p>
                                <InputGroup className='mb-0' size='lg'>
                                    <Form.Control aria-label='Amount (to the nearest dollar)' placeholder='Enter BIC' disabled={false} />
                                </InputGroup>
                            </div>
                            <div className='col-lg-6'>
                                <p>IBAN: </p>
                                <InputGroup className='mb-0' size='lg'>
                                    <Form.Control aria-label='Amount (to the nearest dollar)' placeholder='Enter IBAN' disabled={false} />
                                </InputGroup>
                            </div>
                        </div>
                        <div className='col-4'>
                            <p>Amount: </p>
                            <InputGroup className='mb-0' size='lg'>
                                <InputGroup.Text style={{ cursor: 'pointer' }} >$</InputGroup.Text>
                                <Form.Control aria-label='Amount (to the nearest dollar)' placeholder='Enter Amount' />
                            </InputGroup>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }} className='p-4'>
                            <button className='btn btn-primary'>Request Withdrawal</button>
                        </div>

                    </div>
                )}
                {
                    activeButton === 1 ? (
                        !isLoading && cryptoDetails?.length > 1 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <div>
                                    <p>Network Chain</p>
                                    <Form.Select size='lg' onChange={handleNetworkChange}>
                                        <option value="" disabled selected>Select Network</option>
                                        {cryptoDetails && data?.data?.crypto_details.map(detail => (
                                            <option key={detail.id} value={detail.network_chain}>{detail.network_chain}</option>
                                        ))}
                                    </Form.Select>
                                </div>
                                <div>
                                    <p>Preferred Token:</p>
                                    <Form.Control
                                        aria-label='Wallet Address'
                                        placeholder='Preferred Token'
                                        value={preferredToken}
                                        readOnly
                                    />
                                </div>

                                {cryptoDetails && (
                                    <div>
                                        <p>Wallet Address:</p>
                                        <InputGroup className='mb-3' size='lg'>
                                            <Form.Control
                                                aria-label='Wallet Address'
                                                placeholder='Wallet Address'
                                                value={withdrawAddress}
                                                onChange={(e)=>setWithDrawAddress(e.target.value)}
                                            />
                                            <OverlayTrigger
                                                trigger="hover"
                                                placement="top"
                                                overlay={
                                                    <Tooltip id={`tooltip-top`}>
                                                        Paste Address
                                                    </Tooltip>
                                                }
                                            >
                                                <InputGroup.Text style={{ cursor: 'pointer' }} onClick={()=>alert("pasted")}>
                                                <FaPaste />
                                                </InputGroup.Text>
                                            </OverlayTrigger>
                                        </InputGroup>
                                    </div>
                                )}
                                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }} className='p-4' onClick={() => onCryptoWithdraw()}>
                                    <button className='btn btn-primary'>Make Deposit</button>
                                </div>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: "400px", justifyContent: "center", alignItems: "center" }}>
                                <MdRunningWithErrors color='gray' size={50} style={{ fontSize: "1rem", opacity: 0.5 }} />
                                <p style={{ fontSize: "2rem", opacity: 0.5 }}>Method Unavialable in your Region</p>
                            </div>
                        )
                    ) : null
                }
                {
                    activeButton === 2 && (
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
                                    </Form.Group>

                                    <Form.Group controlId="cvv" className='col-lg-4'>
                                        <Form.Label>CVV</Form.Label>
                                        <Form.Control type="text" placeholder="Enter CVV" value={cardFormData?.cvv} onChange={handleInputChange} />
                                    </Form.Group>
                                </div>
                                <Form.Group controlId="cvv" className='col-lg-4 mt-4'>
                                    <Form.Label>Amount</Form.Label>
                                    <InputGroup className='mb-0' size='lg'>
                                        <InputGroup.Text style={{ cursor: 'pointer' }} >$</InputGroup.Text>
                                        <Form.Control aria-label='Amount (to the nearest dollar)' placeholder='Enter Amount' value={amount}/>
                                    </InputGroup>
                                </Form.Group>
                            </Form>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }} className='p-4'>
                                <button className='btn btn-primary' onClick={handleContinueButtonClick}>Continue</button>


                            </div>
                        </>
                    )
                }


            </div>
        </div >
    );
};

export default Withdraw;
