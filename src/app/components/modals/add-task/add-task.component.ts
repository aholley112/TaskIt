import { Component, Input } from '@angular/core';
import { Task } from '../../../models/task.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  // Input property to accept the initial title from fetched data
  @Input() initialTitle: string = '';

  // Initialize task object with default values
  task: Task = {
    taskId: Date.now().toString(),
    title: '',
    description: '',
    dueDate: null,
    priority: '',
    status: '',
    actions: ['Edit', 'Delete']
  };

  // Constructor for the component
  constructor(public activeModal: NgbActiveModal,
    private notificationService: NotificationService) { }

    ngOnInit(): void {
      // Set the task title to the initialTitle if it exists
      if (this.initialTitle) {
        this.task.title = this.initialTitle;
      }
    }
    // Function that is called when the task form is submitted
  onSubmit() {
    this.notificationService.notifyNewTask(this.task.title);
    this.activeModal.close(this.task);
  }
  // Function to close the modal form without submitting
  closeModal() {
    this.activeModal.dismiss('Closed');
  }
}
