import React from "react";

interface SpotifyPlayerQueueProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const SpotifyPlayerQueue: React.FC<SpotifyPlayerQueueProps> = ({
  size,
  ...props
}) => {
  return (
    <svg
      role="img"
      height={size}
      width={size}
      aria-hidden={true}
      aria-labelledby="PlayerQueue"
      viewBox="0 0 24 24"
      data-encore-id="icon"
      fill="white"
      {...props}
    >
      <path d="M15 15H1v-1.5h14V15zm0-4.5H1V9h14v1.5zm-14-7A2.5 2.5 0 013.5 1h9a2.5 2.5 0 010 5h-9A2.5 2.5 0 011 3.5zm2.5-1a1 1 0 000 2h9a1 1 0 100-2h-9z"></path>
    </svg>
  );
};

SpotifyPlayerQueue.defaultProps = {
  size: 24,
};

export default SpotifyPlayerQueue;
