import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoriteListComponent } from './favorite-list.component';
import { PhotoLibraryService } from '../../services/photo-library.service';
import { of } from 'rxjs';

describe('FavoriteListComponent', () => {
  let component: FavoriteListComponent;
  let fixture: ComponentFixture<FavoriteListComponent>;
  let mockPhotoLibraryService: jasmine.SpyObj<PhotoLibraryService>;

  beforeEach(() => {
    mockPhotoLibraryService = jasmine.createSpyObj('PhotoLibraryService', ['getFavorites', 'removeFromFavorites']);
    
    TestBed.configureTestingModule({
      declarations: [ FavoriteListComponent ],
      providers: [
        { provide: PhotoLibraryService, useValue: mockPhotoLibraryService }
      ]
    });

    fixture = TestBed.createComponent(FavoriteListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize favorites', () => {
    // Arrange
    const mockFavorites = [
      'https://picsum.photos/id/1/100/100',
      'https://picsum.photos/id/2/200/200'
    ];
    mockPhotoLibraryService.getFavorites.and.returnValue(of(mockFavorites));

    // Act
    component.ngOnInit();

    // Assert
    expect(component.favorites.length).toBe(2);
    expect(component.favorites[0].photoId).toBe(1);
    expect(component.favorites[0].width).toBe(100);
    expect(component.favorites[0].height).toBe(100);
  });

  it('should remove from favorites', () => {
    // Arrange
    component.favorites = [
      { photoUrl: 'https://picsum.photos/id/1/100/100', photoId: 1, width: 100, height: 100 },
      { photoUrl: 'https://picsum.photos/id/2/200/200', photoId: 2, width: 200, height: 200 }
    ];

    // Act
    component.removeFromFavorites(1);

    // Assert
    expect(mockPhotoLibraryService.removeFromFavorites).toHaveBeenCalledWith('https://picsum.photos/id/1/100/100');
    expect(component.favorites.length).toBe(1);
    expect(component.favorites[0].photoId).toBe(2);
    expect(component.favorites[0].width).toBe(200);
    expect(component.favorites[0].height).toBe(200);
  });
});