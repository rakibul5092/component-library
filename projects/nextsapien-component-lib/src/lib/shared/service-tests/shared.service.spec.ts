import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedService } from '../shared.service';

describe('SharedService', () => {
  let sharedService: SharedService;
  let mockIntersectionObserver: IntersectionObserver;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [SharedService],
    });
    sharedService = TestBed.inject(SharedService);
  });

  it('Should create instance', () => {
    expect(sharedService).toBeTruthy();
  });

  it('Should return IntersectionObserver', () => {
    jest.spyOn(sharedService, 'createIntersectionObserver').mockReturnValue(mockIntersectionObserver);
    let el: any;
    let callback: IntersectionObserverCallback;
    const observer = sharedService.createIntersectionObserver(el, callback);
    expect(observer).toEqual(mockIntersectionObserver);
  });
});
