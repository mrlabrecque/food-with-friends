import { NgModule } from '@angular/core';
import { IonicModule, IonRouterOutlet } from '@ionic/angular';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MatchPageComponent } from './match-page/match-page.component';
import { GroupsPageComponent } from './groups-page/groups-page.component';
import { GroupDetailPageComponent } from './group-detail-page/group-detail-page.component';
import { ModalContainerComponent } from './modal-container/modal-container.component';
import { ManageGroupModalComponent } from './manage-group-modal/manage-group-modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  declarations: [ManageGroupModalComponent],
  exports: [RouterModule],
  entryComponents: [ManageGroupModalComponent]

})
export class AppRoutingModule { }
