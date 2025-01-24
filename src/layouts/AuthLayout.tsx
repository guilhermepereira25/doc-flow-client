import { Outlet } from 'react-router';
import logo from '@/assets/cefet-logo.png';

export default function AuthLayout() {
  return (
    <div className="h-screen grid grid-cols-2">
      <div className="flex flex-col min-h-screen items-center justify-center bg-white p-4">
        <div className="logo">
          <img
            className="mx-auto h-[200px] w-auto object-contain"
            src={logo}
            alt="CEFET/RJ"
          />
        </div>
        <Outlet />
      </div>
      <div className="bg-sky-900"></div>
    </div>
  );
}
