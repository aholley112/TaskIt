import { Component } from '@angular/core';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  user: User = new User(
    'Name',
    'email@email.com',
    null,
    null,
    null
  );

  constructor() {}

}
