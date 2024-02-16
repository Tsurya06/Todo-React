import React from "react";

import "./App.css";
import {Counter} from './components/counters'
import { TodoList } from "./components/TodoList";

function App() {
  return (
    <div className="App">
      {/* <Counter/> */}
      <TodoList></TodoList>
    </div>
  );
}

export default App;
