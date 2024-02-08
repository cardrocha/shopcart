import { useCartStore } from "../store/CartStore";
import cart from "../assets/carrinho.svg";

const Header = () => {
  const { open, cart: items } = useCartStore();

  return (
    <div>
      <div className="flex flex-row items-center justify-between bg-slate-500 px-8 py-5 rounded-lg">
        <h1 className="text-2xl xl:text-4xl font-bold">CartShop</h1>
        <nav className="flex flex-row items-center gap-6">
          <a
            onClick={open}
            className="flex items-center gap-1 text-sm xl:text-xl font-semibold bg-slate-600 hover:bg-slate-700 text-white py-1 px-4 border-2 border-solid border-slate-700 rounded-lg"
            href="#"
          >
            {items.length} produto(s)
            <img src={cart} alt="Carrinho" />
          </a>
        </nav>
      </div>
    </div>
  );
};

export default Header;
