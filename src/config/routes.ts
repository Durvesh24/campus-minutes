export const ROUTES = {
  HOME: '/',
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
  },
  FOOD: {
    ROOT: '/food',
    CANTEEN: (id: string) => `/food/canteen/${id}`,
    ITEM: (id: string) => `/food/item/${id}`,
  },
  PRINTING: {
    ROOT: '/printing',
    UPLOAD: '/printing/upload',
  },
  CART: '/cart',
  ORDERS: {
    ROOT: '/orders',
    DETAIL: (id: string) => `/orders/${id}`,
  },
  PROFILE: '/profile',
  VENDOR: {
    ROOT: '/vendor',
    DASHBOARD: '/vendor/dashboard',
  },
  PARTNER: {
    ROOT: '/partner',
    DASHBOARD: '/partner/dashboard',
  },
  ADMIN: {
    ROOT: '/admin',
    DASHBOARD: '/admin/dashboard',
  },
} as const;
