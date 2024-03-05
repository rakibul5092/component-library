import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AddressFormService } from './address-form.service';

describe('AddressFormService', () => {
  let service: AddressFormService;
  let mockResponse: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpClient,
        {
          provide: 'environment',
          useValue: {
            apiToken: 'mock-api-token',
            universalTutorialApiUrl: 'mock-url',
          },
        },
      ],
    });

    service = TestBed.inject(AddressFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should fetch states observable', () => {
    jest.spyOn(service, 'fetchStates').mockReturnValue(of(mockResponse));
    let response: any;
    service.fetchStates('mock-country-name').subscribe((res) => (response = res));
    expect(response).toEqual(mockResponse);
  });
});
