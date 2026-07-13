import axios from 'axios';

const api = axios.create({ baseURL: 'http://127.0.0.1:8000' });

export interface Task {
    id: number;
    title: string;
    done: boolean;
    due_date: string;
}

interface TaskCreate {
    title: string;
    due_date?: string;
}

interface TaskUpdate {
    title?: string;
    done?: boolean;
    due_date?: string;
}

export const getTasks = async (): Promise<Task[]> => {
    try {
        const response = await api.get<Task[]>('/tasks');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error fetching tasks: ', error.response?.data);
        } else {
            console.error('Unexpected Error: ', error);
        }
        throw error; 
    };
}

export const getTaskById = async (taskId: number): Promise<Task> => {
    try {
        const response = await api.get<Task>(`/tasks/${taskId}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error fetching task: ', error.response?.data);
        } else {
            console.error('Unexpected Error: ', error);
        }
        throw error;
    }
}

export const createTask = async (taskData: TaskCreate): Promise<Task> => {
    try {
        const response = await api.post<Task>('/tasks', taskData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error creating task: ', error.response?.data);
        } else {
            console.error('Unexpected Error: ', error);
        }
        throw error;
    }
}

export const updateTask = async (taskId: number, taskData: TaskUpdate): Promise<Task> => {
    try {
        const response = await api.put<Task>(`/tasks/${taskId}`, taskData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error updating task: ', error.response?.data);
        } else {
            console.error('Unexpected Error: ', error);
        }
        throw error;
    }
}

export const deleteTask = async (taskId: number): Promise<string> => {
    try {
        const response = await api.delete<string>(`/tasks/${taskId}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error deleting task: ', error.response?.data);
        } else {
            console.error('Unexpected Error: ', error);
        }
        throw error;
    }
}