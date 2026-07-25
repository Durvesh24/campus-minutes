export interface FoodCategory {
  id: string;
  name: string;
  slug: string;
}

export interface MenuItem {
  id: string;
  canteenId: string;
  name: string;
  description?: string;
  price: number;
  isAvailable: boolean;
  category: FoodCategory;
  imageUrl?: string;
}

export interface Canteen {
  id: string;
  name: string;
  location: string;
  isOpen: boolean;
}
