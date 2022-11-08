import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { SignInGuardService } from './services/sign-in-guard/sign-in-guard.service';
import { UsersComponent } from './pages/users/users/users.component';
import { CattleComponent } from './pages/cattle/cattle.component';
import { CattleFormComponent } from './components/cattle-form/cattle-form.component';
import { CattleUpdateComponent } from './components/cattle-update/cattle-update.component';
import { OffersComponent } from './pages/offers/offers.component';
import { OfferInformationComponent } from './pages/offer-information/offer-information.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent, canActivate: [SignInGuardService] },
  { path: 'dashboard', canActivate: [AuthGuardService], component: DashboardComponent },
  { path: 'users', canActivate: [AuthGuardService], component: UsersComponent },
  { path: 'cattle', canActivate: [AuthGuardService], component: CattleComponent },
  { path: 'cattle/new', canActivate: [AuthGuardService], component: CattleFormComponent },
  { path: 'cattle/update/:id', canActivate: [AuthGuardService], component: CattleUpdateComponent },
  { path: 'offers/all', canActivate: [AuthGuardService], component: OffersComponent },
  { path: 'offers/info/:id', canActivate: [AuthGuardService], component: OfferInformationComponent },

  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // { path: "**", redirectTo: '/dashboard', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
