import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Form, Button, Container, FormLabel } from 'react-bootstrap';
import { BASE_URL } from '../../api';

const CreateReview = ({ admin }) => {
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);
  const [canDisplay, setCanDisplay] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      author,
      description,
      rating,
      can_display: canDisplay,
    };

    try {
      const result = await Swal.fire({
        title: 'Create Review',
        text: 'Are you sure you want to create this review?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, create it!',
        cancelButtonText: 'No, cancel',
      });

      if (result.isConfirmed) {
        const response = await axios.post(
          `${BASE_URL}/admin/user/reviews/create-review`,
          reviewData,
          {
            headers: {
              'Content-Type': 'application/json',
              'x-token': admin[1],
            },
          }
        );

        if (response.data.status === 'success') {
          Swal.fire('Success', 'Review created successfully', 'success');
          // Reset form
          setAuthor('');
          setDescription('');
          setRating(0);
          setCanDisplay(false);
        } else {
          Swal.fire('Error', 'Failed to create review', 'error');
        }
      }
    } catch (error) {
      console.error('Error creating review:', error);
      Swal.fire('Error', 'An error occurred while creating the review', 'error');
    }
  };

  return (
    <Container>
      <h2>Create Review</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <FormLabel>Author</FormLabel>
          <Form.Control
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <FormLabel>Description</FormLabel>
          <Form.Control
            as="textarea"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <FormLabel>Rating (1-5)</FormLabel>
          <Form.Control
            type="number"
            min={1}
            max={5}
            value={rating}
            onChange={(e) => setRating(e.target.valueAsNumber)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <FormLabel>Can Display</FormLabel>
          <Form.Check
            type="checkbox"
            checked={canDisplay}
            onChange={(e) => setCanDisplay(e.target.checked)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Review
        </Button>
      </Form>
    </Container>
  );
};

export default CreateReview;