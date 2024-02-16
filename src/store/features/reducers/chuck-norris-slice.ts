import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ChuckNorris } from "../../todoItems/models";

interface chuckNorrisState {
  chuckTodos: ChuckNorris[];
}

const initialState: chuckNorrisState = {
  chuckTodos: [],
};

export const chuckNorris = createSlice({
  name: "chuck-norris",
  initialState,
  reducers: {
    DisplayJoke(chuckstate, action: PayloadAction<ChuckNorris>) {
      chuckstate.chuckTodos.push(action.payload);
    },

    DisplayHindiJoke(chuckstate, action: PayloadAction<ChuckNorris>) {
      chuckstate.chuckTodos.push(action.payload);
    },
  },
});

export const { DisplayJoke, DisplayHindiJoke } = chuckNorris.actions;
export default chuckNorris.reducer;
