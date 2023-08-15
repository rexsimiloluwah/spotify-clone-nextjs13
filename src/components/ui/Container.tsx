import React, { PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";

interface ContainerProps {
  className?: string;
}

const Container: React.FC<PropsWithChildren<ContainerProps>> = ({
  className,
  children,
}) => {
  return (
    <div
      className={twMerge(
        "bg-neutral-900/90 rounded-lg h-fit w-full",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Container;
