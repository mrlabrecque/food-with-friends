import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { GroupDetailPageComponent } from './pages/group-detail-page/group-detail-page.component';

const routes: Routes = [
  {
    path: 'members',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('./tabs/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./tabs/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'restaurant/:id',
    loadChildren: () =>
      import('./tabs/restaurantdetails/restaurantdetails.module').then(m => m.RestaurantDetailsModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],

})
export class AppRoutingModule { }
