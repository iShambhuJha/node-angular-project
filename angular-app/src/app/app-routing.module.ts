import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriverDetailsComponent } from './pages/driver-details/driver-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'drivers', pathMatch: 'full' },
  { path: 'drivers', component: DriverDetailsComponent },
  { path: '**', component: DriverDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
