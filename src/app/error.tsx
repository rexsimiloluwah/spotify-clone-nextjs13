"use client";
import { BiErrorCircle } from "react-icons/bi";

const error = () => {
  return (
    <div className="h-full items-center justify-center flex">
      <div className="flex flex-col gap-y-6 justify-center">
        <BiErrorCircle size={48} />
        <h4 className="text-2xl font-semibold">Something went wrong!</h4>
      </div>
    </div>
  );
};

export default error;
