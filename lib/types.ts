export const categories = ["Kat","Hond","Accessoires","Konijnen & knaagdieren","Vogels & kippen","Maxi Deals","Maxi Zoo Friends","Outlet","Overig"] as const;
export type Category = typeof categories[number];
export type Promo = {
  id: string;
  brand: string;
  product: string;
  category: Category;
  offer: string;
  price?: string;
  validFrom?: string;
  validUntil?: string;
  friendsOnly?: boolean;
  maxiDeal?: boolean;
  outlet?: boolean;
  notes?: string;
  sourcePage?: number;
};
export type ParseResult = {
  title: string;
  period: string;
  promos: Promo[];
  warnings: string[];
};
