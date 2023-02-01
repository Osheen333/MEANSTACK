import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { InstituteList } from '../interfaces/institute.interface';
import { InstituteService } from './institute.service';

describe('DataService', () => {
  let httpTestingController: HttpTestingController;
  let service: InstituteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.get(HttpTestingController);

    service = TestBed.get(InstituteService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('#getData should return expected data', (done) => {
    const expectedData: InstituteList[] = [
      {
        name: 'University of bedfordshire',
        city: 'Warwick',
        province: 'Ontario',
        sector: 'non-profit',
        level: 'intermediate',
      },
    ];

    service.getAllInstitutes().subscribe((result: any) => {
      console.log(result)
      expect(result).toEqual(expectedData);
      done();
    });

    const testRequest = httpTestingController.expectOne(
      'http://localhost:8080/api/institutes/'
    );

    testRequest.flush(expectedData);
  });

  it('#getData should use GET to retrieve data', () => {
    service.getAllInstitutes().subscribe();

    const testRequest = httpTestingController.expectOne(
      'http://localhost:8080/api/institutes/'
    );

    expect(testRequest.request.method).toEqual('GET');
  });

  describe('create', () => {
    it('should call create POST api', () => {
      const fnPost = jest.spyOn(service['_http'], "post");
      const model = {
        name: 'University of bedfordshire',
        city: 'Warwick',
        province: 'Ontario',
        sector: 'non-profit',
        level: 'intermediate',
      }
      service.create(model);
      expect(fnPost).toHaveBeenCalledWith(`${service.baseUrl}`, model)
    });
  });

  describe('update', () => {
    it('should call update PATCH api', () => {
      const fnPatch = jest.spyOn(service['_http'], "patch");
      const model = {
        name: 'University of bedfordshire2',
        city: 'Warwick',
        province: 'Ontario',
        sector: 'non-profit',
        level: 'intermediate',
      }
      const id = "123";
      service.update(id, model);
      expect(fnPatch).toHaveBeenCalledWith(`${service.baseUrl + id}`, model)
    });
  });

  describe('delete', () => {
    it('should call DELETE api request', () => {
      const fnDelete = jest.spyOn(service['_http'], "delete");
      const id = "123";
      service.delete(id);
      expect(fnDelete).toHaveBeenCalledWith(`${service.baseUrl + id}`)
    });
  });
});
