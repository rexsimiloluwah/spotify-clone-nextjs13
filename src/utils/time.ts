export const convertMilliseconds = (ms: number) => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const years = Math.floor(days / 365);

  return {
    seconds: seconds % 60,
    minutes: minutes % 60,
    hours: hours % 24,
    days: days % 7,
    weeks: weeks % 52,
    years: years,
  };
};

export const convertMsPlaylistDuration = (ms: number) => {
  const { seconds, minutes, hours, weeks, days, years } =
    convertMilliseconds(ms);
  return `${years > 0 ? `${years} yr ` : ""}${weeks > 0 ? `${weeks} wk ` : ""}${
    days > 0 ? `${days} dy ` : ""
  }${hours > 0 ? `${hours} hr ` : ""}${minutes > 0 ? `${minutes} min ` : ""}${
    seconds > 0 ? `${seconds} sec` : ""
  }`;
};

export const convertMsTrackDuration = (ms: number) => {
  const { seconds, minutes, hours, weeks, days, years } =
    convertMilliseconds(ms);

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};
