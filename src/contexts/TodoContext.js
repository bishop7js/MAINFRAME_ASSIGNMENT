import React, { createContext, useContext, useState } from "react";

const sampleTodosData = [
    { id: 1, title: 'Buy groceries', completed: false },
    { id: 2, title: 'Walk the dog', completed: true },
    { id: 3, title: 'Read a book', completed: false },
    { id: 4, title: 'Write code', completed: true },
    { id: 5, title: 'Buy groceries', completed: false },
    { id: 6, title: 'Walk the dog', completed: true },
    { id: 7, title: 'Read a book', completed: false },
    { id: 8, title: 'Write code', completed: true },
    { id: 9, title: 'Write code', completed: true },
    { id: 10, title: 'Buy groceries', completed: false },
    { id: 11, title: 'Walk the dog', completed: true },
    { id: 12, title: 'Read a book', completed: false },
    { id: 13, title: 'Write code', completed: true },
];

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const [sampleTodos, setSampleTodos] = useState(sampleTodosData);

    return (
        <TodoContext.Provider value={{ sampleTodos, setSampleTodos }}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodoContext = () => useContext(TodoContext);