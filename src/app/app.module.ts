import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';
import { SinglePhotoComponent } from './components/single-photo/single-photo.component';
import { ChunkPipe } from './pipes/chunk.pipe';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PhotoListComponent,
    FavoriteListComponent,
    SinglePhotoComponent,
    ChunkPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatBadgeModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
