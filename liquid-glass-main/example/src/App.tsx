import {
  ScrollView,
  StyleSheet,
  Text,
  ImageBackground,
  Animated,
  View,
  Pressable,
  PlatformColor,
} from 'react-native';
import {
  LiquidGlassView,
  LiquidGlassContainerView,
  isLiquidGlassSupported,
  type LiquidGlassViewProps,
} from '@callstack/liquid-glass';
import { useEffect, useState } from 'react';
import background from './assets/background.jpg';

const AnimatedLiquidGlassView =
  Animated.createAnimatedComponent(LiquidGlassView);

export default function App() {
  return (
    <>
      <ImageBackground style={styles.background} source={background} />
      <ScrollView style={styles.container}>
        <WeatherWidgets />
        <Button />
        <MergingCircles />
      </ScrollView>
    </>
  );
}

function Button() {
  const [isGlassy, setIsGlassy] = useState(true);
  return (
    <Pressable onPress={() => setIsGlassy((prev) => !prev)}>
      <LiquidGlassView
        style={styles.button}
        colorScheme="dark"
        effect={isGlassy ? 'regular' : 'none'}
      >
        <Text style={styles.buttonLabel}>Click me</Text>
      </LiquidGlassView>
    </Pressable>
  );
}

interface WeatherWidgetProps extends LiquidGlassViewProps {
  city: string;
  temperature: number;
  description: string;
}

function WeatherWidget({
  city,
  temperature,
  description,
  ...props
}: WeatherWidgetProps) {
  return (
    <LiquidGlassView
      style={[
        styles.weather,
        !isLiquidGlassSupported && styles.weatherUnsupported,
      ]}
      {...props}
    >
      <Text style={styles.small}>{city}</Text>
      <Text style={styles.temperature}>{temperature}°</Text>
      <Text style={styles.icon}>☀</Text>
      <Text style={styles.small}>{description}</Text>
    </LiquidGlassView>
  );
}

function WeatherWidgets() {
  return (
    <View>
      <View style={styles.weatherRow}>
        <WeatherWidget
          city="Wrocław"
          temperature={25}
          description="Sunny"
          effect="clear"
          interactive
          tintColor={'orange'}
        />
        <WeatherWidget
          city="Miami"
          temperature={35}
          description="Sunny"
          interactive
          colorScheme="dark"
        />
      </View>

      <View style={styles.weatherRow}>
        <WeatherWidget
          city="Warsaw"
          temperature={20}
          description="Sunny"
          interactive
          effect="clear"
        />
        <WeatherWidget
          city="Szczecin"
          temperature={22}
          description="Sunny"
          interactive
        />
      </View>
    </View>
  );
}

function MergingCircles() {
  const [translateX] = useState(() => new Animated.Value(0));
  const [merged, setMerged] = useState(false);

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: merged ? -50 : 30,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, [translateX, merged]);

  return (
    <Pressable
      style={styles.circles}
      onPress={() => setMerged((prev) => !prev)}
    >
      <LiquidGlassContainerView spacing={20} style={styles.circlesContainer}>
        <AnimatedLiquidGlassView style={styles.circle} effect="clear">
          <Text style={styles.circleLabel}>1</Text>
        </AnimatedLiquidGlassView>
        <AnimatedLiquidGlassView
          effect="clear"
          style={StyleSheet.compose(styles.circle, {
            transform: [{ translateX }],
          })}
        >
          <Text style={styles.circleLabel}>2</Text>
        </AnimatedLiquidGlassView>
      </LiquidGlassContainerView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  box: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  sliderContainer: {
    position: 'absolute',
    bottom: 50,
    left: 50,
    right: 50,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
    padding: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sliderValue: {
    color: 'white',
    fontSize: 14,
    marginTop: 10,
  },
  button: {
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 20,
  },
  buttonLabel: {
    padding: 20,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  weather: {
    borderRadius: 20,
    borderCurve: 'continuous',
    minWidth: 170,
    padding: 20,
  },
  weatherUnsupported: {
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  weatherRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  small: {
    color: 'white',
    fontSize: 24,
  },
  icon: {
    color: 'yellow',
    fontSize: 30,
  },
  temperature: {
    color: 'white',
    fontSize: 60,
  },
  circle: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    borderRadius: 100,
    color: 'white',
  },
  circleLabel: {
    fontSize: 30,
    color: 'white',
  },
  circles: {
    flexDirection: 'row',
    gap: 10,
  },
  circlesContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolbar: {
    flexDirection: 'row',
    gap: 10,
    padding: 10,
    position: 'absolute',
    borderRadius: 40,
    bottom: 50,
    left: 20,
    right: 20,
    justifyContent: 'center',
  },
  dropdownTrigger: {
    padding: 10,
    color: PlatformColor('labelColor'),
    fontFamily: 'System',
    fontWeight: '600',
  },
});
