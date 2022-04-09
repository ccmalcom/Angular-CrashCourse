import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/Task';
import { TaskService } from 'src/app/services/task.service';
// import { TASKS } from 'src/app/mock-tasks';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    //!non observable version
    // this.tasks = this.taskService.getTasks();

    //!observable version
    this.taskService.getTasks().subscribe(tasks =>
      this.tasks = tasks
      );

  }

  deleteTask(task: Task): void {
    this.taskService
    .deleteTask(task)
    //.subscribe kind of like a .then
    .subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id);
    });
  }

  toggleReminder(task: Task): void {
    task.reminder = !task.reminder;
    this.taskService
    .updateTaskReminder(task)
    .subscribe();
  }
    
  addTask(task: Task): void {
    this.taskService
    .addTask(task)
    .subscribe(newTask => {
      this.tasks.push(newTask);
    });
  }
}
