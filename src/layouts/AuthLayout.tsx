import { Outlet } from 'react-router';

export default function AuthLayout() {
  return (
    <div className="h-screen grid grid-cols-2">
      <Outlet />
      <div className="bg-sky-900"></div>
    </div>
  );
}
