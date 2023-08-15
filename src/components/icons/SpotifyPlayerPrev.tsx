import React from "react";

interface SpotifyPlayerPrevProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const SpotifyPlayerPrev: React.FC<SpotifyPlayerPrevProps> = ({
  size,
  ...props
}) => {
  return (
    <svg
      role="img"
      height={size}
      width={size}
      aria-hidden={true}
      aria-labelledby="PlayerPrev"
      viewBox="0 0 16 16"
      data-encore-id="icon"
      fill="white"
      {...props}
    >
      <path d="M3.3 1a.7.7 0 01.7.7v5.15l9.95-5.744a.7.7 0 011.05.606v12.575a.7.7 0 01-1.05.607L4 9.149V14.3a.7.7 0 01-.7.7H1.7a.7.7 0 01-.7-.7V1.7a.7.7 0 01.7-.7h1.6z"></path>
    </svg>
  );
};

SpotifyPlayerPrev.defaultProps = {
  size: 24,
};

export default SpotifyPlayerPrev;
