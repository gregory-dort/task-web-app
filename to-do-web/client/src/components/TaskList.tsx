import React from 'react';
import {useState, useEffect} from 'react';
import { deleteTask, updateTask, getTasks, type Task } from '../api/tasks';
import TaskItem from './TaskItem';
import TaskForm from '../forms/TaskForm'

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleTaskUpdate = async (taskId: number, currentDone: boolean) => {
        try {
            const data = await updateTask(taskId, { done: !currentDone })

            setTasks((prevTasks) =>
                prevTasks.map((task) => {
                    if (taskId === task.id) {
                        return data
                    } else {
                        return task
                    }
                })
            );
        } catch (error) {
            console.error("Error updating task", error)
        }

    }

    const handleTaskCreated = (newTask: Task) => {
        setTasks((prevTask) => [...prevTask, newTask]);
    }

    const handleTaskDelete = async (taskId: number) => {
        try {
            await deleteTask(taskId);
            setTasks((prevTasks) =>
                prevTasks.filter((task) => task.id !== taskId));
        } catch (error) {
            console.error('Unable to delete task', error);
        }
    }

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await getTasks();
                setTasks(data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTasks();
    }, []);

    if (isLoading) {
        return <div>...Loading</div>
    }

    return (
        <div className="bg-gray-800 container mx-auto px-4 py-2 shadow-lg rounded-lg mt-24">
            <div className="flex flex-col space-y-2">
                { tasks.length === 0 ? (
                    <p className="text-gray-100 text-lg text-center">
                        No Tasks Yet. Add one using the button below!
                    </p>
                ) : (
                    tasks.map((task) => {
                        return (<TaskItem key={task.id} id={task.id} title={task.title} done={task.done} due_date={task.due_date} onDoneToggle={() => handleTaskUpdate(task.id, task.done)} onDelete={() => handleTaskDelete(task.id)}/>)
                    })
                )}
                    <button
                        type="button"
                        onClick={() => setShowForm(!showForm)}
                        className="bg-blue-500 hover:bg-blue-600 rounded-lg p-2 text-center text-gray-100 mt-12"
                    >
                        Add Task
                    </button>
                    {showForm && <TaskForm onTaskCreated={handleTaskCreated}/>}
            </div>
        </div>
    )
}
export default TaskList;