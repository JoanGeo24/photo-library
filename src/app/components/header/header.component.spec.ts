import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule]
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true for active view', () => {
    // Set the current URL to simulate the router state
    spyOnProperty(router, 'url', 'get').and.returnValue('/photos');

    const isActive = component.isActive('photos');
    expect(isActive).toBeTrue();
  });

  it('should return false for inactive view', () => {
    spyOnProperty(router, 'url', 'get').and.returnValue('/favorites');

    const isActive = component.isActive('photos');
    expect(isActive).toBeFalse();
  });
});
