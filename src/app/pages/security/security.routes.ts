import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { PermissionsComponent } from './permissions/permissions.component';

export default [
    { path: 'users', component: UsersComponent },
    { path: 'roles', component: RolesComponent },
    { path: 'permissions', component: PermissionsComponent },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
