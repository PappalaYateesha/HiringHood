export type Priority = 'Low' | 'Medium' | 'High';
export type Status = 'To Do' | 'In Progress' | 'Done';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  priority: Priority;
  status: Status;
  tags?: string[];
}
