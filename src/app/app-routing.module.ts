import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MatchPageComponent } from './match-page/match-page.component';
import { GroupsPageComponent } from './groups-page/groups-page.component';
import { GroupDetailPageComponent } from './group-detail-page/group-detail-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Home',
    pathMatch: 'full'
  },
  {
    path: 'folder/Match',
    component: MatchPageComponent
  },
  {
    path: 'folder/Groups',
    component: GroupsPageComponent
  },
  {
    path: 'folder/Groups/:id',
    component: GroupDetailPageComponent,
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
