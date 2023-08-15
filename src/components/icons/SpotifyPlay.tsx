import React from "react";

interface SpotifyPlayProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const SpotifyPlay: React.FC<SpotifyPlayProps> = ({ size, ...props }) => {
  return (
    <svg
      role="img"
      height={size}
      width={size}
      aria-hidden={true}
      aria-labelledby="Play"
      viewBox="0 0 24 24"
      data-encore-id="icon"
      fill="white"
      {...props}
    >
      <path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path>
    </svg>
  );
};

SpotifyPlay.defaultProps = {
  size: 24,
};

export default SpotifyPlay;
