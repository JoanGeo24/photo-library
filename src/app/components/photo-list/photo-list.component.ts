import { Component, OnInit, HostListener } from '@angular/core';
import { PhotoLibraryService } from '../../services/photo-library.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {
  photos: string[][] = []; // Explicitly typed as an array of string arrays
  page = 1; // Initial page number
  limit = 9; // Number of photos to load per page
  loading = false;
  favorites: string[] = [];

  constructor(public photoLibraryService: PhotoLibraryService) {}

  ngOnInit() {
    this.loadRandomPhotos();
    this.favorites = this.photoLibraryService.getFavorites(); // Initialize favorites
  }

  loadRandomPhotos() {
    this.loading = true;
    this.photoLibraryService.getRandomPhotos(this.page, this.limit).subscribe(
      (photoUrls: string[]) => {
        this.photos = [...this.photos, ...this.chunkArray(photoUrls, 3)];
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching random photos:', error);
        this.loading = true;
      }
    );
  }

  onPhotoClick(photoUrl: string) {
    const isFavorite = this.photoLibraryService.isFavorite(photoUrl);
  
    if (isFavorite) {
      this.photoLibraryService.removeFromFavorites(photoUrl);
    } else {
      this.photoLibraryService.addToFavorites(photoUrl);
    }
    
    this.favorites = this.photoLibraryService.getFavorites(); // Update favorites
  }  

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollPosition = window.innerHeight + window.scrollY;
    const pageHeight = document.body.scrollHeight;

    if (scrollPosition >= pageHeight) {
      // User has scrolled to the bottom, load more photos
      this.page++;
      this.loadRandomPhotos();
    }
  }

  // Helper function to chunk an array into smaller arrays
  chunkArray(array: any[], chunkSize: number): any[][] {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }
}