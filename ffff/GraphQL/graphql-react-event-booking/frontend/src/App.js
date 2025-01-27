import {
  Route,
  BrowserRouter,
  Routes,
  Navigate
} from 'react-router-dom';
import { ApolloProvider } from '@apollo/client'

import { AuthPage } from './pages/Auth';
import client from './apolloClient';
import { EventsPage } from './pages/Events';
import { BookingsPage } from './pages/Bookings';
import { MainNavigation } from './components/Navigation/MainNavigation';

import { AuthContext } from './context/auth-context';

import './App.css';
import { useState } from 'react';

function App() {

  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = (userId, token, tokenExpiration) => {
    setUserId(userId);
    setToken(token);
  }

  const logout = () => {
    setUserId(null);
    setToken(null);
  }

  return (
    <div className="App">
      <ApolloProvider client={client} >
        <BrowserRouter>
          <AuthContext.Provider value={{ token: token, userId: userId, login: login, logout: logout }}>
            <MainNavigation />
            {console.log("in the App.js top level file")}
            <main className='main-content'>
              <Routes>
                {/* THE TOKEN SHOWS WHICH URLS YOU CAN GO TO!! */}
                {token && <Route path="/" element={<Navigate to="/events" replace />} />}
                {!token && <Route path="/auth" element={<AuthPage />} />}
                {token && <Route path="/auth" element={<Navigate to="/events" replace />} />}
                {token && <Route path="/bookings" element={<BookingsPage />} />}
                <Route path="/events" element={<EventsPage />} />
                {!token && <Route path="*" element={<Navigate to="/auth" replace />} />}
              </Routes>
            </main>
          </AuthContext.Provider>
        </BrowserRouter>
      </ApolloProvider>
    </div >
  );
}

export default App;
