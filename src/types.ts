export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  image: string;
  category: 'phone' | 'audio' | 'accessories';
  series?: string;
  refId?: string;
  specs?: Record<string, string>;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
  engraving?: string;
  eqPreset?: string;
}

export interface TechSpec {
  id: string;
  code: string;
  title: string;
  description: string;
  details: string[];
}
