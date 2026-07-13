import React from 'react';
import { useState } from 'react';
import { createTask, type Task } from '../api/tasks';

type TaskFormProps = {
    onTaskCreated: (newTask: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated }) => {

    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = { title, due_date: dueDate ? dueDate : undefined };

        try {
            const newTask = await createTask(data);
            onTaskCreated(newTask);

            setTitle('');
            setDueDate('');
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-800 container rounded-xl mx-auto px-4 py-2 mt-4">
            <div className="flex flex-col space-y-2 mb-2">
                <input
                    type="text"
                    placeholder="Enter Task"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-gray-800 p-2 rounded-md border-2 border-gray-100 focus:ring-2 focus:ring-gray-200 text-gray-100"
                />
                <input
                    type="datetime-local"
                    placeholder="Enter Due Date and Time"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="bg-gray-800 p-2 rounded-md border-2 border-gray-100 focus:ring-2 focus:ring-gray-200 text-gray-100 [&::-webkit-calendar-picker-indicator]:invert"
                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 rounded-lg p-2 text-gray-100 text-center transition"
                >
                    Create Task
                </button>
            </div>
        </form>
    )
}

export default TaskForm;