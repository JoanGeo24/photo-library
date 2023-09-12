import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoListComponent } from './photo-list.component';
import { PhotoLibraryService } from '../../services/photo-library.service';
import { of } from 'rxjs';

describe('PhotoListComponent', () => {
  let component: PhotoListComponent;
  let fixture: ComponentFixture<PhotoListComponent>;
  let photoLibraryService: jasmine.SpyObj<PhotoLibraryService>;

  beforeEach(() => {
    // Create a spy object for the PhotoLibraryService methods
    photoLibraryService = jasmine.createSpyObj('PhotoLibraryService', [
      'getRandomPhotos',
      'isFavorite',
      'addToFavorites',
      'removeFromFavorites',
      'getFavorites',
    ]);

    TestBed.configureTestingModule({
      declarations: [PhotoListComponent],
      providers: [{ provide: PhotoLibraryService, useValue: photoLibraryService }],
    });

    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load random photos on initialization', () => {
    const photoUrls = ['url1', 'url2', 'url3'];
    photoLibraryService.getRandomPhotos.and.returnValue(of(photoUrls));

    fixture.detectChanges(); // Trigger ngOnInit()

    expect(component.photos).toEqual([['url1', 'url2', 'url3']]);
  });

  it('should handle photo click', () => {
    const photoUrl = 'url1';
    photoLibraryService.isFavorite.and.returnValue(false);

    component.onPhotoClick(photoUrl);

    expect(photoLibraryService.addToFavorites).toHaveBeenCalledWith(photoUrl);
  });
});