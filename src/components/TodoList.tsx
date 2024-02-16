import React, { useEffect, useState } from "react";
import { useTodoDispatch, useTodoSelector } from "../store/hooks/todo-hook";
import "./styles.css";
import axios from "axios";
import {
  addTodo,
  editTodo,
  removeTodo,
} from "../store/features/reducers/todo-slice";
import { ChuckNorris, Todo } from "../store/todoItems/models";
import {
  DisplayJoke,
  DisplayHindiJoke,
} from "../store/features/reducers/chuck-norris-slice";
import { fetchData, fetchHindiJoke } from "../apiCall/chuckNorrisApi";
import { Row, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { type } from "@testing-library/user-event/dist/type";

export type Joke = {
  id?: string;
  jokeNo?: string;
  jokeContent?: string;
  value?: string;
};

export const TodoList: React.FC = () => {
  const [todoState, setTodoState] = useState<Joke[]>([]);
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
    const joke = {
      id: responseData.jokeNo,
      value: responseData.jokeContent,
    };
    console.log(joke);
    setTodoState((prevTodoState) => [...prevTodoState, joke]);
    console.log("fetched Data: => ", responseData);
    todoDispatch(DisplayJoke(responseData));
  }

  //Hindi joke
  async function fetchHindiJokeApi() {
    let responseData = await fetchHindiJoke();
    const joke = {
      jokeNo: responseData.jokeNo,
      jokeContent: responseData.jokeContent,
    };
    console.log(joke);
    setTodoState([joke]);
    todoDispatch(DisplayHindiJoke(responseData));
  }

  useEffect(() => {
    // fetchJokeApi();
    fetchHindiJokeApi();
  }, [todo]);

  const columns: ColumnsType<Joke> = [
    {
      title: "Joke No",
      dataIndex: "jokeNo" || "id",
      key: "jokeNo" || "id",
      render: (jokeNo) => (
        <div key={jokeNo} style={{ color: "#0FA374" }}>
          {jokeNo}
        </div>
      ),
    },
    {
      title: "Jokes",
      dataIndex: "jokeContent" || "value",
      key: "jokeNo" || "value",
      render: (text: string, todoState) => (
        <div key={todoState.jokeNo}>{text}</div>
      ),
    },
  ];

  return (
    <>
      <div className="container">
        <h1>Todo List</h1>
        <div className="input-container">
          <input value={text} onChange={onChangeInput} required />
        </div>
        <div className="input-container">
          <button onClick={addTask}>Save</button>
        </div>
        {/* <div>
          {chuckTodo.chuckTodos.map((chuckTodo) => (
            <ul>
              <li key={chuckTodo.id}>{chuckTodo.value}</li>
              <li key={chuckTodo._id}>{chuckTodo.jokeContent}</li>
            </ul>
          ))}
        </div> */}

        <Table columns={columns} dataSource={todoState} pagination={false} />
        <div>
          {todo.todos.map((todoItem) =>
            todoItem.completed ? (
              <div key={todoItem.id} style={{ display: "flex", width: "100%" }}>
                <div style={{ width: "100%" }}>
                  <input
                    value={todoItem.text}
                    disabled
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      marginRight: "8px",
                    }}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <button
                    onClick={() => editTask(todoItem.id)}
                    style={{
                      padding: "8px 12px",
                      backgroundColor: "#5062a7",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      marginRight: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => removeTask(todoItem.id)}
                    style={{
                      padding: "8px 12px",
                      backgroundColor: "#dc3545",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div key={todoItem.id}>
                <input
                  value={newText[todoItem.id]}
                  onChange={(event) => onChangeNewInput(todoItem.id, event)}
                  required
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    marginRight: "8px",
                  }}
                />
                <button
                  onClick={() => saveTask(todoItem.id)}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#5062a7",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    marginRight: "4px",
                    cursor: "pointer",
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() => removeTask(todoItem.id)}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};
