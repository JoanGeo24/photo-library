import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';
import { SinglePhotoComponent } from './components/single-photo/single-photo.component';

const routes: Routes = [
  { path: 'photos', component: PhotoListComponent },
  { path: 'favorites', component: FavoriteListComponent },
  { path: 'photos/:id', component: SinglePhotoComponent },
  { path: '', redirectTo: '/photos', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
