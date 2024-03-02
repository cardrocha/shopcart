import { Navigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Barcode, CreditCard } from "lucide-react";
import InputMask from "react-input-mask";

import CardCheckout from "../components/card";
import { useCartData } from "../utils";
import Cart from "../components/Cart";
import { useCartStore } from "../store/CartStore";

interface OrderDetails {
  orderNumber: number;
  buyerName: string;
}

interface installments {
  quantity: number;
  amount: number;
  formattedAmount: string;
}

const Checkout = () => {
  const { isOpen, close, cart, getTotalPrice, parseToBrl } = useCartData();

  const { removeAllFromCart } = useCartStore();

  const [payWithCard, setPayWithCard] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  const [installments, setInstallments] = useState<installments[]>([]);

  const totalPrice = getTotalPrice();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const parseToBrlCallback = useCallback(parseToBrl, []);

  useEffect(() => {
    const calculateInstallments = () => {
      const installmentsArray: installments[] = [];
      for (let i = 1; i <= 6; i++) {
        installmentsArray.push({
          quantity: i,
          amount: totalPrice / i,
          formattedAmount: parseToBrlCallback(totalPrice / i),
        });
      }
      return installmentsArray;
    };

    if (totalPrice > 0) {
      setInstallments(calculateInstallments());
    }
  }, [totalPrice, parseToBrlCallback]);

  const form = useFormik({
    initialValues: {
      fullName: "",
      cpf: "",
      deliveryEmail: "",
      confirmDeliveryEmail: "",
      cardOwner: "",
      cpfCardOwner: "",
      cardDisplayName: "",
      cardNumber: "",
      expiresMonth: "",
      expiresYear: "",
      cardCode: "",
      installments: 1,
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(5, "O nome precisa ter pelo menos 5 caracteres.")
        .required("Campo obrigatório"),
      cpf: Yup.string()
        .min(14, "O campo precisa ter 14 caracteres")
        .max(15, "O campo precisa ter 14 caracteres")
        .required("O campo é obrigatório"),
      deliveryEmail: Yup.string()
        .email("E-mail inválido")
        .required("O campo é obrigatório"),
      confirmDeliveryEmail: Yup.string()
        .oneOf([Yup.ref("deliveryEmail")], "Os e-mails são diferentes")
        .required("O campo é obrigatório"),
      cardOwner: Yup.string().when((_values, schema) =>
        payWithCard ? schema.required("O campo é obrigatório") : schema
      ),
      cpfCardOwner: Yup.string().when((_values, schema) =>
        payWithCard ? schema.required("O campo é obrigatório") : schema
      ),
      cardDisplayName: Yup.string().when((_values, schema) =>
        payWithCard ? schema.required("O campo é obrigatório") : schema
      ),
      cardNumber: Yup.string().when((_values, schema) =>
        payWithCard ? schema.required("O campo é obrigatório") : schema
      ),
      expiresMonth: Yup.string().when((_values, schema) =>
        payWithCard ? schema.required("O campo é obrigatório") : schema
      ),
      expiresYear: Yup.string().when((_values, schema) =>
        payWithCard ? schema.required("O campo é obrigatório") : schema
      ),
      cardCode: Yup.string().when((_values, schema) =>
        payWithCard ? schema.required("O campo é obrigatório") : schema
      ),
      installments: Yup.string().when((_values, schema) =>
        payWithCard ? schema.required("O campo é obrigatório") : schema
      ),
    }),
    onSubmit: async (values) => {
      setOrderDetails({
        orderNumber: Math.floor(Math.random() * 1000),
        buyerName: values.fullName,
      });
    },
  });

  const checkInputHasError = (fieldName: string) => {
    const isTouched = fieldName in form.touched;
    const isInvalid = fieldName in form.errors;
    const hasError = isTouched && isInvalid;

    return hasError;
  };

  if (cart.length === 0) {
    return <Navigate to="/" />;
  }

  const removerTodosItemDoCarrinho = () => {
    removeAllFromCart()
    alert("Obrigado por escolher a Shopcart e volte sempre!")
  };

  return (
    <>
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
      <div className="flex justify-center">
        {orderDetails ? (
          <div className="bg-slate-500 text-xl leading-10 text-black font-semibold border-2 border-slate-800 rounded-lg my-72 p-4">
            <p>
              Senhor(a), <span className="text-2xl">{orderDetails.buyerName}</span>
              !
            </p>
            <p>
              Seu pedido foi registrado, segue o número do pedido: #
              {orderDetails.orderNumber}BR
            </p>
            <p>
              Forma de pagamento:{" "}
              {payWithCard ? "Cartão de crédito" : "Boleto Bancário"}
            </p>
            <p>
              Ele será entregue em até {payWithCard ? "5 dias" : "7 dias"}, no
              endereço cadastrado no perfil.
            </p>
            <p>Agradecemos a preferência!</p>
            <button onClick={removerTodosItemDoCarrinho} className="btn btn-warning mt-2">Confirma</button>
          </div>
        ) : (
          <form onSubmit={form.handleSubmit}>
            <CardCheckout title="Dados de cobrança">
              <div className="flex flex-col gap-10 mt-6">
                <div className="flex gap-6 items-end">
                  <div className="flex-auto">
                    <label
                      className="block text-sm font-semibold mb-2"
                      htmlFor="fullName"
                    >
                      Nome completo
                    </label>
                    <input
                      className={`${
                        checkInputHasError("fullName")
                          ? "border-red-600"
                          : "border-white"
                      } bg-white border h-8 py-0 px-2 w-full`}
                      id="fullName"
                      type="text"
                      name="fullName"
                      value={form.values.fullName}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                    />
                  </div>
                  <div className="flex-auto">
                    <label
                      className="block text-sm font-semibold mb-2"
                      htmlFor="cpf"
                    >
                      CPF
                    </label>
                    <InputMask
                      className={`${
                        checkInputHasError("cpf")
                          ? "border-red-600"
                          : "border-white"
                      } bg-white border h-8 py-0 px-2 w-full`}
                      id="cpf"
                      type="text"
                      name="cpf"
                      value={form.values.cpf}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      mask="999.999.999-99"
                    />
                  </div>
                </div>
                <div className="flex-auto">
                  <h3 className="text-xl font-bold">E-mail</h3>
                  <div className="flex gap-6 mt-6">
                    <div className="flex-auto">
                      <label
                        className="block text-sm font-semibold mb-2"
                        htmlFor="deliveryEmail"
                      >
                        E-mail
                      </label>
                      <input
                        className={`${
                          checkInputHasError("deliveryEmail")
                            ? "border-red-600"
                            : "border-white"
                        } bg-white border h-8 py-0 px-2 w-full`}
                        id="deliveryEmail"
                        type="email"
                        name="deliveryEmail"
                        value={form.values.deliveryEmail}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
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
                        className={`${
                          checkInputHasError("confirmDeliveryEmail")
                            ? "border-red-600"
                            : "border-white"
                        } bg-white border h-8 py-0 px-2 w-full`}
                        id="confirmDeliveryEmail"
                        type="email"
                        name="confirmDeliveryEmail"
                        value={form.values.confirmDeliveryEmail}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
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
                    type="button"
                    onClick={() => setPayWithCard(false)}
                    className={`${!payWithCard ? "bg-amber-500" : "bg-black"} ${
                      !payWithCard ? "text-black" : "text-white"
                    } flex gap-1 transition-all duration-300 px-3 py-2 rounded-lg text-sm font-bold mb-8 cursor-pointer`}
                  >
                    <Barcode />
                    Boleto bancário
                  </button>
                  <button
                    type="button"
                    onClick={() => setPayWithCard(true)}
                    className={`${payWithCard ? "bg-amber-500" : "bg-black"} ${
                      payWithCard ? "text-black" : "text-white"
                    } flex gap-1 transition-all duration-300 px-3 py-2 rounded-lg text-sm font-bold mb-8 cursor-pointer`}
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
                            className={`${
                              checkInputHasError("cardOwner")
                                ? "border-red-600"
                                : "border-white"
                            } bg-white border h-8 py-0 px-2 w-full`}
                            id="cardOwner"
                            type="text"
                            name="cardOwner"
                            value={form.values.cardOwner}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                          />
                        </div>
                        <div className="flex-auto">
                          <label
                            className="block text-sm font-semibold mb-2"
                            htmlFor="cpfCardOwner"
                          >
                            CPF do titular do cartão
                          </label>
                          <InputMask
                            className={`${
                              checkInputHasError("cpfCardOwner")
                                ? "border-red-600"
                                : "border-white"
                            } bg-white border h-8 py-0 px-2 w-full`}
                            id="cpfCardOwner"
                            type="text"
                            name="cpfCardOwner"
                            value={form.values.cpfCardOwner}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            mask="999.999.999-99"
                          />
                        </div>
                      </div>
                      <div className="flex gap-6 mt-6 items-end">
                        <div className="flex-auto">
                          <label
                            className="block text-sm whitespace-nowrap font-semibold mb-2"
                            htmlFor="cardDisplayName"
                          >
                            Nome no cartão
                          </label>
                          <input
                            className={`${
                              checkInputHasError("cardDisplayName")
                                ? "border-red-600"
                                : "border-white"
                            } bg-white border h-8 py-0 px-2 w-full`}
                            id="cardDisplayName"
                            type="text"
                            name="cardDisplayName"
                            value={form.values.cardDisplayName}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                          />
                        </div>
                        <div className="flex-auto">
                          <label
                            className="block text-sm whitespace-nowrap font-semibold mb-2"
                            htmlFor="cardNumber"
                          >
                            Número do cartão
                          </label>
                          <InputMask
                            className={`${
                              checkInputHasError("cardNumber")
                                ? "border-red-600"
                                : "border-white"
                            } bg-white border h-8 py-0 px-2 w-full`}
                            id="cardNumber"
                            type="text"
                            name="cardNumber"
                            value={form.values.cardNumber}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            mask="9999 9999 9999 9999"
                          />
                        </div>
                        <div className="flex-auto max-w-[124px]">
                          <label
                            className="block text-sm font-semibold mb-2 whitespace-nowrap"
                            htmlFor="expiresMonth"
                          >
                            Mês de expiração
                          </label>
                          <InputMask
                            className={`${
                              checkInputHasError("expiresMonth")
                                ? "border-red-600"
                                : "border-white"
                            } bg-white border h-8 py-0 px-2 w-full`}
                            id="expiresMonth"
                            type="text"
                            name="expiresMonth"
                            value={form.values.expiresMonth}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            mask="99"
                          />
                        </div>
                        <div className="flex-auto max-w-[124px]">
                          <label
                            className="block text-sm font-semibold mb-2 whitespace-nowrap"
                            htmlFor="expiresYear"
                          >
                            Ano de expiração
                          </label>
                          <InputMask
                            className={`${
                              checkInputHasError("expiresYear")
                                ? "border-red-600"
                                : "border-white"
                            } bg-white border h-8 py-0 px-2 w-full`}
                            id="expiresYear"
                            type="text"
                            name="expiresYear"
                            value={form.values.expiresYear}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            mask="99"
                          />
                        </div>
                        <div className="flex-auto max-w-12">
                          <label
                            className="block text-sm font-semibold mb-2"
                            htmlFor="cardCode"
                          >
                            CVV
                          </label>
                          <InputMask
                            className={`${
                              checkInputHasError("cardCode")
                                ? "border-red-600"
                                : "border-white"
                            } bg-white border h-8 py-0 px-2 w-full`}
                            id="cardCode"
                            type="text"
                            name="cardCode"
                            value={form.values.cardCode}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            mask="999"
                          />
                        </div>
                      </div>
                      <div className="flex gap-6 mt-6">
                        <div className="flex-auto max-w-[178px]">
                          <label
                            className="block text-sm font-semibold mb-2"
                            htmlFor="installments"
                          >
                            Parcelamento
                          </label>
                          <select
                            className={`${
                              checkInputHasError("installments")
                                ? "border-red-600"
                                : "border-white"
                            } bg-white border h-8 py-0 px-2 w-full`}
                            id="installments"
                            name="installments"
                            value={form.values.installments}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                          >
                            {" "}
                            {installments.map((installment) => (
                              <option
                                value={installment.quantity}
                                key={installment.quantity}
                              >
                                {installment.quantity}x de R${" "}
                                {installment.formattedAmount}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="leading-6">
                    Ao optar por essa forma de pagamento, é importante lembrar
                    que a confirmação pode levar até 3 dias úteis, devido aos
                    prazos estabelecidos pelas instituições financeiras.
                    Portanto, a liberação do produto para entrega ocorrerá
                    somente após a aprovação do pagamento do boleto.
                  </p>
                )}
              </div>
            </CardCheckout>
            <button
              className="bg-amber-500 hover:bg-amber-700 transition-all duration-300 px-5 py-2 rounded-md font-bold mb-8"
              type="submit"
              title="Clique aqui para finalizar a compra"
            >
              Finalizar compra
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default Checkout;

