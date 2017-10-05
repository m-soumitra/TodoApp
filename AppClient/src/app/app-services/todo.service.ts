import { Injectable } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { Todo } from '../models/todo.interface';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions } from '@angular/http';

let todos = [
  { id: 1, title: 'Read a book', isComplete: true },
  { id: 2, title: 'Write a book', isComplete: true },
  { id: 3, title: 'Publish a book', isComplete: false },
  { id: 4, title: 'Become Famous', isComplete: false },
];

@Injectable()
export class TodoService {

  private _saveTasksUrl = 'saveTodos';
  private _fetchTasksUrl = 'fetchTodos';
  private _counter = 4;

  constructor(private _http: Http, private _toasterService: ToasterService) { }

  public get(query = '') {
    return new Promise(resolve => {
      let data;

      if (query === 'completed' || query === 'pending') {
        const isCompleted = query === 'completed';
        data = todos.filter(todo => todo.isComplete === isCompleted);
      } else {
        data = todos;
      }

      resolve(data);
    });
  }

  public add(data) {
    return new Promise(resolve => {
      const temp = todos.filter(todo => todo.title === data.title);
      if (temp && temp.length !== 0) {
        this._toasterService.pop('warning', 'Task already exists in the list');
      } else {
        data.id = ++this._counter;
        todos.push(data);
        this._toasterService.pop('success', ('New Task created ==> ' + data.id + ' : ' + data.title));
      }
      resolve(data);
    });
  }

  public put(data) {
    return new Promise(resolve => {
      const index = todos.findIndex(todo => todo.id === data.id);
      todos[index].title = data.title;
      resolve(data);
    });
  }

  public delete(id) {
    return new Promise(resolve => {
      const index = todos.findIndex(todo => todo.id === id);
      todos.splice(index, 1);
      resolve(true);
    });
  }

  public deleteCompleted() {
    return new Promise(resolve => {
      todos = todos.filter(todo => !todo.isComplete);
      resolve(todos);
    });
  }

  public toggleSelectAll(selectAllToggle: boolean) {
    return new Promise(resolve => {
      todos.forEach(todo => todo.isComplete = selectAllToggle);
      todos = todos;
      resolve(todos);
    });
  }

  public saveTodoList(todoList: Todo[]): Observable<any> {
    console.log('Before hitting service', todoList);
    // this.proService.start();
    return this._http.post(this._saveTasksUrl, todoList)
      .map((response: Response) => <any>response.json())
      .do(response => console.log(response))
      .catch(this.handleError);
  }

  public fetchTodoList(): Observable<any> {
    // this.proService.start();
    return this._http.get(this._fetchTasksUrl)
      .map((response: Response) => <any>response.json())
      .do(response => {
        if (response) {
          // if ((<Todo[]>response.json()).length > 0) {
          this._toasterService.pop('success', ' Tasks found');
          todos = [];
          todos = response;
          // } else {
          //   this._toasterService.pop('warning', ((' No Tasks found')));
          // }
        } else {
          this._toasterService.pop('error', 'Error occured');
        }
      })
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
