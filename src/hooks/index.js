// src/hooks/index.js
import { useState, useEffect } from "react";
import anecdoteService from "../services/anecdotes";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return {
    type,
    value,
    onChange,
    reset,
  };
};

// 7.5 Custom Hook: useAnecdotes extended with addAnecdote
export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([]);

  useEffect(() => {
    anecdoteService.getAll().then((data) => setAnecdotes(data));
  }, []);

  const addAnecdote = async (anecdoteObject) => {
    const newAnecdote = await anecdoteService.createNew(anecdoteObject);
    setAnecdotes(anecdotes.concat(newAnecdote));
  };

  return {
    anecdotes,
    addAnecdote,
  };
};
