import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { TodoComponent } from './todo/todo.component';


export const ROUTES: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: ':status', component: TodoComponent }
        ],
    },
    { path: '**', redirectTo: '/all' }

];
