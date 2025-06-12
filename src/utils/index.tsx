/**
 * Returns a width value as a percentage of the device's screen width.
 *
 * @param percentage - The percentage of the device's width (e.g., 50 for 50%).
 * @returns The calculated width in pixels.
 *
 * @remarks
 * You can use this utility to create responsive font sizes or element widths based on the device's width.
 *
 * ### Example font size percentages (approximate, adjust as needed for your design):
 * - Font size 12: `wp(3.2)`   // ~12px on a 375px wide device
 * - Font size 14: `wp(3.7)`   // ~14px on a 375px wide device
 * - Font size 16: `wp(4.3)`   // ~16px on a 375px wide device
 * - Font size 18: `wp(4.8)`   // ~18px on a 375px wide device
 *
 * ### Example heading sizes:
 * - h1: `wp(6.4)`   // ~24px
 * - h2: `wp(5.3)`   // ~20px
 * - h3: `wp(4.8)`   // ~18px
 *
 * Adjust these percentages based on your target device base width (e.g., 375px for iPhone X).
 * For best results, test on multiple devices and tweak as needed.
 */

/**
 * Returns a height value as a percentage of the device's screen height.
 *
 * @param percentage - The percentage of the device's height (e.g., 10 for 10%).
 * @returns The calculated height in pixels.
 *
 * @remarks
 * This utility is useful for vertical spacing or sizing elements relative to the device's height.
 */
import { Dimensions } from 'react-native';

export const wp = (percentage: number) => {
  const { width } = Dimensions.get('window');
  return (percentage * width) / 100;
};

export const hp = (percentage: number) => {
  const { height } = Dimensions.get('window');
  return (percentage * height) / 100;
};
