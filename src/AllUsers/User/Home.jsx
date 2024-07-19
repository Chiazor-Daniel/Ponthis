import React, { useEffect, useState } from 'react';
import { Spinner, Form, Button, InputGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import BalanceCardSlider from './dashboard-components/BalanceCardSlider';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useResponsive } from '../../redux-contexts/context/responsive';
import AdminTable from '../../jsx/components/table/FilteringTable/AdminTable';
import { useConvertCryptoMutation, useGetRecoveryTransactionsQuery } from '../../redux-contexts/redux/services/transactions';
import { useTrade } from '../../customHooks/user/userDashboard/useTrade';
import ApexChart from './apexchart';
import { SiPayoneer } from "react-icons/si";
import ImageSwiper from './swiper/cardswiper';
import { SiMastercard } from 'react-icons/si';
import { FaCcVisa, FaCcMastercard, FaPaypal } from 'react-icons/fa';

const Home = ({ theme, fetchDataAndDispatch }) => {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const { userInfo, userToken } = useSelector(state => state.auth);
  const [convertCrypto] = useConvertCryptoMutation();
  const [amount, setAmount] = useState('');
  const [usd, setUsd] = useState(null);
  const { data: recoveryTransactions, isLoading } = useGetRecoveryTransactionsQuery(userToken);
  const { data, refetchAccount } = useTrade(userToken);
  const [selectedCurrency, setSelectedCurrency] = useState('BTC');

  // New states for the quick transfer form
  const [cardType, setCardType] = useState('Visa');
  const [accountNumber, setAccountNumber] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferCurrency, setTransferCurrency] = useState('$');

  const handleSelect = (eventKey) => {
    setSelectedCurrency(eventKey);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT");
        const btcToUsdPrice = parseFloat(response.data.price);

        if (amount !== '' && !isNaN(amount)) {
          const btcAmount = parseFloat(amount);
          const usdAmount = btcAmount * btcToUsdPrice;
          setUsd(usdAmount.toFixed(2));
        }
        if (amount === '') {
          setUsd('');
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'An error occurred while fetching data!',
        });
      }
    };

    fetchData();
  }, [amount]);

  const financial_columns = React.useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'title',
        Cell: ({ row }) => {
          const medium = row.original.medium;
          let icon = null;

          if (medium === 'Visa') {
            icon = <FaCcVisa style={{ marginRight: 8 }} size={30} color='#0C1844'/>;
          } else if (medium === 'Master') {
            icon = <SiMastercard style={{ marginRight: 8 }} />;
          } else if (medium === 'Paypal') {
            icon = <FaPaypal style={{ marginRight: 8 }} size={30} color='#478CCF'/>;
          } else {
            icon = <SiPayoneer style={{ marginRight: 8 }} size={30} color='#2C4E80'/>;
          }

          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {icon}
              {row.original.title}
            </div>
          );
        },
      },
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Invoice',
        accessor: 'invoice',
      },
      {
        Header: 'Medium',
        accessor: 'medium',
      },
      {
        Header: 'Transaction',
        accessor: 'transaction',
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ value }) => {
          let backgroundColor = 'transparent';
          let textColor = 'inherit';

          if (value === 'Pending') {
            backgroundColor = 'rgba(189, 123, 0, 0.2)';
            textColor = 'rgba(189, 123, 0, 1)';
          } else if (value === 'Cancelled') {
            backgroundColor = 'rgba(255, 97, 97, 0.2)';
            textColor = 'rgb(255, 97, 97)';
          } else if (value === 'Successful') {
            backgroundColor = 'rgba(32, 183, 87, 0.2)';
            textColor = 'rgba(32, 183, 87, 1)';
          }

          return (
            <div style={{ backgroundColor, color: textColor, padding: '5px', borderRadius: '20px', textAlign: 'center' }}>
              {value}
            </div>
          );
        },
      },
    ],
    []
  );

  const dummyData = [
    {
      title: "Massive Dynamic INV-90874",
      date: "11 Aug, 24. 10:36 am",
      invoice: "#521452",
      medium: "Visa",
      transaction: "$554,100",
      status: "Pending"
    },
    {
      title: "DOGE Yearly Return Invest.",
      date: "11 Aug, 24. 10:36 am",
      invoice: "#521452",
      medium: "Payoneer",
      transaction: "$782,332",
      status: "Cancelled"
    },
    {
      title: "Hooli INV-79820",
      date: "11 Aug, 24. 10:36 am",
      invoice: "#521452",
      medium: "Paypal",
      transaction: "$1,121,212",
      status: "Successful"
    },
    {
      title: "Jack Collingwood Card reload",
      date: "11 Aug, 24. 10:36 am",
      invoice: "#521452",
      medium: "Payoneer",
      transaction: "$1,420,012",
      status: "Successful"
    },
    {
      title: "Bluth Company INV-84732",
      date: "11 Aug, 24. 10:36 am",
      invoice: "#521452",
      medium: "Paypal",
      transaction: "$2,141,212",
      status: "Pending"
    },
    {
      title: "Salaries",
      date: "11 Aug, 24. 10:36 am",
      invoice: "#521452",
      medium: "Paypal",
      transaction: "$2,521,212",
      status: "Successful"
    },
    {
      title: "Globex Corporation INV-24398",
      date: "11 Aug, 24. 10:36 am",
      invoice: "#521452",
      medium: "Paypal",
      transaction: "$8,521,212",
      status: "Successful"
    },
    {
      title: "Initech INV-24792",
      date: "11 Aug, 24. 10:36 am",
      invoice: "#521452",
      medium: "Paypal",
      transaction: "$8,921,212",
      status: "Cancelled"
    }
  ];

  const handleTransfer = (e) => {
    e.preventDefault();
    // Handle the transfer logic here
    console.log('Transfer:', { cardType, accountNumber, transferAmount, transferCurrency });
    // You can add your transfer logic or API call here
  };

  if (isLoading) {
    return (
      <div>
        <Spinner animation="border" />
      </div>
    );
  } else {
    return (
      <>
        <div className="row" style={{ height: "auto", overflow: "auto" }}>
          <div className="col-12 col-xl-8" style={{ overflow: 'hidden' }}>
            <div className="row">
              <div className="col-12">
                <BalanceCardSlider data={data} />
                <div>
                  <ApexChart />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-12" style={{ flex: 1 }}>
            <div className='card'>
              <p className='text-center pt-4' style={{fontSize:'1.4rem', fontWeight:'bold'}}>My Wallet</p>
              <ImageSwiper />
              <p className='p-4' style={{fontSize:'1.2rem'}}>Quick Transfer</p>
              <Form className="px-4 pb-4" onSubmit={handleTransfer}>
                <InputGroup className="mb-3" style={{backgroundColor: 'rgba(32, 183, 87, .05)'}}>
                  <DropdownButton
                    as={InputGroup.Prepend}
                    title={<>{cardType === 'Visa' ? <FaCcVisa size={24} /> : <SiMastercard size={24} />}</>}
                    id="input-group-dropdown-1"
                  >
                    <Dropdown.Item onClick={() => setCardType('Visa')}>Visa</Dropdown.Item>
                    <Dropdown.Item onClick={() => setCardType('Master')}>Master</Dropdown.Item>
                  </DropdownButton>
                  <Form.Control 
                    type="text" 
                    placeholder="Account Number"
                    value={accountNumber}
                    style={{background: 'transparent', border: 'none'}}
                    onChange={(e) => setAccountNumber(e.target.value)}
                  />
                </InputGroup>
                <InputGroup className="mb-3"style={{backgroundColor: 'rgba(32, 183, 87, .05)'}}>
                  <DropdownButton
                    as={InputGroup.Prepend}
                    title={transferCurrency}
                    id="input-group-dropdown-2"
                  >
                    <Dropdown.Item onClick={() => setTransferCurrency('$')}>$</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTransferCurrency('£')}>£</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTransferCurrency('€')}>€</Dropdown.Item>
                  </DropdownButton>
                  <Form.Control 
                    type="number" 
                    placeholder="Amount"
                    style={{background: 'transparent', border: 'none'}}
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                  />
                </InputGroup>
                <Button variant="primary" type="submit" className="w-100">
                  Make Transfer
                </Button>
              </Form>
            </div>
          </div>
        </div>

        <AdminTable columns={financial_columns} data={dummyData} search={true} />
      </>
    );
  }
};

export default Home;
