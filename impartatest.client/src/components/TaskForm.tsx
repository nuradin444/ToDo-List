import React, { useState, useEffect, useRef } from 'react';
import { TaskService } from '../services/task-service';
import { Tasks } from '../Tasks';

interface TaskFormProps {
    onSubmit: (task: Tasks) => void;
    edit?: { value: string, id: string }; // Include the id in the edit prop
    getTaskList?: () => void;
    updateTodo?: (todoId: string, newValue: Tasks) => void;
}

const TaskForm: React.FC<TaskFormProps> = (props) => {
    const [input, setInput] = useState(props.edit ? props.edit.value : '');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission

        if (props.edit) {
            // Update task logic
            const updatedTask: Tasks = {
                id: props.edit.id,
                Description: input,
                CreatedDate: new Date(), 
                isCompleted: false, 
                CompletedDate: null,
            };

            // Update task locally
            props.updateTodo?.(props.edit.id, updatedTask);

            // Update task on the backend
            TaskService.UpdateTask(props.edit.id, updatedTask)
            .then(response => {
              console.log("Update successful", response.data);
              props.onSubmit(response.data);
              setInput('');
              props.getTaskList?.();
            })
            .catch(error => {
              console.error('Error updating task:', error);
            });
        } else {
            // Add new task logic
            const newTask: Tasks = {
                Description: input,
                CreatedDate: new Date(),
                isCompleted: false,
                CompletedDate: null,
            };

            TaskService.AddTask(newTask)
                .then(response => {
                    props.onSubmit(response.data); // Pass the new task to the parent component
                    setInput(''); // Clear the input
                    props.getTaskList?.(); // Refresh task list
                })
                .catch(error => {
                    console.error('Error adding task:', error);
                });
        }
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            {props.edit ? (
                <>
                    <input
                        type="text"
                        placeholder="Update your item"
                        value={input}
                        name="text"
                        className="todo-input edit"
                        onChange={handleChange}
                        ref={inputRef}
                    />
                    <button className="todo-button edit">Update</button>
                </>
            ) : (
                <>
                    <input
                        type="text"
                        placeholder="Add a task"
                        value={input}
                        name="text"
                        className="todo-input"
                        onChange={handleChange}
                        ref={inputRef}
                    />
                    <button className="todo-button">Add Task</button>
                </>
            )}
        </form>
    );
};

export default TaskForm;