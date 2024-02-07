import { useCartStore } from "../store/CartStore";
import tenis from "../assets/tenis.png";

const Cart = () => {
  const [items, removeFromCart, isOpen, close] = useCartStore((state) => [
    state.cart,
    state.removeFromCart,
    state.isOpen,
    state.close,
  ]);


  return (
    <>
      <div className="grid grid-cols-4 gap-4 text-lg text-white mb-14 mt-14">
        <h1>Cart</h1>
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
                removeFromCart(item.id);
              }}
              className="bg-amber-500 hover:bg-amber-700 transition-all duration-300 px-5 py-1 rounded-md font-bold w-full"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <div
        className={`${
          isOpen ? "flex" : "hidden"
        } fixed top-0 left-0 w-full h-full justify-end z-10`}
      >
        <div onClick={close} className="absolute top-0 left-0 w-full h-full bg-slate-900 opacity-70" />
        <aside className="max-w-[360px] w-full bg-slate-700 z-10 pt-10 px-4">
          <ul>
            <li className="flex gap-3 border-b border-solid border-slate-400 py-2 relative">
              <img className="w-20 h-20 mr-6 object-cover" src={tenis} alt="" />
              <div>
                <h3 className="text-base font-bold text-white">
                  Nome do Produto
                </h3>
                <span className="text-sm text-white font-bold">R$: 150,00</span>
              </div>
              <button className="text-xl text-white cursor-pointer font-bold w-4 h-4 border-none bg-transparent absolute top-2 right-0">
                X
              </button>
            </li>
            <li className="flex gap-3 border-b border-solid border-slate-400 py-2 relative">
              <img className="w-20 h-20 mr-6 object-cover" src={tenis} alt="" />
              <div>
                <h3 className="text-base font-bold text-white">
                  Nome do Produto
                </h3>
                <span className="text-sm text-white font-bold">R$: 150,00</span>
              </div>
              <button className="text-xl text-white cursor-pointer font-bold w-4 h-4 border-none bg-transparent absolute top-2 right-0">
                X
              </button>
            </li>
          </ul>
          <p className="text-base font-bold text-white mt-8 mb-4">
            2 produto(s) no carrinho
          </p>
          <p className="text-sm text-white font-bold mb-6">Total: R$:</p>
          <button className="bg-amber-500 hover:bg-amber-700 transition-all duration-300 px-5 py-1 rounded-md font-bold max-w-full w-full">
            Finalizar Compra
          </button>
        </aside>
      </div>
    </>
  );
};

export default Cart;
