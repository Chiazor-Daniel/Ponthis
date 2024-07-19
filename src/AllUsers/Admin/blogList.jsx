import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Button, Modal, Form, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';

const BASE_URL = "https://api.ai-ledger.net";

const BlogList = ({ admin }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/general-route/get-all-blog-post/`, {
        headers: { 'x-token': admin[1] }
      });
      if (response.data.status === 'success') {
        const blogsWithImages = await Promise.all(response.data.message.map(async (blog) => {
          const imageUrl = await fetchBlogImage(blog.id);
          return { ...blog, imageUrl };
        }));
        setBlogs(blogsWithImages);
      } else {
        setError('Failed to fetch blogs');
      }
    } catch (err) {
      setError('An error occurred while fetching blogs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBlogImage = async (blogId) => {
    try {
      const response = await axios.get(`${BASE_URL}/user/general-route/get-blog-image/${blogId}`, {
        headers: { 'x-token': admin[1] },
        responseType: 'blob'
      });
      return URL.createObjectURL(response.data);
    } catch (err) {
      console.error(`Failed to fetch image for blog ${blogId}`, err);
      return null;
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditingBlog(null);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${BASE_URL}/admin/user/edit-blog-post/${editingBlog.id}`, editingBlog, {
        headers: { 'x-token': admin[1] }
      });
      if (response.data.status === 'success') {
        Swal.fire('Success', 'Blog post updated successfully', 'success');
        fetchBlogs();
        handleCloseModal();
      } else {
        Swal.fire('Error', 'Failed to update blog post', 'error');
      }
    } catch (err) {
      Swal.fire('Error', 'An error occurred while updating the blog post', 'error');
      console.error(err);
    }
  };

  const handleDelete = async (blogId) => {
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
        const response = await axios.delete(`${BASE_URL}/admin/user/delete-blog-post/${blogId}`, {
          headers: { 'x-token': admin[1] }
        });
        if (response.data.status === 'success') {
          Swal.fire('Deleted!', 'The blog post has been deleted.', 'success');
          fetchBlogs();
        } else {
          Swal.fire('Error', 'Failed to delete blog post', 'error');
        }
      } catch (err) {
        Swal.fire('Error', 'An error occurred while deleting the blog post', 'error');
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
      <h2>Blog Posts</h2>
      {blogs.map((blog) => (
        <Card key={blog.id} className="mb-3">
          <Card.Body>
            <Card.Title>{blog.subject}</Card.Title>
            <Card.Text>
              {blog.article}
            </Card.Text>
            {blog.imageUrl && <Card.Img src={blog.imageUrl} alt="Blog Image" style={{ width: '200px', marginBottom: '10px' }} />}
            {/* <Button variant="primary" onClick={() => handleEdit(blog)} className="me-2">Edit</Button>
            <Button variant="danger" onClick={() => handleDelete(blog.id)}>Delete</Button> */}
          </Card.Body>
        </Card>
      ))}

      <Modal show={showEditModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Blog Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSaveEdit}>
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control 
                type="text" 
                value={editingBlog?.subject || ''} 
                onChange={(e) => setEditingBlog({...editingBlog, subject: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Article</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={5} 
                value={editingBlog?.article || ''} 
                onChange={(e) => setEditingBlog({...editingBlog, article: e.target.value})}
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

export default BlogList;