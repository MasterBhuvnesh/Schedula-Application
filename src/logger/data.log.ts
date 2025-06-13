//  Only Used for logging data-related messages
// This module provides a simple logging utility for data-related messages.

const reset = '\x1b[0m';

const styles = {
  data: '\x1b[48;5;27m\x1b[1;30m', // Blue background, black text
  error: '\x1b[48;5;196m\x1b[1;30m', // Red background, black text
};

type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

const datalog = {
  data: (title: string, msg: JSONValue) =>
    console.debug(
      `${styles.data} [SUPABASE - DATA]    ${reset} ${title}: ${JSON.stringify(msg, null, 2)} `
    ),
  error: (msg: string, error: string | null) =>
    console.error(`${styles.error} [SUPABASE - ERROR]   ${reset} ${msg} `),
};

export default datalog;
