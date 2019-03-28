import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

import { Todo } from 'src/app/models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todoList: Todo[];
  constructor(private todoService: TodoService,
              private flashMessage: FlashMessagesService,
              private router: Router
  ) { }

  ngOnInit() {
    this.todoList = new Array<Todo>();
    this.displayTodoList();
    console.log(this.todoList);
  }

  displayTodoList(): void {
    this.todoService.getList().subscribe(data => {
      console.log(data);
      if (data.success) {
        this.todoList = data.todoList;
      } else {
        this.flashMessage.show('User must be logged-in', {cssClass: 'alert-danger', timeOut: 3000});
      }
    });
  }

  onDeleteClick(): void {

  }
}
