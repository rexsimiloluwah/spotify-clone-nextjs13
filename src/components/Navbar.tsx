"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";
import NavControls from "./NavControls";
import Button from "./ui/Button";

type NavbarProps = {
  isScrolling: boolean;
};

const Navbar: React.FC<NavbarProps> = ({ isScrolling }) => {
  const navLinks = [
    {
      title: "Premium",
      type: "link",
      href: "https://www.spotify.com/ng/premium",
    },
    {
      title: "Support",
      type: "link",
      href: "https://support.spotify.com/ng/",
    },
    {
      title: "Download",
      type: "link",
      href: "https://www.spotify.com/ng/download/windows/",
    },
  ];

  const authLinks = [
    {
      title: "Sign Up",
      type: "link",
      href: "",
    },
    {
      title: "Log in",
      type: "button",
      onClick: () => {
        signIn("spotify");
      },
    },
  ];

  return (
    <div
      className={twMerge(
        "w-full flex justify-between items-center px-6 py-4 sticky top-0 z-[1000]",
        isScrolling ? "bg-neutral-950" : "bg-neutral-950/50",
      )}
    >
      <NavControls />
      <div className="flex items-center gap-x-4">
        {navLinks.map((item, id) => (
          <Link
            key={id}
            href={item.href}
            target="_blank"
            className="text-neutral-300 font-bold transition hover:scale-110 hover:text-white"
          >
            {item.title}
          </Link>
        ))}

        <div className="w-[1px] h-8 bg-neutral-400"></div>

        {authLinks.map((item, id) => (
          <div key={id}>
            {item.type === "button" ? (
              <Button onClick={item.onClick} className="px-4 py-2">
                {item.title}
              </Button>
            ) : (
              <Link
                target="_blank"
                href={item.href as string}
                className="text-neutral-300 font-bold transition hover:scale-110 hover:text-white"
              >
                {item.title}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
