import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DriversService } from 'src/app/services/drivers.service';
import { SocketService } from 'src/app/services/socket.service';
import { pairwise } from 'rxjs/operators';
import { IDrivers } from 'src/app/models/drivers';

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.css']
})
export class DriverDetailsComponent implements OnInit, OnDestroy {
  allDrivers?:IDrivers[];
  prevData?:IDrivers[];
  loading = true;
  subscriptionLocation = new Subscription();
  subscription = new Subscription();
  userPicFemale='../../../assets/default_avatar_female.jpg';
  userPicMale='../../../assets/men_default.png';
  constructor(private _SocketService:SocketService, private _DriversService:DriversService) { }

  ngOnInit(): void {
    this.getDrivers();
  }
  // Fetching all drivers data
  getDrivers() {
    this.subscription = this._DriversService.getAllDrivers().subscribe((data)=>{
      this.getDriversLocationValue();
    });
  }
  // Subscribing to the previous and the latest emmitted value
  getDriversLocationValue(){
    this.subscriptionLocation=this._SocketService.listen('update event').pipe(pairwise()).subscribe(([previous, current])=>{
      this.allDrivers = current;
      this.loading = false;
      this.prevData = previous;
      this.allDrivers.forEach((data:any,index:number)=>{
        data['prev_loc']=this.prevData[index].location;
      })
    })
  }
  trackByDriverName(index: number, driver: any): string {
    return driver.driverName;
}
  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.subscriptionLocation.unsubscribe();
  }
}
