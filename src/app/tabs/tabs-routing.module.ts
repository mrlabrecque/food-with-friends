import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/members/tab1',
    pathMatch: 'full'
  },
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tabs/tab1/tab1.module').then(m => m.Tab1PageModule)
          },
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tabs/tab2/tab2.module').then(m => m.Tab2PageModule),
          },
          {
            path: 'group/:id',
            loadChildren: () =>
              import('../tabs/tab2/tab2.details.module').then(m => m.Tab2DetailsPageModule),
          },
          {
            path: 'group/:id/matches',
            loadChildren: () =>
              import('../tabs/tab2/tab2.matches.module').then(m => m.Tab2MatchesPageModule),
          },
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tabs/tab3/tab3.module').then(m => m.Tab3PageModule)
          }
        ]
      },
      {
        path: 'tab4',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tabs/tab4/tab4.module').then(m => m.Tab4PageModule)
          },
          {
            path: 'settings',
            loadChildren: () =>
              import('../tabs/tab4/settings.module').then(m => m.SettingsModule),
          },
          {
            path: 'purchase',
            loadChildren: () =>
              import('../tabs/tab4/purchase.module').then(m => m.PurchaseModule),
          },
        ]
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
