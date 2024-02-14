import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useCartData } from "../utils";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, close, getTotalPrice, parseToBrl } =
    useCartData();

  const goTochekout = () => {
    navigate("/checkout");
    close();
  };

  return (
    <aside className="max-w-[300px] md:max-w-[360px] lg:max-w-[360px] xl:max-w-[360px] w-full bg-slate-700 z-10 pt-10 px-4 overflow-y-auto">
      {cart.length > 0 ? (
        <>
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
                    toast.error("Item removido do carrinho com sucesso!");
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
            Total de {parseToBrl(getTotalPrice())}{" "}
          </p>
          <button
            onClick={goTochekout}
            type="button"
            title="Clique aqui para continuar com a compra"
            className="bg-amber-500 hover:bg-amber-700 transition-all duration-300 px-5 py-1 rounded-md font-bold max-w-full w-full"
          >
            Finalizar Compra
          </button>
        </>
      ) : (
        <p className="text-white text-center leading-6">
          O carrinho está vazio, adicione pelo menos um produto para continuar
          com a compra.
        </p>
      )}
    </aside>
  );
};

export default Cart;
