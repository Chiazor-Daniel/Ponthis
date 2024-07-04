import React, { useEffect, useState } from 'react';
import { Nav, Tab, Form, Button, Spinner, Dropdown, InputGroup } from 'react-bootstrap';
import BalanceCardSlider from './dashboard-components/BalanceCardSlider';
import OrderForm from './dashboard-components/OrderForm';
import { LtcIcon, BtcIcon, XtzIcon, EthIcon } from './SvgIcon';
import { useSelector } from 'react-redux';
import { MyChart } from '../../jsx/components/myChart';
import Swal from 'sweetalert2';
import { IoDiamondSharp } from "react-icons/io5";
import { useResponsive } from '../../redux-contexts/context/responsive';
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { RiTokenSwapFill } from "react-icons/ri";
import { useTrade } from '../../customHooks/user/userDashboard/useTrade';// Import the custom hook
import AdminTable from '../../jsx/components/table/FilteringTable/AdminTable';
import { useConvertCryptoMutation, useGetRecoveryTransactionsQuery } from '../../redux-contexts/redux/services/transactions';
import axios from 'axios';
const dummyData = [
    {
      organization: 'Org A',
      amount_recovered: 0.23456789,
      compensation_fee: 0.12345678,
    },
    {
      organization: 'Org B',
      amount_recovered: 0.98765432,
      compensation_fee: 0.23456789,
    },
    {
      organization: 'Org C',
      amount_recovered: 0.34567890,
      compensation_fee: 0.09876543,
    },
    {
      organization: 'Org D',
      amount_recovered: 0.12345678,
      compensation_fee: 0.23456789,
    },
    {
      organization: 'Org E',
      amount_recovered: 0.45678901,
      compensation_fee: 0.34567890,
    },
  ];

const Home = ({ theme, fetchDataAndDispatch }) => {
    const { isMobile, isTablet, isDesktop } = useResponsive();
    const { userInfo, userToken } = useSelector(state=>state.auth)
    const [convertCrypto] = useConvertCryptoMutation()
    const [amount, setAmount] = useState('')
    const [usd, setUsd] = useState(null)
    const {data: recoveryTransactions, isLoading} = useGetRecoveryTransactionsQuery(userToken)
    const {data, refetchAccount} = useTrade(userToken)
    const [selectedCurrency, setSelectedCurrency] = useState('BTC');

  const handleSelect = (eventKey) => {
    setSelectedCurrency(eventKey);
  };

    useEffect(()=> console.log('lll', recoveryTransactions), [])
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch BTC to USD average price from Binance API
                const response = await axios.get("https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT");
                
                // Extract the price from the response
                const btcToUsdPrice = parseFloat(response.data.price);
    
                // Check if the entered amount is valid and convert it to USD
                if(amount !== '' && !isNaN(amount)) {
                    const btcAmount = parseFloat(amount);
                    const usdAmount = btcAmount * btcToUsdPrice;
                    setUsd(usdAmount.toFixed(2)); // Round USD amount to 2 decimal places
                    console.log(usd)
                }
                if(amount == ''){
                    setUsd('')
                }
            } catch (error) {
                // Handle any errors that occur during the API request
                console.error("Error fetching data:", error);
                // Optionally, you can display an error message to the user
                // For example, using a library like Swal for a sweet alert
                // Swal.fire({
                //     icon: 'error',
                //     title: 'Oops...',
                //     text: 'An error occurred while fetching data!',
                // });
            }
        };
    
        // Call the fetchData function when the 'amount' state changes
        fetchData();
    }, [amount]);

    const financial_columns = React.useMemo(
        () => [
          {
            Header: 'Organization',
            accessor: 'organization_name', // Change to match the data key
          },
          {
            Header: 'Amount Recovered (BTC)',
            accessor: 'amount_recovered',
          },
          {
            Header: 'Compensation Fee (BTC)',
            accessor: 'compensation_fee',
          },
          {
            Header: 'Total Amount',
            accessor: 'total_amount',
            Cell: ({ row }) => (
              (parseFloat(row.original.amount_recovered) + parseFloat(row.original.compensation_fee)).toFixed(8)
            ),
          },
        ],
        []
      );
      

      const handleConvert = () => {
        if (amount !== "" && amount !== 0) {
            Swal.fire({
                icon: "info",
                title: `Convert ${amount}BTC to ${usd}USD`,
                showCancelButton: true,
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                showLoaderOnConfirm: true, // Show loading spinner
                allowOutsideClick: () => !Swal.isLoading(), // Disable clicking outside the modal while loading
                preConfirm: async () => {
                    try {
                        const res = await convertCrypto({
                            amount: amount,
                            token: userToken
                        });
                        console.log(res);
                        if (res.data.status === "success") {
                            refetchAccount();
                            Swal.fire({
                                icon: 'success',
                                title: 'Conversion Successful',
                                text: 'Your BTC has been converted to USD successfully.'
                            });
                        } else {
                            throw new Error('Conversion failed');
                        }
                    } catch (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Conversion Failed',
                            text: 'An error occurred while converting BTC to USD.'
                        });
                    }
                }
            }).then((result) => {
                // Handle confirm/cancel actions if needed
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Invalid amount',
                text: 'Input an amount and try again'
            });
        }
    };
    
    
      if(isLoading){
        <div>
            <Spinner />
        </div>
      }else{
            return (
                <>
                
                    <div className="row" style={{ height: "auto", overflow: "auto" }}>
                        <div className="col-12 col-xl-8" style={{overflow: 'hidden'}}>
                            <div className="row">
                                <div className="col-12">
                                    <BalanceCardSlider data={data}/>
                                </div>
    
                            </div>
                        </div>
                        <div className="col-xl-3 col-12" style={{ flex: 1 }}>
      <div className="col-12 card" style={{ padding: '20px', position: 'relative' }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center' }}>
          <p
            onClick={() => setAmount(data?.crypto_balance)}
            style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#18A594', cursor: 'pointer', margin: 'auto' }}
          >
            MAX
          </p>
          
          <InputGroup style={{ flex: 1 }}>
            <Dropdown onSelect={handleSelect} >
              <Dropdown.Toggle
                style={{
                  backgroundColor: '#18A594',
                  fontSize: '1.1rem',
                  borderTopRightRadius: '0',
                  borderBottomRightRadius: '0',
                }}
              >
                {selectedCurrency}
              </Dropdown.Toggle>
              <Dropdown.Menu>
  <Dropdown.Item eventKey="BTC">BTC</Dropdown.Item>
  <Dropdown.Item eventKey="USD">USD</Dropdown.Item>
  <Dropdown.Item eventKey="EUR">EUR</Dropdown.Item>
  <Dropdown.Item eventKey="GBP">GBP</Dropdown.Item>
</Dropdown.Menu>

            </Dropdown>
            <Form.Control
              size="lg"
              type="text"
              className="bold-placeholder"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{
                background: 'transparent',
                color: '',
                padding: '20px',
                border: 'none',
                textAlign: 'right',
                fontWeight: 'bold',
                fontSize: '1.5rem',
                borderTopLeftRadius: '0',
                borderBottomLeftRadius: '0',
              }}
            />
          </InputGroup>
        </div>
        
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px',
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              backgroundColor: 'black',
              width: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '100%',
              position: 'absolute',
              zIndex: 999,
              padding: '10px',
              margin: 'auto',
            }}
          >
            <CgArrowsExchangeAltV size={30} />
          </div>
        </div>
        
        <InputGroup style={{ flex: 1 }}>
          <InputGroup.Text
            style={{
              backgroundColor: '',
              fontSize: '1.2rem',
              width:'100px',
              fontWeight: 'bold',
            }}
          >
            USD
          </InputGroup.Text>
          <Form.Control
            size="lg"
            type="text"
            className="bold-placeholder"
            value={usd}
            placeholder="0.00"
            style={{
              background: 'transparent',
              color: '',
              padding: '20px',
              border: 'none',
              textAlign: 'right',
              fontWeight: 'bold',
              fontSize: '1.5rem',
              borderTopRightRadius: '0',
              borderBottomRightRadius: '0',
            }}
          />
        </InputGroup>
        
        <Button style={{ marginTop: '8px', cursor: amount === 0 ? 'not-allowed' : 'pointer' }} onClick={handleConvert} disabled={amount === 0 ? true : false}>
          Convert
        </Button>
      </div>
    </div>
                    </div>
                    {
                        recoveryTransactions ? (
                            <AdminTable columns={financial_columns} data={recoveryTransactions[1]?.data} search={true}/>
                        ) : (
                            <div style={{flex: 1, height: '300px'}}>
                                <p style={{margin: 'auto', fontSize: '1.4rem'}}>No Available Transactions...</p>
                            </div>
                        )
                    }
                </>
            );
      }
};

export default Home;
