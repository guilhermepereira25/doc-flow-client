import DefaultLayout from '@/layouts/DefaultLayout';
import { Routes, Route } from 'react-router';
import Home from '@/pages/Home';
import PrivateRoute from '@/components/PrivateRoute';
import AuthLayout from '@/layouts/AuthLayout';
import Login from '@/pages/auth/Login';
import { AuthProvider } from '@/context/AuthProvider';
import Signup from '@/pages/auth/Signup';

export default function Router() {
  return (
    <AuthProvider>
      <Routes>
        {/* Routes go here */}
        <Route path="/" element={<DefaultLayout />}>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          {/* Nested routes go here */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
