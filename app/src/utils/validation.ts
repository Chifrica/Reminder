export const validateTask = (taskName: string, description: string, time: string): string | null => {
    if (!taskName.trim()) {
      return 'Task Name is required.';
    }
    if (!description.trim()) {
      return 'Description is required.';
    }
    if (!time.trim()) {
      return 'Time is required.';
    }
    return null; // No validation errors
  };