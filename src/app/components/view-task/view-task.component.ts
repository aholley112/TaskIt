import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent {
  // Input property to receive the selected task
  @Input() selectedTask: Task;

  // Constructor with NgbActiveModal injected
  constructor(public activeModal: NgbActiveModal) {}

  // Method to close the modal
  closeModal() {
    // Dismisses the modal with a 'Closed' status
    this.activeModal.dismiss('Closed');
  }
}
