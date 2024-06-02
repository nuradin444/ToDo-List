import React, { useEffect, useState } from 'react';
import TaskForm from './TaskForm';
import Task from './Task';
import { TaskService } from '../services/task-service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Tasks } from '../Tasks';

function TaskList() {
    const [todos, setTodos] = useState<Tasks[]>([]);

    const GetAllTaskList = () => {
        TaskService.GetAllTaskList()
            .then((result) => {
                setTodos(result.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        GetAllTaskList();
    }, []);

    const addTodo = (todo: Tasks) => {
        if (!todo.Description || /^\s*$/.test(todo.Description)) {
            return;
        }

        const newToDo = [todo, ...todos];
        setTodos(newToDo);
        GetAllTaskList();
    };

    const updateTodo = (todoId: string, newValue: Tasks) => {
        if (!newValue.Description || /^\s*$/.test(newValue.Description)) {
            return;
        }

        setTodos((prev) => prev.map((item) => (item.id === todoId ? newValue : item)));
    };

    const removeTodo = (id: string) => {
        // Remove task from UI
        const removeArr = todos.filter((todo) => todo.id !== id);
        setTodos(removeArr);
    
        // Remove task from backend
        TaskService.DeleteTask(id)
            .then(() => {
                GetAllTaskList();
            })
            .catch((error) => {
                console.error("Error deleting task:", error);
            });
    };

   const completeTodo = (id: string) => {
    // Find the task to update
    const todoToUpdate = todos.find(todo => todo.id === id);

    // Check if the task was found
    if (!todoToUpdate) {
        console.error(`Task with id ${id} not found`);
        return;
    }

    console.log("Before update:", todoToUpdate);

    // Toggle completion status and update CompletedDate
    const updatedTask: Tasks = {
        ...todoToUpdate,
        isCompleted: !todoToUpdate.isCompleted,
        CompletedDate: !todoToUpdate.isCompleted ? new Date() : null
    };

    console.log("After update:", updatedTask);

    // Call the backend service to update the task
    TaskService.UpdateTask(id, updatedTask)
        .then(response => {
            console.log("Task updated successfully:", response.data);

            // Update the local state with the updated task
            setTodos(prevTodos => prevTodos.map(todo => 
                todo.id === id ? { ...todo, ...updatedTask } : todo
            ));
        })
        .catch(error => {
            console.error('Error updating task:', error);
        });
};

    const numberComplete = todos.filter((t) => t.isCompleted).length;
    const numberInProgress = todos.length > 0 && numberComplete < todos.length;
    const numberTotal = todos.length;

    let taskStatus = 'Pending';
    if (numberTotal > 0 && numberComplete === numberTotal) {
        taskStatus = 'Complete';
    } else if (numberInProgress) {
        taskStatus = 'In Progress';
    }


    return (
        <div>
            <h1>
                Task Status: {numberComplete}/{numberTotal} {taskStatus}
            </h1>
            <h1>What's the plan for today</h1>
            <TaskForm onSubmit={addTodo} getTaskList={GetAllTaskList} updateTodo={updateTodo} />
            <Task todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo} getTaskList={GetAllTaskList} />
            <ToastContainer />
        </div>
    );
}

export default TaskList;