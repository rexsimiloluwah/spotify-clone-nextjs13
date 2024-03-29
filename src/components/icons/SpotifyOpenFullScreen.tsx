import React from "react";

interface SpotifyOpenFullScreenProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const SpotifyOpenFullScreen: React.FC<SpotifyOpenFullScreenProps> = ({
  size,
  ...props
}) => {
  return (
    <svg
      role="img"
      height={size}
      width={size}
      aria-hidden={true}
      aria-labelledby="OpenFullScreen"
      viewBox="0 0 16 16"
      data-encore-id="icon"
      fill="white"
      {...props}
    >
      <path d="M6.53 9.47a.75.75 0 010 1.06l-2.72 2.72h1.018a.75.75 0 010 1.5H1.25v-3.579a.75.75 0 011.5 0v1.018l2.72-2.72a.75.75 0 011.06 0zm2.94-2.94a.75.75 0 010-1.06l2.72-2.72h-1.018a.75.75 0 110-1.5h3.578v3.579a.75.75 0 01-1.5 0V3.81l-2.72 2.72a.75.75 0 01-1.06 0z"></path>
    </svg>
  );
};

SpotifyOpenFullScreen.defaultProps = {
  size: 24,
};

export default SpotifyOpenFullScreen;
