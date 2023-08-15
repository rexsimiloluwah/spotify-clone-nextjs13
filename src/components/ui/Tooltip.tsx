import React, { PropsWithChildren } from "react";

import * as ToolTip from "@radix-ui/react-tooltip";
import { twMerge } from "tailwind-merge";

interface TooltipProps {
  content: string;
  className?: string;
}

const Tooltip: React.FC<PropsWithChildren<TooltipProps>> = ({
  content,
  className,
  children,
}) => {
  return (
    <ToolTip.Provider delayDuration={0}>
      <ToolTip.Root>
        <ToolTip.Trigger asChild>{children}</ToolTip.Trigger>
        <ToolTip.Portal>
          <ToolTip.Content
            sideOffset={12}
            className={twMerge(
              "bg-neutral-800 drop-shadow-xl ml-5 p-2 rounded-md text-sm",
            )}
          >
            <p>{content}</p>
          </ToolTip.Content>
        </ToolTip.Portal>
      </ToolTip.Root>
    </ToolTip.Provider>
  );
};

export default Tooltip;
