type Props = {
  children: JSX.Element;
  title: string;
};

const CardCheckout = ({ children, title }: Props) => {
  return (
    <div className="bg-slate-500 p-6 rounded-lg my-8 max-w-4xl">
      <h2 className="text-xl font-bold">{title}</h2>
      {children}
    </div>
  );
};

export default CardCheckout;
