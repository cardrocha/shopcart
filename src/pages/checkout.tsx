import { useState } from "react";
import CardCheckout from "../components/card";

import { Barcode, CreditCard } from "lucide-react";

const Checkout = () => {
  const [payWithCard, setPayWithCard] = useState(false);

  return (
    <div>
      <CardCheckout title="Dados de cobrança">
        <div className="flex flex-col gap-10 mt-6">
          <div className="flex gap-6">
            <div className="flex-auto">
              <label
                className="block text-sm font-semibold mb-2"
                htmlFor="fullName"
              >
                Nome completo
              </label>
              <input
                className="bg-white border border-solid border-white h-8 py-0 px-2 w-full"
                id="fullName"
                type="text"
              />
            </div>
            <div className="flex-auto">
              <label
                className="block text-sm font-semibold mb-2"
                htmlFor="email"
              >
                E-mail
              </label>
              <input
                className="bg-white border border-solid border-white h-8 py-0 px-2 w-full"
                id="email"
                type="email"
              />
            </div>
            <div className="flex-auto">
              <label className="block text-sm font-semibold mb-2" htmlFor="cpf">
                CPF
              </label>
              <input
                className="bg-white border border-solid border-white h-8 py-0 px-2 w-full"
                id="cpf"
                type="text"
              />
            </div>
          </div>
          <div className="flex-auto">
            <h3 className="text-xl font-bold">
              Dados de entrega - conteúdo digital
            </h3>
            <div className="flex gap-6 mt-6">
              <div className="flex-auto">
                <label
                  className="block text-sm font-semibold mb-2"
                  htmlFor="deliveryEmail"
                >
                  E-mail
                </label>
                <input
                  className="bg-white border border-solid border-white h-8 py-0 px-2 w-full"
                  id="deliveryEmail"
                  type="email"
                />
              </div>
              <div className="flex-auto">
                <label
                  className="block text-sm font-semibold mb-2"
                  htmlFor="confirmDeliveryEmail"
                >
                  Confirme o e-mail
                </label>
                <input
                  className="bg-white border border-solid border-white h-8 py-0 px-2 w-full"
                  id="confirmDeliveryEmail"
                  type="email"
                />
              </div>
            </div>
          </div>
        </div>
      </CardCheckout>
      <CardCheckout title="Pagamento">
        <div className="mt-6">
          <div className="flex gap-6">
            <button
              onClick={() => setPayWithCard(false)}
              className={`bg-${!payWithCard ? "amber-500" : "black"} ${
                !payWithCard ? "text-black" : "text-white"
              } hover:bg-${
                !payWithCard ? "amber-600" : "gray-800"
              } flex gap-1 transition-all duration-300 px-3 py-2 rounded-lg text-sm font-bold mb-8`}
            >
              <Barcode />
              Boleto bancário
            </button>
            <button
              onClick={() => setPayWithCard(true)}
              className={`bg-${payWithCard ? "amber-500" : "black"} ${
                payWithCard ? "text-black" : "text-white"
              } hover:bg-${
                payWithCard ? "amber-600" : "gray-800"
              } flex gap-1 transition-all duration-300 px-3 py-2 text-sm rounded-lg font-bold mb-8`}
            >
              <CreditCard />
              Cartão de crédito
            </button>
          </div>
          {payWithCard ? (
            <>
              <div className="flex flex-col gap-6 mt-6">
                <div className="flex gap-6 items-end">
                  <div className="flex-auto">
                    <label
                      className="block text-sm font-semibold mb-2"
                      htmlFor="cardOwner"
                    >
                      Nome do titular do cartão
                    </label>
                    <input
                      className="bg-white border border-solid border-white h-8 py-0 px-2 w-full"
                      id="cardOwner"
                      type="text"
                    />
                  </div>
                  <div className="flex-auto">
                    <label
                      className="block text-sm font-semibold mb-2"
                      htmlFor="cpfCardOwner"
                    >
                      CPF do titular do cartão
                    </label>
                    <input
                      className="bg-white border border-solid border-white h-8 py-0 px-2 w-full"
                      id="cpfCardOwner"
                      type="text"
                    />
                  </div>
                </div>
                <div className="flex gap-6 mt-6 items-end">
                  <div className="flex-auto">
                    <label
                      className="block text-sm whitespace-nowrap font-semibold mb-2"
                      htmlFor="cardDisplayName"
                    >
                      Nome do cartão
                    </label>
                    <input
                      className="bg-white border border-solid border-white h-8 py-0 px-2 w-full"
                      id="cardDisplayName"
                      type="text"
                    />
                  </div>
                  <div className="flex-auto">
                    <label
                      className="block text-sm whitespace-nowrap font-semibold mb-2"
                      htmlFor="cardNumber"
                    >
                      Número do cartão
                    </label>
                    <input
                      className="bg-white border border-solid border-white h-8 py-0 px-2 w-full"
                      id="cardNumber"
                      type="text"
                    />
                  </div>
                  <div className="flex-auto max-w-[124px]">
                    <label
                      className="block text-sm font-semibold mb-2 whitespace-nowrap"
                      htmlFor="expiresMonth"
                    >
                      Mês do vencimento
                    </label>
                    <input
                      className="bg-white border border-solid border-white h-8 py-0 px-2 w-full"
                      id="expiresMonth"
                      type="text"
                    />
                  </div>
                  <div className="flex-auto max-w-[124px]">
                    <label
                      className="block text-sm font-semibold mb-2 whitespace-nowrap"
                      htmlFor="expiresYear"
                    >
                      Ano do vencimento
                    </label>
                    <input
                      className="bg-white border border-solid border-white h-8 py-0 px-2 w-full"
                      id="expiresYear"
                      type="text"
                    />
                  </div>
                  <div className="flex-auto max-w-12">
                    <label
                      className="block text-sm font-semibold mb-2"
                      htmlFor="cardCode"
                    >
                      CVV
                    </label>
                    <input
                      className="bg-white border border-solid border-white h-8 py-0 px-2 w-full"
                      id="cardCode"
                      type="text"
                    />
                  </div>
                </div>
                <div className="flex gap-6 mt-6">
                  <div className="flex-auto max-w-[116px]">
                    <label
                      className="block text-sm font-semibold mb-2"
                      htmlFor="installments"
                    >
                      Parcelamento
                    </label>
                    <select>
                      <option>1x de R$ 200,00</option>
                      <option>2x de R$ 200,00</option>
                      <option>3x de R$ 200,00</option>
                    </select>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p className="leading-6">
              Ao optar por essa forma de pagamento, é importante lembrar que a
              confirmação pode levar até 3 dias úteis, devido aos prazos
              estabelecidos pelas instituições financeiras. Portanto, a
              liberação do produto para entrega ocorrerá somente após a
              aprovação do pagamento do boleto.
            </p>
          )}
        </div>
      </CardCheckout>
      <button
        className="bg-amber-500 hover:bg-amber-700 transition-all duration-300 px-5 py-2 rounded-md font-bold mb-8"
        type="button"
        title="Clique aqui para finalizar a compra"
      >
        Finalizar compra
      </button>
    </div>
  );
};

export default Checkout;
