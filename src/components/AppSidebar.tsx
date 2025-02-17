'use client';

import * as React from 'react';

import { NavUser } from './NavUser';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
} from '@/components/ui/sidebar';
import NavMenuItem from './NavMenuItem';
import { useLocation, useNavigate } from 'react-router';
import useAuth from '@/hooks/useAuth';
import { menuRoutes } from '@/lib/utils';
import { Button } from './ui/button';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeNavItem, setActiveNavItem] = React.useState<string>('');
  const { user, logout } = useAuth();

  const menuItems = React.useMemo(() => {
    return menuRoutes;
  }, []);

  React.useEffect(() => {
    if (menuItems.includes(location.pathname)) {
      setActiveNavItem(location.pathname);
    }
  }, [location, menuItems]);

  return (
    <Sidebar variant="inset" {...props} collapsible="offcanvas">
      <SidebarHeader className="flex items-center justify-between p-4">
        <NavUser
          user={{
            email: user?.email || 'Email não encontrado',
            name: user?.fullName || 'Nome não encontrado',
            avatar: `/avatars/${user?.fullName.charAt(0).toLowerCase()}.png`,
          }}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="space-y-1">
            <NavMenuItem
              text="Criar Evento"
              onClick={() =>
                navigate('/events', {
                  state: { from: { pathname: '/events' } },
                })
              }
              activeNavItem={activeNavItem === '/events'}
            />
            <NavMenuItem
              text="Todos eventos"
              onClick={() =>
                navigate('/events/all', {
                  state: { from: { pathname: '/events/all' } },
                })
              }
              activeNavItem={activeNavItem === '/events/all'}
            />
            <NavMenuItem
              text="Seus arquivos"
              onClick={() =>
                navigate('/files', {
                  state: { from: { pathname: '/files' } },
                })
              }
              activeNavItem={activeNavItem === '/files'}
            />
            <NavMenuItem
              text="Perfil"
              onClick={() =>
                navigate('/profile', {
                  state: { from: { pathname: '/profile' } },
                })
              }
              activeNavItem={activeNavItem === '/profile'}
            />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <Button
          className="rounded-2xl bg-sky-900 text-white"
          onClick={() => logout()}
        >
          Sair
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
