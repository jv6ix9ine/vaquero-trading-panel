import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './services/auth/auth.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vaquero-trading-panel';
  public isAuth: any;

  isSideNavCollapsed = false;
  screenWidth = 0;

  constructor(
    private authService: AuthService, 
    private auth: AngularFireAuth
  ) { }

  async ngOnInit() {
    this.auth.authState.subscribe((auth) => {
      this.isAuth = auth;
    });
  }

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
