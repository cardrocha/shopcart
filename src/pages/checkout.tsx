import CardCheckout from "../components/card";

const Checkout = () => {
  return (
    <div>
      <CardCheckout title="Dados de cobrança">
        <div className="flex flex-col gap-10 mt-6">
          <div className="flex gap-6">
            <div className="flex-auto">
              <label className="block text-lg mb-2" htmlFor="fullName">
                Nome completo
              </label>
              <input
                className="bg-white border border-solid border-white h-8 py-0 px-2 w-full"
                id="fullName"
                type="text"
              />
            </div>
            <div className="flex-auto">
              <label className="block text-lg mb-2" htmlFor="email">
                E-mail
              </label>
              <input
                className="bg-white border border-solid border-white h-8 py-0 px-2 w-full"
                id="email"
                type="email"
              />
            </div>
            <div className="flex-auto">
              <label className="block text-lg mb-2" htmlFor="cpf">
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
            <h3 className="text-2xl font-bold">
              Dados de entrega - conteúdo digital
            </h3>
            <div className="flex gap-6 mt-6">
              <div className="flex-auto">
                <label className="block text-lg mb-2" htmlFor="deliveryEmail">
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
                  className="block text-lg mb-2"
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
          <p className="text-lg leading-6">
            Ao optar por essa forma de pagamento, é importante lembrar que a
            confirmação pode levar até 3 dias úteis, devido aos prazos
            estabelecidos pelas instituições financeiras. Portanto, a liberação
            do produto para entrega ocorrerá somente após a aprovação do
            pagamento do boleto.
          </p>
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
