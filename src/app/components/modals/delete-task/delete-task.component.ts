import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.css']
})
export class DeleteTaskComponent {
  // @Input decorator allows task to be passed into this component from a parent component
  @Input() task: Task;

  // Constructor for the component
  constructor(public activeModal: NgbActiveModal) {}

  // Function to close modal without deleting
  closeModal() {
    this.activeModal.dismiss(false);
  }

  // function called to delete the task
  deleteTask() {
    this.activeModal.close(true);
  }
}
