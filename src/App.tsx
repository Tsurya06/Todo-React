import React from "react";

import "./App.css";
import { TodoList } from "./components/TodoList";
import Signup from "./auth/Signup";
import Login from "./auth/Login";

function App() {
  return (
    <div className="App">
      {/* <TodoList></TodoList> */}
      <Signup />
      <Login />
    </div>
  );
}

export default App;
