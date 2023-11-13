import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // Subject to hold and emit notifications
  private _notificationSubject = new Subject<string>();

  notification$ = this._notificationSubject.asObservable();

  // Method to trigger a notification
  showNotification(message: string) {
    this._notificationSubject.next(message);
  }

  // Method for sending a notification about a new task
  notifyNewTask(taskTitle: string) {
    const message = `New Task Created: '${taskTitle}'`;
    this.showNotification(message);
  }
  // Method for sending a notification about an edited task
  notifyTaskEdited(taskTitle: string) {
    const message = `Task Edited: '${taskTitle}'`;
    this.showNotification(message);
  }
  notifyTaskDeleted(taskTitle: string) {
    const message = `Task Deleted: '${taskTitle}'`;
    this.showNotification(message);
  }


}






