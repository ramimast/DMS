import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { AdminlayoutComponent } from './components/adminlayout/adminlayout.component';
import { authGuard } from './auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { authenticatedGuard } from './authenticated.guard';
import { ItemsComponent } from './pages/items/items.component';
import { NewItemComponent } from './components/new-item/new-item.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';

export const routes: Routes = [
    { path:'login',component:LoginComponent, canActivate: [authenticatedGuard]},
    // { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path:'forget-password',component:ForgetPasswordComponent, canActivate: [authenticatedGuard]} ,
    {
        path:'', component: AdminlayoutComponent, canActivate: [authGuard],
        children : [
            { path: 'home', component: HomeComponent, canActivate: [authGuard] },
            { path: 'items', component: ItemsComponent, canActivate: [authGuard] },
            { path: 'item-details', component: ItemDetailsComponent, canActivate: [authGuard] },
            { path: 'new-item', component: NewItemComponent, canActivate: [authGuard] },
            { path: '', redirectTo: '/home', pathMatch: 'full' },
        ],
    },
];
