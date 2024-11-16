"use client"
import { MenuProfile } from '../types/menu';

export const italianMenuProfile: MenuProfile = {
  title: 'Cucina Italiana',
  profileType: 'Cocina Italiana',
  theme: {
    primaryColor: '#9b1c31',  // Rojo Italiano
    secondaryColor: '#d2a700', // Amarillo mostaza
    backgroundImage: '/images/italia.jpg',
  },
  sections: [
    {
      title: 'Antipasti',
      items: [
        { id: '1', name: 'Bruschetta', description: 'Pan tostado con tomate y albahaca', price: '6.99' },
        { id: '2', name: 'Caprese', description: 'Tomate, mozzarella y albahaca fresca', price: '8.50' },
        { id: '3', name: 'Caprese', description: 'Tomate, mozzarella y albahaca fresca', price: '8.50' },
        { id: '4', name: 'Caprese', description: 'Tomate, mozzarella y albahaca fresca', price: '8.50' },

      ]
    },
    {
      title: 'Primi',
      items: [
        { id: '3', name: 'Spaghetti Carbonara', description: 'Espaguetis con crema, tocino y queso parmesano', price: '14.99' },
        { id: '4', name: 'Lasagna', description: 'Lasaña clásica con carne y salsa bechamel', price: '16.50' },
      ]
    }
  ]
};

export const veganMenuProfile: MenuProfile = {
  title: 'Menú Vegano',
  profileType: 'Menú Vegano',
  theme: {
    primaryColor: '#4CAF50', // Verde
    secondaryColor: '#FFC107', // Amarillo
    backgroundImage: '/images/vegetable.jpg',
  },
  sections: [
    {
      title: 'Entradas',
      items: [
        { id: '5', name: 'Hummus', description: 'Crema de garbanzo con especias', price: '5.50' },
        { id: '6', name: 'Guacamole', description: 'Aguacate con cebolla, cilantro y limón', price: '6.00' },
      ]
    },
    {
      title: 'Platos Principales',
      items: [
        { id: '7', name: 'Tofu al Curry', description: 'Tofu con salsa curry', price: '12.99' },
        { id: '8', name: 'Pasta Vegana', description: 'Pasta con salsa de tomate y albahaca', price: '13.50' },
      ]
    }
  ]
};
