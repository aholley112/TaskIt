import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor() {}

  // Retrieve tasks from local storage
  getTasks(): Task[] {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  }

  // Save tasks to local storage
  saveTasks(tasks: Task[]) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Add a new task and then save all tasks to local storage
  addTask(newTask: Task) {
    const tasks = this.getTasks();
    tasks.push(newTask);
    this.saveTasks(tasks);
  }
}
