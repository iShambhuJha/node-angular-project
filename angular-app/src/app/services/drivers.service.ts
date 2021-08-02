import { Injectable } from '@angular/core';
import { DataClientService } from './data-client.service';
import { HttpUrls } from "../httpUrls";
import { Observable } from 'rxjs';
import { IDrivers } from '../models/drivers';

@Injectable({
  providedIn: 'root'
})
export class DriversService {

  constructor(private _DataClientService: DataClientService) { }

  // Fetch all driver details
  getAllDrivers(): Observable<IDrivers[]>{
    return this._DataClientService.get<IDrivers[]>(HttpUrls.GET_ALL_DRIVERS);
  }
}
