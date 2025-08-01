import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';

interface CalculatorHistoryProps {
  history: string[];
  onClear: () => void;
  animatedHistoryBlockStyle: any;
  animatedHistoryStyle: any;
  animatedTextStyle: any;
  theme: 'light' | 'dark';
}

export function CalculatorHistory({ history, onClear, animatedHistoryBlockStyle, animatedHistoryStyle, animatedTextStyle, theme }: CalculatorHistoryProps) {
  return (
    <Animated.View style={[styles.historyContainer, animatedHistoryBlockStyle, animatedHistoryStyle]}>
      <View style={styles.historyHeader}>
        <Animated.Text style={[styles.historyTitle, animatedTextStyle]}>History</Animated.Text>
        <TouchableOpacity onPress={onClear} style={styles.clearHistoryButton}>
          <Animated.Text style={[styles.clearHistoryText, animatedTextStyle]}>Clear</Animated.Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.historyList}>
        {history.map((item, idx) => (
          <Animated.Text
            key={idx}
            style={[
              styles.historyItem,
              { color: theme === 'dark' ? '#c8d6e5' : '#222f3e' },
            ]}
          >
            {item}
          </Animated.Text>
        ))}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  historyContainer: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    maxHeight: 120,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  historyTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  clearHistoryButton: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: '#ee5253',
    borderRadius: 6,
  },
  clearHistoryText: {
    fontSize: 12,
  },
  historyList: {
    maxHeight: 80,
  },
  historyItem: {
    fontSize: 14,
    marginBottom: 2,
  },
});
