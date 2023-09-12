import { Component, OnInit } from '@angular/core';
import { PhotoLibraryService } from '../../services/photo-library.service';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss']
})
export class FavoriteListComponent implements OnInit {
  favorites: { photoUrl: string, photoId: number, width: number, height: number }[] = [];

  constructor(private photoLibraryService: PhotoLibraryService) {}

  ngOnInit() {
    this.favorites = this.photoLibraryService.getFavorites().map((url: string) => {
      const matches = url.match(/\/id\/(\d+)\/(\d+)\/(\d+)/);
      if (matches && matches.length === 4) {
        return {
          photoUrl: url,
          photoId: parseInt(matches[1], 10),
          width: parseInt(matches[2], 10),
          height: parseInt(matches[3], 10)
        };
      } else {
        return null;
      }
    }).filter((favorite: null) => favorite !== null) as { photoUrl: string, photoId: number, width: number, height: number }[];
  }  

  removeFromFavorites(photoId: number) {
    const removedPhoto = this.favorites.find(favorite => favorite.photoId === photoId);
    if (removedPhoto) {
      this.photoLibraryService.removeFromFavorites(removedPhoto.photoUrl);
      this.favorites = this.favorites.filter(favorite => favorite.photoId !== photoId);
    }
  } 
}