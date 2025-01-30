import { SidebarMenuButton, SidebarMenuItem } from './ui/sidebar';

interface NavMenuItemProps {
  text: string;
  onClick: () => void;
  activeNavItem: boolean;
}

export default function NavMenuItem({ ...props }: NavMenuItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        className={`${
          props.activeNavItem
            ? 'bg-sky-900 text-white border rounded-lg hover:bg-sky-800'
            : 'text-muted'
        } p-4 mb-4`}
        type="button"
        onClick={props.onClick}
      >
        <span>&#9679; {props.text}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
