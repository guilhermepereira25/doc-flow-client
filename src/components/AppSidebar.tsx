'use client';

import * as React from 'react';

import { NavUser } from './NavUser';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
} from '@/components/ui/sidebar';
import NavMenuItem from './NavMenuItem';
import { useLocation, useNavigate } from 'react-router';
import useAuth from '@/hooks/useAuth';
import { menuRoutes } from '@/lib/utils';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeNavItem, setActiveNavItem] = React.useState<string>('');
  const { user } = useAuth();

  const menuItems = React.useMemo(() => {
    return menuRoutes;
  }, []);

  React.useEffect(() => {
    if (menuItems.includes(location.pathname)) {
      setActiveNavItem(location.pathname);
    }
  }, [location, menuItems]);

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader className="flex items-center justify-between p-4">
        <NavUser
          user={{
            email: user?.email || 'Email não encontrado',
            name: 'Guilherme Pereira',
            avatar: '/avatars/guilherme.jpg',
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
      <SidebarRail />
    </Sidebar>
  );
}
