import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Form, Button, Container, Image } from 'react-bootstrap';

const CreateBlogPost = ({ admin }) => {
  const [subject, setSubject] = useState('');
  const [article, setArticle] = useState('');
  const [categories, setCategories] = useState('');
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
    formData.append('subject', subject);
    formData.append('article', article);
    formData.append('categories', categories);
    formData.append('file', file);

    try {
      const result = await Swal.fire({
        title: 'Create Blog Post',
        text: 'Are you sure you want to create this blog post?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, create it!',
        cancelButtonText: 'No, cancel'
      });

      if (result.isConfirmed) {
        const response = await axios.post(
          'https://api.ai-ledger.net/admin/user/create-blog-post',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'x-token': admin[1]
            }
          }
        );

        if (response.data.status === 'success') {
          Swal.fire('Success', 'Blog post created successfully', 'success');
          // Reset form
          setSubject('');
          setArticle('');
          setCategories('');
          setFile(null);
          setPreview(null);
        } else {
          Swal.fire('Error', 'Failed to create blog post', 'error');
        }
      }
    } catch (error) {
      console.error('Error creating blog post:', error);
      Swal.fire('Error', 'An error occurred while creating the blog post', 'error');
    }
  };

  return (
    <Container>
      <h2>Create Blog Post</h2>
      <Form onSubmit={handleSubmit}>
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
          <Form.Label>Article</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={5} 
            value={article} 
            onChange={(e) => setArticle(e.target.value)} 
            required 
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Categories</Form.Label>
          <Form.Select 
            value={categories} 
            onChange={(e) => setCategories(e.target.value)} 
            required
          >
            <option value="">Select a category</option>
            <option value="forex trading">Forex Trading</option>
            <option value="binary trading">Binary Trading</option>
            <option value="cryptocurrency">Cryptocurrency</option>
            <option value="stock trading">Stock Trading</option>
            <option value="others">Others</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>File</Form.Label>
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
          Create Blog Post
        </Button>
      </Form>
    </Container>
  );
};

export default CreateBlogPost;