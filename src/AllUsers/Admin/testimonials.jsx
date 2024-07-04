import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Button, Modal, Form, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';

const BASE_URL = "https://api.ai-ledger.net";

const TestimonialList = ({ admin }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/general-route/get-testimonials/`, {
        headers: { 'x-token': admin[1] }
      });
      if (response.data.status === 'success') {
        const testimonialsWithImages = await Promise.all(response.data.message.map(async (testimonial) => {
          const imageUrl = await fetchTestimonialImage(testimonial.id);
          return { ...testimonial, imageUrl };
        }));
        setTestimonials(testimonialsWithImages);
      } else {
        setError('Failed to fetch testimonials');
      }
    } catch (err) {
      setError('An error occurred while fetching testimonials');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTestimonialImage = async (testimonialId) => {
    try {
      const response = await axios.get(`${BASE_URL}/user/general-route/get-testimonial-image/${testimonialId}`, {
        headers: { 'x-token': admin[1] },
        responseType: 'blob'
      });
      return URL.createObjectURL(response.data);
    } catch (err) {
      console.error(`Failed to fetch image for testimonial ${testimonialId}`, err);
      return null;
    }
  };

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditingTestimonial(null);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${BASE_URL}/admin/user/edit-testimonial/${editingTestimonial.id}`, editingTestimonial, {
        headers: { 'x-token': admin[1] }
      });
      if (response.data.status === 'success') {
        Swal.fire('Success', 'Testimonial updated successfully', 'success');
        fetchTestimonials();
        handleCloseModal();
      } else {
        Swal.fire('Error', 'Failed to update testimonial', 'error');
      }
    } catch (err) {
      Swal.fire('Error', 'An error occurred while updating the testimonial', 'error');
      console.error(err);
    }
  };

  const handleDelete = async (testimonialId) => {
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
        const response = await axios.delete(`${BASE_URL}/admin/user/delete-testimonial/${testimonialId}`, {
          headers: { 'x-token': admin[1] }
        });
        if (response.data.status === 'success') {
          Swal.fire('Deleted!', 'The testimonial has been deleted.', 'success');
          fetchTestimonials();
        } else {
          Swal.fire('Error', 'Failed to delete testimonial', 'error');
        }
      } catch (err) {
        Swal.fire('Error', 'An error occurred while deleting the testimonial', 'error');
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
      <h2>Testimonials</h2>
      {testimonials.map((testimonial) => (
        <Card key={testimonial.id} className="mb-3">
          <Card.Body>
            <Card.Title>{testimonial.fullname}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{testimonial.subject}</Card.Subtitle>
            <Card.Text>
              {testimonial.description}
            </Card.Text>
            {testimonial.imageUrl && <Card.Img src={testimonial.imageUrl} alt="Testimonial Image" style={{ width: '200px', marginBottom: '10px' }} />}
            <Card.Footer className="text-muted">Created at: {new Date(testimonial.created_at).toLocaleString()}</Card.Footer>
            <Button variant="primary" onClick={() => handleEdit(testimonial)} className="me-2">Edit</Button>
            <Button variant="danger" onClick={() => handleDelete(testimonial.id)}>Delete</Button>
          </Card.Body>
        </Card>
      ))}

      <Modal show={showEditModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Testimonial</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSaveEdit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control 
                type="text" 
                value={editingTestimonial?.fullname || ''} 
                onChange={(e) => setEditingTestimonial({...editingTestimonial, fullname: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control 
                type="text" 
                value={editingTestimonial?.subject || ''} 
                onChange={(e) => setEditingTestimonial({...editingTestimonial, subject: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                value={editingTestimonial?.description || ''} 
                onChange={(e) => setEditingTestimonial({...editingTestimonial, description: e.target.value})}
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

export default TestimonialList;