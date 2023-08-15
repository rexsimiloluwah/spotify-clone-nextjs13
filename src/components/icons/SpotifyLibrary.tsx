import React from "react";

interface SpotifyLibraryProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const SpotifyLibrary: React.FC<SpotifyLibraryProps> = ({ size, ...props }) => {
  return (
    <svg
      role="img"
      height={size}
      width={size}
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="white"
      data-encore-id="icon"
      {...props}
    >
      <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"></path>
    </svg>
  );
};

SpotifyLibrary.defaultProps = {
  size: 24,
};

export default SpotifyLibrary;
