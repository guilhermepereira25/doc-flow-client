import { AppSidebar } from '@/components/AppSidebar';
import { MobileMenu } from '@/components/MobileMenu';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Outlet } from 'react-router';

export default function DefaultLayout() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="h-screen">
        <MobileMenu />
        <main>
          <Outlet />
        </main>
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
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
