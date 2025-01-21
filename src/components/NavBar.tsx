import { Link } from 'react-router';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

export default function NavBar() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <Link to={'/home'}>
          <NavigationMenuLink href="/home">
            <NavigationMenuItem className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuItem>
          </NavigationMenuLink>
        </Link>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
