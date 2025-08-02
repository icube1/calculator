import React, { useEffect } from 'react';
import { Platform, StyleSheet } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { CalculatorDisplay } from '../components/calculator/CalculatorDisplay';
import { CalculatorHistory } from '../components/calculator/CalculatorHistory';
import { NumPad } from '../components/calculator/NumPad';
import { ThemeSwitch } from '../components/calculator/ThemeSwitch';
import { useCalculator } from '../hooks/useCalculator';
import type { RootState } from '../store';


const BUTTONS = [
  ['7', '8', '9', '÷'],
  ['4', '5', '6', '×'],
  ['1', '2', '3', '-'],
  ['0', '.', '=', '+'],
];

export default function CalculatorScreen() {
  const {
    current,
    operator,
    previous,
    input,
    clear,
    selectOperator,
    equals,
    del,
    history,
    clearHistory,
  } = useCalculator();

  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  const themeValue = useSharedValue(theme === 'dark' ? 1 : 0);
  useEffect(() => {
    themeValue.value = withTiming(theme === 'dark' ? 1 : 0, { duration: 800 });
  }, [theme, themeValue]);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      themeValue.value,
      [0, 1],
      ['#f5f6fa', '#222f3e']
    ),
  }));
  const animatedTextStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      themeValue.value,
      [0, 1],
      ['#222f3e', '#fff']
    ),
  }));
  const animatedPrevTextStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      themeValue.value,
      [0, 1],
      ['#718093', '#8395a7']
    ),
  }));
  const animatedHistoryBlockStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      themeValue.value,
      [0, 1],
      ['#e6e9ef', '#1e272e']
    ),
  }));
  const historyOpacity = useSharedValue(0.5);
  useEffect(() => {
    historyOpacity.value = withSpring(history.length > 0 ? 1 : 0.5);
  }, [history.length, historyOpacity]);
  const animatedHistoryStyle = useAnimatedStyle(() => ({ opacity: historyOpacity.value }));

  const handleButtonPress = (label: string) => {
    if (/[0-9.]/.test(label)) input(label);
    else if (label === 'C') clear();
    else if (label === 'DEL') del();
    else if (['+', '-', '×', '÷'].includes(label)) selectOperator(label as any);
    else if (label === '=') equals();
  };

  return (
    <Animated.View style={[styles.background, animatedContainerStyle]}>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom', 'left', 'right']}>
        <Animated.ScrollView style={styles.calculatorBody}>
          <ThemeSwitch theme={theme} onToggle={() => dispatch({ type: 'TOGGLE_THEME' })} animatedTextStyle={animatedTextStyle} />
          <CalculatorDisplay previous={previous} operator={operator} current={current} animatedPrevTextStyle={animatedPrevTextStyle} animatedTextStyle={animatedTextStyle} />
          <CalculatorHistory history={history} onClear={clearHistory} animatedHistoryBlockStyle={animatedHistoryBlockStyle} animatedHistoryStyle={animatedHistoryStyle} animatedTextStyle={animatedTextStyle} theme={theme} />
          <NumPad buttons={BUTTONS} onButtonPress={handleButtonPress} themeValue={themeValue} theme={theme} />
        </Animated.ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    padding: 0,
  },
  calculatorBody: {
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
    flexGrow: 1,
    padding: 16,
    // paddingBottom: 64,
    marginTop: Platform.OS === 'ios' ? -64 : 0,
  },
});
