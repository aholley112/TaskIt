import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnDestroy {
  notificationMessage: string;
  notificationType: 'add' | 'edit' | 'delete';

  // Subscription to listen for notifications
  private notificationSub: Subscription;

  constructor(private notificationService: NotificationService) {
    this.notificationSub = this.notificationService.notification$.subscribe(
      message => {
        this.notificationMessage = message;

        // Set the type of notification based on the message content
        if (message.includes('New Task Created')) {
          this.notificationType = 'add';
        } else if (message.includes('Task Edited')) {
          this.notificationType = 'edit';
        } else if (message.includes('Task Deleted')) {
          this.notificationType = 'delete';
        }

        // Clear the notification after a certain amount of time
        setTimeout(() => {
          this.notificationMessage = '';
        }, 3000); // Clears after 3 seconds
      }
    );
  }

  ngOnDestroy() {
    if (this.notificationSub) {
      this.notificationSub.unsubscribe();
    }
  }
}
