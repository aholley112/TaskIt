import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>(this.getTasksFromStorage());
  tasks$: Observable<Task[]> = this.tasksSubject.asObservable();

  constructor() {}

  // Method to retrieve all tasks as an observable
  getTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  // Method to add a new task
  addTask(task: Task) {
    const tasks = this.tasksSubject.value;
    tasks.push(task);
    this.updateTasks(tasks);
  }

  // Method to edit an existing task
  editTask(editedTask: Task) {
    const tasks = this.tasksSubject.value;
    const index = tasks.findIndex(t => t.taskId === editedTask.taskId);
    if (index !== -1) {
      tasks[index] = editedTask;
      this.updateTasks(tasks);
    }
  }

  // Method to delete a task
  deleteTask(taskId: string) {
    const tasks = this.tasksSubject.value.filter(task => task.taskId !== taskId);
    this.updateTasks(tasks);
  }

  // Method to update the status of a task
  updateTaskStatus(taskId: string, newStatus: 'To Do' | 'In Progress' | 'Done') {
    const tasks = this.tasksSubject.value;
    const task = tasks.find(t => t.taskId === taskId);
    if (task) {
      task.status = newStatus;
      this.updateTasks(tasks);
    }
  }

  // Helper method to update tasks in both local storage and BehaviorSubject
  private updateTasks(tasks: Task[]) {
    this.saveTasksToStorage(tasks);
    this.tasksSubject.next(tasks);
  }

  // Helper method to save tasks to local storage
  private saveTasksToStorage(tasks: Task[]) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Helper method to retrieve tasks from local storage
  private getTasksFromStorage(): Task[] {
    const tasksString = localStorage.getItem('tasks');
    return tasksString ? JSON.parse(tasksString) : [];
  }
}
