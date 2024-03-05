import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpUtilService } from './../http-utils.service';

describe('HttpUtilService', () => {
  let service: HttpUtilService;
  const mockResponse: any = {};
  let body: any = {};
  let params: any = {};

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpUtilService],
    });
    service = TestBed.inject(HttpUtilService);
  });

  it('should create instance', () => {
    expect(service).toBeTruthy();
  });

  it('Should get request', () => {
    jest.spyOn(service, 'getRequest').mockReturnValue(of(mockResponse));
    let response: any;
    service.getRequest('mock_api_path').subscribe((res) => (response = res));
    expect(response).toEqual(mockResponse);
  });

  it('Should post request', () => {
    jest.spyOn(service, 'postRequest').mockReturnValue(of(mockResponse));
    let response: any;
    body = {};
    params = {};
    service.postRequest('mock_api_path', body, params).subscribe((res) => (response = res));
    expect(response).toEqual(mockResponse);
  });

  it('Should put resource', () => {
    jest.spyOn(service, 'putResource').mockReturnValue(of(mockResponse));
    let response: any;
    service.putResource('mock_api_path', body, params).subscribe((res) => (response = res));
    expect(response).toEqual(mockResponse);
  });

  it('Should delete resource', () => {
    jest.spyOn(service, 'deleteResource').mockReturnValue(of(mockResponse));
    let response: any;
    service.deleteResource('mock_api_path', body, params).subscribe((res) => (response = res));
    expect(response).toEqual(mockResponse);
  });
});
