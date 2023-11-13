import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { BoredComponent } from './components/bored/bored.component';
import { AuthComponent } from './components/auth/auth.component';


const routes: Routes = [

  { path: 'tasks', component: TaskListComponent },
  { path: 'kanban', component: KanbanBoardComponent },
  { path: 'bored', component: BoredComponent },
  { path: '', component: LandingPageComponent },
  { path: 'landing', component: LandingPageComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'taskslist', component: TaskListComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
