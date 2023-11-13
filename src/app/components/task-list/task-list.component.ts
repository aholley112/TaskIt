import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTaskComponent } from '../modals/add-task/add-task.component';
import { EditTaskComponent } from '../modals/edit-task/edit-task.component';
import { DeleteTaskComponent } from '../modals/delete-task/delete-task.component';
import { ViewTaskComponent } from '../view-task/view-task.component';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];

  // Variables for filter criteria
  selectedStatus: string = '';
  selectedDate: string = '';
  selectedPriority: string = '';

  constructor(
    private taskService: TaskService,
    private modalService: NgbModal,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    // Subscribe to task changes and update the task list accordingly
    this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
      this.filterTasks(); // Apply any existing filters
    });
  }

  filterTasks(): void {
    // Define your filter logic here
    // For example, filter by status:
    if (this.selectedStatus) {
      this.filteredTasks = this.tasks.filter(task => task.status === this.selectedStatus);
    } else {
      // No filter selected, display all tasks
      this.filteredTasks = [...this.tasks];
    }
    // Implement additional filtering by date and priority as necessary
  }

  openAddTaskModal(): void {
    const modalRef = this.modalService.open(AddTaskComponent);
    modalRef.result.then((result: Task) => {
      if (result) {
        this.taskService.addTask(result);
        this.notificationService.notifyNewTask(result.title);
      }
    }, (reason) => {
      // Modal dismissed, you could handle the dismissal reason if needed
    });
  }

  onEditTask(taskId: string): void {
    const selectedTask = this.tasks.find(task => task.taskId === taskId);
    if (!selectedTask) {
      return;
    }

    const modalRef = this.modalService.open(EditTaskComponent);
    modalRef.componentInstance.task = { ...selectedTask };

    modalRef.result.then((editedTask: Task) => {
      if (editedTask) {
        this.taskService.editTask(editedTask);
        this.notificationService.notifyTaskEdited(editedTask.title);
      }
    }, (reason) => {
      // Modal dismissed, you could handle the dismissal reason if needed
    });
  }

  onViewTask(taskId: string): void {
    const selectedTask = this.tasks.find(task => task.taskId === taskId);
    if (!selectedTask) {
      return;
    }

    this.modalService.open(ViewTaskComponent, { size: 'lg' }).componentInstance.task = selectedTask;
  }

  onDeleteTask(taskId: string): void {
    const selectedTask = this.tasks.find(task => task.taskId === taskId);
    if (!selectedTask) {
      return;
    }

    const modalRef = this.modalService.open(DeleteTaskComponent);
    modalRef.componentInstance.taskId = taskId;

    modalRef.result.then((deleteConfirmed: boolean) => {
      if (deleteConfirmed) {
        this.taskService.deleteTask(taskId);
        this.notificationService.notifyTaskDeleted(selectedTask.title);
      }
    }, (reason) => {
      // Modal dismissed, you could handle the dismissal reason if needed
    });
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
