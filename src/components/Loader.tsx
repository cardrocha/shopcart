import { SyncLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <SyncLoader color="#fff" />
    </div>
  );
};

export default Loader;
