import React from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import { useAnimatedStyle, interpolateColor, useSharedValue, withSpring } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedText = Animated.createAnimatedComponent(Text);

interface NumPadButtonProps {
  label: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor: string;
  animatedBgStyle?: any;
}

function NumPadButton({ label, onPress, backgroundColor, textColor, animatedBgStyle }: NumPadButtonProps) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  return (
    <Animated.View style={[styles.buttonContainer, animatedStyle]}>
      <AnimatedPressable
        onPressIn={() => (scale.value = withSpring(0.9))}
        onPressOut={() => (scale.value = withSpring(1))}
        onPress={onPress}
        style={[styles.button, backgroundColor ? { backgroundColor } : {}, animatedBgStyle]}
      >
        <AnimatedText style={[styles.buttonText, { color: textColor }]}>{label}</AnimatedText>
      </AnimatedPressable>
    </Animated.View>
  );
}

interface NumPadProps {
  buttons: string[][];
  onButtonPress: (label: string) => void;
  themeValue: Animated.SharedValue<number>;
  theme: 'light' | 'dark';
}

export function NumPad({ buttons, onButtonPress, themeValue, theme }: NumPadProps) {
  const animatedNumPadStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      themeValue.value,
      [0, 1],
      ['#e6e9ef', '#2d3a50']
    ),
    borderRadius: 16,
    padding: 8,
    marginTop: 8,
  }));
  const numButtonBgStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      themeValue.value,
      [0, 1],
      ['#f5f6fa', '#34495e']
    ),
  }));

  return (
    <Animated.View style={[styles.buttonGrid, animatedNumPadStyle]}>
      <View style={styles.buttonRow}>
        <NumPadButton label="C" onPress={() => onButtonPress('C')} backgroundColor="#f39c12" textColor="#fff" />
        <NumPadButton label="DEL" onPress={() => onButtonPress('DEL')} backgroundColor="#e67e22" textColor="#fff" />
      </View>
      {buttons.map((row, i) => (
        <View key={i} style={styles.buttonRow}>
          {row.map((label) => {
            const isOp = ['+', '-', '×', '÷', '='].includes(label);
            return (
              <NumPadButton
                key={label}
                label={label}
                onPress={() => onButtonPress(label)}
                backgroundColor={isOp ? '#2980b9' : undefined}
                textColor={isOp ? '#fff' : (theme === 'dark' ? '#fff' : '#222f3e')}
                animatedBgStyle={!isOp ? numButtonBgStyle : undefined}
              />
            );
          })}
        </View>
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  buttonGrid: {
    marginTop: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  button: {
    paddingVertical: 18,
    alignItems: 'center',
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 28,
    fontWeight: '600',
  },
});
