import { configureStore } from '@reduxjs/toolkit';
import TodoSlice from './features/reducers/todo-slice';
import chuckNorris from './features/reducers/chuck-norris-slice';

export const store = configureStore({
  reducer: {
    todos: TodoSlice, 
    chuckNorris: chuckNorris
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
