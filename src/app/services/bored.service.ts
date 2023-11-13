import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the structure of the task object
export interface Task {
  activity: string;
  type: string;
  participants: number;
  price: number;
  accessibility: number;
  link: string;
}

@Injectable({
  providedIn: 'root'
})
export class BoredService {
  // URL for the Bored API
  private baseURL: string = 'https://www.boredapi.com/api/';

  constructor(private http: HttpClient) { }

  // Fetch a random task from the Bored API
  getRandomTask(): Observable<Task> {
    const cacheBuster = Date.now();
    return this.http.get<Task>(`${this.baseURL}activity?_=${cacheBuster}`);
  }
}
