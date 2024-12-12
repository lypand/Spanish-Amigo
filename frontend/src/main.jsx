import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login/login.tsx';

const ValidateLogin = ({ children }) => {
  var userToken = sessionStorage.getItem("token");
  if (userToken) {
    return children;
  }
  return <Navigate to='/' />;
}

const NotFound = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
console.log(import.meta.env);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <GoogleOAuthProvider clientId={CLIENT_ID}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/vocab" element={
              <ValidateLogin>
                <App />
              </ValidateLogin>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </GoogleOAuthProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)