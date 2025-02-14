import DefaultLayout from '@/layouts/DefaultLayout';
import { Routes, Route, Navigate } from 'react-router';
import PrivateRoute from '@/components/PrivateRoute';
import AuthLayout from '@/layouts/AuthLayout';
import Login from '@/pages/auth/Login';
import { AuthProvider } from '@/context/AuthProvider';
import Signup from '@/pages/auth/Signup';
import EventsView from '@/pages/events/EventsView';
import EventsCreate from '@/pages/events/EventsCreate';
import EventsUserView from '@/pages/events/EventsUserView';
import EventsEdit from '@/pages/events/EventsEdit';
import Profile from '@/pages/Profile';
import NotFound from '@/pages/NotFound';

export default function Router() {
  return (
    <AuthProvider>
      <Routes>
        {/* Routes go here */}
        <Route element={<PrivateRoute />} >
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<Navigate to="/events" />} />

            <Route path="events">
              <Route index element={<EventsUserView />} />
              <Route path="all" element={<EventsView />} />
              <Route path="create" element={<EventsCreate />} />
              <Route path=":eventId/edit" element={<EventsEdit />} />
            </Route>

            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          {/* Nested routes go here */}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}
