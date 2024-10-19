import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Form, Button, Col, Container } from 'react-bootstrap';
import { BASE_URL } from '../../api';
import CompanyList from './companyList';
import CreateBlogPost from './createBlog';
import CreateTestimonial from './createTestimonial';
import CreateReview from './createReviews';

const CreateCompanyDetail = ({ admin }) => {
  const [companyName, setCompanyName] = useState('');
  const [companyUrl, setCompanyUrl] = useState('');
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState(null);
  const [companyImage, setCompanyImage] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [companyImagePreview, setCompanyImagePreview] = useState(null);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCompanyImageChange = (e) => {
    const file = e.target.files[0];
    setCompanyImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setCompanyImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to create this company detail?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, create it!',
      cancelButtonText: 'No, cancel!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append('company_name', companyName);
        formData.append('company_url', companyUrl);
        formData.append('description', description);
        formData.append('logo', logo);
        formData.append('company_image', companyImage);
  
        try {
          const response = await axios.post(`${BASE_URL}/admin/user/create-company-detail`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'x-token': admin[1] // Make sure admin[1] is the token
            }
          });
          
          if (response.data.status === 'success' && response.data.message === 'Company details added successfully') {
            Swal.fire('Success!', response.data.message, 'success');
          } else {
            Swal.fire('Error!', 'Unexpected response from server.', 'error');
          }
        } catch (error) {
          Swal.fire('Error!', 'There was an error creating the company detail.', 'error');
        }
      }
    });
  };

  return (
    <Container>
      <h1>Company Details</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formCompanyName">
          <Form.Label>Company Name</Form.Label>
          <Form.Control
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCompanyUrl">
          <Form.Label>Company URL</Form.Label>
          <Form.Control
            // type="url"
            value={companyUrl}
            onChange={(e) => setCompanyUrl(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formLogo">
          <Form.Label>Logo</Form.Label>
          <Form.Control
            type="file"
            onChange={handleLogoChange}
          />
          {logoPreview && (
            <img src={logoPreview} alt="Logo Preview" style={{ width: '100px', marginTop: '10px' }} />
          )}
        </Form.Group>

        <Form.Group controlId="formCompanyImage">
          <Form.Label>Company Image</Form.Label>
          <Form.Control
            type="file"
            onChange={handleCompanyImageChange}
          />
          {companyImagePreview && (
            <img src={companyImagePreview} alt="Company Image Preview" style={{ width: '100px', marginTop: '10px' }} />
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Create
        </Button>
        {/* <Button variant="secondary" type="reset">
          Reset
        </Button>
        <Button variant="danger" type="button" onClick={() => window.location.reload()}>
          Cancel
        </Button> */}
      </Form>
    </Container>
  );
};

const Finance = ({ admin }) => {
  return (
    <>
      {/* <CompanyList admin={admin} /> */}
    <CreateReview admin={admin}/>
      <CreateCompanyDetail admin={admin} />
      <CreateBlogPost admin={admin} />
    <CreateTestimonial admin={admin}/>
    </>
  );
};

export default Finance;
