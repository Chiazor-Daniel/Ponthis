import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Modal, Button, Table, Form } from 'react-bootstrap';
import { BASE_URL } from '../../api';
import { useSelector } from 'react-redux';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const { adminToken: admin, adminInfo } = useSelector(state => state.adminAuth)
  const [reviewToEdit, setReviewToEdit] = useState({});

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/user/reviews/get-reviews`, {
        headers: {
          'x-token': admin,
        },
      });
      setReviews(response.data.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      Swal.fire('Error', 'Failed to fetch reviews', 'error');
    }
  };

  const handleEdit = (review) => {
    setReviewToEdit(review);
    setShowEditModal(true);
  };

  const handleDelete = async (reviewId) => {
    try {
      const result = await Swal.fire({
        title: 'Delete Review',
        text: 'Are you sure you want to delete this review?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel',
      });

      if (result.isConfirmed) {
        await axios.delete(`${BASE_URL}/admin/user/reviews/delete-review/${reviewId}`, {
          headers: {
            'x-token': admin,
          },
        });
        fetchReviews();
        Swal.fire('Success', 'Review deleted successfully', 'success');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      Swal.fire('Error', 'Failed to delete review', 'error');
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${BASE_URL}/admin/user/reviews/edit-review/${reviewToEdit.id}`,
        reviewToEdit,
        {
          headers: {
            'x-token': admin,
            'Content-Type': 'application/json',
          },
        }
      );
      fetchReviews();
      setShowEditModal(false);
      Swal.fire('Success', 'Review updated successfully', 'success');
    } catch (error) {
      console.error('Error updating review:', error);
      Swal.fire('Error', 'Failed to update review', 'error');
    }
  };

  return (
    <div>
      <h2>Reviews</h2>
      <Table>
        <thead>
          <tr>
          
            <th>Author</th>
            <th>Description</th>
            <th>Rating</th>
            <th>Can Display</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id}>
           
              <td>{review.author}</td>
              <td>{review.description}</td>
              <td>{review.rating}</td>
              <td>{review.can_display ? 'Yes' : 'No'}</td>
              <td>
                <Button variant="primary" style={{marginRight: '20px'}} onClick={() => handleEdit(review)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(review.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group controlId="author">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                value={reviewToEdit.author}
                onChange={(e) =>
                  setReviewToEdit({ ...reviewToEdit, author: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={reviewToEdit.description}
                onChange={(e) =>
                  setReviewToEdit({ ...reviewToEdit, description: e.target.value })
                }
              />
            </Form.Group>
           
              <Form.Label>Rating (1-5)</Form.Label>
              <Form.Group controlId="rating">
                <Form.Label>Rating (1-5)</Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  max={5}
                  value={reviewToEdit.rating}
                  onChange={(e) =>
                    setReviewToEdit({ ...reviewToEdit, rating: e.target.valueAsNumber })
                  }
                />
              </Form.Group>
              <Form.Group controlId="canDisplay">
                <Form.Label>Can Display</Form.Label>
                <Form.Check
                  type="checkbox"
                  checked={reviewToEdit.can_display}
                  onChange={(e) =>
                    setReviewToEdit({ ...reviewToEdit, can_display: e.target.checked })
                  }
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  };
  
  export default ReviewList;