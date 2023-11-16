import { Component, OnInit } from '@angular/core';
import { BoredService, Task } from '../../services/bored.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTaskComponent } from '../modals/add-task/add-task.component';

@Component({
  selector: 'app-bored',
  templateUrl: './bored.component.html',
  styleUrls: ['./bored.component.css']
})
export class BoredComponent implements OnInit {
  task: Task | null = null;

  constructor(
    private boredService: BoredService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    
  }

  generateTask(): void {
    this.boredService.getRandomTask().subscribe({
      next: data => {
        this.task = data;
      },
      error: error => {
        console.error('Error fetching new task:', error);
      }
    });
  }

  openAddTaskModal(): void {
    const modalRef = this.modalService.open(AddTaskComponent);
    modalRef.result.then(
      (result) => {
        // Handle the result from the modal
      },
      (reason) => {

      }
    );
  }
}
