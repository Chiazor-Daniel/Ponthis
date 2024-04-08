import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './jsx/pages/Login';
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./css/style.css";
import { MainLayout } from './jsx';
import Home from './jsx/components/Dashboard/Home';

const LoginPage = () => <Login />;
const DashboardPage = () => (
  <MainLayout>
    <Home />
  </MainLayout>
);

function App(props) {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path='/dashboard' element={<DashboardPage />} />
    </Routes>
  );
};

export default App;
