import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-kanban-card',
  templateUrl: './kanban-card.component.html',
  styleUrls: ['./kanban-card.component.css']
})
export class KanbanCardComponent implements OnInit {
  @Input() task: Task;
  @Output() statusChanged = new EventEmitter<Task>();

  // Constructor for the component
  constructor() { }

  ngOnInit(): void {
  }

  // Function called when the status of a task is changed
  onStatusChanged() {
    this.statusChanged.emit(this.task);
  }

  // Drag and drop capability
  onDragStart(event: DragEvent) {
    event.dataTransfer.setData('text/plain', this.task.taskId);
  }

  onDragEnd(event: DragEvent) {

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
