import { useEffect, useState } from 'react';

export function useUserType() {
  const [userType, setUserType] = useState("admin");
  const [asAdmin, setAsAdmin] = useState(false);
  const [superAdmin, setSuperAdmin] = useState(false);


  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
  
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      } else if (permission === 'denied') {
        console.log('Notification permission denied.');
      } else {
        console.log('Notification permission dismissed (neither granted nor denied).');
      }
    } else {
      console.log('This browser does not support notifications.');
    }
  };
  useEffect(() => {
    requestNotificationPermission()
    const initialUserType = localStorage.getItem('userType');
    setUserType(initialUserType);

    const initialSuperAdmin = localStorage.getItem('superAdmin') === 'true';
    setSuperAdmin(initialSuperAdmin);
  }, []);

  useEffect(() => {
    localStorage.setItem('userType', userType);
    sessionStorage.setItem('userType', userType);
  }, [userType]);

  useEffect(() => {
    localStorage.setItem('superAdmin', superAdmin);
  }, [superAdmin]);

  useEffect(() => {
    localStorage.setItem('asAdmin', JSON.stringify(asAdmin));
  }, [asAdmin]);

  useEffect(() => {
    asAdmin && setUserType("user");
  }, [asAdmin]);

  return { userType, setUserType, asAdmin, setAsAdmin, superAdmin, setSuperAdmin };
}
