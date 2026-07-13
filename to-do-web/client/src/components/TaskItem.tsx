import { formatDueDate } from '../utils/formatDate';

type TaskItemProps = {
    id: number
    title: string;
    done: boolean;
    due_date?: string;
    onDoneToggle: (id: number, done: boolean) => void;
    onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ id, title, done, due_date, onDoneToggle, onDelete }) => {
    return (
        <div className="bg-gray-700 p-8 rounded-lg shadow-md items-center">
            <div className="flex flex-row justify-between">
                <div className="justify-start">
                    <div className="text-gray-100 text-center">
                        <div className="flex text-xl font-bold">{title}</div>
                        <div className="flex text-lg font-semibold">{done ? 'Done' : 'Not Done'}</div>
                        { due_date && <div className="flex text-md">{formatDueDate(due_date)}</div>}
                    </div>
                </div>
                <div className="space-x-5">
                    <button
                    onClick={() => onDoneToggle(id, done)}
                    className="bg-green-500 hover:bg-green-600 p-4 rounded-lg text-gray-100 shadow-sm"
                    >
                        Mark Done
                    </button>
                    <button
                        onClick={() => onDelete(id)}
                        className="bg-red-500 hover:bg-red-600 p-4 rounded-lg text-gray-100 shadow-sm"
                    >
                        Delete Task
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TaskItem;