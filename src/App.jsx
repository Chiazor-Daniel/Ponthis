import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import About from './about';
import Home from './home';
import Accounts from './accounts';
import Contact from './contact';
import Footer from './components/footer';
import Education from './education';
import Nav from './components/nav';
import Market from './market/page';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  const routes = [
    {path: '/', component: Home},
    { path: '/market', component: Market },
    { path: '/about', component: About },
    { path: '/accounts', component: Accounts },
    { path: '/contact', component: Contact },
    { path: '/education', component: Education },
  ];

  return (
    <>
      <ChakraProvider>
        <div className="App" style={{backgroundColor: 'black'}}>
          <Nav />
          <div className="content">
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={<WithLayout component={route.component} />} />
              ))}
            </Routes>
          </div>
          <Footer />
        </div>
      </ChakraProvider>
    </>
  );
}

// Component wrapper with layout
const WithLayout = ({ component: Component }) => <Component />;

export default App;
