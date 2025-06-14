/**
 * Formats an ISO date string into a short month name and day number.
 *
 * @param isoString - The ISO 8601 date string to format (e.g., "2024-06-10T00:00:00Z").
 * @returns An object containing the abbreviated month name (e.g., "Jan") and the day of the month.
 *
 * @remarks
 * This utility is useful for displaying dates in a concise, user-friendly format.
 * The month is always returned as a three-letter English abbreviation.
 * The day is returned as a number (1–31).
 *
 */
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
