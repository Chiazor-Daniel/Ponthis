import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dummyData } from '../components/table/FilteringTable/AdminTable';
import Avatar from 'react-avatar';
import Dropdown from 'react-bootstrap/Dropdown';
import { BiSolidBoltCircle } from "react-icons/bi";
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FilteringTable from '../components/table/FilteringTable/FilteringTable';
const UserDetails = () => {
  const [transactions, setTransactions] = useState([
    {
        id: 1,
        transaction_method: 'Spot',
        status: 'Completed',
        created_at: '2024-04-27T10:30:00Z',
        transaction_amount: 100,
        transaction_type: 'Bank Transfer'
    },
    {
        id: 2,
        transaction_method: 'Listing',
        status: 'Pending',
        created_at: '2024-04-26T15:45:00Z',
        transaction_amount: 50,
        transaction_type: 'Card Payment'
    },
    {
        id: 3,
        transaction_method: 'Spot',
        status: 'Completed',
        created_at: '2024-04-25T08:20:00Z',
        transaction_amount: 200,
        transaction_type: 'Bank Transfer'
    },
    {
        id: 4,
        transaction_method: 'Crypto',
        status: 'Failed',
        created_at: '2024-04-24T12:00:00Z',
        transaction_amount: 150,
        transaction_type: 'Crypto Payment'
    }
  ]);
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({});
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch user data based on the id from your API or dummy data
    const fetchedUser = dummyData.find(user => user.id === parseInt(id));
    setUser(fetchedUser);
    setForm(fetchedUser);
  }, [id]);

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {
    // Handle update logic here
    console.log(form);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='row'>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>User Details</h1>
          {/* <Button onClick={() => navigate("/admin/admin-dashboard")}>View All Users </Button> */}
        </div>
        <div className='card col-5' style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px", fontSize: "1.3rem", margin: "auto" }}>
          <Dropdown style={{ position: "absolute", right: 20 }}>
            <Dropdown.Toggle style={{ backgroundColor: "transparent", border: "none", fontSize: "1.5rem", color: "#6c757d", padding: "0" }}>
              <BiSolidBoltCircle />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">
                <button className='btn' style={{ backgroundColor: "red", color: "white" }}>Deactivate User</button>
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2"></Dropdown.Item>
              <Dropdown.Item href="#/action-3">
                <button className='btn' style={{ backgroundColor: "red", color: "white", margin: "auto", width: "100%" }}>Delete User</button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div className="d-flex align-items-center mb-3" style={{ position: "relative" }}>
            <Avatar name={user.firstName + " " + user.lastName} size="150" round />
            <div style={{ position: "absolute", top: "20px", right: "0px", width: "20px", height: "20px", borderRadius: "50%", backgroundColor: user.isActive ? "green" : "gray" }}></div>
          </div>
          <p className="ml-3">{user.firstName} {user.lastName}</p>
          <p>Email: {user.email}</p>
          <p>Phone Number: {user.phoneNumber}</p>
          <p>Can Auto Trade: {user.canAutoTrade ? 'Yes' : 'No'}</p>
          <p>Is Active: {user.isActive ? 'Yes' : 'No'}</p>
          <div className='row' style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button className='btn btn-primary'>
              Login User Account
            </button>

          </div>
        </div>
        <div className='card col-5' style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px", fontSize: "1.3rem", margin: "auto" }}>
          <h2>Edit User Profile</h2>
          <div className="row">
            <div className="col-6">
              <Form.Group className="mb-3" controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter first name" name="firstName" value={form.firstName} onChange={handleInputChange} />
              </Form.Group>
            </div>
            <div className="col-6">
              <Form.Group className="mb-3" controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter last name" name="lastName" value={form.lastName} onChange={handleInputChange} />
              </Form.Group>
            </div>
          </div>
          <div className='row'>
            <div className="col-6">
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" value={form.email} onChange={handleInputChange} />
            </Form.Group>
            </div>
            <div className="col-6">

          <Form.Group className="mb-3" controlId="formPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="tel" placeholder="Enter phone number" name="phoneNumber" value={form.phoneNumber} onChange={handleInputChange} />
          </Form.Group>
            </div>
          </div>
          <div className='row'>
            <div className='col-6'>
              <Form.Group className="mb-3" controlId="formCanAutoTrade">
                <Form.Check
                  type="checkbox"
                  label="Can Auto Trade"
                  name="canAutoTrade"
                  checked={form.canAutoTrade}
                  onChange={(e) => setForm({ ...form, canAutoTrade: e.target.checked })}
                />
              </Form.Group>
            </div>
            <div className='col-6'>
              <Form.Group className="mb-3" controlId="formIsActive">
                <Form.Check
                  type="checkbox"
                  label="Is Active"
                  name="isActive"
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                />
              </Form.Group>
            </div>
          </div>
          <div className='row' style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Button onClick={handleUpdate}>
              Update User Profile
            </Button>
          </div>
          <div className='' style={{padding: "30px", display: "flex", justifyContent: "flex-end", width: "100%", gap: "20px"}}>
          <Button>
              Reset User Password
            </Button>
            {/* <Button>
              Modify as user
            </Button> */}
          </div>
        </div>

      </div>
      <div style={{marginTop: "20px", padding: "20px"}}>
        <FilteringTable data={transactions}  user="admin"/>

      </div>
    </>
  );
};

export default UserDetails;