import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../app-services/todo.service';
import { Todo } from '../models/todo.interface';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  private todos;
  private activeTasks;
  private newTodo;
  private path;
  private selectAllToggle = false;

  constructor(private todoService: TodoService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.path = params['status'];
      this.getTodos(this.path);
    });
  }

  getTodos(query = '') {
    return this.todoService.get(query).then(todos => {
      this.todos = todos;
      this.activeTasks = this.todos.filter(todo => todo.isComplete).length;
    });
  }

  addTodo() {
    this.todoService.add({ title: this.newTodo, isComplete: false }).then(() => {
      return this.getTodos();
    }).then(() => {
      this.newTodo = ''; // clear input form value
    });
  }

  updateTodo(todo, newValue) {
    todo.title = newValue;
    return this.todoService.put(todo).then(() => {
      todo.editing = false;
      return this.getTodos();
    });
  }

  destroyTodo(todo) {
    this.todoService.delete(todo._id).then(() => {
      return this.getTodos();
    });
  }

  clearCompleted() {
    this.todoService.deleteCompleted().then(() => {
      return this.getTodos();
    });
  }

  toggleSelectAll() {
    this.selectAllToggle = !this.selectAllToggle;
    this.todoService.toggleSelectAll(this.selectAllToggle).then(() => {
      return this.getTodos();
    });
  }

  saveTodoList() {
    this.todoService.saveTodoList(this.createDTO(this.todos)).subscribe(response => {
      // console.log(response);
    });
  }

  fetchTodoList() {
    this.todoService.fetchTodoList().subscribe(response => {
      this.ngOnInit();
      // console.log(response);
    });
  }

  createDTO(todoList: any[]): Todo[] {
    const todoListDTO: Todo[] = [];
    todoList.forEach(todo => {
      console.log(todo);
      todoListDTO.push(new Todo(todo.id, todo.title, todo.isComplete));
    });
    return todoListDTO;
  }
}
