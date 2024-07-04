import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Form, Button, Container, Image } from 'react-bootstrap';

const CreateTestimonial = ({ admin }) => {
  const [fullname, setFullname] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fullname', fullname);
    formData.append('subject', subject);
    formData.append('description', description);
    formData.append('file', file);

    try {
      const result = await Swal.fire({
        title: 'Create Testimonial',
        text: 'Are you sure you want to create this testimonial?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, create it!',
        cancelButtonText: 'No, cancel'
      });

      if (result.isConfirmed) {
        const response = await axios.post(
          'https://api.ai-ledger.net/admin/user/create-testimonial',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'x-token': admin[1]
            }
          }
        );

        if (response.data.status === 'success') {
          Swal.fire('Success', 'Testimonial created successfully', 'success');
          // Reset form
          setFullname('');
          setSubject('');
          setDescription('');
          setFile(null);
          setPreview(null);
        } else {
          Swal.fire('Error', 'Failed to create testimonial', 'error');
        }
      }
    } catch (error) {
      console.error('Error creating testimonial:', error);
      Swal.fire('Error', 'An error occurred while creating the testimonial', 'error');
    }
  };

  return (
    <Container>
      <h2>Create Testimonial</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control 
            type="text" 
            value={fullname} 
            onChange={(e) => setFullname(e.target.value)} 
            required 
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Subject</Form.Label>
          <Form.Control 
            type="text" 
            value={subject} 
            onChange={(e) => setSubject(e.target.value)} 
            required 
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={5} 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>File (Image)</Form.Label>
          <Form.Control 
            type="file" 
            onChange={handleFileChange} 
            required 
          />
        </Form.Group>

        {preview && (
          <Form.Group className="mb-3">
            <Form.Label>Image Preview</Form.Label>
            <Image src={preview} alt="Preview" fluid />
          </Form.Group>
        )}

        <Button variant="primary" type="submit">
          Create Testimonial
        </Button>
      </Form>
    </Container>
  );
};

export default CreateTestimonial;