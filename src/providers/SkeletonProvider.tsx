import React, { PropsWithChildren } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Props {}

const SkeletonProvider: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#525252">
      {children}
    </SkeletonTheme>
  );
};

export default SkeletonProvider;
