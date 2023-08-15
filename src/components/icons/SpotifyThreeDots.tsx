import React from "react";

interface SpotifyThreeDotsProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const SpotifyThreeDots: React.FC<SpotifyThreeDotsProps> = ({
  size,
  ...props
}) => {
  return (
    <svg
      role="img"
      height={size}
      width={size}
      aria-hidden={true}
      aria-labelledby="ThreeDots"
      viewBox="0 0 24 24"
      data-encore-id="icon"
      fill="white"
      {...props}
    >
      <path d="M4.5 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm15 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-7.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
    </svg>
  );
};

SpotifyThreeDots.defaultProps = {
  size: 24,
};

export default SpotifyThreeDots;
