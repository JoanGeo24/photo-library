import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PhotoLibraryService } from './photo-library.service';

describe('PhotoLibraryService', () => {
  let service: PhotoLibraryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PhotoLibraryService]
    });
    service = TestBed.inject(PhotoLibraryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get random photos', () => {
    const mockResponse = [
      { download_url: 'https://picsum.photos/id/1/200/200' },
      { download_url: 'https://picsum.photos/id/2/300/300' }
    ];

    service.getRandomPhotos(1, 2).subscribe((photos) => {
      expect(photos.length).toBe(2);
      expect(photos).toContain('https://picsum.photos/id/1/200/200');
      expect(photos).toContain('https://picsum.photos/id/2/300/300');
    });

    const req = httpMock.expectOne(`${service['apiUrl']}?page=1&limit=2`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should add to favorites', () => {
    const photoUrl = 'https://picsum.photos/id/1/200/200';

    spyOn(localStorage, 'setItem');

    service.addToFavorites(photoUrl);

    expect(localStorage.setItem).toHaveBeenCalledWith('favorites', JSON.stringify([photoUrl]));
  });

  it('should remove from favorites', () => {
    const photoUrl = 'https://picsum.photos/id/1/200/200';

    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify([photoUrl]));
    spyOn(localStorage, 'setItem');

    service.removeFromFavorites(photoUrl);

    expect(localStorage.setItem).toHaveBeenCalledWith('favorites', '[]');
  });

  it('should get favorites', () => {
    const favorites = ['https://picsum.photos/id/1/200/200', 'https://picsum.photos/id/2/300/300'];

    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(favorites));

    const result = service.getFavorites();

    expect(result).toEqual(favorites);
  });

  it('should check if a photo is a favorite', () => {
    const photoUrl = 'https://picsum.photos/id/1/200/200';
    const favorites = ['https://picsum.photos/id/1/200/200', 'https://picsum.photos/id/2/300/300'];

    spyOn(service, 'getFavorites').and.returnValue(favorites);

    const isFavorite = service.isFavorite(photoUrl);

    expect(isFavorite).toBe(true);
  });

  it('should generate photo URL by ID, width, and height', () => {
    const photoId = 1;
    const width = 200;
    const height = 200;
    const expectedUrl = 'https://picsum.photos/id/1/200/200';

    const result = service.getPhotoUrlById(photoId, width, height);

    expect(result).toBe(expectedUrl);
  });

  afterEach(() => {
    httpMock.verify();
  });
});