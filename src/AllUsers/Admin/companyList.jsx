import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Button, Modal, Form, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';

const BASE_URL = "https://api.ai-ledger.net";

const CompanyList = ({ admin }) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/general-route/get-companies-details/`, {
        headers: { 'x-token': admin[1] }
      });
      if (response.data.status === 'success') {
        const companiesWithImages = await Promise.all(response.data.message.map(async (company) => {
          const logoUrl = await fetchCompanyImage(company.id, 'logo');
          const companyImageUrl = await fetchCompanyImage(company.id, 'company_image');
          return { ...company, logoUrl, companyImageUrl };
        }));
        setCompanies(companiesWithImages);
      } else {
        setError('Failed to fetch companies');
      }
    } catch (err) {
      setError('An error occurred while fetching companies');
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanyImage = async (companyId, imageType) => {
    try {
      const response = await axios.get(`${BASE_URL}/user/general-route/get-company-image/${companyId}?image_type=${imageType}`, {
        headers: { 'x-token': admin[1] },
        responseType: 'blob'
      });
      return URL.createObjectURL(response.data);
    } catch (err) {
      return null;
    }
  };

  const handleEdit = (company) => {
    setEditingCompany(company);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditingCompany(null);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${BASE_URL}/admin/user/edit-company-detail/${editingCompany.id}`, editingCompany, {
        headers: { 'x-token': admin[1] }
      });
      if (response.data.status === 'success') {
        Swal.fire('Success', 'Company updated successfully', 'success');
        fetchCompanies();
        handleCloseModal();
      } else {
        Swal.fire('Error', 'Failed to update company', 'error');
      }
    } catch (err) {
      Swal.fire('Error', 'An error occurred while updating the company', 'error');
    }
  };

  const handleDelete = async (companyId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(`${BASE_URL}/admin/user/delete-company-detail/${companyId}`, {
          headers: { 'x-token': admin[1] }
        });
        if (response.data.status === 'success') {
          Swal.fire('Deleted!', 'The company has been deleted.', 'success');
          fetchCompanies();
        } else {
          Swal.fire('Error', 'Failed to delete company', 'error');
        }
      } catch (err) {
        Swal.fire('Error', 'An error occurred while deleting the company', 'error');
        console.error(err);
      }
    }
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <h2>Company List</h2>
      {companies.map((company) => (
        <Card key={company.id} className="mb-3">
          <Card.Body>
            <Card.Title>{company.company_name}</Card.Title>
            <Card.Text>
              <strong>URL:</strong> {company.company_url}<br />
              <strong>Description:</strong> {company.description}<br />
              <strong>Created At:</strong> {new Date(company.created_at).toLocaleString()}
            </Card.Text>
            {company.logoUrl && <Card.Img src={company.logoUrl} alt="Company Logo" style={{ width: '100px', marginBottom: '10px' }} />}
            {company.companyImageUrl && <Card.Img src={company.companyImageUrl} alt="Company Image" style={{ width: '200px' }} />}
            {/* <Button variant="primary" onClick={() => handleEdit(company)} className="me-2">Edit</Button>
            <Button variant="danger" onClick={() => handleDelete(company.id)}>Delete</Button> */}
          </Card.Body>
        </Card>
      ))}

      <Modal show={showEditModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSaveEdit}>
            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control 
                type="text" 
                value={editingCompany?.company_name || ''} 
                onChange={(e) => setEditingCompany({...editingCompany, company_name: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Company URL</Form.Label>
              <Form.Control 
                type="text" 
                value={editingCompany?.company_url || ''} 
                onChange={(e) => setEditingCompany({...editingCompany, company_url: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                value={editingCompany?.description || ''} 
                onChange={(e) => setEditingCompany({...editingCompany, description: e.target.value})}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default CompanyList;