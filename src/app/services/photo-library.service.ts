import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoLibraryService {
  private apiUrl = 'https://picsum.photos/v2/list'; // API endpoint for random photos
  private favoritesSubject = new BehaviorSubject<string[]>([]);
  public favorites$ = this.favoritesSubject.asObservable();

  constructor(private http: HttpClient) { }

  getRandomPhotos(page: number, limit: number): Observable<string[]> {
    const url = `${this.apiUrl}?page=${page}&limit=${limit}`;
    return this.http.get<any[]>(url).pipe(
      map((response: any[]) => {
        const photoUrls: string[] = response.map(photo => photo.download_url);
        return photoUrls.join(',').split(','); // Split the URLs into an array
      })
    );
  }  

  private updateFavorites(favorites: string[]) {
    this.favoritesSubject.next(favorites);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
  
  addToFavorites(photoUrl: string) {
    const currentFavorites = this.getFavorites();
    currentFavorites.push(photoUrl);
    this.updateFavorites(currentFavorites);
  }
  
  removeFromFavorites(photoUrl: string) {
    const currentFavorites = this.getFavorites();
    const updatedFavorites = currentFavorites.filter((url: string) => url !== photoUrl);
    this.updateFavorites(updatedFavorites);
  }
  
  getFavorites() {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  }   

  isFavorite(photoUrl: string): boolean {
    const currentFavorites = this.getFavorites();
    return currentFavorites.includes(photoUrl);
  }

  getPhotoUrlById(photoId: number, width: number, height: number): string {
    return `https://picsum.photos/id/${photoId}/${width}/${height}`;
  } 
}
