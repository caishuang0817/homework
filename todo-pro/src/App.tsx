
import './App.css'
import{TodoItem }from './components/TodoItem';
import{FilterBar } from './components/FilterBar';
import React, {useState}from 'react';
import type {Todo} from "./types/todo.ts";
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import {Button} from "@chakra-ui/react";
export default function App() {
    const navigate = useNavigate();
    const [todos, setTodos] = useState<Todo[]>([
        { id: 1, text: '学习 React', done: false },
        { id: 2, text: '学习 TypeScript', done: false },
        { id: 3, text: '学习 Vite', done: false },
        { id: 4, text: '学习 Chakra UI', done: false }
    ]);
    const HandleToggle = (id: number) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, done: !todo.done } : todo
        ));
    }
    const HandleDelete = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    }
    return (
            <div>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div>
                                <Button colorScheme="teal" onClick={() => navigate('/filter-bar')}>点一下</Button>
                                {/*{todos.map(todo => (*/}
                                {/*    <TodoItem key={todo.id} todo={todo} onToggle={HandleToggle} onDelete={HandleDelete} />*/}
                                {/*))}*/}
                            </div>
                        }
                    />
                    <Route path="/filter-bar" element={<FilterBar />} />
                </Routes>
            </div>
    );
}