import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

interface ThemeSwitchProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
  animatedTextStyle: any;
}

export function ThemeSwitch({ theme, onToggle, animatedTextStyle }: ThemeSwitchProps) {
  return (
    <View style={styles.themeSwitchRow}>
      <Pressable
        onPress={onToggle}
        style={styles.themeSwitchButton}
      >
        <Animated.Text style={[styles.themeSwitchText, animatedTextStyle]}>
          {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
        </Animated.Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  themeSwitchRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 8,
  },
  themeSwitchButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(127, 143, 166, 0.15)',
  },
  themeSwitchText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
