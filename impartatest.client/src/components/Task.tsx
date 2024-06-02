import React, { useState } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import TaskForm from './TaskForm';

function Task({ todos, completeTodo, removeTodo, updateTodo, getTaskList }) {
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    });

    const submitUpdate = (value) => {
        const updatedTask = {
            Id: edit.id,
          //  Description: value,
            CreatedDate: new Date(), 
            IsCompleted: false,
            CompletedDate: null,
        };

        updateTodo(edit.id, updatedTask);
        setEdit({
            id: null,
            value: ''
        });
    };

    if (edit.id) {
        return <TaskForm edit={{ value: edit.value, id: edit.id }} onSubmit={submitUpdate} getTaskList={getTaskList} />;
    }

    return todos.map((todo, index) => (
        // Toggles to show if it's complete or not each task
        <div className={todo.isCompleted ? 'todo-row complete' : 'todo-row'} key={index}>
            <div className='IsHover' key={todo.id} onClick={() => completeTodo(todo.id)}>
                {todo.description}
            </div>
            <div className='icons'>
                <RiCloseCircleLine
                    onClick={() => removeTodo(todo.id)}
                    className='delete-icon'
                />
                <TiEdit
                    onClick={() => setEdit({ id: todo.id, value: todo.description })}
                    className='edit-icon'
                />
            </div>
        </div>
    ));
}

export default Task;