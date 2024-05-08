import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'; // Assuming you're using Bootstrap for the modal and form components

const CreateAdminModal = ({ show, onHide, onCreateAdmin }) => {
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    address: '',
    country: '',
    phone_number: '',
    date_of_birth: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateAdmin(formData);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create Admin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
          </Form.Group>
          {/* Other form fields go here */}
          <Button variant="primary" type="submit">
            Create
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateAdminModal;
