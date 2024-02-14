import { toast } from "sonner";

import cartImg from "../assets/carrinho.svg";
import { useCartData } from "../utils";
import Cart from "./Cart";

const CardItem = () => {
  const { isOpen, cart, close, addToCart, items, open } = useCartData();
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 text-lg text-white mb-14 mt-14">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center justify-between rounded-lg bg-white p-4 gap-4 border-2 border-slate-900"
          >
            <h1 className="text-2xl text-center font-bold text-black">
              {item.title}
            </h1>
            <img
              className="w-60 hover:scale-110 duration-300"
              src={item.image}
              alt={item.title}
            />
            <p className="text-black text-3xl font-bold">
              <span className="text-2xl">R$:</span> {item.price}
            </p>
            <button
              onClick={() => {
                addToCart(item);
                const itemInCart = cart.find(
                  (cartItem) => cartItem.id === item.id
                );
                if (itemInCart) {
                  toast.error("Item já está no carrinho!");
                } else {
                  toast.success("Item adicionado ao carrinho com sucesso!");
                }
                open();
              }}
              className="flex items-center justify-center gap-4 bg-amber-500 hover:bg-amber-700 transition-all duration-300 px-5 py-1 rounded-md font-bold w-full"
            >
              Add to Cart
              <img src={cartImg} alt="carrinho" />
            </button>
          </div>
        ))}
      </div>
      <div
        className={`${
          isOpen ? "flex" : "hidden"
        } fixed top-0 left-0 w-full h-full justify-end z-10`}
      >
        <div
          onClick={close}
          className="absolute top-0 left-0 w-full h-full bg-slate-900 opacity-70"
        />
        <Cart />
      </div>
    </>
  );
};

export default CardItem;
