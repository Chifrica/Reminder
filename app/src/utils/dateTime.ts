interface TimeFormat {
    hours: number;
    minutes: number;
    period: 'AM' | 'PM';
  }
  
  export const formatTime = (timeString: string): string => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };
  
  export const parseTime = (timeString: string): TimeFormat | null => {
    try {
      const [time, period] = timeString.split(' ');
      const [hours, minutes] = time.split(':').map(Number);
      
      if (isNaN(hours) || isNaN(minutes)) return null;
      
      return {
        hours,
        minutes,
        period: period as 'AM' | 'PM'
      };
    } catch {
      return null;
    }
  };
  
  export const calculateAlarmTime = (taskTime: string): Date[] => {
    const parsedTime = parseTime(taskTime);
    if (!parsedTime) return [];
  
    const now = new Date();
    const taskDate = new Date();
    
    // Set task time
    taskDate.setHours(
      parsedTime.period === 'PM' ? parsedTime.hours + 12 : parsedTime.hours,
      parsedTime.minutes,
      0
    );
  
    // Create 5-minute and 1-minute reminder times
    const fiveMinReminder = new Date(taskDate.getTime() - 5 * 60000);
    const oneMinReminder = new Date(taskDate.getTime() - 60000);
  
    return [fiveMinReminder, oneMinReminder, taskDate];
  };
  
  export const isValidTime = (timeString: string): boolean => {
    const timeRegex = /^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|PM)$/i;
    return timeRegex.test(timeString);
  };
  
  export const getCurrentTime = (): string => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12 || 12;
    
    return `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };