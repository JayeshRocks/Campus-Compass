import {
  codegenNativeComponent,
  type ViewProps,
  type ColorValue,
  type CodegenTypes,
} from 'react-native';

export interface NativeProps extends ViewProps {
  interactive?: boolean;
  effect?: CodegenTypes.WithDefault<'clear' | 'regular' | 'none', 'regular'>;
  animated?: CodegenTypes.WithDefault<boolean, true>;
  animationDuration?: CodegenTypes.WithDefault<CodegenTypes.Float, 0>;
  hasAnimationDuration?: CodegenTypes.WithDefault<boolean, false>;
  tintColor?: ColorValue;
  colorScheme?: CodegenTypes.WithDefault<'light' | 'dark' | 'system', 'system'>;
}

export default codegenNativeComponent<NativeProps>('LiquidGlassView');
