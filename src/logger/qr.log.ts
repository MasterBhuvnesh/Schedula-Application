//  Only Used for logging QR related messages
// This module provides a simple logging utility for QR [ Ticket    ] messages.

const reset = '\x1b[0m';

const styles = {
  data: '\x1b[48;5;34m\x1b[1;30m', // Green background, black text
  error: '\x1b[48;5;196m\x1b[1;30m', // Red background, black text
  warn: '\x1b[48;5;226m\x1b[1;30m', // Yellow background, black text
};

type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

const qrlog = {
  data: (title: string, msg: JSONValue) =>
    console.debug(
      `${styles.data} [QR - DATA][Success]    ${reset} ${title}: ${JSON.stringify(msg, null, 2)} `
    ),
  warn: (title: string, msg: JSONValue) =>
    console.debug(
      `${styles.data} [QR - DATA][Warning]    ${reset} ${title}: ${JSON.stringify(msg, null, 2)} `
    ),
  error: (msg: string, error: string | null) =>
    console.error(`${styles.error} [QR - DATA][Error]   ${reset} ${msg} `),
};

export default qrlog;
