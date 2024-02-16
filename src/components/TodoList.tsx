import React, { useEffect, useState } from "react";
import { useTodoDispatch, useTodoSelector } from "../redux/hooks/todo-hook";
import axios from "axios";
import {
  addTodo,
  editTodo,
  removeTodo,
} from "../redux/features/todo/todo-slice";
import { ChuckNorris, Todo } from "../redux/todoItems/models";
import {
  DisplayJoke,
  DisplayHindiJoke,
} from "../redux/features/todo/chuck-norris-slice";
import { fetchData, fetchHindiJoke } from "../apiCall/chuckNorrisApi";

export const TodoList: React.FC = () => {
  const [todoState, setTodoState] = useState<ChuckNorris>();
  const [text, setText] = useState<string>("");
  const [newText, setNewText] = useState<{ [key: number]: string }>({});

  const todo = useTodoSelector((state) => state.todos);
  const chuckTodo = useTodoSelector((state) => state.chuckNorris);
  const todoDispatch = useTodoDispatch();

  const onChangeInput = (str: React.ChangeEvent<HTMLInputElement>) => {
    setText(str.target.value);
  };

  const onChangeNewInput = (
    id: number,
    str: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewText((prevNewText) => ({
      ...prevNewText,
      [id]: str.target.value,
    }));
  };

  const addTask = () => {
    if (text !== "") {
      todoDispatch(
        addTodo({
          id: Date.now(),
          text: text.trim(),
          completed: true,
        })
      );
      setText("");
    }
  };

  const removeTask = (id: number) => {
    todoDispatch(removeTodo(id));
  };

  const editTask = (id: number) => {
    setNewText((prevNewText) => ({
      ...prevNewText,
      [id]: todo.todos.find((todo) => todo.id === id)?.text || "",
    }));
    let updatedTodos: any = todo.todos.find((todo) => todo.id === id);

    if (updatedTodos) {
      const updatedTodo = {
        ...updatedTodos,
        completed: false,
      };

      todoDispatch(editTodo(updatedTodo));
      console.log(updatedTodo);
    }
  };

  const saveTask = (id: number) => {
    let saveTodo: any = todo.todos.find((todo) => todo.id === id);

    if (saveTodo) {
      const savedTodo = {
        ...saveTodo,
        text: newText[id], //////////
        completed: true,
      };

      todoDispatch(editTodo(savedTodo));
      console.log(savedTodo);
    }
  };

  async function fetchJokeApi() {
    let responseData = await fetchData();
    todoDispatch(DisplayJoke(responseData));
  }
  async function fetchHindiJokeApi() {
    let responseDataHindi = await fetchHindiJoke();
    todoDispatch(DisplayHindiJoke(responseDataHindi));
  }
  
  useEffect(() => {
    //  fetchJokeApi();
    fetchHindiJokeApi();
  }, [fetchHindiJokeApi]);

  return (
    <>
      <div>
        <input value={text} onChange={onChangeInput} required></input>
        <button onClick={addTask}>Save</button>
        <div>
          {chuckTodo.chuckTodos.map((chuckTodo) => (
            <ul>
              {/* <li key={chuckTodo.id}>{chuckTodo.value}</li> */}
              <li key={chuckTodo._id}>{chuckTodo.jokeContent}</li>
            </ul>
          ))}
          {/* {chuckTodo.chuckTodos.map((chuckTodo) => (
            <li key={chuckTodo.id}>{chuckTodo.value}</li>
          ))} */}
        </div>
        <ul>
          {todo.todos.map((todoItem) =>
            todoItem.completed ? (
              <div key={todoItem.id}>
                <li>{todoItem.text}</li>
                <button onClick={() => editTask(todoItem.id)}>Edit</button>
                <button onClick={() => removeTask(todoItem.id)}>Delete</button>
              </div>
            ) : (
              <div key={todoItem.id}>
                <input
                  value={newText[todoItem.id]}
                  onChange={(event) => onChangeNewInput(todoItem.id, event)}
                  required
                ></input>
                <button onClick={() => saveTask(todoItem.id)}>Update</button>
              </div>
            )
          )}
        </ul>
      </div>
    </>
  );
};
