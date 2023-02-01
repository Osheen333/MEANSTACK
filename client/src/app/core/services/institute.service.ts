import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  InstituteCreateOrUpdate,
  InstituteList,
} from '../interfaces/institute.interface';

@Injectable({
  providedIn: 'root',
})
export class InstituteService {
  baseUrl = environment.apiUrl;
  isTblLoading = true;

  dataChange: BehaviorSubject<InstituteList[]> = new BehaviorSubject<
    InstituteList[]
  >([]);

  constructor(private _http: HttpClient) {}

  get data(): InstituteList[] {
    return this.dataChange.value;
  }

  getById(id: string) {
    return this._http.get(`${this.baseUrl + id}`);
  }

  getAll() {
    this._http.get(`${this.baseUrl}`).subscribe((result: any) => {
      this.isTblLoading = false;
      this.dataChange.next(result.data.data);
    });
  }

  getAllInstitutes() {
    return this._http.get(`${this.baseUrl}`);
  }

  create(model: InstituteCreateOrUpdate) {
    return this._http.post(`${this.baseUrl}`, model);
  }

  update(id: string, model: InstituteCreateOrUpdate) {
    return this._http.patch(`${this.baseUrl + id}`, model);
  }

  delete(id: string) {
    return this._http.delete(`${this.baseUrl + id}`);
  }
}
