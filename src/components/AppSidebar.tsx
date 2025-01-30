'use client';

import * as React from 'react';

import { NavUser } from './NavUser';
// import { TeamSwitcher } from "./team-switcher" // Removed import
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeNavItem, setActiveNavItem] = React.useState<string>('');
  const { user } = useAuth();

  React.useEffect(() => {
    if (location.pathname === '/events') {
      setActiveNavItem('events');
      return;
    }
    if (location.pathname === '/events/create') {
      setActiveNavItem('/events/create');
      return;
    }
  }, [location]);

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
          <SidebarMenu className="space-y-2">
            <NavMenuItem
              text="Todos eventos"
              onClick={() => navigate('/events')}
              activeNavItem={activeNavItem === 'events'}
            />
            <NavMenuItem
              text="Criar Evento"
              onClick={() => navigate('/events/create')}
              activeNavItem={activeNavItem === '/events/create'}
            />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
