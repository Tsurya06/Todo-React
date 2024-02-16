import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './redux/features/counter/slice';
import TodoSlice from './redux/features/todo/todo-slice';
import chuckNorris from './redux/features/todo/chuck-norris-slice';

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    todos: TodoSlice, 
    chuckNorris: chuckNorris
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
