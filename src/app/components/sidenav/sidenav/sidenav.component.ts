import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { navbarData } from './nav-data';
import Swal from 'sweetalert2'
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../../change-password/change-password.component';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('350ms', style({ opacity: 1 })
        )
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('350ms', style({ opacity: 0 })
        )
      ]),
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: '0' }),
            style({ transform: 'rotate(2turn)', offset: '1' })
          ]))
      ])
    ])
  ]
})

export class SidenavComponent implements OnInit {
  public isAuth: any;
  @Output() onToggleSidenav: EventEmitter<SideNavToggle> = new EventEmitter();
  public collapsed = false;
  public screenWidth = 0;
  public navData = navbarData; //from nav-data.ts

  @HostListener('window:resize', ['$event'])

  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSidenav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth })
    }
  }

  constructor(
    private authService: AuthService,
    public dialog: MatDialog
  ) { }

  async ngOnInit() {
    let response = await this.authService.isAuthenticated();
    this.isAuth = response.res;
    this.screenWidth = window.innerWidth;
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSidenav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth })
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSidenav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth })
  }

  async logout() {
    try {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        iconColor: '#fff',
        title: 'Do you want to go out?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Ok',
        cancelButtonText: 'Cancel',
        customClass:{
          container: 'vaqueroAlert'
        }
      }).then(async(result) => {
        if(result.isConfirmed){
          await this.authService.logout()
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  openChangePasswordModal() {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      maxWidth: '500px',
    });
    dialogRef.afterClosed().subscribe(result => { });
  }
}
