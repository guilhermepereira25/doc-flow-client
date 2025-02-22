import { AppSidebar } from '@/components/AppSidebar';
import { MobileMenu } from '@/components/MobileMenu';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Outlet } from 'react-router';
import { Toaster } from '../components/ui/sonner';

export default function DefaultLayout() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="h-screen">
        <MobileMenu />
        <main>
          <Outlet />
        </main>
        <Toaster richColors expand={false} />
        <footer className="fixed bottom-0 w-full">
          <div className="bg-sky-900 text-white text-center py-2">
            <p>© {new Date().getFullYear()} DocFlow</p>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <main>
            <Outlet />
          </main>
          <Toaster position="top-center" richColors expand={false} />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
