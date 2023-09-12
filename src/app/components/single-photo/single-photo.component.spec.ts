import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { SinglePhotoComponent } from './single-photo.component';
import { PhotoLibraryService } from '../../services/photo-library.service';

describe('SinglePhotoComponent', () => {
  let component: SinglePhotoComponent;
  let fixture: ComponentFixture<SinglePhotoComponent>;
  let mockActivatedRoute: any;
  let mockRouter: any;
  let mockPhotoLibraryService: any;

  beforeEach(() => {
    mockActivatedRoute = {
      params: of({ id: '1' }),
      snapshot: { queryParams: { width: '5000', height: '3333' } }
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    mockPhotoLibraryService = {
      getPhotoUrlById: jasmine.createSpy('getPhotoUrlById').and.returnValue('test-url'),
      removeFromFavorites: jasmine.createSpy('removeFromFavorites')
    };

    TestBed.configureTestingModule({
      declarations: [ SinglePhotoComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: PhotoLibraryService, useValue: mockPhotoLibraryService }
      ]
    });

    fixture = TestBed.createComponent(SinglePhotoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set photoUrl, photoId, width, and height correctly', () => {
    fixture.detectChanges();
    expect(component.photoId).toEqual('1');
    expect(component.width).toEqual('5000');
    expect(component.height).toEqual('3333');
    expect(component.photoUrl).toEqual('test-url');
  });

  it('should remove from favorites and navigate to /favorites', () => {
    component.removeFromFavorites();
    expect(mockPhotoLibraryService.removeFromFavorites).toHaveBeenCalledWith('test-url');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/favorites']);
  });
});