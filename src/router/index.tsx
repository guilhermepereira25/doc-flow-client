import DefaultLayout from "@/layouts/DefaultLayout";
import { Routes, Route, Navigate } from "react-router";
import PrivateRoute from "@/components/PrivateRoute";
import AuthLayout from "@/layouts/AuthLayout";
import Login from "@/pages/auth/Login";
import { AuthProvider } from "@/context/AuthProvider";
import Signup from "@/pages/auth/Signup";
import EventsView from "@/pages/events/EventsView";
import EventsCreate from "@/pages/events/EventsCreate";
import EventsUserView from "@/pages/events/EventsUserView";
import EventsEdit from "@/pages/events/EventsEdit";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";
import File from "@/pages/files/File";
import ProfileRoute from "@/components/ProfileRoute";
import ChangePassword from "@/pages/user/ChangePassword";
import Forbidden from "@/pages/Forbidden";
import FileCreate from '@/pages/files/FileCreate';

export default function Router() {
  return (
    <AuthProvider>
      <Routes>
        {/* Routes go here */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<Navigate to="/events" />} />

            <Route path="events">
              <Route path="all" element={<EventsView />} />
              <Route
                element={<ProfileRoute profile={['Admin', 'Professor']} />}
              >
                <Route index element={<EventsUserView />} />
                <Route path="create" element={<EventsCreate />} />
                <Route path=":eventId/edit" element={<EventsEdit />} />
              </Route>
            </Route>

            <Route path="files">
              <Route index element={<File />} />
              <Route
                element={<ProfileRoute profile={['Admin', 'Professor']} />}
              >
                <Route path="create" element={<FileCreate />} />
              </Route>
            </Route>

            <Route path="profile" element={<Profile />} />

            <Route path="user">
              <Route path="changePassword" element={<ChangePassword />} />
            </Route>
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          {/* Nested routes go here */}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}
