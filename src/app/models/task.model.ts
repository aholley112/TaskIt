export interface Task {
  taskId?: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: string;
  status: string;
  actions: string[];
}
