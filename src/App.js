import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './jsx/pages/Login';
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./css/style.css";
import { MainLayout } from './jsx';
import "./App.css"
import { useEffect } from 'react';
import { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext';
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

const pages = [
  { path: '/', component: Login },
  { path: '/register', component: Register },
  { path: '/dashboard', component: Home },
  { path: '/dashboard/profile/:profileId', component: AppProfile },
  { path: '/dashboard/profile', component: AppProfile },
  { path: '/dashboard/profile/edit', component: AppProfile },
  // {path: "/dashboard/edit-profile", component: EditProfile}
  {path: '/dashboard/trading', component: IntradayTrading}, 
  {path: '/dashboard/trading/view', component: ViewTrade}, 
  {path: '/dashboard/trading/open', component: IntradayTrading}, 

  {path: '/dashboard/view-transactions', component: ViewTransactions},
  {path: '/dashboard/deposit', component: Deposit}, 
  {path: "/dashboard/withdraw", component: Withdraw}
];

function App(props) {
  const { changeBackground } = useContext(ThemeContext);
  const {loading, userInfo, userToken, error, success} = useSelector(state => state.auth);

  return (
    <Routes>
      {pages.map(({ path, component: Component }) => (
        <Route
          key={path}
          path={path}
          element={path === '/' || path === '/register' ? <Component /> : (userToken && userInfo) ? <MainLayout><Component /></MainLayout> : <Error400 />}
        />
      ))}
      <Route path='/error' element={<Error400 />} />
    </Routes>
  );
};

export default App;
