import { ROUTES } from './routes';

export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  icon?: string;
}

export const MAIN_NAV: NavItem[] = [
  { title: 'Home', href: ROUTES.HOME },
  { title: 'Food', href: ROUTES.FOOD.ROOT },
  { title: 'Printing', href: ROUTES.PRINTING.ROOT },
];

export const BOTTOM_NAV: NavItem[] = [
  { title: 'Home', href: ROUTES.HOME, icon: 'Home' },
  { title: 'Food', href: ROUTES.FOOD.ROOT, icon: 'Utensils' },
  { title: 'Print', href: ROUTES.PRINTING.ROOT, icon: 'Printer' },
  { title: 'Cart', href: ROUTES.CART, icon: 'ShoppingBag' },
  { title: 'Profile', href: ROUTES.PROFILE, icon: 'User' },
];
