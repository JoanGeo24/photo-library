import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoriteListComponent } from './favorite-list.component';
import { PhotoLibraryService } from '../../services/photo-library.service';
import { RouterModule } from '@angular/router';

describe('FavoriteListComponent', () => {
  let component: FavoriteListComponent;
  let fixture: ComponentFixture<FavoriteListComponent>;
  let photoLibraryServiceStub: Partial<PhotoLibraryService>;

  photoLibraryServiceStub = {
    getFavorites: () => ['https://picsum.photos/id/1/200/200']
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteListComponent ],
      imports: [RouterModule.forRoot([])],
      providers: [
        { provide: PhotoLibraryService, useValue: photoLibraryServiceStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteListComponent ],
      providers: [
        { provide: PhotoLibraryService, useValue: photoLibraryServiceStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize favorites', () => {
    expect(component.favorites.length).toBe(1);
    expect(component.favorites[0].photoUrl).toBe('https://picsum.photos/id/1/200/200');
  });

  it('should remove from favorites', () => {
    const photoIdToRemove = '1';
    component.removeFromFavorites(photoIdToRemove);
    expect(component.favorites.length).toBe(0);
  });
});