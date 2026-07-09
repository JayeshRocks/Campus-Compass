import type { ColorValue, ViewProps } from 'react-native';

export type LiquidGlassEffect = 'clear' | 'regular' | 'none';
export type LiquidGlassColorScheme = 'light' | 'dark' | 'system';

export type LiquidGlassViewProps = ViewProps & {
  /**
   * Make the view respond to user interactions.
   * Interactive views grow on touch and show a shimmer effect.
   *
   * Defaults to `false`.
   */
  interactive?: boolean;
  /**
   * The variant of the liquid glass material.
   * You can toggle between 'clear', 'regular', and 'none' to materialize the glass.
   *
   * Defaults to 'regular'.
   */
  effect?: LiquidGlassEffect;
  /**
   * Whether to animate changes to the glass effect.
   *
   * Defaults to `true`.
   */
  animated?: boolean;
  /**
   * Duration of the glass effect animation in milliseconds.
   * If omitted, the default UIKit animation duration is used.
   */
  animationDuration?: number;
  /**
   * The color of the glass effect.
   *
   * Defaults to `transparent`.
   */
  tintColor?: ColorValue;
  /**
   * The color scheme of the glass effect.
   * The effect appears dark or light based on the color scheme.
   *
   * Defaults to 'system'.
   */
  colorScheme?: LiquidGlassColorScheme;
};
