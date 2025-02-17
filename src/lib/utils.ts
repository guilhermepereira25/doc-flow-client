import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getEventsStatusText(status: string): string {
  let statusAsString: string;

  switch (status) {
    case 'upcoming':
      statusAsString = 'Próximo';
      break;
    case 'started':
      statusAsString = 'Em andamento';
      break;
    case 'ended':
      statusAsString = 'Finalizado';
      break;
    default:
      statusAsString = 'Desconhecido';
  }
  return statusAsString;
}

export const menuRoutes = [
  '/events',
  '/events/all',
  '/profile',
]