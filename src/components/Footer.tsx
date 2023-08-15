import { footerTopLinks } from "@/data/home";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <div className="flex justify-between items-start">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-x-16">
          {footerTopLinks.map((item, id) => (
            <div key={id}>
              <h1 className="font-bold mb-4">{item.title}</h1>
              <div className="flex flex-col gap-y-2">
                {item.links.map(({ name, url }, id) => (
                  <Link
                    key={id}
                    href={url}
                    className="text-neutral-300 hover:text-white hover:underline hover:underline-offset-1"
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-x-6">
          <button className="flex justify-center items-center bg-neutral-800 rounded-full p-2 w-[42px] h-[42px]">
            <FaInstagram size={20} />
          </button>
          <button className="flex justify-center items-center bg-neutral-800 rounded-full p-2 w-[42px] h-[42px]">
            <FaTwitter size={20} />
          </button>
          <button className="flex justify-center items-center bg-neutral-800 rounded-full p-2 w-[42px] h-[42px]">
            <FaFacebook size={20} />
          </button>
        </div>
      </div>

      <div className="w-full h-[1px] bg-neutral-400  mt-12 mb-4"></div>

      <div className="text-neutral-300">© 2023 Spotify Clone</div>
    </div>
  );
};

export default Footer;
