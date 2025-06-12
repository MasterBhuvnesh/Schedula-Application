//  Only Used for logging authentication-related messages
// This module provides a simple logging utility for authentication-related messages.

const reset = '\x1b[0m';

const styles = {
  info: '\x1b[48;5;27m\x1b[1;30m', // Blue background, black text
  success: '\x1b[48;5;34m\x1b[1;30m', // Green background, black text
  warn: '\x1b[48;5;220m\x1b[1;30m', // Yellow background, black text
  error: '\x1b[48;5;196m\x1b[1;30m', // Red background, black text
  debug: '\x1b[48;5;236m\x1b[1;30m', // Dark gray background, black text
};

const authlog = {
  info: (msg: string) =>
    console.log(`${styles.info} [AUTH - INFO]    ${reset} ${msg} `),
  success: (msg: string) =>
    console.log(`${styles.success} [AUTH - SUCCESS] ${reset} ${msg} `),
  warn: (msg: string) =>
    console.log(`${styles.warn} [AUTH - WARN]    ${reset} ${msg} `),
  error: (msg: string) =>
    console.log(`${styles.error} [AUTH - ERROR]   ${reset} ${msg} `),
  debug: (msg: string) =>
    console.log(`${styles.debug} [AUTH - DEBUG]   ${reset} ${msg} `),
};

export default authlog;
