"use client";
import { useRouter } from "next/navigation";

import { RxCaretLeft, RxCaretRight } from "react-icons/rx";

const NavControls = () => {
  const router = useRouter();
  return (
    <div className="flex gap-x-3 items-center">
      <button
        className="bg-neutral-950 flex items-center justify-center hover:opacity-75 rounded-full text-neutral-400"
        onClick={() => router.back()}
      >
        <RxCaretLeft size={35} />
      </button>
      <button
        className="bg-neutral-950 flex items-center justify-center hover:opacity-75 rounded-full text-neutral-400"
        onClick={() => router.forward()}
      >
        <RxCaretRight size={35} />
      </button>
    </div>
  );
};

export default NavControls;
