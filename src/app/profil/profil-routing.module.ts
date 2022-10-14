import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilPage } from './profil.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilPage
  },
  {
    path: 'select-language',
    loadChildren: () => import('./select-language/select-language.module').then( m => m.SelectLanguagePageModule)
  },
  {
    path: 'preview-headline-liked',
    loadChildren: () => import('./preview-headline-liked/preview-headline-liked.module').then( m => m.PreviewHeadlineLikedPageModule)
  },
  {
    path: 'preview-headline-saved',
    loadChildren: () => import('./preview-headline-saved/preview-headline-saved.module').then( m => m.PreviewHeadlineSavedPageModule)
  },
  {
    path: 'preview-headline-viewed',
    loadChildren: () => import('./preview-headline-viewed/preview-headline-viewed.module').then( m => m.PreviewHeadlineViewedPageModule)
  },
  {
    path: 'update-profil',
    loadChildren: () => import('./update-profil/update-profil.module').then( m => m.UpdateProfilPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilPageRoutingModule {}
