import { useCartStore } from "../store/CartStore";

export function useCartData() {
  const [items, addToCart, isOpen, close, open, cart, removeFromCart] =
    useCartStore((state) => [
      state.availableItems,
      state.addToCart,
      state.isOpen,
      state.close,
      state.open,
      state.cart,
      state.removeFromCart,
    ]
  );

  const parseToBrl = (amount = 0) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  }

  const getTotalPrice = () => {
    return cart.reduce((accumulator, currentItem) => {
      if (currentItem.price) {
        return (accumulator += currentItem.price)
      }
      return 0
    }, 0)
  }

  return { items, addToCart, isOpen, close, open, cart, removeFromCart, getTotalPrice, parseToBrl };
}
