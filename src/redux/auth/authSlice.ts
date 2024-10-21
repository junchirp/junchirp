import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import { authApi } from '@/services/auth-and-user-services';
import { IAuthState } from '@/types/commonTypes';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['accessToken', 'user', 'timeLeft', 'attempts', 'cooldown'], // додали нові поля до білого списку
};

const initialState: IAuthState = {
  user: {
    userName: null,
    email: null,
    id: null,
    isConfirmed: false,
    accessToken: '',
    photo: null,
    role: null,
  },
  timeLeft: 600,   // нове поле
  attempts: 0,     // нове поле
  cooldown: null,  // нове поле
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearToken: () => {
      return { ...initialState };
    },
    tokenReceived: (state, { payload }) => {
      state.user.accessToken = payload.accessToken;
    },
    setUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },

    // Додаємо нові дії
    setTimeLeft: (state, action: PayloadAction<number>) => {
      state.timeLeft = action.payload;
    },
    setAttempts: (state, action: PayloadAction<number>) => {
      state.attempts = action.payload;
    },
    setCooldown: (state, action: PayloadAction<number | null>) => {
      state.cooldown = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user;
        }
      )
      .addMatcher(
        authApi.endpoints.confirmEmail.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user;
        }
      )
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user;
        }
      )
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = initialState.user;
      })
      .addMatcher(
        authApi.endpoints.setRole.matchFulfilled,
        (state, { payload }) => {
          state.user.role = payload.role;
        }
      );
  },
});

// Налаштовуємо збереження стану через persist
const persisteAuthReducer = persistReducer(authPersistConfig, authSlice.reducer);

// Експортуємо дії та ред'юсер
export const { clearToken, tokenReceived, setUser, setTimeLeft, setAttempts, setCooldown } = authSlice.actions;
export default persisteAuthReducer;
