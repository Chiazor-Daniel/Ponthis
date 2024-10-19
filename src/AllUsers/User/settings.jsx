import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, ListGroup } from 'react-bootstrap';
import { FaGlobe, FaMoneyBillWave, FaBell, FaLock, FaUserCircle, FaSyncAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { loginSuccess } from '../../redux-contexts/redux/features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../../api';

const SettingsPage = () => {
  const { userInfo, userToken } = useSelector(state => state.auth);
  const dispatch = useDispatch()

  const [settings, setSettings] = useState({
    currency: 'USD',
    language: 'en',
    notifications: true,
    twoFactor: false,
  });
  const [saving, setSaving] = useState(false);
  const [showRefresh, setShowRefresh] = useState(false);

  useEffect(() => {
    const storedSettings = localStorage.getItem('settings');
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    }
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/user/account/change-preferred-currency/?currency=${settings.currency}`,
        { currency: settings.currency },
        {
          headers: {
            'x-token': userToken, // Replace with your token
          },
        }
      );
      localStorage.setItem('settings', JSON.stringify(settings));
      Swal.fire({
        icon: 'success',
        title: 'Changes Saved',
        text: 'Your preferred currency has been updated.',
      });
      await axios.get(`${BASE_URL}/user/profile/users/`, {
        headers: {
          "x-token": userToken
        }
      })
      .then(user => {
        sessionStorage.setItem("userInfo", JSON.stringify(user.data));
        dispatch(loginSuccess({ userInfo: user.data, userToken: userToken }));
      });
      setShowRefresh(true);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response.data.detail.message,
      });
    } finally {
      setSaving(false);
      setTimeout(()=>  handleRefresh(),1000)
    }
  };
  const handleRefresh = () => {
    window.location.reload();
  }

  useEffect(() => {
    if (saving) {
      Swal.fire({
        title: 'Saving...',
        text: 'Please wait...',
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });
    } else {
      Swal.close();
      
    }
  }, [saving]);


  return (
    <Container className="my-5">
      <h1 className="mb-4">Settings</h1>
      <Row>
        <Col>
          <div style={{backgroundColor: '#2a2a2a', borderRadius: '20px'}}>
            <Card.Body>
              <Form>
                <h2 id="preferences" className="mt-4">Preferences</h2>
                <Form.Group className="mb-3">
                  <Form.Label><FaMoneyBillWave className="mr-2" /> Currency</Form.Label>
                  <Form.Select value={settings.currency} onChange={(e) => setSettings({ ...settings, currency: e.target.value })}>
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label><FaGlobe className="mr-2" />Language</Form.Label>
                  <Form.Select value={settings.language} onChange={(e) => setSettings({ ...settings, language: e.target.value })}>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                  </Form.Select>
                </Form.Group>
                <h2 id="notifications" className="mt-4">Notifications</h2>
                <Form.Check
                  type="switch"
                  id="notification-switch"
                  label="Enable push notifications"
                  checked={settings.notifications}
                  onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
                />

                <Button variant="primary" className="mt-4" onClick={handleSave}>
                  Save Settings
                </Button>
               
              </Form>
            </Card.Body>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SettingsPage;