export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl?: string;
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

export interface MenuTheme {
  backgroundImage?: string;
  primaryColor: string;
  secondaryColor: string;
}

export interface MenuProfile {
  title: string;
  theme: MenuTheme;
  sections: MenuSection[];
  profileType: string; // Tipo de perfil (ej. Vegano, Buffet, etc.)
}
