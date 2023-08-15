import React from "react";

interface SpotifyPauseProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const SpotifyPause: React.FC<SpotifyPauseProps> = ({ size, ...props }) => {
  return (
    <svg
      role="img"
      height={size}
      width={size}
      aria-hidden={true}
      aria-labelledby="Pause"
      viewBox="0 0 16 16"
      data-encore-id="icon"
      fill="white"
      {...props}
    >
      <path d="M2.7 1a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7H2.7zm8 0a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-2.6z"></path>
    </svg>
  );
};

SpotifyPause.defaultProps = {
  size: 24,
};

export default SpotifyPause;
