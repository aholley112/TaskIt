import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { DatePipe } from '@angular/common';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css'],
  providers: [DatePipe]
})
export class KanbanBoardComponent implements OnInit {
// Arrays to hold the tasks based on the status
  todoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  doneTasks: Task[] = [];

  // Constructor for the component
  constructor(private taskService: TaskService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.taskService.tasks$.subscribe(tasks => {
      // Filtering tasks based on their status and assigning them to respective arrays
      this.todoTasks = tasks.filter(task => task.status === 'To Do');
      this.inProgressTasks = tasks.filter(task => task.status === 'In Progress');
      this.doneTasks = tasks.filter(task => task.status === 'Done');
    });
  }

  // Function to change the status of a task
  changeTaskStatus(taskId: string, newStatus: 'To Do' | 'In Progress' | 'Done'): void {
    this.taskService.updateTaskStatus(taskId, newStatus);
  }

     // Function to refresh tasks
    refreshTasks(task) {
    this.changeTaskStatus(task.taskId, task.status)
    console.log (task);
  }

    // Function to format the due date of tasks
  formatTaskDueDate(date: Date): string {
    const month = this.datePipe.transform(date, 'MMMM');
    const day = new Date(date).getDate();
    return `${month} ${this.getOrdinalNumber(day)}`;
  }

  // Drag and drop capability

  onDragOver(event: DragEvent) {
    event.preventDefault(); // Necessary to allow the drop event
  }

  onDragStart(event: DragEvent, task: Task) {
    if (task.taskId) {
      event.dataTransfer.setData('text/plain', task.taskId);
    }
  }

  onDrop(event: DragEvent, newStatus: 'To Do' | 'In Progress' | 'Done') {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('text/plain');
    if (taskId) {
      this.changeTaskStatus(taskId, newStatus);
    }
  }

   // Function to get the ordinal number
  getOrdinalNumber(n: number): string {
    if (n > 3 && n < 21) return n + 'th';
    switch (n % 10) {
      case 1: return n + 'st';
      case 2: return n + 'nd';
      case 3: return n + 'rd';
      default: return n + 'th';
    }
  }

}
