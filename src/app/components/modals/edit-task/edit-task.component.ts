import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {
  @Input() task: Task;

  // Constructor for the component
  constructor(public activeModal: NgbActiveModal) { }

  // Function called when the edit task form is submitted
  onSubmit() {
    this.activeModal.close(this.task);
  }

  // Function to close the modal form without saving
  closeModal() {
    this.activeModal.dismiss('Closed');
  }
}

