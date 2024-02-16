import React, { useState } from "react";

import { useAppDispatch, useAppSelector } from '../redux/hooks/counterhooks';
import { useTodoDispatch, useTodoSelector } from "../redux/hooks/todo-hook";
import { decrement, increment } from "../redux/features/counter/slice";

export const Counter: React.FC = () => {
  const  count = useAppSelector((state: { counter: any; }) => state.counter);
  const dispatch= useAppDispatch();
  const todo = useTodoSelector((state: { todos: any; }) => state.todos);
  const todoDispatch = useTodoDispatch();


  return (
    <>
      <div>
          <h1>Counter = {count.value}</h1>
          <button onClick={()=> {dispatch(increment())}}>Increment</button>
          <button onClick={()=> {dispatch(decrement())}}>Decrement</button> 
      </div>
    </>
  );
}

