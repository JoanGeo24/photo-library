import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoLibraryService } from '../../services/photo-library.service';

@Component({
  selector: 'app-single-photo',
  templateUrl: './single-photo.component.html',
  styleUrls: ['./single-photo.component.scss']
})
export class SinglePhotoComponent implements OnInit {
  photoUrl: string | undefined;
  photoId: string = '';
  width: string = '';
  height: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private photoLibraryService: PhotoLibraryService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.photoId = params['id'];
      this.width = this.route.snapshot.queryParams['width'];
      this.height = this.route.snapshot.queryParams['height'];
  
      this.photoUrl = this.photoLibraryService.getPhotoUrlById(this.photoId, this.width, this.height);
    }); 
  }

  removeFromFavorites() {
    if (this.photoUrl) {
      this.photoLibraryService.removeFromFavorites(this.photoUrl);
      this.router.navigate(['/favorites']); // Redirect to favorites
    }
  }
}