import React from "react";

interface SpotifyNowPlayingProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const SpotifyNowPlaying: React.FC<SpotifyNowPlayingProps> = ({
  size,
  ...props
}) => {
  return (
    <svg
      role="img"
      height={size}
      width={size}
      aria-hidden={true}
      aria-labelledby="NowPlaying"
      viewBox="0 0 24 24"
      data-encore-id="icon"
      fill="white"
      {...props}
    >
      <path d="M11.196 8 6 5v6l5.196-3z"></path>
      <path d="M15.002 1.75A1.75 1.75 0 0 0 13.252 0h-10.5a1.75 1.75 0 0 0-1.75 1.75v12.5c0 .966.783 1.75 1.75 1.75h10.5a1.75 1.75 0 0 0 1.75-1.75V1.75zm-1.75-.25a.25.25 0 0 1 .25.25v12.5a.25.25 0 0 1-.25.25h-10.5a.25.25 0 0 1-.25-.25V1.75a.25.25 0 0 1 .25-.25h10.5z"></path>
    </svg>
  );
};

SpotifyNowPlaying.defaultProps = {
  size: 24,
};

export default SpotifyNowPlaying;
