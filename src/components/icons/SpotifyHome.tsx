import React from "react";

interface SpotifyHomeProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const SpotifyHome: React.FC<SpotifyHomeProps> = ({ size, ...props }) => {
  return (
    <svg
      role="img"
      height={size}
      width={size}
      aria-hidden={true}
      aria-labelledby="Home"
      viewBox="0 0 24 24"
      data-encore-id="icon"
      fill="white"
      {...props}
    >
      <path d="M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732l-7.5-4.33z"></path>
    </svg>
  );
};

SpotifyHome.defaultProps = {
  size: 24,
};

export default SpotifyHome;
