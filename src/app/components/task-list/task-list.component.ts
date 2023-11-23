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
  // Array to store all tasks
  tasks: Task[] = [];
  // Array to store filtered tasks
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
    // On initialization, subscribe to task updates from the task service
    this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
      this.filterTasks();
    });
  }
  // Check to see if a date is today
  isToday(date: Date): boolean {
    console.log('Today Filter:', date)
    const today = new Date();
    return date.getDate() === today.getDate()
  }
  // Check to see if a date is tomorrow
  isTomorrow(date: Date): boolean {
    console.log('Tomorrow Filter:', date)
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() +1);
    return date.getDate() === tomorrow.getDate() &&
           date.getMonth() === tomorrow.getMonth() &&
           date.getFullYear() === tomorrow.getFullYear();
  }
  // Check to see if a date is next week
  isNextWeek(date: Date): boolean {
    console.log('Next Week Filter:', date)
    const today = new Date();
    const nextWeekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
    const nextWeekEnd = new Date(nextWeekStart.getFullYear(), nextWeekStart.getMonth(), nextWeekStart.getDate() + 6);

    return date >= nextWeekStart && date <= nextWeekEnd;
  }


 // Filter tasks based off selected status, date, and priority
  filterTasks(): void {
    let tempFilteredTasks = [...this.tasks];
    // Filter by status
    if (this.selectedStatus) {
      tempFilteredTasks = tempFilteredTasks.filter(task => task.status === this.selectedStatus);
    }

    //Filter by date.
    if (this.selectedDate) {
      tempFilteredTasks = tempFilteredTasks.filter(task => {
        const taskDueDate = new Date(task.dueDate);
        console.log(task.dueDate);
        taskDueDate.setHours(0, 0, 0, 0);

        if (this.selectedDate === 'Today') {
          return this.isToday(taskDueDate);
        } else if (this.selectedDate === 'Tomorrow') {
          return this.isTomorrow(taskDueDate);
        } else if (this.selectedDate === 'Next Week') {
          return this.isNextWeek(taskDueDate);
        }
        return false;
      });
    }

    // Filter by priority
    if (this.selectedPriority) {
      tempFilteredTasks = tempFilteredTasks.filter(task => task.priority === this.selectedPriority);
    }

    // Update the filtered tasks
    this.filteredTasks = tempFilteredTasks;
  }
  // To add a task
  openAddTaskModal(): void {
    const modalRef = this.modalService.open(AddTaskComponent);
    modalRef.result.then((result: Task) => {
      if (result) {
        this.taskService.addTask(result);
        this.notificationService.notifyNewTask(result.title);
      }
    });
  }
  // To edit a task
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

    });
  }
  // To view a task
  onViewTask(taskId: string): void {
    const selectedTask = this.tasks.find(task => task.taskId === taskId);
    if (!selectedTask) {
      return;
    }

    const modalRef = this.modalService.open(ViewTaskComponent);
  modalRef.componentInstance.selectedTask = selectedTask;
}

// To delete a task
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
      // Modal dismissed
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
