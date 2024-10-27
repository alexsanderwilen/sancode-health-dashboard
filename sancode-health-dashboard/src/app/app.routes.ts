import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { FinanceiroComponent } from './financeiro/financeiro.component';
import { MenuComponent } from './menu/menu.component';

export const routes: Routes = [
    { path: '', redirectTo: '/signin', pathMatch: 'full' },
    {
      path: '', component: UserComponent,
      children: [
        { path: 'signup', component: RegistrationComponent },
        { path: 'signin', component: LoginComponent },
      ]
    },
    {
      path: '',
      component: LayoutComponent,
      children: [
        {
          path: 'menu',
          component: MenuComponent
        },

        {
          path: 'dashboard',
          component: DashboardComponent
        },
        {
          path: 'financeiro',
          component: FinanceiroComponent
        },

      ]
    }
  ];    
