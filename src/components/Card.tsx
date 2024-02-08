import { useCartStore } from "../store/CartStore";
import cartImg from "../assets/carrinho.svg";

const CardItem = () => {
  const [items, addToCart, isOpen, close, open, cart, removeFromCart] =
    useCartStore((state) => [
      state.availableItems,
      state.addToCart,
      state.isOpen,
      state.close,
      state.open,
      state.cart,
      state.removeFromCart,
    ]);

  const sum = cart.reduce((acc, item) => acc + item.price, 0);

  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 text-lg text-white mb-14 mt-14">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center justify-between rounded-lg bg-white p-4 gap-2 border-2 border-slate-900"
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
        <aside className="max-w-[360px] w-full bg-slate-700 z-10 pt-10 px-4 overflow-y-auto">
          <ul>
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex gap-3 border-b border-solid border-slate-400 py-2 relative"
              >
                <img
                  className="w-16 mr-6 object-cover"
                  src={item.image}
                  alt={item.title}
                />
                <div>
                  <h3 className="text-base font-bold text-white mr-6">
                    {item.title}
                  </h3>
                  <span className="text-sm text-white font-bold">
                    R$: {item.price}
                  </span>
                </div>
                <button
                  onClick={() => {
                    removeFromCart(item.id);
                  }}
                  className="text-xl text-white cursor-pointer font-bold w-4 h-4 border-none bg-transparent absolute top-2 right-0"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
          <p className="text-base font-bold text-white mt-8 mb-4">
            {cart.length} produto(s) no carrinho
          </p>
          <p className="text-sm text-white font-bold mb-6">
            Total: R$: {formatter.format(sum)}
          </p>
          <button className="bg-amber-500 hover:bg-amber-700 transition-all duration-300 px-5 py-1 rounded-md font-bold max-w-full w-full">
            Finalizar Compra
          </button>
        </aside>
      </div>
    </>
  );
};

export default CardItem;
