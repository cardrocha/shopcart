import { Route, Routes } from "react-router-dom";
import Checkout from "./pages/checkout";
import Home from "./pages/home";

const Rotas = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
};

export default Rotas;
