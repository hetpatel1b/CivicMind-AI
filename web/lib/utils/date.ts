export function formatDistanceToNow(dateInput: Date | string, options?: { addSuffix?: boolean }) {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  
  let value: number;
  let unit: string;
  
  if (seconds < 60) {
    value = seconds;
    unit = 'second';
  } else if (seconds < 3600) {
    value = Math.floor(seconds / 60);
    unit = 'minute';
  } else if (seconds < 86400) {
    value = Math.floor(seconds / 3600);
    unit = 'hour';
  } else if (seconds < 2592000) {
    value = Math.floor(seconds / 86400);
    unit = 'day';
  } else if (seconds < 31536000) {
    value = Math.floor(seconds / 2592000);
    unit = 'month';
  } else {
    value = Math.floor(seconds / 31536000);
    unit = 'year';
  }

  const plural = value === 1 ? '' : 's';
  const timeString = value < 1 ? 'just now' : `${value} ${unit}${plural}`;
  
  if (options?.addSuffix && value >= 1) {
    return `${timeString} ago`;
  }
  
  return timeString;
}
