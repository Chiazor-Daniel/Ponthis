import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useEditLeadMutation, useGetSingleLeadQuery } from '../../redux/services/admin';
import { useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Avatar from 'react-avatar';
import { Dropdown } from 'react-bootstrap';
import { BiSolidBoltCircle } from 'react-icons/bi';

const ViewLead = () => {
    const { id } = useParams();
    const { adminToken } = useSelector(state => state.adminAuth);
    const { data, isLoading, error, refetch } = useGetSingleLeadQuery({ token: adminToken, lead_id: id });
    const [editLead, { isLoading: editing, error: editError }] = useEditLeadMutation()

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        status: '',
        country: '',
        address: '',
        dateOfBirth: '',
        activated: false,
        createdAt: ''
    });

    useEffect(() => {
        if (!isLoading && data && data.message) {
            const { first_name, last_name, email, phone_number, status, country, address, date_of_birth, activated, created_at } = data?.message;
            setFormData({
                firstName: first_name,
                lastName: last_name,
                email,
                phoneNumber: phone_number,
                status,
                country,
                address,
                dateOfBirth: date_of_birth,
                activated,
                createdAt: created_at
            });
        }
    }, [data, isLoading]);

    const handleEditLead = async () => {
        Swal.fire({
            title: `Confirm edit lead`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, edit it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await editLead({
                        token: adminToken,
                        lead_id: id,
                        ...formData
                    })
                    if (res.data.status === "success") {
                        refetch()
                        Swal.fire({
                            title: "Lead updated successfully",
                            icon: "success",
                            confirmButtonColor: '#3085d6',
                        })
                    } else {
                        Swal.fire({
                            title: "Error",
                            text: "An error occurred while updating the lead. Please try again later.",
                            icon: "error",
                            confirmButtonColor: '#3085d6',
                        })
                    }
                } catch (error) {
                    console.error("Error editing lead:", error);
                    Swal.fire({
                        title: "Error",
                        text: "An error occurred while updating the lead. Please try again later.",
                        icon: "error",
                        confirmButtonColor: '#3085d6',
                    })
                }
            }
        })
    }

    // Destructure state variables
    const { firstName, lastName, email, phoneNumber, status, country, address, dateOfBirth, activated, createdAt } = formData;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    if (!isLoading)
        return (
            <div>
                <h1>Lead Detail</h1>
                <div className='row' style={{ gap: "50px", display: "flex", justifyContent: "center" }}>
                    <div className='card col-5' style={{ fontSize: "1.3rem", display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
                        <div className="d-flex align-items-center mb-3" style={{ position: "relative" }}>
                            <Avatar name={`${data.message.first_name} ${data.message.last_name}`} size="150" round />
                            <div style={{ position: "absolute", top: "20px", right: "0px", width: "20px", height: "20px", borderRadius: "50%", backgroundColor: activated ? "green" : "gray" }}></div>
                        </div>
                        <Dropdown style={{ position: "absolute", right: 20 }}>
                            <Dropdown.Toggle style={{ backgroundColor: "transparent", border: "none", fontSize: "1.5rem", color: "#6c757d", padding: "0" }}>
                                <BiSolidBoltCircle />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">
                                    <button className='btn' style={{ backgroundColor: "red", color: "white" }}>Deactivate User</button>
                                </Dropdown.Item>
                                {/* Add more dropdown items if needed */}
                            </Dropdown.Menu>
                        </Dropdown>
                        <p>Full Name: {data.message.first_name} {data.message.last_name}</p>
                        <p>Email: {data.message.email}</p>
                        <p>Phone Number: {data.message.phone_number}</p>
                        <p>Status: {data.message.status}</p>
                        <p>Country: {data.message.country}</p>
                        <p>Address: {data.message.address}</p>
                        <p>Date of Birth: {data.message.dateOfBirth}</p>
                        <p>Activated: {data.message.activated ? 'Yes' : 'No'}</p>
                        <p>Created At: {data.message.createdAt}</p>
                    </div>
                    <div className='card col-5' style={{ fontSize: "1.3rem", padding: "20px" }}>
                        <h2>Edit Lead</h2>
                        <Form>
                            <Form.Group controlId="formFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" name="firstName" value={firstName} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" name="lastName" value={lastName} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" value={email} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formPhoneNumber">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control type="text" name="phoneNumber" value={phoneNumber} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formStatus">
                                <Form.Label>Status</Form.Label>
                                <Form.Select name="status" value={status} onChange={handleChange}>
                                    <option value="Call back">Call back</option>
                                    <option value="Unavailable">Unavailable</option>
                                    <option value="Not Interested">Not Interested</option>
                                    <option value="Not Called">Not Called</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId="formCountry">
                                <Form.Label>Country</Form.Label>
                                <Form.Control type="text" name="country" value={country} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formAddress">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" name="address" value={address} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formDateOfBirth">
                                <Form.Label>Date of Birth</Form.Label>
                                {/* <Form.Control
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                /> */}
                                   <Form.Control type="text" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />

                            </Form.Group>
                            <Form.Group controlId="formActivated">
                                <Form.Check type="checkbox" label="Activated" name="activated" checked={activated} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formCreatedAt">
                                <Form.Label>Created At</Form.Label>
                                <Form.Control type="text" name="createdAt" value={createdAt} onChange={handleChange} />
                            </Form.Group>
                            <Button style={{ marginTop: "10px" }} onClick={handleEditLead}>Edit lead</Button>
                        </Form>
                    </div>
                </div>
            </div>
        );
};

export default ViewLead;
