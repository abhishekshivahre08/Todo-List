import { useState, useEffect } from "react";
import "./TodoList.css";
import { v4 as uuidv4 } from 'uuid';
export default function TodoList() {
    let [todos, setTodos] = useState(() => {
        try {
            const raw = localStorage.getItem("todos");
            return raw ? JSON.parse(raw) : [{ Task: "Sample-Task", id: uuidv4(), isDone: false }];
        } catch (e) {
            return [{ Task: "Sample-Task", id: uuidv4(), isDone: false }];
        }
    });
    let [newtodo, setnewtodo] = useState("");
    let addNewTask = () => {
        setTodos((prevTodos) => [...prevTodos, { Task: newtodo, id: uuidv4(),isDone:false }]);
        setnewtodo("");
    };
    let UpdateTodoValue = (e) => {
        setnewtodo(e.target.value);

    };
    let deleteTodo = (id) => {
        let filteredTodos = todos.filter((todo) => todo.id !== id);
        setTodos(filteredTodos);
    };
    let MarksAsAll = () => {
        setTodos((todos) => todos.map((todo) => {
            return {
                ...todo,
                   isDone:true,
               
            };
        })
        );
    };
     let UpperCaseAll = () => {
        setTodos((todos) => todos.map((todo) => {
            return {
                ...todo,
                   
                Task: todo.Task.toUpperCase(),
            };
        })
        );
    };
    let MarkAsOne = (id) => {
        setTodos((todos) => todos.map((todo) => {
            if (todo.id == id) {
                return {
                    ...todo,
                   isDone:true,
                };
            } else {
                return todo;
            }

        })
        );

    }

    useEffect(() => {
        try {
            localStorage.setItem("todos", JSON.stringify(todos));
        } catch (e) {
            // storage failed (e.g., private mode) — ignore
        }
    }, [todos]);


    return (
        <div className="Todo">
            <h1>Todo-List</h1>
            <input type="text" placeholder="add a task" value={newtodo} onChange={UpdateTodoValue} />
            &nbsp; &nbsp;
            <button onClick={addNewTask} >Add Todo</button>
            <h2><b> Tasks Of Todo</b></h2>
            <ul className="todo-list">
                {
                    todos.map((todo) => {
                        return <li key={todo.id}>
                            <div className="task-box">
                                <span className="task-text" style={todo.isDone ? {textDecoration:"line-through"} : {}}>{todo.Task}</span>
                            </div>
                            <div className="buttons-container">
                                <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>Delete</button>
                                <button className="uppercase-btn" onClick={() => MarkAsOne(todo.id)}>MarkAsOne</button>
                            </div>
                        </li>
                    })

                }
            </ul>
              <button onClick={MarksAsAll} style={todos.every(todo => todo.isDone) ? {textDecoration:"line-through"} : {}}> Mark as All Done </button>
                  &nbsp; &nbsp;
            <button onClick={UpperCaseAll}  > UpperCase All</button>
        </div>
    )
}