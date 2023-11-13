import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AddTaskComponent } from './components/modals/add-task/add-task.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditTaskComponent } from './components/modals/edit-task/edit-task.component';
import { DeleteTaskComponent } from './components/modals/delete-task/delete-task.component';
import { ViewTaskComponent } from './components/view-task/view-task.component';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';
import { AppRoutingModule } from './app-routing.module';
import { TaskService } from './services/task.service';
import { KanbanCardComponent } from './components/kanban-card/kanban-card.component';
import { DatePipe } from '@angular/common';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { NotificationComponent } from './components/notification/notification.component';
import { HttpClientModule } from '@angular/common/http';
import { BoredComponent } from './components/bored/bored.component';
import { BoredTaskDisplayComponent } from './components/bored-task-display/bored-task-display.component'
import { BoredService } from './services/bored.service';
import { AuthComponent } from './components/auth/auth.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TaskListComponent,
    AddTaskComponent,
    EditTaskComponent,
    DeleteTaskComponent,
    ViewTaskComponent,
    KanbanBoardComponent,
    KanbanCardComponent,
    LandingPageComponent,
    NotificationComponent,
    BoredComponent,
    BoredTaskDisplayComponent,
    AuthComponent,

  ],
  
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    AppRoutingModule,

  ],
  providers: [TaskService, DatePipe, BoredService],
  bootstrap: [AppComponent]
})
export class AppModule { }
