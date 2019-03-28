import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { FlashMessagesService } from 'angular2-flash-messages';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent implements OnInit {
  title: string;
  todo: Todo;
  constructor(private activatedRoute: ActivatedRoute,
              private flashMessage: FlashMessagesService,
              private todoListService: TodoService,
              private router: Router
              ) { }

  ngOnInit() {
    this.title = this.activatedRoute.snapshot.data.title;
    this.todo = new Todo();

    this.activatedRoute.params.subscribe(params => {
      this.todo._id = params.id;
    });

    if (this.title === 'Edit Todo') {
      this.getTodoItem(this.todo);
    }
  }
  private getTodoItem(todo: Todo): void {
    this.todoListService.getTodo(todo).subscribe(data => {
      this.todo = data.todo;
    });
  }
  onDetailPageSubmit(): void {
    switch (this.title){
      case 'Add Todo':
      this.todoListService.addTodo(this.todo).subscribe(data => {
        if (data.success) {
          this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeOut: 3000});
          this.router.navigate(['/todo']);
        } else {
          this.flashMessage.show('Add Contact Failed', {cssClass: 'alert-danger', timeOut: 3000});
          this.router.navigate(['/todo']);
        }
      });
      break;

      case 'Edit Todo':
      this.todoListService.editTodo(this.todo).subscribe(data => {
        if (data.success) {
          this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeOut: 3000});
          this.router.navigate(['/todo']);
        } else {
          this.flashMessage.show('Edit Contact Failed', {cssClass: 'alert-danger', timeOut: 3000});
          this.router.navigate(['/todo']);
        }
      });
      break;
    }
  }
}
