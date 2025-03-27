import { format, isValid, parse } from 'date-fns';

export const formatDate = (date: Date): string => {
  if (!isValid(date)) return '';
  return format(date, 'MMMM d, yyyy');
};

export const parseDate = (dateString: string): Date | null => {
  // Try to parse different common formats
  const formats = ['yyyy-MM-dd', 'MM/dd/yyyy', 'MMMM d, yyyy'];
  
  for (const formatString of formats) {
    const parsedDate = parse(dateString, formatString, new Date());
    if (isValid(parsedDate)) {
      return parsedDate;
    }
  }
  
  return null;
};

export const isDateInFuture = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today;
};

export const getTomorrow = (): Date => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
};

export const formatDateForInput = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};
