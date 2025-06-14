export function FormatDate(isoString: string): { month: string; day: number } {
  const date = new Date(isoString);
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return {
    month: monthNames[date.getUTCMonth()],
    day: date.getUTCDate(),
  };
}
