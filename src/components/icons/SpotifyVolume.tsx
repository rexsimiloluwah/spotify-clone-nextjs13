import React from "react";

interface SpotifyVolumeProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const SpotifyVolume: React.FC<SpotifyVolumeProps> = ({ size, ...props }) => {
  return (
    <svg
      role="img"
      height={size}
      width={size}
      aria-hidden={true}
      aria-labelledby="Volume"
      viewBox="0 0 24 24"
      data-encore-id="icon"
      fill="white"
      {...props}
    >
      <path d="M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 000 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 6.087a4.502 4.502 0 000-8.474v1.65a2.999 2.999 0 010 5.175v1.649z"></path>
    </svg>
  );
};

SpotifyVolume.defaultProps = {
  size: 24,
};

export default SpotifyVolume;
