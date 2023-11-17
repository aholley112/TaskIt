import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Task as BoredTask } from '../../services/bored.service';
import { TaskService } from '../../services/task.service';
import { AddTaskComponent } from '../modals/add-task/add-task.component';
import { Task as TaskModel } from '../../models/task.model';

@Component({
  selector: 'app-task-display',
  templateUrl: './bored-task-display.component.html',
  styleUrls: ['./bored-task-display.component.css']
})
export class BoredTaskDisplayComponent {
  @Input() task: BoredTask | null = null; // Task is passed from the parent component

  constructor(
    private modalService: NgbModal,
    private taskService: TaskService,
    private router: Router
  ) { }

  openAddTaskModal(): void {
    const modalRef = this.modalService.open(AddTaskComponent);
    modalRef.componentInstance.initialTitle = this.task ? this.task.activity : '';

    modalRef.result.then(
      (newTask) => {
        if (newTask) {
          // Transform the Bored API task to your application's task model
          const newTaskModel: TaskModel = {
            taskId: Date.now().toString(),
            title: newTask.title || this.task?.activity,
            description: newTask.description,
            dueDate: newTask.dueDate,
            priority: newTask.priority,
            status: newTask.status,
            actions: []
          };

          // Add the new task to the task list
          this.taskService.addTask(newTaskModel);
        }
      },
      (reason) => {
        // Modal dismissed
      }
    );
  }
}
