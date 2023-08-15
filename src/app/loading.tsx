import { RingLoader } from "react-spinners";

const loading = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <RingLoader color="#22c55e" size={24} />
    </div>
  );
};

export default loading;
