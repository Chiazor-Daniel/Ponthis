import React, { useState, useEffect, useContext, useCallback } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import LogoutPage from './Logout';
import { ThemeContext } from "../../../redux-contexts/context/ThemeContext";
import { useSelector } from "react-redux";
import { TbDoorEnter } from "react-icons/tb";
import { IoNotifications } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import logo from "../../../assets/logo.png"
import Avatar from "react-avatar";
import { useResponsive } from "../../../redux-contexts/context/responsive";

const Header = ({ onNote, onThemeChange, userType, superAdmin, asAdmin, setAsAdmin, setUserType }) => {
  const navigate = useNavigate();
  const { isMobile } = useResponsive();
  const [rightSelect, setRightSelect] = useState('Eng');
  const { loading, userInfo, userToken, error, success } = useSelector(state => state.auth);
  const { adminInfo, adminToken } = useSelector(state => state.adminAuth);
  const [isDark, setDark] = useState(true);
  const [seeBal, setSeeBal] = useState(false);
  const { changeBackground } = useContext(ThemeContext);
  const [headerFix, setHeaderFix] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState('default');
  const [notifications, setNotifications] = useState([]);
  const [socket, setSocket] = useState(null);

  const requestNotificationPermission = useCallback(async () => {
    if ('Notification' in window) {
      try {
        const permission = await Notification.requestPermission();
        setNotificationPermission(permission);
        return permission;
      } catch (error) {
        console.error('Error requesting notification permission:', error);
        return 'denied';
      }
    }
    return 'unsupported';
  }, []);

  useEffect(() => {
    const checkAndRequestPermission = async () => {
      if ('Notification' in window) {
        const currentPermission = Notification.permission;
        if (currentPermission === 'default') {
          const newPermission = await requestNotificationPermission();
          setNotificationPermission(newPermission);
        } else {
          setNotificationPermission(currentPermission);
        }
      }
    };

    checkAndRequestPermission();
  }, [requestNotificationPermission]);

  useEffect(() => {
    isDark ? changeBackground({ value: "light", label: "light" }) : changeBackground({ value: "dark", label: "dark" });
  }, [isDark, changeBackground]);

  useEffect(() => {
    const handleScroll = () => {
      setHeaderFix(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    var authToken = adminToken;
    document.cookie = 'x-token=' + authToken + '; path=/';

    const socketUrl = userType === 'admin'
      ? `ws://localhost:8000/ws/admin/live-notification/?token=${userType === "user" ? userToken : adminToken}`
      : `ws://localhost:8000/ws/user/live-notification/?token=${userType === "user" ? userToken : adminToken}`;

    // Create WebSocket connection with x-token header
    const newSocket = new WebSocket(socketUrl);

    // Set the header before the connection is established
    newSocket.onopen = () => {
      console.log('Connected to WebSocket');
      newSocket.send(JSON.stringify({ type: 'authentication', token: authToken }));
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data)
      const newNotification = {
        id: Date.now(),
        read: false,
        ...data,
      };
      setNotifications((prev) => [newNotification, ...prev]);
      showNotification(newNotification);
    };

    newSocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    newSocket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setSocket(newSocket);

    return () => {
      // Close WebSocket connection when component unmounts
      newSocket.close();
    };
  }, [userType, adminToken]);

  const handleThemeChange = (newTheme) => {
    setDark(newTheme);
    onThemeChange(newTheme);
  };

  const showNotification = useCallback((notification) => {
    if (notificationPermission === 'granted') {
      const options = {
        body: notification.amount
          ? `Amount: ${notification.amount}`
          : notification.message,
        icon: logo,

        tag: notification.type,
        vibrate: [200, 100, 200],
      };

      const notif = new Notification("LedgerSafe-AI", options);

      notif.onclick = () => {
        window.focus();

      };
    }
  }, [notificationPermission, navigate]);

  const markAsRead = (notificationId) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'markAsRead', notificationId }));
    }
  };

  const markAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notif => ({ ...notif, read: true }))
    );
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'markAllAsRead' }));
    }
  };

  const unreadCount = notifications.filter(notif => !notif.read).length;

  const NotificationItem = ({ notification }) => (
    <div className="d-flex align-items-center px-3 py-2 border-bottom" style={{ borderColor: '#404040' }}>
      <div className="flex-grow-1">
        <h6 className="mb-1" style={{ color: notification.read ? '#808080' : '#E2DAD6' }}>{notification.title}</h6>
        {notification.amount && (
          <p className="mb-0" style={{ color: '#74E291' }}>{notification.amount}</p>
        )}
        {notification.message && (
          <p className="mb-0" style={{ color: notification.read ? '#808080' : '#E2DAD6' }}>{notification.message}</p>
        )}
        <small style={{ color: '#808080' }}>{notification.time}</small>
      </div>
      {!notification.read && (
        <Button
          variant="link"
          onClick={() => markAsRead(notification.id)}
          style={{ color: '#74E291', textDecoration: 'none' }}
        >
          <FaCheckCircle /> Mark as read
        </Button>
      )}
    </div>
  );

  const renderNotificationDropdown = () => (
    <Dropdown>
      <Dropdown.Toggle variant="" id="dropdown-notifications"
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          display: 'flex',
          alignItems: 'center'
        }}>
        <div className="position-relative">
          <IoNotifications size={28} color="#E2DAD6" />
          {unreadCount > 0 && (
            <div className="notification-badge" style={{
              position: 'absolute',
              top: -5,
              right: -5,
              backgroundColor: 'red',
              color: 'white',
              borderRadius: '50%',
              fontSize: 12,
              fontWeight: 'bold',
              width: 20,
              height: 20,
              textAlign: 'center',
              lineHeight: '20px'
            }}>
              {unreadCount}
            </div>
          )}
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu style={{
        background: '#1E1E1E',
        border: '1px solid #404040',
        minWidth: '500px',
        padding: 0,
        marginTop: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}>
        <div className="px-3 py-2 border-bottom" style={{ borderColor: '#404040' }}>
          <h6 style={{ color: '#E2DAD6', margin: 0 }}>Notifications</h6>
          {notificationPermission === 'denied' && (
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => {
                alert('Please enable notifications in your browser settings to receive push notifications.');
              }}
              className="mt-2"
            >
              Enable Push Notifications
            </Button>
          )}
        </div>
        {notifications.map(notification => (
          <Dropdown.Item key={notification.id} style={{ padding: 0 }}>
            <NotificationItem notification={notification} />
          </Dropdown.Item>
        ))}
        {notifications.length > 0 && (
          <div className="text-center p-2">
            <Button
              variant="link"
              onClick={markAllAsRead}
              style={{ color: '#74E291', textDecoration: 'none' }}
            >
              Mark all as read
            </Button>
          </div>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );

  const renderUserHeader = () => (
    <div className="header-content">
      <nav className="navbar navbar-expand">
        <div className="collapse navbar-collapse justify-content-between">
          <div className="header-left">
            {!isMobile && (
              <div className="dashboard_bar" style={{ textTransform: "capitalize", display: "flex", alignItems: "center", gap: "20px", color: '#E2DAD6' }}>
                <span style={{ fontWeight: 'normal' }}>Welcome,</span>
                {userInfo.first_name + " " + userInfo.last_name}!
              </div>
            )}
          </div>
        </div>
      </nav>
      {(asAdmin && sessionStorage.getItem("logAdmin")) && (
        <Button
          style={{ width: "350px", marginRight: "20px", display: "flex", alignItems: "center", gap: "20px" }}
          onClick={() => {
            setAsAdmin(false);
            navigate("/admin/admin-dashboard");
            setUserType("admin");
            sessionStorage.removeItem('userToken');
            sessionStorage.removeItem('userInfo');
          }}
        >
          <TbDoorEnter size={25} color="white" /><span>Admin Dashboard</span>
        </Button>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {isMobile && (
          <div className="dashboard_bar" style={{ textTransform: "capitalize", display: "flex", alignItems: "center", gap: "20px", color: '#E2DAD6' }}>
            <span style={{ fontWeight: 'normal', fontSize: '1.2rem' }}>Welcome,</span>
            <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
              {userInfo.first_name + " " + userInfo.last_name}!
            </span>
          </div>
        )}
        {
          !sessionStorage.getItem("logAdmin") && renderNotificationDropdown()

        }


        <Dropdown as="li" className="nav-item dropdown header-profile">
          <Dropdown.Toggle variant="" as="a" className="nav-link i-false c-pointer">
            <div className="position-absolute" style={{ top: -8, right: 0 }}>
              {/* <FaCircle color="#74E291" size={15} /> */}
            </div>
            <Avatar name={userInfo.first_name + " " + userInfo.last_name} size={40} round />
          </Dropdown.Toggle>
          <Dropdown.Menu align="right" className="dropdown-menu dropdown-menu-end">
            <Link to="/dashboard/profile" className="dropdown-item ai-icon">
              <svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" className="text-primary me-1" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx={12} cy={7} r={4} />
              </svg>
              <span className="ms-2">Profile</span>
            </Link>
            <LogoutPage userType={userType} />
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );

  const renderAdminHeader = () => (
    <div className="header-content">
      <nav className="navbar navbar-expand">
        <div className="collapse navbar-collapse justify-content-between">
          <div className="header-left">
            <div
              className="dashboard_bar"
              style={{ textTransform: "capitalize", display: "flex", alignItems: "center", gap: "20px" }}
            >
              {superAdmin ? "Super Admin" : "Admin"}
            </div>
          </div>
        </div>
      </nav>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {renderNotificationDropdown()}
        <Dropdown as="li" className="nav-item dropdown header-profile">
          <Dropdown.Toggle variant="" as="a" className="nav-link i-false c-pointer">
            <Avatar name={"A" + " " + "D"} size={50} round />
          </Dropdown.Toggle>
          <Dropdown.Menu align="right" className="dropdown-menu dropdown-menu-end">
            <Link to="/admin/admin-dashboard/profile" className="dropdown-item ai-icon">
              <svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" className="text-primary me-1" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx={12} cy={7} r={4} />
              </svg>
              <span className="ms-2">Profile</span>
            </Link>
            <LogoutPage userType={userType} />
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );

  return (
    <div className={`header ${headerFix ? "is-fixed" : ""}`}>
      {(userType === "user") ? renderUserHeader() : renderAdminHeader()}
    </div>
  );
};

export default Header;