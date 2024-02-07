import { create } from "zustand";

interface Item {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

type CartStore = {
  availableItems: Item[];
  cart: Item[];
  addToCart: (item: Item) => void;
  removeFromCart: (id: number) => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useCartStore = create<CartStore>((set) => {
  (async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    set({ availableItems: products });

    if (products.length === 0) {
      set({ cart: [], isOpen: false });
    }
  })();

  return {
    cart: [],
    availableItems: [],
    isOpen: false,
    addToCart: (item: Item) => {
      set((state: CartStore) => {
        const itemInCart = state.cart.find((cartItem) => cartItem.id === item.id);
        if (itemInCart) {
          alert("Este item já está no carrinho!");
          return state;
        }  
        return { ...state, cart: [...state.cart, item] };
      });
    },    
    removeFromCart: (id) =>
      set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),
    open: () => {
      set({ isOpen: true });
    },
    close: () => {
      set({ isOpen: false });
    },
  };
});
