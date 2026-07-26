import type { LiquidGlassViewProps } from './types';
import NativeLiquidGlassView from './LiquidGlassViewNativeComponent';

export function LiquidGlassView({
  animationDuration,
  ...props
}: LiquidGlassViewProps) {
  return (
    <NativeLiquidGlassView
      {...props}
      animationDuration={
        animationDuration === undefined ? undefined : animationDuration / 1000
      }
      hasAnimationDuration={animationDuration !== undefined}
    />
  );
}
