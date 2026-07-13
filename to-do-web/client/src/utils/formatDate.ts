export const formatDueDate = (dueDate: string): string => {
    const date = new Date(dueDate);
    return date.toLocaleString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    });
} 