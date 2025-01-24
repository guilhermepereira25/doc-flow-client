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
        <NavigationMenuLink href="/home">
          <NavigationMenuItem className={navigationMenuTriggerStyle()}>
            Home
          </NavigationMenuItem>
        </NavigationMenuLink>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
