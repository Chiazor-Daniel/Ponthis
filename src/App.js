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


const pages = [
  { path: '/', component: Login },
  { path: '/register', component: Register },
  { path: '/dashboard', component: Home },
  { path: '/dashboard/profile', component: AppProfile }
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
    </Routes>
  );
};

export default App;
