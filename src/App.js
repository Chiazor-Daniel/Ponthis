import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './jsx/pages/Login';
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./css/style.css";
import { MainLayout } from './jsx';
import "./App.css"
import Home from './jsx/components/Dashboard/Home';
import { useEffect } from 'react';
import { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext';
import { useSelector } from 'react-redux';
import Error400 from './jsx/pages/Error400';
import Register from './jsx/pages/Registration';

const LoginPage = () => <Login />;
const DashboardPage = () => (
  <MainLayout>
    <Home />
  </MainLayout>
);

function App(props) {
  const { changeBackground } = useContext(ThemeContext);
  const {loading, userInfo, userToken, error, success} = useSelector(state => state.auth);

  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={(userToken && userInfo) ? <DashboardPage /> : <Error400 />} />
    </Routes>
  );
};

export default App;
