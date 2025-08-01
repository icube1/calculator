import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';

export type Operator = '+' | '-' | '×' | '÷' | null;

export function useCalculator() {
  const [current, setCurrent] = useState('0');
  const [operator, setOperator] = useState<Operator>(null);
  const [previous, setPrevious] = useState<string | null>(null);
  const dispatch = useDispatch();
  const history = useSelector((state: RootState) => state.calculator.history);

  const input = (value: string) => {
    if (current.length > 12) return;
    if (current === '0' && value !== '.') {
      setCurrent(value);
    } else if (value === '.' && current.includes('.')) {
      return;
    } else {
      setCurrent(current + value);
    }
  };

  const clear = () => {
    setCurrent('0');
    setOperator(null);
    setPrevious(null);
  };

  const selectOperator = (op: Operator) => {
    if (operator && previous !== null) {
      equals();
      setOperator(op);
      setPrevious(current);
      setCurrent('0');
    } else {
      setOperator(op);
      setPrevious(current);
      setCurrent('0');
    }
  };

  const equals = () => {
    if (!operator || previous === null) return;
    const prev = parseFloat(previous);
    const curr = parseFloat(current);
    let result = 0;
    switch (operator) {
      case '+':
        result = prev + curr;
        break;
      case '-':
        result = prev - curr;
        break;
      case '×':
        result = prev * curr;
        break;
      case '÷':
        result = curr === 0 ? NaN : prev / curr;
        break;
      default:
        break;
    }
    const resultStr = isNaN(result) ? 'Error' : result.toString();
    setCurrent(resultStr);
    setOperator(null);
    setPrevious(null);
    dispatch({ type: 'ADD_HISTORY', payload: `${previous} ${operator} ${current} = ${resultStr}` });
  };

  const del = () => {
    if (current.length === 1) {
      setCurrent('0');
    } else {
      setCurrent(current.slice(0, -1));
    }
  };

  const clearHistory = () => {
    dispatch({ type: 'CLEAR_HISTORY' });
  };

  return {
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
  };
}
