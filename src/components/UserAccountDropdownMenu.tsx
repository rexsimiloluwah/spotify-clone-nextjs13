import React, { PropsWithChildren } from "react";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { signOut } from "next-auth/react";
import { RxExternalLink } from "react-icons/rx";

interface Props {}

const UserAccountDropdownMenu: React.FC<PropsWithChildren<Props>> = ({
  children,
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>

      <DropdownMenu.Portal className="cursor-pointer">
        <DropdownMenu.Content
          className="z-50 min-w-[16rem] bg-neutral-700 mr-12 shadow-md rounded-md backdrop-blur-md p-2 flex flex-col gap-y-2"
          sideOffset={5}
        >
          <DropdownMenu.Item className="py-2 px-4 outline-none cursor-pointer hover:bg-neutral-400/10 hover:font-semibold">
            <div className="flex justify-between items-center">
              <p>Account</p>
              <RxExternalLink size={24} />
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="py-2 px-4 outline-none cursor-pointer hover:bg-neutral-400/10 hover:font-semibold">
            Profile
          </DropdownMenu.Item>
          <DropdownMenu.Item className="py-2 px-4 outline-none cursor-pointer hover:bg-neutral-400/10 hover:font-semibold">
            Private Session
          </DropdownMenu.Item>
          <DropdownMenu.Item className="py-2 px-4 outline-none cursor-pointer hover:bg-neutral-400/10 hover:font-semibold">
            Settings
          </DropdownMenu.Item>
          <div className="w-full h-[1px] bg-neutral-400"></div>
          <DropdownMenu.Item
            className="py-2 px-4 outline-none cursor-pointer hover:bg-neutral-400/10 hover:font-semibold"
            onClick={() => signOut()}
          >
            Logout
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default UserAccountDropdownMenu;
