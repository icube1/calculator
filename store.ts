import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initial state and reducer for calculator history
const initialHistoryState = {
  history: [] as string[],
};

const historyReducer = (state = initialHistoryState, action: any) => {
  switch (action.type) {
    case 'ADD_HISTORY':
      return { ...state, history: [action.payload, ...state.history] };
    case 'CLEAR_HISTORY':
      return { ...state, history: [] };
    default:
      return state;
  }
};

// Theme state and reducer
const initialThemeState = {
  theme: 'dark' as 'light' | 'dark',
};

const themeReducer = (state = initialThemeState, action: any) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'dark' ? 'light' : 'dark' };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  calculator: historyReducer,
  theme: themeReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['calculator', 'theme'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
