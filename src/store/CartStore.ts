import { create } from "zustand";

export interface Item {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

export type CartStore = {
  availableItems: Item[];
  cart: Item[];
  addToCart: (item: Item) => void;
  removeFromCart: (id: number) => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  removeAllFromCart: () => void;
};

export const useCartStore = create<CartStore>((set) => {
  const initCart = () => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      return JSON.parse(storedCart);
    } else {
      return [];
    }
  };

  (async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();

    if (products.length === 0) {
      set({ availableItems: [], cart: [], isOpen: false });
    } else {
      set({
        availableItems: products,
        cart: initCart(),
        isOpen: false,
      });
    }
  })();

  const removeAllFromCart = () => {
    localStorage.removeItem("cart");
    set((state) => ({ ...state, cart: [], isOpen: false }));
  };

  return {
    cart: [],
    availableItems: [],
    isOpen: false,
    addToCart: (item: Item) => {
      set((state: CartStore) => {
        const itemInCart = state.cart.find(
          (cartItem) => cartItem.id === item.id
        );
        if (itemInCart) {
          return state;
        }
        const newCart = [...state.cart, item];
        localStorage.setItem("cart", JSON.stringify(newCart));
        return { ...state, cart: newCart };
      });
    },
    removeFromCart: (id) =>
      set((state) => {
        const newCart = state.cart.filter((item) => item.id !== id);
        localStorage.setItem("cart", JSON.stringify(newCart));
        return { ...state, cart: newCart };
      }),
    open: () => {
      set({ isOpen: true });
    },
    close: () => {
      set({ isOpen: false });
    },
    removeAllFromCart,
  };
});
