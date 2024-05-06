import { Route, Routes } from 'react-router-dom';
import Login from './jsx/pages/Login';
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./css/style.css";
import { MainLayout } from './jsx';
import "./App.css"
import { useSelector } from 'react-redux';
import Error400 from './jsx/pages/Error400';
import Register from './jsx/pages/Registration';
import AppProfile from './jsx/components/AppsMenu/AppProfile/AppProfile';
import Home from './jsx/components/Dashboard/Home';
import IntradayTrading from './jsx/components/Trading/IntradayTrading';
import ViewTransactions from './jsx/components/transactions';
import Deposit from './jsx/components/transactions/depost';
import Withdraw from './jsx/components/transactions/withdraw';
import ViewTrade from './jsx/components/Trading/ViewTrade';
import ForgotPassword from './jsx/pages/ForgotPassword';
import ResetPassword from './jsx/pages/ResetPassword';
import VerifyAccount from './jsx/pages/verify-account';
import AdminDashboard from './jsx/Admin/AdminDashboard';
import UserDetails from './jsx/Admin/userDetails';
import AdminLogin from './jsx/Admin/AdminLogin';
import AdminDetails from './jsx/Admin/adminDetails';
import { useEffect, useState } from 'react';
import CRM from './jsx/Admin/CRM';
import ViewLead from './jsx/Admin/leadDetails';
const pages = [
  { path: '/', component: Login },
  { path: '/register', component: Register },
  { path: '/dashboard', component: Home },
  { path: '/dashboard/profile/:profileId', component: AppProfile },
  { path: '/dashboard/profile', component: AppProfile },
  { path: '/dashboard/profile/edit', component: AppProfile },
  // {path: "/dashboard/edit-profile", component: EditProfile}
  { path: '/dashboard/trading', component: IntradayTrading },
  { path: '/dashboard/trading/view', component: ViewTrade },
  { path: '/dashboard/trading/open', component: IntradayTrading },
  { path: '/dashboard/view-transactions', component: ViewTransactions },
  { path: '/dashboard/deposit', component: Deposit },
  { path: "/dashboard/withdraw", component: Withdraw },
];

const adminPages = [
  { path: "/admin/admin-dashboard/", component: AdminDashboard },
  { path: "/admin/admin-dashboard/crm", component: CRM },
  {path: "/admin/admin-dashboard/admin/:id", component: AdminDetails},
  {path: "/admin/admin-dashboard/user/:id", component: UserDetails},
  {path: "/admin/admin-dashboard/lead/:id", component: ViewLead}
];

function App() {
  const { userInfo, userToken } = useSelector(state => state.auth);
  const [userType, setUserType] = useState("admin")
  const[superAdmin, setSuperAdmin] = useState(false)
  const { adminInfo, adminToken } = useSelector(state => state.adminAuth);

  useEffect(()=> console.log("from dash", adminToken), [])

  return (
    <Routes>
      {pages.map(({ path, component: Component }) => (
        <Route
          key={path}
          path={path}
          element={path === '/' || path === '/register' ? <Component userType={userType} setUserType={(user)=>setUserType(user)}/> : ((userToken && userInfo)) ? <MainLayout userType={userType} setUserType={(user)=>setUserType(user)}><Component  userType={userType} setUserType={(user)=>setUserType(user)}/></MainLayout> : <Error400 />}
        />
      ))}

      {adminPages.map(({ path, component: Component }) => (
        <Route
          key={path}
          path={path}
          element={<MainLayout superAdmin={superAdmin} setSuperAdmin={setSuperAdmin}  userType={userType} setUserType={(user)=>setUserType(user)}><Component  userType={userType} setUserType={(user)=>setUserType(user)} superAdmin={superAdmin} setSuperAdmin={setSuperAdmin}/></MainLayout>}
          // element={userToken && userInfo ? <MainLayout><Component /></MainLayout> : <Error400 />}
        />
      ))}

      <Route path='/error' element={<Error400 />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password/*' element={<ResetPassword />} />
      <Route path='/verify-email/:token' element={<VerifyAccount />} />
      <Route path='/dashboard/verify-email/*' element={<VerifyAccount />} />
      <Route path='/admin/admin-login' element={<AdminLogin setUserType={(user)=>setUserType(user)} superAdmin={superAdmin} setSuperAdmin={setSuperAdmin}/>} />
    </Routes>
  ); 
};

export default App;
