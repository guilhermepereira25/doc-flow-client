import DefaultLayout from '@/layouts/DefaultLayout';
import { Routes, Route } from 'react-router';
import PrivateRoute from '@/components/PrivateRoute';
import AuthLayout from '@/layouts/AuthLayout';
import Login from '@/pages/auth/Login';
import { AuthProvider } from '@/context/AuthProvider';
import Signup from '@/pages/auth/Signup';
import EventsView from '@/pages/events/EventsView';
import EventsCreate from '@/pages/events/EventsCreate';
import EventsUserView from '@/pages/events/EventsUserView';
import EventsEdit from '@/pages/events/EventsEdit';

export default function Router() {
  return (
    <AuthProvider>
      <Routes>
        {/* Routes go here */}
        <Route path="/" element={<DefaultLayout />}>
          <Route element={<PrivateRoute />}>
            <Route path="/events">
              <Route index element={<EventsUserView />} />
              <Route path="/events/all" element={<EventsView />} />
              <Route path="/events/create" element={<EventsCreate />} />
              <Route path="/events/:eventId/edit" element={<EventsEdit />} />
            </Route>
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
