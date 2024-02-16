import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../../todoItems/models";

interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: [],
};

const TodoSlice = createSlice({
    name: "todos",
    initialState,
    reducers : {
        addTodo(state, action: PayloadAction<Todo>){
              state.todos.push(action.payload);  
        },
        removeTodo(state, action: PayloadAction<number>){
            state.todos= state.todos.filter(t=> t.id !== action.payload);  
        },
        
        editTodo(state, action: PayloadAction<Todo>) {
          const { id, text , completed} = action.payload;
          state.todos = state.todos.map((todo)=> {
            if (todo.id === id){
              return {
                ...todo,
                completed : completed,
                text : text
              }
            }
            return todo;
          })
        },
    }
})

export const {addTodo,removeTodo, editTodo} = TodoSlice.actions;
export default TodoSlice.reducer;