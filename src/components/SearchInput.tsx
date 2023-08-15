"use client";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { SpotifySearch } from "./icons";

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  useEffect(() => {
    const query = {
      q: debouncedValue,
    };

    const url = qs.stringifyUrl({
      url: "/search",
      query,
    });

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <div className="relative min-w-[20rem]">
      <SpotifySearch
        size={16}
        className="fill-neutral-300 top-4 left-2 absolute"
      />
      <input
        className="w-full placeholder:text-xs placeholder:text-neutral-300 py-3 px-8 rounded-3xl outline-none focus:border-white focus:border-[1px] text-sm"
        placeholder="What do you want to listen to?"
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="absolute top-4 right-2" onClick={() => setValue("")}>
        <AiOutlineClose
          size={16}
          className="text-neutral-300 hover:text-white hover:font-semibold"
        />
      </button>
    </div>
  );
};

export default SearchInput;
