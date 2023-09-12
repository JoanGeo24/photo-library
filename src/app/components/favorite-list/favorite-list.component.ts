import { Component, OnInit } from '@angular/core';
import { PhotoLibraryService } from '../../services/photo-library.service';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss']
})
export class FavoriteListComponent implements OnInit {
  favorites: { photoUrl: string, photoId: string, width: string, height: string }[] = [];

  constructor(private photoLibraryService: PhotoLibraryService) {}

  ngOnInit() {
    this.favorites = this.photoLibraryService.getFavorites().map((url: string) => {
      const matches = url.match(/\/id\/(\d+)\/(\d+)\/(\d+)/);
      if (matches && matches.length === 4) {
        return {
          photoUrl: url,
          photoId: matches[1], // Keeping photoId as string
          width: matches[2], // Keeping width as string
          height: matches[3] // Keeping height as string
        };
      } else {
        return null;
      }
    }).filter((favorite: null) => favorite !== null) as { photoUrl: string, photoId: string, width: string, height: string }[];
  }  

  removeFromFavorites(photoId: string) { // Changing the parameter type to string
    const removedPhoto = this.favorites.find(favorite => favorite.photoId === photoId);
    if (removedPhoto) {
      this.photoLibraryService.removeFromFavorites(removedPhoto.photoUrl);
      this.favorites = this.favorites.filter(favorite => favorite.photoId !== photoId);
    }
  } 
}