import React from 'react';
import Animated from 'react-native-reanimated';
import { StyleSheet, View } from 'react-native';

interface CalculatorDisplayProps {
  previous: string | null;
  operator: string | null;
  current: string;
  animatedPrevTextStyle: any;
  animatedTextStyle: any;
}

export function CalculatorDisplay({ previous, operator, current, animatedPrevTextStyle, animatedTextStyle }: CalculatorDisplayProps) {
  return (
    <View style={styles.display}>
      <Animated.Text style={[styles.previous, animatedPrevTextStyle]} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.7}>
        {previous && operator ? `${previous} ${operator}` : ''}
      </Animated.Text>
      <Animated.Text
        style={[styles.current, animatedTextStyle]}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.4}
      >
        {current}
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  display: {
    minHeight: 120,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  previous: {
    fontSize: 24,
    minHeight: 28,
  },
  current: {
    fontSize: 48,
    fontWeight: 'bold',
    minHeight: 56,
  },
});
