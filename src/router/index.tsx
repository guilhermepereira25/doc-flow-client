import DefaultLayout from '@/layouts/DefaultLayout';
import { Routes, Route } from 'react-router';
import Home from '@/pages/Home';
import PrivateRoute from '@/components/PrivateRoute';
import AuthLayout from '@/layouts/AuthLayout';
import Login from '@/pages/auth/Login';
import { AuthProvider } from '@/context/AuthContext';

export default function Router() {
  return (
    <AuthProvider>
      <Routes>
        {/* Routes go here */}
        <Route
          element={
            <PrivateRoute>
              <DefaultLayout />
            </PrivateRoute>
          }
        >
          <Route
            index
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
        </Route>
        <Route element={<AuthLayout />}>
          {/* Nested routes go here */}
          <Route path="/login" element={<Login />} />
          {/* <Route path='register' element={<Register/>} /> */}
        </Route>
      </Routes>
    </AuthProvider>
  );
}
